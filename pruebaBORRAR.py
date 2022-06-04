# ******************************************************************
import cgi
from copy import copy
from tkinter import S
import urllib.request, urllib.error, urllib.parse
from urllib.request import urlopen
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
from datetime import datetime as dtime
from datetime import timedelta
import datetime
import time
import sys
import os
from os import remove
import base64
import json
import threading
import sched, time
import random
from urllib.parse import urlparse
import mimetypes
from wsgiref import simple_server, util
import ephem
import requests
from pprint import pprint 
from html_table_parser import HTMLTableParser 
import pandas as pd 
import xlrd 
carpetaInicio = ["."]
carpetaInicio[0] = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
diadehoyVE = [datetime.datetime.now().strftime("%Y-%m-%d"),(datetime.datetime.now()+timedelta(1)).strftime("%Y-%m-%d"),(datetime.datetime.now()-timedelta(1)).strftime("%Y-%m-%d")]
horadeconsulta=[datetime.timezone.utc]
version ="2000"
noencontrado="NE00000"
Xconfiguracion = {}
estadoconsulta=[0,0]

# *****************************************************************
def token(cadena, Numero, separador):
    # cadena=bytes(cadena)

    if cadena == "":
        return ""
    if Numero < 0:
        cadena = dalavuelta(cadena)
        separador = dalavuelta(separador)
    trozos = cadena.split(separador)
    a1 = ""
    try:
        if Numero < 0:
            Numero = (Numero * (-1)) - 1
            a1 = trozos[Numero]
            a1 = dalavuelta(a1)
        else:
            a1 = trozos[Numero]
        return a1
    except:
        return ""

# *******************************************************************
def dalavuelta(cadena):
    return cadena[::-1]

# *************************************************
def actualizaXconfiguracion(lectura=True):
    if lectura:
        try:
            with open(
                os.path.join(carpetaInicio[0], "configX.json"),
                "r",
                encoding="cp1252",
                errors="ignore",
            ) as f:
                claves = json.load(f)
                f.close()
                claves[0]["XSal2021.py"]=version
            return claves[0]
        except:
            return [{}]
    else:
        try:
            with open(
                os.path.join(carpetaInicio[0], "configX.json"),
                "w",
                encoding="cp1252",
                errors="ignore",
                ) as f:
                json.dump([Xconfiguracion], f, indent=4)
                f.close()
                return "ok"
        except:
            return "NO Grabado"

# ************************************************************
def consultaVariable(variableConfiguracion):
    claves = [{}]
    global Xconfiguracion
    try:
        a = Xconfiguracion[variableConfiguracion]
        return a
    except:
        try:
            with open(
                os.path.join(carpetaInicio[0], "configX.json"),
                "r",
                encoding="cp1252",
                errors="ignore",
            ) as f:
                claves = json.load(f)
                f.close()
            a = ""
            try:
                a = claves[0][variableConfiguracion]
            except:
                a = noencontrado
            if len(Xconfiguracion) == 0:
                Xconfiguracion = claves[0]
            Xconfiguracion[variableConfiguracion] = a
            return a
        except:
            Xconfiguracion[variableConfiguracion] = ""
            return ""
# ************************************************************
def obtenvariable(variable, defecto):
    consultaVariable(variable)
    try:
        if Xconfiguracion[variable]==noencontrado:
            Xconfiguracion[variable]=defecto
            actualizaXconfiguracion(False)
            return defecto
        return Xconfiguracion[variable]
    except:
        print("!!! Definir la variable en configuración: ", variable)
        Xconfiguracion[variable] = defecto
        actualizaXconfiguracion(False)
        return defecto

# *************************************
def actualizaConfiguracion(variable,valor):
    Xconfiguracion[variable]=valor
    actualizaXconfiguracion(False)
# *************************************+
    #UrlTarifaHora=("https://www.esios.ree.es/es/pvpc")
    #UrlTarifaHora=("https://tarifaluzhora.es/info/precio-kwh")
    #UrlTarifaHora="https://tarifaluzhora.es/info/precio-kwh-manana"
    #UrlTarifaHora=("https://energia.roams.es/luz/precio-luz/")
    #UrlTarifaHora=("https://www.tarifadeluz.com/")-->NO VA
    #UrlTarifaHora=("https://tarifaluzhora.es/?tarifa=pcb&fecha=19%2F02%2F2022")#-->NO VA
    #UrlTarifaHora=("https://selectra.es/energia/info/que-es/precio-kwh")-->NO FIABLE
# *************************************************  
def url_get_contents(url): 
    req = urllib.request.Request(url=url) 
    f = urllib.request.urlopen(req) 
    return f.read() 
# *************************************************  
# *************************************************
# *************************************************
separadorlocal = chr(222) + chr(223)
tabla="programas"
reg0= tabla + separadorlocal + "KKC55\u00de\u00dfDEM69" + separadorlocal + "KKC55" + separadorlocal
reg1 = reg0 + str("10") + separadorlocal + str(float(100) / 100)
def regX(a,b): # NO COPIAR..........
    if b=="horadeconexion":return "12"
    if b=="HorasVEHasta":return "24"
    if b=="HorasVE":return "2"
    return ""
tablaeventos=[]
# *************************************************
def obentiempo(e):
    tmp = token(e, 3, separadorlocal)  # obtener el tiempo
    return int(tmp)
# *************************************************
# reg0 = tabla + separadorlocal + clave + separadorlocal + icono + separadorlocal
# reg1 = reg0 + str(horaf) + separadorlocal + str(float(accion) / 100)
#           tablaeventos.insert(0, reg1)
# ************************************************* 
def generapuntosVEeneventos(a0):
    tablahorasHoy=obtentblVE()
    if len(tablahorasHoy)!=24:
        print("La tabla horaria VE tiene este tamaño ",len(tablahorasHoy),"distinto de 24 horas ...ERROR")
        return
    # para la selección de horas, no han de haber duplicados. Añado un coste insignificante y distinto 
    # a cada coste de forma que no se repita ningún valor. Todos tienen 4 dígitos significativos. Si añado 
    # a quinto y sexto no variarán los costes pero no habrá problemas de orden.
    
    dt = datetime.datetime.now()
    horahora=dt.hour
    tabla = regX(a0, 0)  # 0 
    clave = regX(a0, "codigoprograma")  # 1
    icono = token(regX(a0, 1), 0, separadorlocal)  # 2

    tp=regX(a0, "horadeconexion")
    if tp=="":return
    horaInicio = int(tp)
    if not(horaInicio >=0 and horaInicio <24):
        print("La horaInicio de conexión horadeconexion",horaInicio,"fuera de rango (0..23) ...ERROR")
        return

    tp=regX(a0,"HorasVEHasta")
    if tp=="":return
    HorasVEHasta=int(tp)

    if not(HorasVEHasta >=0 and HorasVEHasta <=24):
        print("La final de conexión HorasVEHasta",HorasVEHasta,"fuera de rango (0..23) ...ERROR")
        return 

    tp=regX(a0,"HorasVE")
    if tp=="":return
    HorasVE = int(tp)
    
    if not(HorasVE >=0 and HorasVE <24):
        print("Las horas de conexión, HorasVE",HorasVE,"fuera de rango (0..23) ...ERROR")
        return
    # HorasVE : horas de carga del vehículo
    # horaInicio : horaInicio de inicio de intervalo de carga
    # HorasVEHasta : horaInicio de fin de intervalo de carga

    #if HorasVE > (HorasVEHasta-horaInicio) and HorasVEHasta>horaInicio:
    #    HorasVE=HorasVEHasta-horaInicio
    #if HorasVE > (HorasVEHasta+24-horaInicio) and HorasVEHasta<horaInicio:
    #    HorasVE=(HorasVEHasta+24-horaInicio)
    
    tabl2 = []
    tablencendidos = []
    for k in range(24):tablencendidos.append(0) # inicializa a 0 la tabla de encendidos

    #******
    for i in range(len(tablahorasHoy)):
        tablahorasHoy[i]=tablahorasHoy[i]+0.000001*i
    tabSuma=[]
    tabmanana=obtenvariable("TablaHorasManana",tablahorasHoy)
    tabSuma2=[] # recalculo esta tabla otra vez 
    for i in range(len(tablahorasHoy)):
        tabSuma2.append(tablahorasHoy[i])
    for i in range(len(tablahorasHoy)):
        tabSuma2.append(tabmanana[i]) 

    # *** caso 2 intervalos
    if HorasVEHasta <= horaInicio: # las horas a escoger pertenecen al distintos días
        # en este caso, he de obtener los valores de los costes de ayer para ver
        # cuantas horas se consumieron ayer y deteminar cuantas me quedan por colocar en el
        # intervalo que va desde las 0 hasta la hora final

        tabAyer= obtenvariable("TablaHorasAyer",tablahorasHoy)
        for i in range(len(tabAyer)):
            tabAyer[i]=int(tabAyer[i]*10000)/10000
            tabSuma.append(tabAyer[i]+(0.0000001*i))
        #for i in range(len(tablahorasHoy)):
        #    tabSuma.append(tablahorasHoy[i]) # suma ayer y hoy

        for i in range(len(tabAyer)):
            tabSuma.append(tabAyer[i]+(0.0000001*i)+0.0000024) # suma ayer y hoy (es mejor duplicar la tabla pues va ha ser lo normal)
        # ahora tengo la suma de ayer y hoy

        # ahora tengo la suma de ayer y hoy
        # tabSuma tiene 48 elementos
        for s in range(horaInicio,24):
            tabl2.append(tabSuma[s])    # se obtiene la tabla de valores con los datos de 
                                        # los precios de hoy
        for s in range(0,HorasVEHasta): # y los precios de mañana, considerando que esta parte de 
            tabl2.append(tabSuma[s+24]) # la tabla puede no estar actualizada.
        
        tabl2.sort(key=None)
        if HorasVE>len(tabl2):HorasVE=len(tabl2)
        pmaximo=tabl2[HorasVE-1]

        # obtener el número de horas gastadas el día anterior
        horasgastadas=0
        for s in range(horaInicio,24):
            if  tabSuma[s]<=pmaximo:horasgastadas=horasgastadas+1
        horasPendientes = HorasVE - horasgastadas
        # ahora, tengo 2 intervalos en los que tengo un número distinto de horas
        # en el primer intervalo, me quedan HorasVE - horasgastadas
        # en el segundo intervalo, he de calcularlo todo con los datos de la tabla de hoy y la de mañana
        tabl2=[]
        for s in range(0,HorasVEHasta):
            tabl2.append(tablahorasHoy[s])
        if horasPendientes>len(tabl2):horasPendientes=len(tabl2)
        tabl2.sort(key=None)
        pmaximo=tabl2[horasPendientes-1]
        for s in range(0,HorasVEHasta):  # añade eventos en el primer intervalo     
            if  tablahorasHoy[s]<=pmaximo:tablencendidos[s]=1
        # **** ahora calculo el 2 intervalo
        tabl2=[]
        for s in range(horaInicio,24):
            tabl2.append(tabSuma2[s])
        for s in range(0,HorasVEHasta):
            tabl2.append(tabSuma2[s+24])
        tabl2.sort(key=None)
        pmaximo=tabl2[HorasVE-1]
        for s in range(horaInicio,24):
            if  tablahorasHoy[s]<=pmaximo:tablencendidos[s]=1 

    # *** caso 1 intervalo

    if HorasVEHasta > horaInicio:
        for s in range(horaInicio,HorasVEHasta):
            tabl2.append(tablahorasHoy[s])
        tabl2.sort(key=None) # al ordenarlo por precios se puede saber el precio máximo que actúa de filtro
        if HorasVE>len(tabl2):HorasVE=len(tabl2)
        preciomaximo=tabl2[HorasVE-1] 
        for s in range(horaInicio,HorasVEHasta):       
            if  tablahorasHoy[s]<=preciomaximo:tablencendidos[s]=1 

    pun0=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    pun1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    pun2=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    pun3=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    punT=[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3]
    if len(tablaeventos) > 1:
        tablaeventos.sort(key=obentiempo)
  
    for evento in tablaeventos:
        ho=obentiempo(evento)
        
        if int(ho%3600) ==0:
            if int(ho/3600)<24:
                pun0[int(ho/3600)]=evento   # guarda el evento
                pun1[int(ho/3600)]=1        # indica que hay un cambio
                pun2[int(ho/3600)]=int(token(evento, 4, separadorlocal)) # guarda el valor de cambio

    print("PUN 1",pun1)
    print("PUN 2",pun2)
    print("XXX X",tablencendidos)

    est=0
    for h in range(0,24):
        if pun1[h]:
            tablaeventos.remove(pun0[h])
            est = pun2[h]
        if est:
            tablencendidos[h]=est
            pun3[h]=est
    print("PUN 3",pun3)
        

    reg0 = tabla + separadorlocal + clave + separadorlocal + icono + separadorlocal
    reg1 = reg0 + str(horahora*3600) + separadorlocal + str(tablencendidos[horahora])
    tablaeventos.append(reg1)
    for k in range(horahora+1,24):
        if tablencendidos[k]!=tablencendidos[k-1]:
            reg1 = reg0 + str(k*3600) + separadorlocal + str(tablencendidos[k])
            tablaeventos.append(reg1)
    print("PUN E",tablencendidos)
    print("PUN T",punT)
    #print(tablaeventos)
    return
# *************************************************  
def obtentblVE(): # obtiene la tabla de valores de hoy, ayer y si puede mañana y las guarda en el fichero de configuración
    fecha_dt=[obtenvariable("DIATARIFAShoy", "2000-01-01")]
    horadeactualizatx=obtenvariable("horadeactualizacion", "21:30")
    trozoshora = horadeactualizatx.split(":")
    horadeactualiza=int(trozoshora[0])+int(trozoshora[1])/60
    dt = datetime.datetime.now()
    # 0 anteayer, 1 ayer, 2 hoy, 3 mañana.
    if fecha_dt[0] != diadehoyVE[2]: # si la fecha guardada no coincide con la fecha de hoy, las variables 
        # de consulta se ponen a 0
        estadoconsulta[0]=0

    tabl1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    if not estadoconsulta[0]: # cambiamos de día o no está la tabla del día actualizada 
        tbl24=[] 
        if (obtenvariable("DIATARIFASAyer", "2000-01-01")!=diadehoyVE[1]): 
            if (obtenvariable("DIATARIFAShoy", "2000-01-01")==diadehoyVE[1]):  
                tbl24=obtenvariable("TablaHorasHoy",tabl1)
                actualizaConfiguracion("TablaHorasAyer",tbl24)
                actualizaConfiguracion("DIATARIFASAyer",diadehoyVE[1])
            else:
                actualizatblVE("Ayer")

        if (obtenvariable("DIATARIFAShoy", "2000-01-01")!=diadehoyVE[2]): 
            if (obtenvariable("DIATARIFASManana", "2000-01-01")==diadehoyVE[2]):  
                tbl24=obtenvariable("TablaHorasManana",tabl1)# la tabla que se obtuvo ayer de hoy pasa a hoy
                actualizaConfiguracion("TablaHorasHoy",tbl24)
            else:
                actualizatblVE("Hoy")
            estadoconsulta[0]=1 # ya se tiene la tabla de hoy por copia de la de ayer
            estadoconsulta[1]=0 # se anula el estado de consulta de mañana
            
    tbl24=obtenvariable("TablaHorasHoy",tabl1)

    if  (not estadoconsulta[1]) and horadeactualiza <=(dt.hour+dt.minute/60):
        if actualizatblVE("Manana"):
            estadoconsulta[1]=1
            tp=obtenvariable("TablaHorasManana",tabl1)
            if tp==tabl1:
                estadoconsulta[1]=0 # la cosulta no es válida si todo son ceros
    return tbl24
# ******************************************************************
# COMPROBAR SI LO GUARDADO ES IGUAL A LO LEIDO -> NO SE ACTUALIZA LA FECHA.
# SI LO LEIDO ES TODOV 000 TAMPOCO

def actualizatblVE(tm): # actualiza la tabla de datos si puede en el fichero de datos, 
    # al igual que las fechas. Se ha de entrar en este proceso si la fecha de hoy o mañana en el fichero de 
    # configuración no es la correcta
    # 0 anteayer, 1 ayer, 2 hoy, 3 mañana.
    if tm=="Hoy":
        dia=diadehoyVE[2]
        tabla="TablaHorasHoy"
        diatarifa="DIATARIFAShoy"
        fechaConsulta=diadehoyVE[1] # fecha de ayer
    elif tm=="Ayer":
        dia=diadehoyVE[1]
        tabla="TablaHorasAyer"
        diatarifa="DIATARIFASAyer"
        fechaConsulta=diadehoyVE[0] # fecha de anteayer
    else:
        dia=diadehoyVE[3]
        tabla="TablaHorasManana"
        diatarifa="DIATARIFASManana"
        fechaConsulta=diadehoyVE[2] # fecha de hoy

    # diadehoyVE[1] se obtienen los valores de hoy con la fecha de ayer para hoy
    urltbl="https://api.esios.ree.es/archives/71/download?date_type=publicacion&end_date="+fechaConsulta 
    urltbl=urltbl+"T23%3A59%3A59%2B00%3A00&locale=es&start_date="+fechaConsulta+"T00%3A00%3A00%2B00%3A00"
    tblExcel = url_get_contents(urltbl)

    if len(tblExcel)<1000: # no está la publicación todavía
        return False

    archivo=tabla+".xls"
    open(archivo, 'wb').write(tblExcel)

    wb = xlrd.open_workbook(archivo)
    sheet = wb.sheet_by_index(0)

    tbl2=[]
    for i in range(sheet.nrows):
        try: # relleno la tabla de datos de la excel
            vb= int(float(sheet.cell_value(i, 4))*10)/10000
            tbl2.append(vb)
        except:continue

    if tbl2!=obtenvariable(tabla,[]):
        actualizaConfiguracion(tabla,tbl2)
        actualizaConfiguracion(diatarifa,dia)       
    return True


# ******************************************************************
def leetb():
    
    fhoy=diadehoyVE[2] # ayer

    pp="https://api.esios.ree.es/archives/71/download?date_type=publicacion&end_date="+fhoy
    pp=pp+"T23%3A59%3A59%2B00%3A00&locale=es&start_date="+fhoy+"T00%3A00%3A00%2B00%3A00"

    #pp="https://api.esios.ree.es/archives/71/download?date_type=publicacion&end_date=2022-03-17T23%3A59%3A59%2B00%3A00&locale=es&start_date=2022-03-17T00%3A00%3A00%2B00%3A00"
    r = url_get_contents(pp)
    

    print(fhoy,len(r))

    archivo='PreciosHoraHoy.xls'
    open(archivo, 'wb').write(r)
    
    #df = pd.read_excel(archivo, sheet_name='Tabla de Datos PCB')
    #df = (pd.read_excel(archivo,sheet_name="Tabla de Datos PCB",usecols="E:E"))
    #df2=list(df)


    wb = xlrd.open_workbook(archivo)
    sheet = wb.sheet_by_index(0)
    j=0
    for i in range(sheet.nrows):
        try:
            va= int(float(sheet.cell_value(i, 4))*10)/10000
        except:continue
        j=j+1
        print(int(sheet.cell_value(i, 1)),va)
    #df.describe()
    #print(df)
    #for k in df2:
    #    print("k")
def obtentblVE2():
    fecha_dt=[obtenvariable("DIATARIFAShoy", "01/01/2000")]
    horadeactualizatx=obtenvariable("horadeactualizacion", "21:30")
    trozoshora = horadeactualizatx.split(":")
    horadeactualiza=int(trozoshora[0])+int(trozoshora[1])/60
    dt = datetime.datetime.now()

    tabl1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    if fecha_dt[0] != diadehoyVE[0] or not estadoconsulta[0]: # cambiamos de día o no está la tabla del día actualizada 
        tbl48=[]
        if estadoconsulta[1]:
            tbl48=obtenvariable("TablaHorasManana",tabl1)# esta tabla tiene 24 elementos
            actualizaConfiguracion("TablaHorasHoy",tbl48)
            estadoconsulta[0]=1
        else:
            if actualizatblVE("UrlTarifaHora1", "https://energia.roams.es/luz/precio-luz/","Hoy"):
                tbl48=obtenvariable("TablaHorasHoy",tabl1)
                estadoconsulta[0]=1
                actualizaConfiguracion("DIATARIFAShoy",diadehoyVE[0])
            else:
                if actualizatblVE("UrlTarifaHora2", "https://tarifaluzhora.es/info/precio-kwh","Hoy"):
                    tbl48=obtenvariable("TablaHorasHoy",tabl1)
                    estadoconsulta[0]=1
                    actualizaConfiguracion("DIATARIFAShoy",diadehoyVE[0])
        if not estadoconsulta[0]:
            tbl48=obtenvariable("TablaHorasHoy",tabl1) # si no consigue nada, toma como referncia la que hay
        estadoconsulta[1]=0
        u=24
        tp=tbl48
        for t in range(24):
            tbl48.append(tbl48[t])
            u=u+1
        # al salir de este proceso, se supone por 
        # defecto que las tarifas de mañana son iguales a las de hoy
        
    else:
        tbl48=obtenvariable("TablaHorasHoy",tabl1)
    # en este punto, la tabla del dia de hoy está con valores mas o menos fiables
    # actualizamos las tarifas del día siguiente si procede

    if  (not estadoconsulta[1]) and horadeactualiza <=(dt.hour+dt.minute/60):
        if actualizatblVE("UrlTarifaHoraManana1", "https://tarifaluzhora.es/info/precio-kwh-manana","Manana"):
            estadoconsulta[1]=1
        else:
            if actualizatblVE("UrlTarifaHoraManana2", "https://tarifaluzhora.es/info/precio-kwh-manana","Manana"):
                estadoconsulta[1]=1
        if estadoconsulta[1]:
            tp=obtenvariable("TablaHorasManana",tabl1)
            if tp==tabl1:
                estadoconsulta[1]=0 # la cosulta no es válida si todo son ceros
                return tbl48
            u=24
            for t in tp:
                tbl48[u]=t
                u=u+1
 
    return tbl48
# ******************************************************************
def actualizatblVE2(cod,url,tm):
    if tm=="Hoy":
        dia=diadehoyVE[0]
        tabla="TablaHorasHoy"
        diatarifa="DIATARIFAShoy"
    else:
        dia=diadehoyVE[1]
        tabla="TablaHorasManana"
        diatarifa="DIATARIFASManana"
    try:
        UrlTarifaHora=obtenvariable(cod, url)
        r = url_get_contents(UrlTarifaHora).decode('utf-8')
        p = HTMLTableParser() 
        p.feed(r)   
        tbl2=[]
        try:
            tbl1=pd.DataFrame(p.tables[0])[1]
            for j in range(0,25):
                va= tbl1[j].split(" ")[0].replace(',', '.')
                try:
                    vb=float(va)
                    tbl2.append(vb)
                except:
                    continue
                
            if tbl2!=obtenvariable(tabla,[]):
                actualizaConfiguracion(tabla,tbl2)
                actualizaConfiguracion(diatarifa,dia)
            return True
        except:
            return False
    except:
        return False
# ******************************************************************
# ******************************************************************
def NOVALEactualizatblVE(cod,url,tm):
    if tm=="Hoy":
        dia=diadehoyVE[0]
        tabla="TablaHorasHoy"
        diatarifa="DIATARIFAShoy"
    else:
        dia=diadehoyVE[1]
        tabla="TablaHorasManana"
        diatarifa="DIATARIFASManana"
    try:
        UrlTarifaHora=obtenvariable(cod, url)
        r = url_get_contents(UrlTarifaHora).decode('utf-8')
        p = HTMLTableParser() 
        p.feed(r)   
        tbl2=[]
        try:
            tbl1=pd.DataFrame(p.tables[0])[1]
            for j in range(0,25):
                va= tbl1[j].split(" ")[0].replace(',', '.')
                try:
                    vb=float(va)
                    tbl2.append(vb)
                except:
                    continue
                
            if tbl2!=obtenvariable(tabla,[]):
                actualizaConfiguracion(tabla,tbl2)
                actualizaConfiguracion(diatarifa,dia)
            return True
        except:
            return False
    except:
        return False
# *************************************************  


if __name__ == "__main__":
    #print(diadehoyVE)
    #obtentblVE()
    pprint(obtentblVE())
    #generapuntosVEeneventos(reg1)
    #leetb()
    #pprint(tablaeventos)