#from asyncore import loop
import cgi
from turtle import left
import urllib.request, urllib.error, urllib.parse
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import datetime
from datetime import timedelta
import time
import sys
import os
import base64
import json
import threading
import random
import mimetypes
from wsgiref import simple_server, util
import ephem
import xlrd 
import smtplib, ssl

utc = ["-0.6569437245803404", "38.71637835222301"]
web1 = '<!DOCTYPE html><html><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="imagenes">\n'
web3 = "</div></body><script></script></html>"
path = [""]
Xconfiguracion = {}

tokeninicio = "%@"
tokeninicio2 = urllib.parse.quote(chr(230) + chr(254))
separadorcampo = chr(248) + chr(247)
separadorlocal = chr(222) + chr(223)
separadorlocalX = chr(220) + chr(221)
separadorcampo2 = urllib.parse.quote(separadorcampo)
separadorrecno2 = urllib.parse.quote(chr(198) + chr(199))
separadorrecno = chr(198) + chr(199)
separadorlocal2 = urllib.parse.quote(separadorlocal)
envoltorio = chr(245) + chr(246)
envoltorio2 = urllib.parse.quote(envoltorio)
programas = []
errorserver = 0
desfaseutc = [1]

eventos = []
tablaeventos = []
tablarelaciones = []
tblrelaciones = {}
iconoreglas = {}
iconocontrol = {}
interruptor  = {}

horaM = []
version ="2000"
hostIni = ["192.168.1.250"]

carpetaIconos = [""]
carpetaInicio = ["."]
HOST = None
portbase = [0]
port = [0]
localhost = [0]
clavesregistro = []  # Código clave de registro
registros = []  # registro completo
direccionenvios = []
direccionremite = []
numerosenvios = []
imagenes64 = {}
diadehoy = [datetime.datetime.now().strftime("%d/%m/%Y")]
diadehoyVE = [(datetime.datetime.now()-timedelta(2)).strftime("%Y-%m-%d"),(datetime.datetime.now()-timedelta(1)).strftime("%Y-%m-%d"),datetime.datetime.now().strftime("%Y-%m-%d"),(datetime.datetime.now()+timedelta(1)).strftime("%Y-%m-%d")]
carpetaInicio[0] = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
noencontrado="NE00000"
estadoconsulta=[0,0]
pilademails={}

tablas = {
    "clases": 0,
    "iconos": 0,
    "planos": 0,
    "generales": 0,
    "estados": 0,
    "programas": 0,
    "relaciones": 0,
    "dispositivos": 0,
}

cronoactivado = {}  # Indica el estado de un cronometro
# tiempocrono={"tiemposalvadodisco":15,"tiempoconsulta":30} # Es el tiempo absoluto del cronometro activo
tiempocrono = {}
# Son los tiempos de control de cada cronometro
tiempos = {}
varop = [0]
cargafiles = [0]
todos = urllib.parse.quote("?")
dispositivos = {}
tiempoactualizacionfalloluz = [0]
tiempoconsultaestadodsp = [60]
compruebaconexion = {}
cadenaIP = "xurlfavicon"
confirmaCliente = [0]

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

# *******************************************************************
def numtoken(cadena, separador):
    return len(cadena.split(separador))
# *******************************************************************
class Mail:

    def __init__(self):
        self.port = int(obtenvariable("port", 465))
        self.smtp_server_domain_name = obtenvariable("smtp_server_domain_name","smtp.gmail.com")
        self.sender_mail = obtenvariable("sender_mail","salvador.castello.c@gmail.com")
        self.password = obtenvariable("password","xeraco2000")

    def send(self, emails, subject, contenido):
        ssl_context = ssl.create_default_context()
        service = smtplib.SMTP_SSL(self.smtp_server_domain_name, self.port, context=ssl_context)
        service.login(self.sender_mail, self.password)
        
        for email in emails:
            service.sendmail(self.sender_mail, email, f'Subject: {subject}\n{contenido}')
        service.quit()
# *******************************************************************
def FiltraRegistros(tabx):
    r2 = registros.copy()
    taby = urllib.parse.quote(tabx)

    def sonRecnos(reg):
        return token(reg, 0, separadorcampo2) == taby

    totalicons = filter(sonRecnos, r2)
    if tabx == "programas":
        programas.clear()
    else:
        return
    for a1 in totalicons:
        b = urllib.parse.unquote(a1)
        if tabx == "programas":
            programas.append(b)


# *******************************************************************
def diccionario(tabla, case):
    if tabla == "clases":
        if case == "NombreClase":
            return 1
        elif case == "ImagenClase":
            return 5
        elif case == "FraseClase":
            return 6
        elif case == "formaClase":
            return 7
        elif case == "ultimo":
            return 8
        else:
            return -1
    elif tabla == "iconos":
        if case == "Icono":
            return 1
        elif case == "Plano":
            return 5
        elif case == "Nombre":
            return 6
        elif case == "yposi":
            return 7
        elif case == "xposi":
            return 8
        elif case == "Ubicacion":
            return 9
        elif case == "Imagen":
            return 10
        elif case == "formaicono1":
            return 11
        elif case == "Frase":
            return 12
        elif case == "Tipoeicono":
            return 13
        elif case == "Tiposicono":
            return 14
        elif case == "Clase":
            return 15
        elif case == "Enlace":
            return 16
        elif case == "informar":
            return 17
        elif case == "email":
            return 18
        elif case == "Eliminar":
            return 19
        elif case == "ultimo":
            return 20
        else:
            return -1
    elif tabla == "planos":
        if case == "Coddibujofondo":
            return 1
        elif case == "Nomdibujofondo":
            return 5
        elif case == "Dibujofondo":
            return 6
        elif case == "Ordendibujofondo":
            return 7
        elif case == "Eliminar":
            return 8
        elif case == "ultimo":
            return 9
        else:
            return -1
    elif tabla == "generales":
        if case == "General":
            return 1
        elif case == "Planoactivo":
            return 5
        elif case == "Tamanoicono":
            return 6
        elif case == "Incrementotamanoicono":
            return 7
        elif case == "opacidad":
            return 8
        elif case == "opacidadfondo0":
            return 9
        elif case == "anchofondo":
            return 10
        elif case == "altofondo":
            return 11
        elif case == "colortextobarra":
            return 12
        elif case == "colorfondobarra":
            return 13
        elif case == "dibujofondo0":
            return 14
        elif case == "opacidadfondo":
            return 15
        elif case == "ruta":
            return 16
        elif case == "ultimo":
            return 17
        else:
            return -1
    elif tabla == "estados":
        if case == "Icono":
            return 1
        elif case == "dispositivo":
            return 4  # CASO ESPECIAL
        elif case == "onoff":
            return 5
        elif case == "ultimo":
            return 6
        else:
            return -1
    elif tabla == "programas":
        if case == "Icono":
            return 1
        elif case == "tipodeconexion":
            return 5
        elif case == "horadeconexion":
            return 6
        elif case == "minutodeconexion":
            return 7
        elif case == "lunesdeconexion":
            return 8
        elif case == "martesdeconexion":
            return 9
        elif case == "miercolesdeconexion":
            return 10
        elif case == "juevesdeconexion":
            return 11
        elif case == "viernesdeconexion":
            return 12
        elif case == "sabadodeconexion":
            return 13
        elif case == "domingodeconexion":
            return 14
        elif case == "valoraccion":
            return 15
        elif case == "validadesde":
            return 16
        elif case == "validahasta":
            return 17
        elif case == "incluyedias":
            return 18
        elif case == "excluyedias":
            return 19
        elif case == "codigoprograma":
            return 20
        elif case == "HorasVEHasta":
            return 21
        elif case == "HorasVE":
            return 22
        elif case == "Eliminar":
            return 23
        elif case == "ultimo":
            return 24
        else:
            return -1
    elif tabla == "relaciones":
        if case == "Icono":
            return 1
        elif case == "codigorelacion":
            return 5
        elif case == "iconodispositivo":
            return 6
        elif case == "entradarel":
            return 7
        elif case == "accion":
            return 8
        elif case == "evento":
            return 9
        elif case == "retardo":
            return 10
        elif case == "valoref":
            return 11
        elif case == "factor":
            return 12
        elif case == "salida":
            return 13
        elif case == "valorefa":
            return 14
        elif case == "factora":
            return 15
        elif case == "codigounion":
            return 16
        elif case == "tmp":
            return 17
        elif case == "Eliminar":
            return 18
        elif case == "ultimo":
            return 19
        else:
            return -1
    elif tabla == "dispositivos":
        if case == "dispositivo":
            return 1
        elif case == "tipo":
            return 5
        elif case == "cpu":
            return 6
        elif case == "estado":
            return 7
        elif case == "paramdsp":
            return 8
        elif case == "Eliminar":
            return 9
        elif case == "ultimo":
            return 10
        else:
            return -1
    else:
        return -1


# *******************************************************************
def diccionarioINV(tabla, case):
    if case == 0:
        return "Tabla"
    elif case == 1:
        return "Id"
    elif case == 2:
        return "Estado"
    elif case == 3:
        return "Version"
    elif case == 4:
        return "Origen"
    if tabla == "clases":
        if case == 1:
            return "NombreClase"
        elif case == 5:
            return "ImagenClase"
        elif case == 6:
            return "FraseClase"
        elif case == 7:
            return "formaClase"
        elif case == 8:
            return "ultimo"
        else:
            return "ERN"
    elif tabla == "iconos":
        if case == 1:
            return "Icono"
        elif case == 5:
            return "Plano"
        elif case == 6:
            return "Nombre"
        elif case == 7:
            return "yposi"
        elif case == 8:
            return "xposi"
        elif case == 9:
            return "Ubicacion"
        elif case == 10:
            return "Imagen"
        elif case == 11:
            return "formaicono1"
        elif case == 12:
            return "Frase"
        elif case == 13:
            return "Tipoeicono"
        elif case == 14:
            return "Tiposicono"
        elif case == 15:
            return "Clase"
        elif case == 16:
            return "Enlace"
        elif case == 17:
            return "informar"
        elif case == 18:
            return "email"
        elif case == 19:
            return "Eliminar"
        elif case == 20:
            return "ultimo"
        else:
            return "ERN"
    elif tabla == "planos":
        if case == 1:
            return "Coddibujofondo"
        elif case == 5:
            return "Nomdibujofondo"
        elif case == 6:
            return "Dibujofondo"
        elif case == 7:
            return "Ordendibujofondo"
        elif case == 8:
            return "Eliminar"
        elif case == 9:
            return "ultimo"
        else:
            return "ERN"
    elif tabla == "generales":
        if case == 1:
            return "General"
        elif case == 5:
            return "Planoactivo"
        elif case == 6:
            return "Tamanoicono"
        elif case == 7:
            return "Incrementotamanoicono"
        elif case == 8:
            return "opacidad"
        elif case == 9:
            return "opacidadfondo0"
        elif case == 10:
            return "anchofondo"
        elif case == 11:
            return "altofondo"
        elif case == 12:
            return "colortextobarra"
        elif case == 13:
            return "colorfondobarra"
        elif case == 14:
            return "dibujofondo0"
        elif case == 15:
            return "opacidadfondo"
        elif case == 16:
            return "ruta"
        elif case == 17:
            return "ultimo"
        else:
            return "ERN"
    elif tabla == "estados":
        if case == 1:
            return "Icono"
        elif case == 4:
            return "dispositivo"  # CASO ESPECIAL
        elif case == 5:
            return "onoff"
        elif case == 6:
            return "ultimo"
        else:
            return "ERN"
    elif tabla == "programas":
        if case == 1:
            return "Icono"
        elif case == 5:
            return "tipodeconexion"
        elif case == 6:
            return "horadeconexion" # es hora de comienzo, bien de conexión o de intervalo de validación para VE
        elif case == 7:
            return "minutodeconexion"
        elif case == 8:
            return "lunesdeconexion"
        elif case == 9:
            return "martesdeconexion"
        elif case == 10:
            return "miercolesdeconexion"
        elif case == 11:
            return "juevesdeconexion"
        elif case == 12:
            return "viernesdeconexion"
        elif case == 13:
            return "sabadodeconexion"
        elif case == 14:
            return "domingodeconexion"
        elif case == 15:
            return "valoraccion"
        elif case == 16:
            return "validadesde"
        elif case == 17:
            return "validahasta"
        elif case == 18:
            return "incluyedias"
        elif case == 19:
            return "excluyedias"
        elif case == 20:
            return "codigoprograma"
        elif case == 21:
            return "HorasVEHasta"
        elif case == 22:
            return "HorasVE"
        elif case == 23:
            return "Eliminar"
        elif case == 24:
            return "ultimo"
        else:
            return "ERN"
    elif tabla == "relaciones":
        if case == 1:
            return "Icono"
        elif case == 5:
            return "codigorelacion"
        elif case == 6:
            return "iconodispositivo"
        elif case == 7:
            return "entradarel"
        elif case == 8:
            return "accion"
        elif case == 9:
            return "evento"
        elif case == 10:
            return "retardo"
        elif case == 11:
            return "valoref"
        elif case == 12:
            return "factor"
        elif case == 13:
            return "salida"
        elif case == 14:
            return "valorefa"
        elif case == 15:
            return "factora"
        elif case == 16:
            return "codigounion"
        elif case == 17:
            return "tmp"
        elif case == 18:
            return "Eliminar"
        elif case == 19:
            return "ultimo"
        else:
            return "ERN"
    elif tabla == "dispositivos":
        if case == 1:
            return "dispositivo"
        elif case == 5:
            return "tipo"
        elif case == 6:
            return "cpu"
        elif case == 7:
            return "estado"
        elif case == 8:
            return "paramdsp"
        elif case == 9:
            return "Eliminar"
        elif case == 10:
            return "ultimo"
        else:
            return "ERN"
    else:
        return "ERN"


# *******************************************************************
def regX2(dato, pos, accion="R", valor=""):

    # //estado=r=pendiente emitir R=recibido D=recibido y procesado E=emitido
    # //accion R=lectura, W= escritura

    if (dato == "") or (dato == "undefined"):
        return ""
    pos = str(pos)
    vector = dato.split(separadorcampo2)
    tabla = vector[0]
    if pos.isdigit():
        posicion = int(pos)
    else:
        posicion = diccionario(tabla, pos)
    if posicion<0:
        print("No existe la posición", pos,"de",tabla)
        return dato
    if accion == "R":
        try:
            v1 = vector[posicion]
            return v1
        except:
            print(
                "Error en regX2:" + accion + "**" + dato,
                "TABLA/POS: " + tabla + "***" + pos,
            )
            return ""
    if accion == "W":
        ultimo = diccionario(tabla, "ultimo")
        x = ""
        c = 0
        while c < ultimo:
            if c == posicion:
                n = valor
            else:
                try:
                    n = vector[c]
                except:
                    n = ""
            x = x + n + separadorcampo2
            c += 1
            if c == ultimo:
                x = x + "1" + separadorcampo2
        return x
    return ""


# *******************************************************************
def regX(dato, pos, accion="R", valor=""):
    if type("a") != type(dato):
        return ""
    if (dato == "") or (dato == "undefined") or dato == None:
        return ""
    pos = str(pos)
    vector = dato.split(separadorcampo)
    tabla = vector[0]
    if pos.isdigit():
        posicion = int(pos)
    else:
        posicion = diccionario(tabla, pos)
    if posicion<0:
        print("No existe la posición", pos,"de",tabla)
        return dato    
    if accion == "R":
        try:
            v1 = vector[posicion]
            return v1
        except:
            return ""
    #    datoX=regX(datoX,5,"W",cadmensaje[2])
    if accion == "W":
        ultimo = diccionario(tabla, "ultimo")
        x = ""
        c = 0
        while c < ultimo:
            if c == posicion:
                n = valor
            else:
                try:
                    n = vector[c]
                except:
                    n = ""
            x = x + n + separadorcampo
            c += 1
            if c == ultimo:
                x = x + "1" + separadorcampo
        return x


# *******************************************************************
def creacrono(crono, tmpo):
    if crono in tiempos:
        return
    tiempos[crono] = tmpo
    tiempocrono[crono] = 0.0
    cronoactivado[crono] = False
    return


# *******************************************************************
def consultacrono(crono):
    if cronoactivado[crono] == False:
        return 0
    t = time.localtime()
    return time.mktime(t) - tiempocrono[crono]


# *******************************************************************
def paracrono(crono):
    cronoactivado[crono] = False
    return


# *******************************************************************
def reiniciacrono(crono, tmpox=0):
    if tmpox > 0:
        tiempos[crono] = tmpox
    t = time.localtime()
    tiempocrono[crono] = time.mktime(t)
    cronoactivado[crono] = True
    return


# *******************************************************************
def yatoca(crono):
    if int(consultacrono(crono)) > int(tiempos[crono]):
        t = time.localtime()
        tiempocrono[crono] = time.mktime(t)
        return True
    else:
        return False

# *******************************************************************
def salvadatosendisco():
    paracrono("salvadatosendisco")
    # creatbl()
    zx1 = [
        "relaciones",
        "programas",
        "clases",
        "estados",
        "iconos",
        "planos",
        "generales",
        "dispositivos",
    ]
    if cargafiles[0] == 1:

        #creatbl()

        for zx in zx1:
            if tablas[zx] == 1:  # indica que esta tabla presenta cambios
                
                regdecode = urllib.parse.unquote(creatbl(zx))
                grabar=False
                if str(localhost[0]) in regdecode:
                    regdecode = regdecode.replace(str(localhost[0]) + ":" + str(portbase[0]), cadenaIP)
                vector = regdecode.split(separadorrecno)  # conjunto de registros
                data = {}
                regdt = {}
                for reg in vector:  # registro
                    regdt = {}
                    claveR = token(reg, 1, separadorcampo)
                    if len(claveR) < 1:continue
                    grabar=True
                    camporeg = reg.split(separadorcampo)  # conjunto de campos
                    nm = len(camporeg)
                    for n in range(nm):
                        nomcampo = diccionarioINV(zx, n)
                        if nomcampo=="ERN":continue
                        regdt[nomcampo] = camporeg[n]
                    data[claveR] = regdt
                data2 = []
                data2.insert(0, data)

                try:
                    if grabar:
                        with open(
                            os.path.join(carpetaInicio[0], zx) + ".json",
                            "w",
                            encoding="cp1252",
                        ) as jsonFile:
                            json.dump(data2, jsonFile, indent=4)
                            jsonFile.close()
                            tablas[zx] = 0
                    else:
                        print("No se ha grabado",zx)
                        tablas[zx] = 0 # BORRAR 
                except:
                    print("Error al escribir ", zx)

# *******************************************************************

def creatbl(tabl):  # cuando salva, se borran del array los borrados
    r2 = registros.copy()
    def sonRecnos(reg):
        return regX2(reg, 0) == tabl  
    if True:
        regtro = ""
        totalicons = filter(sonRecnos, r2)
        for a1 in totalicons:
            c=""
            if (diccionario(tabl, "Eliminar")>-1):c = regX2(a1, "Eliminar")
            if c == "1" or c == "2":
                zx1 = tabl  # Nombre tabla
                zx2 = regX2(a1, 1)  # Identificador del registro
                clavesregistro.remove(zx1 + zx2)
                registros.remove(a1)
                continue

            regtro = regtro + separadorrecno2 + a1
    return regtro

# *******************************************************************
def registradato(dato, destino=todos, remitente=todos, arranque=0):
    esprogr = False
    esestado = False
    esrelacion = False
    # esdispositivos = False
    try:
        if len(dato) < 2:
            return
        zx1 = regX2(dato, 0)

        # if (zx1=="dispositivos"):esdispositivos = True
        if zx1 == "estados":
            esestado = True
        if zx1 == "programas":
            esprogr = True
        if zx1 == "relaciones":
            esrelacion = True
        if not zx1 in [
            "relaciones",
            "programas",
            "clases",
            "estados",
            "iconos",
            "planos",
            "generales",
            "dispositivos",
        ]:
            return
        if not arranque:
            if esestado:
                reiniciacrono("salvadatosendisco", 3)
            elif zx1 == "dispositivos":
                reiniciacrono("salvadatosendisco", 3)
            else:
                reiniciacrono("salvadatosendisco", 0.1)
            tablas[zx1] = 1  # para salvar el fichero, saber que fichero salvar
        zx2 = regX2(dato, 1)
        if zx1 == "" or zx2 == "":
            return
        zx = zx1 + zx2
    except:
        return
    varop[0] += 1
    try:
        dest = direccionenvios.index(destino + separadorcampo2 + zx)
        numerosenvios[dest] = varop[0]
        direccionremite[dest] = remitente
    except:
        direccionenvios.insert(0, destino + separadorcampo2 + zx)
        direccionremite.insert(0, remitente)
        numerosenvios.insert(0, varop[0])
    try:
        esta = clavesregistro.index(zx)
        registros[esta] = dato
    except:
        clavesregistro.insert(0, zx)
        registros.insert(0, dato)
    ultimo = len(direccionenvios)
    a1 = 2 * len(registros)
    borrar = 0
    while ultimo > a1:
        ultimo -= 1
        # borrar = numerosenvios.index(copianumeros.pop(0))
        direccionenvios.pop(borrar)
        direccionremite.pop(borrar)
        numerosenvios.pop(borrar)
    if esrelacion:
        cargarelacion(dato)
    if cargafiles[0] == 1: # después de cargar los ficheros de datos y cada vez que se actualualiza un programa se realiza este proceso
        if esprogr:
            FiltraRegistros("programas")
            def ordenaprograma(prog):
                return regX(prog, "tipodeconexion")
            programas.sort(key=ordenaprograma)
            obteneventospr(dato)
        if esestado:
            obtenrelacionespr(dato)
            obtenrelacionespr2(dato)
            despiertasiempreque(dato)
            registrastdenfile(dato)
        # if not esestado :tiempos["tiemposalvadodisco"]=5
    return
# *******************************************************************
def enviapaquetemail(cadena="",email=""):
    if (cadena==""): 
        paracrono("emitemail")

        # ***** ENVIA MENSAJE
        for mensaje in pilademails:
            enviamensaje(mensaje,pilademails[mensaje])
        pilademails.clear()
        return
    else: 
        try:
            emails=pilademails[email]
        except:
            emails=[]
        emails.append(cadena)
        pilademails[email]=emails
        reiniciacrono("emitemail")

# ******************************************************************* 
def limpiacadena(cadena):
    cadena=cadena.replace("á","a")
    cadena=cadena.replace("é","e")
    cadena=cadena.replace("í","i")
    cadena=cadena.replace("ó","o")
    cadena=cadena.replace("ú","u")
    cadena=cadena.replace("Á","A")
    cadena=cadena.replace("É","E")
    cadena=cadena.replace("Í","I")
    cadena=cadena.replace("Ó","O")
    cadena=cadena.replace("Ú","U")
    for caracter in cadena:
        if ord(caracter) in range(40,58):continue
        if ord(caracter) in range(65,91):continue
        if ord(caracter) in range(97,123):continue
        if ord(caracter)==32:continue
        if ord(caracter)==92:continue
        if caracter=="\n":continue
        cadena=cadena.replace(caracter,"-")
    return cadena

# ******************************************************************* 
def enviamensaje(email,mensaje):
    mails = (email).split()
    subject = ("Avisos de cambios de estado DOMOCAS ")
    content =""
    for msj in mensaje:
        content =content+msj
    
    content1=limpiacadena(content)
    try:
        mail = Mail()
        mail.send(mails, subject, content1)
        print(email,content1)
    except:
        print("Error enviando correo ****")
    
# *******************************************************************
def registrastdenfile(dato):
    tr=dato.split(separadorcampo2)
    cadena=str(datetime.datetime.now())+" "+tr[1]+" "+tr[4]+" "+tr[5]+"\n"
    if(tr[4]=="web"):
        Regicono = urllib.parse.unquote(ObtenRegistro("iconos", tr[1]))
        informar=regX(Regicono,"informar") 
        if(informar=="1"):
            email=regX(Regicono,"email")
            tr2=Regicono.split(separadorcampo)
            cadena2="Fecha y hora "+ str(datetime.datetime.now())[0:19]+" codigo "+tr2[1]+" nombre "+tr2[6]+" valor "+tr[5]+"\n"
            print(cadena2)
            if(email==""):
                email=consultaVariable("email")
                if(email!=""):
                    enviapaquetemail(cadena2,email)
            else:
                enviapaquetemail(cadena2,email)
    try:
        with open(
            os.path.join(carpetaInicio[0], "eventos.txt"),
                "a",
                encoding="cp1252",
                errors="ignore",
            ) as f:
                f.write(str(cadena))
                f.close()
        return
    except:
        return
# *******************************************************************
def despiertasiempreque(datoC): # activa los destinos de un interruptor
    # NOTA: ESTE PROCESO PUEDE ENTRAR EN UN BUCLE SIN FIN SI EL INTERRUPTOR SE LLAMA A SI MISMO O ENTRA EN 
    # UN PROCESO CICLICO
    dato = urllib.parse.unquote(datoC)
    if dato == "":
        return
    codicono_origen = regX(dato, 1) # identificador del icono
    if codicono_origen == "":
        return
    if codicono_origen in interruptor:
        if not interruptor[codicono_origen]:return
        # es inerruptor este icono. Ahora obtengo las reglas asociadas a través de iconoreglas{}
        reglas = iconoreglas[codicono_origen].split(separadorlocalX)
        for regla in reglas: # por cada regla con el mismo origen, se ejecuta con el retardo correspondiente
            if regla=="":continue
            t = int(float(regX(regla,"retardo"))) #obtiene retardo
            destino = token(regX(regla,1),0,separadorlocal)
            Regicono = ObtenRegistro("estados", destino)
            if Regicono:
                if t==0:ejecutaRegistro(Regicono)
                else:
                    reiniciacrono("Interruptor9999"+destino,t)
                    print("REGISTRA TIEMPO INICIAL --- 0",t,time.time())
                   
# *******************************************************************
def consultaestadointerruptores():
    for tmp in tiempocrono:
        if cronoactivado[tmp]:destino=token(tmp,1,"Interruptor9999")
        else:continue
        if destino == "":continue
        elif yatoca(tmp):
            cronoactivado[tmp]=False
            Regicono = ObtenRegistro("estados", destino)
            ejecutaRegistro(Regicono)

# *******************************************************************
def ejecutaRegistro(icono):
    registradato(icono)
    print("REGISTRA TIEMPO EJECUCION **** 2",time.time(),urllib.parse.unquote(icono))
# *******************************************************************
def cargarelacion(datoC):  # relacion.. REGLA NUEVA PARA PROCESAR. Se procesan reglas
    dato = urllib.parse.unquote(datoC)
    if dato == "":
        return
    codicono_destino = regX(dato, 1) # identificador de la regla, compuesto por id del icono destino,
    # el que se selecciona más el id de la regla.
    if codicono_destino == "":
        return
    codicono = token(codicono_destino, 0, separadorlocal)  # icono destino de la regla
    if codicono == "":
        return
    accion = regX(dato, "accion")
    codicono_origen = regX(dato, "iconodispositivo") # es el icono que provoca la acción
    if codicono_origen == "":
        return
    borrar = regX(dato, "Eliminar")
    nre = token(codicono_destino, 1, separadorlocal)
    clave_origen = codicono_origen + separadorlocal + nre # formada por el icono que provoca la 
    # acción y el id de la regla ya que icono puede activar varias reglas, necesito conocer las claves 
    # de las reglas que se activan.
    try:
        reglas = iconoreglas[codicono_origen] # se agrupan las reglas que tienen el mismo icono origen
        iconoreglas[codicono_origen] = ""
        c = 0
        nreglas = numtoken(reglas, separadorlocalX)
        while c < nreglas:
            rgla = token(reglas, c, separadorlocalX)
            regs = rgla
            c += 1
            if regX(rgla, 1) == codicono_destino:
                if borrar == "1" or borrar == "2":
                    continue
                regs = dato
            if regs != "":
                try:
                    rg = iconoreglas[codicono_origen]
                    rg.index(regX(regs, 1))
                except:
                    iconoreglas[codicono_origen] = (
                        iconoreglas[codicono_origen] + regs + separadorlocalX
                    )
        try:
            rg = iconoreglas[codicono_origen]
            rg.index(regX(dato, 1))
        except:
            iconoreglas[codicono_origen] = (
                iconoreglas[codicono_origen] + dato + separadorlocalX
            )
    except:
        iconoreglas[codicono_origen] = dato + separadorlocalX
    reglas = iconoreglas[codicono_origen]


    if accion == "1" and (borrar != "1" and borrar != "2"): 
        # recibo una regla con el caso "siempre que" y además no está borrada
        try:
            icoctr = iconocontrol[codicono] # en cada destino, se obtienen todos los orígenes que 
            # provocan la acción. Primero se comprueba si existe en el diccionario alguna regla asociada a 
            # el icono destino: codicono. Si no hay ninguna, se agrega al diccionario la primera.
            try:
                icoctr.index(clave_origen)
            except:
                iconocontrol[codicono] = icoctr + separadorlocalX + clave_origen 
                # en este punto se ha añadido un nuevo elemento al icono destino con el nuevo origen
        except:
            iconocontrol[codicono] = clave_origen
        return

    elif accion == "2" and (borrar != "1" and borrar != "2"): 
        try:
            icoctr = interruptor[codicono_origen] # en cada origen, se obtienen todos los destinos que 
            # asociados a la acción. Primero se comprueba si existe en el diccionario alguna regla asociada a 
            # el icono origen: codicono_origen. Si no hay ninguna, se agrega al diccionario la primera.
            try:
                icoctr.index(codicono_origen)
            except:
                interruptor[codicono_origen] = icoctr + separadorlocalX + codicono 
                # en este punto se ha añadido un nuevo elemento al icono destino con el nuevo origen
        except:
            interruptor[codicono_origen] = codicono
        return

    elif accion == "2": 
        try:
            icoctr = interruptor[codicono_origen]
            numreglas = numtoken(icoctr, separadorlocalX)
            c = 0
            art = ""
            while c < numreglas:
                ar = token(icoctr, c, separadorlocalX)
                c += 1
                if clave_origen != ar and ar != "":
                    art = art + ar + separadorlocalX
                else:
                    continue
            interruptor[codicono_origen] = art
            if art == "":
                interruptor.pop(codicono)
        except:
            pass
        return 

    else:
        try:
            icoctr = iconocontrol[codicono]
            numreglas = numtoken(icoctr, separadorlocalX)
            c = 0
            art = ""
            while c < numreglas:
                ar = token(icoctr, c, separadorlocalX)
                c += 1
                if clave_origen != ar and ar != "":
                    art = art + ar + separadorlocalX
                else:
                    continue
            iconocontrol[codicono] = art
            if art == "":
                iconocontrol.pop(codicono)
        except:
            pass
        return


# *******************************************************************
def obtenrelacionespr(datoC):  # estado para cualquier condición
    dato = urllib.parse.unquote(datoC)
    t = time.localtime()
    horak = int(time.mktime(t))
    icon = regX(dato, 1)  # código de icono de entrada, icono origen de la regla
    try:
        reglas = iconoreglas[icon] # reglas asociadas a un icono origen
        nreglas = numtoken(reglas, separadorlocalX)
        c = 0
        while c < nreglas:
            regla = token(reglas, c, separadorlocalX)
            c += 1
            accionX = verificacondicionesrelacion(regla, regX(dato, "onoff"))
            if token(accionX, 1, separadorlocal) == "0":
                continue
            valor_accion = token(accionX, 0, separadorlocal)
            if valor_accion == "":
                continue
            tiempo_accion = horak + int(float(regX(regla, "retardo")))
            ic2 = regX(regla, 1)
            icono_salida = token(
                ic2, 0, separadorlocal
            )  # icono regla sobre el que recae la acción
            codigounion = regX(regla, "codigounion")
            tbr = (
                codigounion
                + separadorlocal
                + icono_salida
                + separadorlocal
                + str(tiempo_accion)
                + separadorlocal
                + str(valor_accion)
            )
            try:
                tablarelaciones.index(ic2)
            except:
                tablarelaciones.insert(0, ic2)
            tblrelaciones[ic2] = tbr
            ordenatablarelacion()
        return
    except:
        return
    return

# *****************************************************************
def obtenrelacionespr2(
    estado,
):  
    # Se analiza aqui los estados del icono destino para verifiacr la condición de
    # "siempre que"
    # estados para la condición "siempre que", continuacción de obtenrelacionespr
    # estado = estado del icono destino que ha cambiado
    # se ha de comprobar que el cambio del icono origen afecta a los iconos destinos debido a las reglas definidas.
    datoX = urllib.parse.unquote(estado)
    icon = regX(datoX, 1)  # código de icono de destino
    try:
        reglas = iconocontrol[icon]  # Iconos de reglas asocidas al icono destino
    except:
        return
    try:
        nreglas = numtoken(reglas, separadorlocalX)
        c = 0
        while c < nreglas:
            try:
                id_id_regla = token(
                    token(reglas, c, separadorlocalX), 1, separadorlocal
                )
                id_regla = icon + separadorlocal + id_id_regla

                esta = clavesregistro.index(
                    urllib.parse.quote("relaciones" + id_regla)
                )  # otengo el estado de ORIGENES
                regla = urllib.parse.unquote(registros[esta])
            except:
                c += 1
                continue
            c += 1
            event = "estados" + regX(regla, "iconodispositivo")
            try:
                esta = clavesregistro.index(event)  # otengo el estado de ORIGENES
                dato = urllib.parse.unquote(registros[esta])
            except:
                continue
            accionX = verificacondicionesrelacion(regla, regX(dato, "onoff"))
            if token(accionX, 1, separadorlocal) == "0":
                continue
            valor_accion = token(accionX, 0, separadorlocal)
            if valor_accion == "":
                continue
            codigounion = regX(regla, "codigounion")
            t = time.localtime()
            tiempo_accion = int(
                time.mktime(t)
            )  # La primera acción tiene en cuenta el tiempo. Las posteriores no.
            tbr = (
                codigounion
                + separadorlocal
                + icon
                + separadorlocal
                + str(tiempo_accion)
                + separadorlocal
                + str(valor_accion)
            )
            try:
                esta = tablarelaciones.index(id_regla)
                continue
            except:
                if str(valor_accion) != str(regX(datoX, "onoff")):
                    tablarelaciones.insert(0, id_regla)
                    tblrelaciones[id_regla] = tbr
                    ordenatablarelacion()
                else:
                    continue
    except:
        return
    return

# *****************************************************************
def ordenatablarelacion(): # ordena los iconos de la tabla en orden de ejecución temporal.
    def fechahora(a5):
        tbr = tblrelaciones[a5]
        return token(tbr, 2, separadorlocal)

    tablarelaciones.sort(key=fechahora)


# *******************************************************************
def cargaficheros():
    if cargafiles[0] == 0:

        zx1 = [
            "generales",
            "clases",
            "planos",
            "iconos",
            "dispositivos",
            "estados",
            "programas",
            "relaciones",
        ]
        for zx in zx1:
            try:
                with open(
                    os.path.join(carpetaInicio[0], zx) + ".json",
                    "r",
                    encoding="cp1252",
                    errors="ignore",
                ) as f:
                    vectores = json.load(f)
                    f.close()
                    for dt in vectores[0]:
                        regtros = convierteJsonData(vectores[0][dt])
                        if cadenaIP in regtros:
                            regtros = regtros.replace(
                                cadenaIP, str(localhost[0]) + ":" + str(portbase[0])
                            )
                        registradato(regtros, todos, todos, 1)
                        if zx == "generales":
                            regtros = regX2(
                                regtros,
                                "ruta",
                                "W",
                                urllib.parse.quote(
                                    "http://"
                                    + str(localhost[0])
                                    + ":"
                                    + os.path.join(str(portbase[0]), carpetaInicio[0])
                                ),
                            )
                            registradato(regtros, todos, todos, 1)
            except:
                print("Error al abrir lectura ", zx)
        FiltraRegistros("programas")
        def ordenaprograma(prog):
            return regX(prog, "tipodeconexion")
        programas.sort(key=ordenaprograma)
        obteneventospr()
        cargafiles[0] = 1

# *****************************************************************
def convierteJsonData(reg):
    if 1:
        tabla = reg["Tabla"]
        idx = reg["Id"]
        Estado = reg["Estado"]
        Version = reg["Version"]
        Origen = reg["Origen"]
        dato1 = (
            tabla
            + separadorcampo
            + idx
            + separadorcampo
            + Estado
            + separadorcampo
            + Version
            + separadorcampo
            + Origen
            + separadorcampo
        )
        dato = urllib.parse.quote(dato1)
        for etiqueta in reg:
            valor = urllib.parse.quote(reg[etiqueta])
            if etiqueta in ["Tabla", "Id", "Estado", "Version", "Origen"]:
                continue
            dato = regX2(dato, etiqueta, "W", valor)
    return dato

# *******************************************************************
def eventosaccion():
    fh = datetime.datetime.now()
    horak = (
        int(fh.strftime("%H")) * 3600
        + int(fh.strftime("%M")) * 60
        + int(fh.strftime("%S"))
    )
    for a4 in tablaeventos:
        horaf = int(float(token(a4, 3, separadorlocal)))
        if horaf <= horak:
            borrar = tablaeventos.index(a4)
            tablaeventos.pop(borrar)
            icono = token(a4, 2, separadorlocal)
            b = (
                "estados"
                + separadorcampo
                + icono
                + separadorcampo
                + "E"
                + separadorcampo
                + version
                + separadorcampo
                + "web"
                + separadorcampo
                + token(a4, 4, separadorlocal)
                + separadorcampo
                + "1"
                + separadorcampo
            )
            c = urllib.parse.quote(b)
            registradato(c)
            generanuevasconsultas(c, todos, urllib.parse.quote(icono))
        else:
            break

# *****************************************************************
def evaluauniones(relacion, numax):
    rgla = token(relacion, -1, "-")
    icno = token(relacion, 0, "-" + rgla)
    regrelacion = ObtenRegistroRelacion(rgla)

    if regrelacion == "":
        return "0"
    try:
        regestado = urllib.parse.unquote(ObtenRegistro("estados", icno))
    except:
        return "0"

    onoff = regX(regestado, "onoff")

    if onoff.isnumeric():
        ignora = verificacondicionesrelunion(regrelacion, onoff)
    else:
        return "0"

    if ignora == "0":
        return "0"
    union = regX(regrelacion, "codigounion")

    if union != "SIN unión":
        if numax <= 0:
            return "0"
        ignora = evaluauniones(union, numax - 1)
        if ignora == "1":
            return "0"
    return "1"


# *****************************************************************
def relacionesaccion():
    t = time.localtime()
    horak = int(time.mktime(t))
    for x in tablarelaciones:
        borrar = tablarelaciones.index(x)
        a0 = tblrelaciones[x]
        horaf = int(float(token(a0, 2, separadorlocal)))

        if horaf <= horak:
            tblrelaciones.pop(x)
            tablarelaciones.pop(borrar)
            icono = token(a0, 1, separadorlocal)
            valor_acc = token(a0, 3, separadorlocal)
            relacion = token(a0, 0, separadorlocal)
            if relacion != "SIN unión":
                ignora = evaluauniones(relacion, 3)
                if ignora == "1":
                    continue
            # funcion: obtener la regla- ver si tiene union- obtener REGLA DE union. con la regla de unión ver si no anula la regla actual
            if valor_acc != "N":  # no se ejecuta nada si es una regla de condición
                b = (
                    "estados"
                    + separadorcampo
                    + icono
                    + separadorcampo
                    + "E"
                    + separadorcampo
                    + version
                    + separadorcampo
                    + "web"
                    + separadorcampo
                    + valor_acc
                    + separadorcampo
                    + "1"
                    + separadorcampo
                )
                c = urllib.parse.quote(b)
                registradato(c)
                generanuevasconsultas(c, todos, urllib.parse.quote(icono))
        else:
            return
            # continue # poner return ordenando eventos . No funcionara en el caso 1 de accion VER


# *****************************************************************
def ObtenRegistro(tabla, clave):
    zx = tabla + clave
    try:
        esta = clavesregistro.index(zx)
        return registros[esta]
    except:
        return ""

# *****************************************************************
def ObtenRegistroRelacion(clave):
    r2 = registros.copy()
    tablaX = urllib.parse.quote("relaciones")
    claveX = urllib.parse.quote(clave)

    def sonRecnosX(reg):
        return (token(reg, 0, separadorcampo2) == tablaX) and (
            token(token(reg, 1, separadorcampo2), 1, separadorlocal2) == claveX
        )

    encontrados = filter(sonRecnosX, r2)
    for a6 in encontrados:
        try:
            return urllib.parse.unquote(a6)
        except:
            return ""

# *****************************************************************
def verificacondicionesrelacion(dato, valorentr):
    if dato == "":
        return separadorlocal + "0"
    evento = regX(dato, "evento")
    valoref = regX(dato, "valoref")
    factor1 = regX(dato, "factor")
    if factor1.isnumeric():
        factor = float(factor1)
    else:
        factor = 1
    if factor == 0:
        factor = 1
    salida = regX(dato, "salida")
    if evento == "0":
        if float(valorentr) < 0.5:
            return separadorlocal + "0"
    elif evento == "1":
        if float(valorentr) >= 0.5:
            return separadorlocal + "0"
    elif evento == "2":
        if (float(valoref) * factor / 100) > float(valorentr):
            return separadorlocal + "0"
    elif evento == "3":
        if (float(valoref) * factor / 100) < float(valorentr):
            return separadorlocal + "0"
    elif evento == "4":
        # // REVISAR
        # a9=0
        pass
    elif evento == "5":
        return separadorlocal + "0"
    else:
        return separadorlocal + "0"

    if salida == "0":
        return "1" + separadorlocal + "1"
    elif salida == "1":
        return "0" + separadorlocal + "1"
    elif salida == "2":
        return str(valorentr) + separadorlocal + "1"
    elif salida == "3":
        factor1 = regX(dato, "factora")
        valoref = regX(dato, "valorefa")
        if factor1.isnumeric():
            factor = float(factor1)
        if factor == 0:
            factor = 1

        return str(float(valoref) * factor / 100) + separadorlocal + "1"

    elif salida == "4":
        return "N" + separadorlocal + "1"
    else:
        return separadorlocal + "0"


# *****************************************************************
def verificacondicionesrelunion(dato, valorentr):
    if dato == "":
        return "0"
    evento = regX(dato, "evento")
    valoref = regX(dato, "valoref")
    factor1 = regX(dato, "factor")
    if factor1.isnumeric():
        factor = float(factor1)
    else:
        factor = 1
    if factor == 0:
        factor = 1
    if evento == "0":
        if float(valorentr) < 0.5:
            return "0"
    elif evento == "1":
        if float(valorentr) >= 0.5:
            return "0"
    elif evento == "2":
        if (float(valoref) * factor / 100) > float(valorentr):
            return "0"
    elif evento == "3":
        if (float(valoref) * factor / 100) < float(valorentr):
            return "0"
    elif evento == "4":
        if float(valoref) == float(valorentr):
            return "0"
    elif evento == "5":
        return "0"
    else:
        return "0"
    return "1"


# *****************************************************************
def obteneventospr(dato=""):
    
    icn=token(regX2(dato, 1),0,separadorlocal2)
    fh = datetime.datetime.now()
    horak = (
        int(float(fh.strftime("%H"))) * 3600
        + int(float(fh.strftime("%M"))) * 60
        + int(float(fh.strftime("%S")))
    )  # tiempo actual en segundos
    if icn=="":tablaeventos.clear()
    else:
        while 1:
            continuar = 0
            for evento in tablaeventos:
                if token(evento, 2, separadorlocal)==icn:
                    tablaeventos.remove(evento)
                    continuar = 1
                    break
            if not continuar :break
    
    for a0 in programas:
        if a0 == "" or a0 == None:
            continue
        icono = token(regX(a0, 1), 0, separadorlocal)
        if  icn!=icono and icn!="":continue
        if estaenfecha(fh, a0):  # el registro a0 es de hoy. Ahora se procesa la hora
            tabla = regX(a0, 0)  # 0 
            clave = regX(a0, "codigoprograma")  # 1
            #icono = token(regX(a0, 1), 0, separadorlocal)  # 2
            hora = regX(a0, "horadeconexion")
            minutos = regX(a0, "minutodeconexion")
            reg0 = tabla + separadorlocal + clave + separadorlocal + icono + separadorlocal
            if not (
                (hora.isnumeric() or hora == "")
                and (minutos.isnumeric() or minutos == "")
            ):
                continue
            if hora == "":
                hora = 0
            if minutos == "":
                minutos = 0
            horaf = int(float(hora)) * 3600 + int(float(minutos)) * 60  # 3
            accion = regX(a0, "valoraccion")  # 4
            caso = regX(a0, "tipodeconexion")
            if caso == "2":
                horaf = amanecer(hora, minutos)
            if caso == "3":
                horaf = atardecer(hora, minutos)
            if caso != "4":
                if horaf < horak:
                    continue  # ya ha pasado el evento
                reg1 = reg0 + str(horaf) + separadorlocal + str(float(accion) / 100)
                tablaeventos.insert(0, reg1)
            if caso == "4":
                # obtener los puntos de arranque y parada e incluirlos en tablaevento
                print("CASO 4  de obteneventos()")
                generapuntosVEeneventos(a0)
                continue

    if len(tablaeventos) > 1:
        tablaeventos.sort(key=obentiempo)
    return
# ******************************************************************
def obentiempo(e): 
    tmp = token(e, 3, separadorlocal)  # obtener el tiempo
    return int(float(tmp)) # devuelve esl tiempo en segundos
# ******************************************************************
def obtentblVE(): # obtiene la tabla de valores de hoy, ayer y si puede mañana y las guarda en el fichero de configuración
    fecha_dt=[obtenvariable("DIATARIFAShoy", "2000-01-01")]
    horadeactualizatx=obtenvariable("horadeactualizacion", "21:05")
    trozoshora = horadeactualizatx.split(":")
    horadeactualiza=int(float(trozoshora[0]))+int(float(trozoshora[1]))/60
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
                actualizaConfiguracion("DIATARIFAShoy",diadehoyVE[2])
                ##################************************
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
    try:tblExcel = url_get_contents(urltbl)
    except:
        print("En actualizaVBE no he podido abrir la URL de ",urltbl)
        return False
    try:
        if len(tblExcel)<1000:return False # no está la publicación todavía
    except:return False   
    archivo=tabla+".xls"

    try:open(archivo, 'wb').write(tblExcel)
    except:
        print("En actualizaVBE no he podido abrir ",archivo)
        return False

    try:wb = xlrd.open_workbook(archivo)
    except:
        print("En actualizaVBE no he podido abrir el libro de excel ",archivo)
        return False
    try:sheet = wb.sheet_by_index(0)
    except:
        print("En actualizaVBE no he podido abrir la hoja del libro de excel ",archivo)
        return False

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

def actualizaConfiguracion(variable,valor):
    Xconfiguracion[variable]=valor
    actualizaXconfiguracion(False)
# ******************************************************************
def url_get_contents(url): 
    req = urllib.request.Request(url=url) 
    f = urllib.request.urlopen(req) 
    return f.read() 
# *************************************************
def generapuntosVEeneventos(a0):
    tablahorasHoy=obtentblVE()
    if len(tablahorasHoy)!=24:
        print("La tabla horaria VE tiene este tamaño ",len(tablahorasHoy),"distinto de 24 horas ...ERROR",tablahorasHoy)
        if len(tablahorasHoy)==23:
            tablahorasHoy.append(tablahorasHoy[22])
        else:return
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
    horaInicio = int(float(tp))
    if not(horaInicio >=0 and horaInicio <24):
        print("La horaInicio de conexión horadeconexion",horaInicio,"fuera de rango (0..23) ...ERROR")
        return

    tp=regX(a0,"HorasVEHasta")
    if tp=="":return
    HorasVEHasta=int(float(tp))

    if not(HorasVEHasta >=0 and HorasVEHasta <=24):
        print("La final de conexión HorasVEHasta",HorasVEHasta,"fuera de rango (0..23) ...ERROR")
        return 

    tp=regX(a0,"HorasVE")
    if tp=="":return
    HorasVE = int(float(tp))
    
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
            tabAyer[i]=int(float(tabAyer[i]*10000))/10000
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
    punT=[0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3]
    if len(tablaeventos) > 1:
        tablaeventos.sort(key=obentiempo)

    # el primer evento, es poner tablaeventos a este valor, no sin antes borrar el valor en 
    # esa hora justa que pueda tener de otras programaciones.
    tablaeventosborrar=[]
    for evento in tablaeventos: # depuracion de eventos en la tabla. Asegura que no hay mas de un evento en cada hora
        #ic2=regX(evento, 1)
        #ic=token(regX(evento, 1), 0, separadorlocal)
        ic=token(evento, 2, separadorlocal)
        if icono!=ic:continue # ha de ser del mismo icono
        ho=obentiempo(evento)
        
        if int(ho%3600) ==0:
            if int(ho/3600)<24:
                '''if horahora==int(ho/3600): # es la hora actual y hay un evento en esa hora.. se borra pues se ha de sustutuir por el valor nuevo
                    #tablaeventos.remove(evento)
                    tablaeventosborrar.append(evento)
                    continue'''
                if pun1[int(ho/3600)]: # esto quiere decir que en el mismo instante tengo 2 o más eventos, borro los siguientes
                    #tablaeventos.remove(evento)
                    tablaeventosborrar.append(evento)
                else:
                    pun0[int(ho/3600)]=evento   # guarda el evento en este array-> verifica que no hay mas de uno en una hora dada
                    pun1[int(ho/3600)]=2        # indica que hay un evento de donde sea en este icono
    
    # en cuaquier caso, pun0 y pun1 indican eventos ajenos a 
    
    for evento in tablaeventosborrar:
        tablaeventos.remove(evento)

    reg0 = tabla + separadorlocal + clave + separadorlocal + icono + separadorlocal
    reg1 = reg0 + str(horahora*3600) + separadorlocal + str(tablencendidos[horahora])
    if tablencendidos[horahora]:
        pun2[horahora]=8
    else:
        pun2[horahora]=6
        
    if not pun1[horahora]:
        tablaeventos.append(reg1) # en la hora actual. Comienzo en la hora actual con un encendido o apagado del icono
    for k in range(horahora+1,24): # en las horas siguientes, registro los cambios
        pun2[k]=7
        if tablencendidos[k]!=tablencendidos[k-1]:
            if pun1[k]:continue
            reg1 = reg0 + str(k*3600) + separadorlocal + str(tablencendidos[k])
            tablaeventos.append(reg1)
            if tablencendidos[k]:
                pun2[k]=6
            else:
                pun2[k]=8
    print("ICONO              ",icono)
    print("EVENTOS            ",pun1)
    print("Encendido2/Apagado3",pun2)
    print("Tabla de encendidos",tablencendidos)
    print("Horario            ",punT)
  
    return
# *************************************************  
def ordenaeventos(a9):
    h = token(a9, 3, separadorlocal)
    if h == "":
        h = 0
    hora = float(h)
    return hora
# ******************************************************************
def amatardece(coordenadas, date):
    obs = ephem.Observer()
    obs.date = ephem.Date(date)
    long = coordenadas[0]
    lat = coordenadas[1]
    obs.long = ephem.degrees(long)
    obs.lat = ephem.degrees(lat)
    sun = ephem.Sun(obs)
    amanece = obs.next_rising(sun)
    atardece = obs.next_setting(sun)
    Ta = ephem.Date(amanece)
    Tt = ephem.Date(atardece)
    (y, mn, d, ha, mina, s) = Ta.tuple()
    (y, mn, d, ht, mint, s) = Tt.tuple()
    if 0:
        print(y, mn, d, ha, mina, s)
    return [[ha + int(float(desfaseutc[0])), mina], [ht + int(float(desfaseutc[0])), mint]]

# ******************************************************************
def amanecer(hora, minutos):  # poner la funcion correcta
    date = datetime.datetime.now()
    amce = amatardece(utc, date)[0]
    return (int(float(amce[0])) + int(float(hora))) * 3600 + (int(float(amce[1])) + int(float(minutos))) * 60

# ******************************************************************
def atardecer(hora, minutos):  # poner la funcion correcta
    date = datetime.datetime.now()
    amce = amatardece(utc, date)[1]
    return (int(float(amce[0])) + int(float(hora))) * 3600 + (int(float(amce[1])) + int(float(minutos))) * 60

# ******************************************************************
def estaenfecha(fecha, regno):
    if regX(regno, "Eliminar") == "1":
        return False

    excluyedias = regX(regno, "excluyedias")
    az = numtoken(excluyedias, separadorlocal)
    car = "/"
    if excluyedias.find("/") == -1:
        car = "-"
    c = 0
    while c < az:
        f = token(excluyedias, c, separadorlocal)
        c += 1
        if f == "":
            continue
        ano = int(float(token(f, 0, car)))
        mes = int(float(token(f, 1, car)))
        dia = int(float(token(f, 2, car)))
        if dia > 100:
            ss = ano
            ano = dia
            dia = ss
        if datetime.datetime(ano, mes, dia).strftime("%x") == fecha.strftime("%x"):
            return False

    incluyedias = regX(regno, "incluyedias")
    az = numtoken(incluyedias, separadorlocal)
    car = "/"
    if incluyedias.find("/") == -1:
        car = "-"
    c = 0

    while c < az:
        c += 1
        f = token(incluyedias, c, separadorlocal)
        if f == "":
            continue
        ano = int(float(token(f, 0, car)))
        mes = int(float(token(f, 1, car)))
        dia = int(float(token(f, 2, car)))
        if dia > 100:
            ss = ano
            ano = dia
            dia = ss
        if datetime.datetime(ano, mes, dia).strftime("%x") == fecha.strftime("%x"):
            return True

    validadesde = regX(regno, "validadesde")
    validahasta = regX(regno, "validahasta")
    L = regX(regno, "lunesdeconexion")
    M = regX(regno, "martesdeconexion")
    X = regX(regno, "miercolesdeconexion")
    J = regX(regno, "juevesdeconexion")
    V = regX(regno, "viernesdeconexion")
    S = regX(regno, "sabadodeconexion")
    D = regX(regno, "domingodeconexion")
    diasdeconexion = [D, L, M, X, J, V, S]

    f = validahasta
    car = "/"
    if f.find("/") == -1:
        car = "-"
    if True:
        if f != "":
            ano = int(float(token(f, 0, car)))
            mes = int(float(token(f, 1, car)))
            dia = int(float(token(f, 2, car)))
            if dia > 100:
                ss = ano
                ano = dia
                dia = ss
            if int(float(fecha.strftime("%Y"))) > ano:
                return False
            if int(float(fecha.strftime("%Y")))== ano:
                if int(float(fecha.strftime("%j"))) > int(float(
                    datetime.datetime(ano, mes, dia).strftime("%j"))
                ):
                    return False
    f = validadesde
    car = "/"
    if f.find("/") == -1:
        car = "-"
    if True:
        if f != "":
            ano = int(float(token(f, 0, car)))
            mes = int(float(token(f, 1, car)))
            dia = int(float(token(f, 2, car)))
            if dia > 100:
                ss = ano
                ano = dia
                dia = ss
            if int(float(fecha.strftime("%Y"))) < ano:
                return False
            if int(float(fecha.strftime("%Y"))) == ano:
                if int(float(fecha.strftime("%j")))< int(float(
                    datetime.datetime(ano, mes, dia).strftime("%j"))
                ):
                    return False
    if True:
        if diasdeconexion[int(float(fecha.strftime("%w")))] != "1":
            return False
    return True


# *****************************************************************
def generanuevasconsultas(dato, destinatario, remite, anterior=""):
    remitente = urllib.parse.unquote(remite)
    if len(remitente) == 0 or remitente == "?":
        return
    tabla = regX2(dato, 0)
   
    if tabla != "estados":
        return

    enlace = ""
    iconos_asociados = []
    print("DATO",urllib.parse.unquote(dato))

    def iconosasociados(reg):
        return (regX2(reg, 0) == "iconos") and regX2(reg, "Enlace") == enlace

    if regX2(dato, 4) == "dispositivoX":  # es un dispositivo el que genera el mensaje
        enlace = regX2(dato, 1)
        iconos_asociados = filter(iconosasociados, registros)
        for icon in iconos_asociados:
            if anterior == regX2(icon, 1):
                continue
            ndat = regX2(dato, 1, "W", regX2(icon, 1))
            ndat = regX2(ndat, 4, "W", "web")
            registradato(ndat)
    else:
        idicono = regX2(dato, 1)
        zx = "iconos" + idicono  # busco el icono asociado al estado
        try:
            esta = clavesregistro.index(zx)
            dispositivo = regX2(registros[esta], "Enlace")
            if (not ((dispositivo == "Sin%20enlace") or (dispositivo == ""))) and confirmaCliente[0] :
                publish.single(dispositivo, regX2(dato, "onoff"), hostname=hostIni[0])
                print("Orden a dispositivo:",dispositivo)
                otrosIconos = "estados" + separadorcampo2 + dispositivo
                otrosIconos = regX2(otrosIconos, "onoff", "W", regX2(dato, "onoff"))
                otrosIconos = regX2(otrosIconos, 4, "W", "dispositivoX")
                registradato(otrosIconos)
                generanuevasconsultas(otrosIconos, todos, dispositivo, idicono)
        except:
            pass


# *****************************************************************
def actualizadispositivos(actdispositivo):  # No hace nada al estado anterior después de arrancar el programa o bien busca el último estado activo
    # encontrados = obtendispositivos() # son registros de estados de dispositivos
    rX2 = registros.copy()

    def RegEstadosXX(regiro):
        return (regX2(regiro, 0) == "estados") and (regX2(regiro, 4) == "dispositivoX")

    ag = filter(RegEstadosXX, rX2) # conjunto dispositivos

    for dsp in ag:
        ba0 = "dispositivos" + separadorcampo2
        for h in range(1, 5):
            ba0 = ba0 + regX2(dsp, h) + separadorcampo2
        dispositivo = regX2(dsp, 1)
        regtb = ObtenRegistro("dispositivos", dispositivo)
        if regtb == "":
            regtb = ba0
        # regtb = regX2(regtb,"estado","W","0")
        # registradato(regtb)
        dispositivos[dispositivo] = urllib.parse.unquote(regtb)
        creacrono(dispositivo, 1)
        reiniciacrono(dispositivo, 1)
        if (dispositivo==""):return
        if (not actdispositivo) and confirmaCliente[0]:
            valorestado= regX2(dsp, "onoff")
            publish.single(dispositivo,valorestado, hostname=hostIni[0])
            print("Actualiza dispositivo:",dispositivo)

        #if dispositivo=='OnOff-SHOOT.1':continue
        if confirmaCliente[0]:publish.single(dispositivo, "CONSULTA-TODO", hostname=hostIni[0])


# *****************************************************************
def correspondeenvio(j, usuario):
    destino = token(direccionenvios[j], 0, separadorcampo2)
    remitente = direccionremite[j]
    if remitente == usuario:
        return False
    if destino == todos or destino == usuario:
        return True
    return False


# *******************************************************************
def preparapaquete(numeroX, destinatario, usuario, consultaX=""):
    if len(numerosenvios) == 0:
        return []  # agrupa los paquetes que tienen como destinatario el usuario
    limite = len(numerosenvios)
    enviop = []
    j = 0
    envios = ""
    while j < limite:
        if int(float(numerosenvios[j])) < numeroX:  # se puede optimizar con una busqueda
            j += 1
            continue
        if correspondeenvio(j, usuario):
            envios = direccionenvios[j]  # destino + clave (tipo + codigo)
            zx = token(envios, 1, separadorcampo2)  # clave (tipo + codigo)
            destinatarioz = usuario
            usuarioy = direccionremite[j]
            try:
                esta = clavesregistro.index(zx)
            except:
                del numerosenvios[j]  # numerosenvios.remove(num)
                del direccionenvios[j]  # direccionenvios.remove(envios)
                del direccionremite[j]  # direccionremite.remove(usuarioy)
                limite -= 1
                continue
            contenido = registros[esta]
            if (
                regX2(contenido, 0) == "estados"
                and regX2(contenido, 4) == "dispositivoX"
            ):  # estado de un dispositivo
                destinatarioz = regX2(contenido, 1)
            ax = (
                tokeninicio2
                + str(varop[0])
                + tokeninicio2
                + destinatarioz
                + tokeninicio2
                + usuarioy
                + tokeninicio2
                + contenido
                + tokeninicio2
            )
            enviop.insert(0, ax)
        j += 1
    ax = (
        tokeninicio2
        + str(varop[0])
        + tokeninicio2
        + destinatario
        + tokeninicio2
        + usuario
        + tokeninicio2
        + consultaX
        + tokeninicio2
    )
    enviop.insert(0, ax)
    return enviop

# *******************************************************************
def on_connect(client, userdata, flags, rc):
    #subscripciones=[(obtenvariable("CODIGORED","KINYOW74"),0),
    #    (obtenvariable("CODIGORED2","LLDC9632568745213002522X"),0)] # Este es el bueno
    #subscripciones=[("/casa",0),("/LLDC9632568745213002522X",0)] # Este es el bueno
    sucrp=obtenvariable("subscripciones","KINYOW74,LLDC9632568745213002522X")
    lsubscripciones=sucrp.split(",")
    numlst=len(lsubscripciones)
    hoc=[]
    for j in range(numlst):hoc.append(0)
    subscripciones=list(zip(lsubscripciones,hoc))
    print ("Subscripciones 1:",subscripciones)
    print ("Subcripciones:",client.subscribe(subscripciones))

# *******************************************************************
cadmensaje = ["", "", "", "", ""]

def on_message(client, userdata, msg):
    # estado=P=pendiente emitir R=recibido D=recibido y procesado E=emitido
    # Comprueba que el dispositivo existe, si no lo da de alta. Después envía el estdo
    request1 = str(msg.payload)[0:-1]
    cadmensaje[0] = token(str(request1), 1, tokeninicio)  # numero de mensaje
    cadmensaje[1] = token(str(request1), 2, tokeninicio)  # remitente
    cadmensaje[2] = token(str(request1), 3, tokeninicio)  # valor de estado del dispositivo
    cadmensaje[3] = token(str(request1), 4, tokeninicio)  # accion, nada o consulta, respuesta
    datoEstado = (
        "estados"
        + separadorcampo
        + cadmensaje[1]
        + separadorcampo
        + "R"
        + separadorcampo
        + version
        + separadorcampo
        + "dispositivoX"
    )
    datoDispositivo = (
        "dispositivos"
        + separadorcampo
        + cadmensaje[1]
        + separadorcampo
        + "R"
        + separadorcampo
        + version
    )
    remitente = urllib.parse.quote(cadmensaje[1])
    # if len(cadmensaje[3])>1:#Se trata estado de un dispositivo
    
    if token(cadmensaje[3],0,"=")=="VERIFICA":
        print("VERIFICA")
        generarespuesta1(cadmensaje[1],token(cadmensaje[3],1,"="))
    
    reiniciacrono(remitente, tiempoconsultaestadodsp[0])
    compruebaconexion[remitente] = 1
    datoDispositivo = nohaycambios(cadmensaje[1], cadmensaje[3], datoDispositivo)
    if datoDispositivo != "":
        dato2 = urllib.parse.quote(datoDispositivo)
        # print("++++ACTUALIZA DISPOSITIVO, pone estado a 1",cadmensaje[1])
        print("Dispositivo",dato2)
        registradato(dato2)
        generanuevasconsultas(dato2, todos, remitente)
    #DTANT=datoEstado
    datoEstado = nohaycambios(cadmensaje[1], cadmensaje[2], datoEstado)
    if datoEstado != "":
        datoX2 = urllib.parse.quote(datoEstado)
        registradato(datoX2)
        generanuevasconsultas(datoX2, todos, remitente)
#*******************************************************************   
def generarespuesta1(disp,pregunta):
    if (disp==""):return "SIN CODIGO"
    a="651 643 132 135 498 798 765 103 201 301 654 797 984 163 048 798 451 606 491 603 198 798 498 653 103 201 684 984 987 651 982 526 521 065 497 811 846 510 335 198 479 641"
# se toma el valor de la posicion 1 (y 2), se le suma 6 y al valor de esta posicion se le suma 1 y se obtiene el módulo de 10
    # se comprueba que son los valores 4 (y 5). Si es correcto sigue. Si no, se da una respuesta aleatoria.
    # se obtiene el valor de las posiciones 1 y 2. Busco el grupo que se corresponde con esta posición e introduzco los 3 valores en la
    # cadena respuesta de la siguiente forma:
    # - obtengo 3 numeros aleatorios de 0 a 9 no repetidos.
    # - estos números indican la posición de los 3 números clave y se introducen en las posiciones 1,2 y 3. De aqui se obtiene la
    # posición de los numeros clave y de ahí los números clave
    # guardo el CRC en las posiciones 4 y 5 correspondientes al valor modificado de las posiciones 9 y 7 de la pregunta.
    # el valor modificado se obtine sumando 3 y 5 respectivamente y obteniendo el módulo de 10
    print("ha llamado a generarespuesta",disp,pregunta)
    crc1= str((int(float(pregunta[int(float(pregunta[1]))+6])+1)) % 10)
    crc2= str((int(float(pregunta[int(float(pregunta[2]))+6])+1)) % 10)
    respuesta=""
    CRC=crc1+crc2
    CLX=str(pregunta[4])+str(pregunta[5])
    if CRC != CLX:
        i=0
        while i<16:
            i=i+1
            respuesta=respuesta + str(random.randint(0, 9))
    else: 
        nt=numtoken(a," ")
        print("nt",nt)
        ntk=int(float(pregunta[1:3]))%nt
        re=token(a,ntk," ") # obtengo la respuesta
        pos1=random.randint(0, 9) # obtengo las 3 posiciones de los 3 numeros de la respuesta.
        pos2=random.randint(0, 9) 
        pos3=random.randint(0, 9) 
        while pos2==pos1:
            pos2=random.randint(0, 9) 
        while pos3==pos1 or pos3==pos2: 
            pos3=random.randint(0, 9)  
        respuesta= str(random.randint(0, 9))+str(pos1)+str(pos2)+str(pos3) +"XX" 
        j=6
        pos1=pos1+6
        pos2=pos2+6
        pos3=pos3+6
        while j<16:
            
            if j==pos1 or j== pos2 or j== pos3:
                if j==pos1: respuesta = respuesta + "K"
                if j==pos2: respuesta = respuesta + "L"
                if j==pos3: respuesta = respuesta + "M"        
            else:   
                respuesta = respuesta + str(random.randint(0, 9))
            j=j+1    
        # falta sustituir el crc        
        respuesta=respuesta.replace("K",re[0])
        respuesta=respuesta.replace("L",re[1])
        respuesta=respuesta.replace("M",re[2])

        crc1= str((int(float(pregunta[9])+3))%10)
        crc2= str((int(float(pregunta[7])+5))%10)  
        respuesta=respuesta.replace("XX", crc1+crc2)

    if confirmaCliente[0]:publish.single(disp,"VERIFICA="+respuesta+separadorcampo+"ABRIR",hostname=hostIni[0])
    print("VERIFICA dispositivo"+respuesta)
    return respuesta
# *******************************************************************
def nohaycambios(remitente, mensaje, dato):
    if regX(dato, 0) == "dispositivos":  # mensaje es del tipo EST=1 El estado se refiere a si se 
        # tiene acceso al dispositivo o no
        if mensaje == "":
            mensaje = "EST=1"
        resp0 = token(mensaje, 0, "=")
        resp1 = token(mensaje, 1, "=")
        estado = ""
        tipo = ""
        cpu = ""
        dato1 = ""
        soniguales = True
        try:
            dato1 = registros[
                clavesregistro.index("dispositivos" + urllib.parse.quote(remitente))
            ]
            dato1 = urllib.parse.unquote(dato1)
        except:
            dato1 = dato
        for re in range(3):
            if token(resp0, re, ",") == "TIP":
                tipo = token(resp1, re, ",")
                continue
            if token(resp0, re, ",") == "CPU":
                cpu = token(resp1, re, ",")
                continue
            if token(resp0, re, ",") == "EST":
                estado = token(resp1, re, ",")
                continue
        if estado != "":
            if estado != regX(dato1, "estado"):
                print(dato1,"CAMBIA DEL Estado anterior", regX(dato1, "estado"), "a", estado)
                dato1 = regX(dato1, "estado", "W", estado)
                soniguales = False
        if tipo != "":
            if tipo != regX(dato1, "tipo"):
                dato1 = regX(dato1, "tipo", "W", tipo)
                soniguales = False
        if cpu != "":
            if cpu != regX(dato1, "cpu"):
                dato1 = regX(dato1, "cpu", "W", cpu)
                soniguales = False
        if soniguales:
            dato1 = ""
        return dato1

    if regX(dato, 0) == "estados":
        try:
            dato1 = registros[
                clavesregistro.index("estados" + urllib.parse.quote(remitente))
            ]
            dato1 = urllib.parse.unquote(dato1)
        except:
            dato1 = dato
        valor = regX(dato1, "onoff")
        dev = regX(dato1, "onoff", "W", mensaje)
        if valor == mensaje:
            dev = ""

        if not remitente in dispositivos:
            # publish.single(remitente,"CONSULTA-TODO1",hostname=hostIni[0])
            regtb = ObtenRegistro("dispositivos", remitente)
            dispositivos[remitente] = urllib.parse.unquote(regtb)
            reiniciacrono(remitente, tiempoconsultaestadodsp[0])
            print("Se ha añadido el dispositivo al registro de dispositivos", remitente)
        if dev!="":
            print("valor: ",valor," mensaje: ",mensaje," ***")
        return dev
    """ 
    TIPO=T1->on-off,on-off  (entrata,salida)
    T2->variable,on-off
    T3->on-off,variable
    T4->variable,variable
    EST,TIP,CPU
    ESTADO EST=1 CONECTADO (otro estado no se va a responder)
    CRED=CRED=codigo (referencia guardada en memoria del ESP8266 de conjunto de red)
    """
    return ""

# *************************************
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
def ficherodeconfiguracion():
    path[0] = consultaVariable("PATHX")
    portbase[0] = int(float((consultaVariable("PORTBASE"))))
    localhost[0] = consultaVariable("LOCALHOST")
    hostIni[0] = consultaVariable("HOSTMQTO")
    utc[0] = (consultaVariable("LONGITUD"))
    utc[1] = (consultaVariable("LATITUD"))
    desfaseutc[0] = int(float((consultaVariable("DESFASEUTC"))))
    tiempoconsultaestadodsp[0] = int(float(consultaVariable("TIEMPOCONSULTAESTADOS")))

    if len(path[0]) == 0:
        path[0] = os.getcwd()
    else:
        path[0] = os.path.join(os.getcwd(), path[0])
    carpetaIconos[0] = path[0]

    Xconfiguracion["PATHX"] = path[0]
    if  (portbase[0]) == 0:
        portbase[0] = 8080
        Xconfiguracion["PORTBASE"] = portbase[0]

    if localhost[0] == "":
        localhost[0] = "192.168.1.250"
        Xconfiguracion["LOCALHOST"] = localhost[0]
    return

# ************************************************************
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
                a=noencontrado
            if len(Xconfiguracion) == 0:
                Xconfiguracion = claves[0]
            Xconfiguracion[variableConfiguracion] = a
            return a
        except:
            Xconfiguracion[variableConfiguracion] = ""
            return ""

# ************************************************************
def registraconsultatiempoendisco(consulta):
    reiniciacrono("tiempoconsulta", tiempoactualizacionfalloluz[0])
    t = time.localtime()
    s = time.mktime(t)
    if consulta:  # obtiene el tiempo desde la última grabación
        try:
            f = open(os.path.join(carpetaInicio[0], "horaminutos.txt"), "r")
            segundos = float(f.read())
            f.close()
            return s - segundos
        except:
            f = open(os.path.join(carpetaInicio[0], "horaminutos.txt"), "w")
            f.write(str(s))
            f.close()
            return 0
    else:  # resgistra el tiempo actual
        f = open(os.path.join(carpetaInicio[0], "horaminutos.txt"), "w")
        f.write(str(s))
        f.close()
        return 0

# ************************************************************
def consultaestadosdispositivos():  # Cada ESP emite su estado cada 90-120 segundos
    # Mira los cronometros de la ultima actualizacion del dispositivo y emite una consulta
    # si este supera un determinado valor 125s. Los cronometros se resetean en cada consulta.
    # En la recepción se pone el estado del dispositivo en el array dispositivos

    if yatoca("consultaestados"):
        reiniciacrono("consultaestados", 5)
        dsvos=[]
        for dispositivo in dispositivos:
            dsvos.append(dispositivo)
        for dispositivo in dsvos:
            if yatoca(dispositivo):
                Rdispositivo = ObtenRegistro(
                    "dispositivos", dispositivo
                )  # REGISTRO DEL DISPOSITIVO
                if Rdispositivo == "":
                    continue
                esta = 1
                try:
                    esta = compruebaconexion[
                        dispositivo
                    ]  # verifica si se ha recibido comunicación
                    # del dispositivo. Esta siempre pone a esta=1.
                    compruebaconexion[dispositivo] = esta + 1
                    if compruebaconexion[dispositivo] > 3:
                        compruebaconexion[dispositivo] = 3
                except:
                    compruebaconexion[dispositivo] = 1
                if esta == 1:
                    continue  # indica que el dispositivo está funcionando
                if (
                    esta == 2
                ):  # se ha sobrepasado el tiempo de espera de algún mensaje del dispositivo.
                    # se fuerza a que responda a su estado
                    print("Consulta dispositivo", dispositivo)
                    try:
                        if (regX2(Rdispositivo,"dispositivo")==""):print(1/0)
                        if confirmaCliente[0]:
                            publish.single(
                                regX2(Rdispositivo, "dispositivo"),
                                "CONSULTA-TODO",
                                hostname=hostIni[0],
                                    )
                        print("CONSULTA dispositivo:",dispositivo)
                    except:
                        compruebaconexion[dispositivo] = 1
                        reiniciacrono(dispositivo, 10)
                        continue
                    reiniciacrono(dispositivo, 5)
                    continue
                if (
                    esta == 3
                ):  # si no recibo respuesta, paro la comunicación con el dispositivo.
                    # si se reactiva de nuevo, los contadores de resetearán

                    paracrono(dispositivo)
                    if regX2(Rdispositivo, "estado") != "0":
                        Rdispositivo = regX2(Rdispositivo, "estado", "W", "0")
                        registradato(Rdispositivo)
                        print("--- DESACTIVA ESTADO",regX2(Rdispositivo, "dispositivo"))
                        generanuevasconsultas(Rdispositivo, todos, dispositivo)

# ************************************************************
def consulta(remitente, dato=""):
    # dato=envoltorio,tipodeconsulta,parametros
    if not (envoltorio2 in dato):
        return ""  # Verifica que es una consulta
    dato = token(dato, 1, envoltorio2)
    tipo = token(dato, 0, separadorcampo2)
    if tipo == "":
        return ""
    elif tipo == "PATHIMAGENES":
        return urllib.parse.quote(
            envoltorio
            + tipo
            + separadorcampo
            + "http://"
            + localhost[0]
            + ":"
            + str(portbase[0])
            + "/CREATXT"
        )
    elif tipo == "IMAGENES":
        lectura = envoltorio + tipo
        # genera y abre el fichero index.txt
        contador = 0
        while 1:
            contador += 1
            try:
                file = open(os.path.join(carpetaIconos[0], "index.txt"), "r")
                break
            except:
                if contador > 100000:
                    return ""
        for line in file:
            lectura += separadorcampo + line
        file.close()
        return urllib.parse.quote(lectura)
    elif tipo == "FOTOS":
        numerotrozo = token(dato, 1, separadorcampo2)
        numerodetrozos = token(dato, 2, separadorcampo2)
        clavefoto = token(dato, 3, separadorcampo2)
        textoclave = token(dato, 4, separadorcampo2)
        print("Numero trozo:", numerotrozo, numerodetrozos, clavefoto)

        if numerotrozo == "-1":
            imagenes64[clavefoto] = ""
            imagenes64.pop(clavefoto)
            imagenes64["borrar" + clavefoto] = "SI"
            print("CANCELADO", clavefoto)

        try:
            if imagenes64["borrar" + clavefoto] == "SI":
                print("CANCELADO borrado", clavefoto)
                # imagenes64.pop("borrar"+clavefoto)
                return urllib.parse.quote(
                    envoltorio
                    + tipo
                    + separadorcampo
                    + "-1"
                    + separadorcampo
                    + "0"
                    + separadorcampo
                    + clavefoto
                )
        except:
            imagenes64["borrar" + clavefoto] = ""
        if imagenes64["borrar" + clavefoto] == "SI":
            return urllib.parse.quote(
                envoltorio
                + tipo
                + separadorcampo
                + "-1"
                + separadorcampo
                + "0"
                + separadorcampo
                + clavefoto
            )
        if not clavefoto in imagenes64:
            imagenes64[clavefoto] = ""
        imagenes64[clavefoto] = imagenes64[clavefoto] + textoclave
        if numerotrozo == numerodetrozos:
            imagenes64[clavefoto] = urllib.parse.unquote(imagenes64[clavefoto])
            extension = imagenes64[clavefoto][11:25]
            imagenes64[clavefoto] = token(imagenes64[clavefoto], 1, "base64,")
            extension = token(extension, 0, ";bas")
            filefoto = os.path.join(
                os.path.join(carpetaInicio[0], carpetaIconos[0]),
                clavefoto + "." + extension,
            )
            codificadoenbytes = imagenes64[clavefoto].encode("utf-8")
            arch1 = base64.decodebytes(codificadoenbytes)

            try:
                f = open(filefoto, "wb")
                f.write(arch1)
                f.close
                imagenes64.pop(clavefoto)
            except:
                print("No se ha salvado")
            print(filefoto)
        print("Enviando consulta de trozo: ", numerotrozo)
        ccons = (
            envoltorio
            + tipo
            + separadorcampo
            + numerotrozo
            + separadorcampo
            + numerodetrozos
            + separadorcampo
            + clavefoto
        )
        print(ccons)
        return urllib.parse.quote(ccons)
    else:
        return urllib.parse.quote(
            envoltorio + tipo + separadorcampo + obtenvariable(tipo, "")
        )
    return ""

# *************************************
def revisaficheroeventos():
    maxlin=25000
    linrepos=10000
    lineas=""
    try:
        with open(
            os.path.join(carpetaInicio[0], "eventos.txt"),
                "r",
                encoding="cp1252",
                errors="ignore",
            ) as f:
                lineas= f.readlines()
                f.close()
    except:
        return 
    tope=len(lineas)-1
    print("Líneas fichero de eventos",tope+1)
    if tope>maxlin:
        print("Reduciendo tamaño fichero de eventos")
        lin2=""
        for k in range(tope-linrepos,tope):
            lin2=lin2+lineas[k]
    else:return

    try:
        print(lin2)
        with open(
            os.path.join(carpetaInicio[0], "eventos.txt"),
                "w",
                encoding="cp1252",
                errors="ignore",
            ) as f: 

            f.write(lin2) 
            f.close()
    except:
        return 
    return
# *************************************
def revisaEstados():
    if yatoca("salvadatosendisco"):
        salvadatosendisco()
    if yatoca("tiempoconsulta"):
        registraconsultatiempoendisco(False)
    if yatoca("emitemail"):
        enviapaquetemail("","")
    consultaestadosdispositivos()
    consultaestadointerruptores()
    ddhoy = datetime.datetime.now().strftime("%d/%m/%Y")
    if diadehoy[0] != ddhoy:
        diadehoy[0] = ddhoy
        obteneventospr()
        diadehoyVE[0] = (datetime.datetime.now()-timedelta(2)).strftime("%Y-%m-%d")
        diadehoyVE[1] = (datetime.datetime.now()-timedelta(1)).strftime("%Y-%m-%d")
        diadehoyVE[2] = datetime.datetime.now().strftime("%Y-%m-%d")
        diadehoyVE[3] = (datetime.datetime.now()+timedelta(1)).strftime("%Y-%m-%d")
        revisaficheroeventos()
    eventosaccion()
    relacionesaccion()
    time.sleep(0.1)

# *************************************************
def generaenvio(request):
    if 1:
        if 1:
            envios = []
            txtenvios = str(request).split(str(separadorrecno2))
            for request1 in txtenvios:
                envios1 = []
                numeroc = token(str(request1), 1, str(tokeninicio2))
                destinatario = token(str(request1), 2, str(tokeninicio2))
                remitente1 = token(str(request1), 3, str(tokeninicio2))
                dato = token(str(request1), 4, str(tokeninicio2))
                if remitente1 != "":
                    remitente = remitente1
                else:
                    break
                numero = 0
                if numeroc != "":
                    numero = int(float(numeroc))
                if numero > 100000000:
                    numero = 1
                consta = consulta(remitente, dato)
                if not consta: # si devuelve "" la consulta. En caso contrario se procesa la consulta
                    registradato(dato, destinatario, remitente)
                    generanuevasconsultas(dato, destinatario, remitente)
                else:
                    print("Emite una consulta ")
                envios1 = preparapaquete(
                    numero, destinatario, remitente, consta
                )  # el remitente es el usuario
                envios.extend(envios1)
            tt = ""
            if len(envios) == 0:
                return ""
            for env in envios:
                tt = tt + env + separadorrecno2
    return tt
# *************************************************
def conectaserver(request):
    try:
        x = str(request).find(tokeninicio2)
    except:
        x = -1
    if x > -1:
        tt = generaenvio(request)
        if len(tt) > 0:
            data = {"DATOS": tt}
            return bytes(json.dumps(data), encoding="cp1252")
    else:
        return ""
# *************************************
def creaIndex(texto="", txt=""):
    if not txt == "":
        f = open(os.path.join(path[0], "index.html"), "w")
        f.write(texto)
        f.close()
    else:
        txt = texto
    f = open(os.path.join(path[0], "index.txt"), "w")
    f.write(txt)
    f.close()
# *************************************
def obtenImagenes():
    lis1 = ""
    lis2 = ""
    for root, dirs, files in os.walk(path[0]):
        if 0:
            print(dirs)
        for fichero in files:
            if fichero.split(".")[-1] in [
                "jpeg",
                "jpg",
                "png",
                "tif",
                "psd",
                "gif",
                "bmp",
                "raw",
                "ico",
            ]:
                root1 = str(root).replace(str(path[0]), "." + str(os.path.sep))[3::]
                lis = os.path.join(
                    "http://" + localhost[0] + ":" + str(portbase[0]),
                    os.path.join(str(root1), str(fichero)),
                )
                lis = lis.replace(chr(92), "/")
                lisx = (
                    '<img src="'
                    + lis
                    + '" alt="'
                    + fichero.split(".")[0]
                    + '" width="50" height="60">\n'
                )
                lis1 = lis1 + str(lisx)
                lis2 = lis2 + str(lis + "\n")
    return lis1, lis2
# *************************************
def guardaParametros(parametros,obj): # en el proceso de salvado de datos, se recoge la información y se procesa
    if (obj=="PROCESAPERSIANA"):
        tipo= str(parametros.getvalue("TIPO"))
        dispositivo=str(parametros.getvalue("CODIGO"))
        TPERSIANA=str(parametros.getvalue("TPERSIANA"))
        regtb = ObtenRegistro("dispositivos", dispositivo)
        if regtb == "":return
        regtb=regX2(regtb,"paramdsp","W",str(TPERSIANA))
        registradato(regtb,todos,todos,1)

        print("Tiempo de Dispositivo registrado",dispositivo,TPERSIANA)
        if tipo=="5P": # definir este tipo el de persiana
            try:
                if (dispositivo==""):print(1/0)
                if confirmaCliente[0]:
                    publish.single(
                        dispositivo,
                        "TIEMPOPERSIANA",
                        hostname=hostIni[0],
                            )
                print("GRABA DATOS PERSIANA:",dispositivo)
            except:
                compruebaconexion[dispositivo] = 1
                reiniciacrono(dispositivo, 10)
        return

    if (obj=="PROCESACONFIGURACION"):
        for nom in parametros:
            variable = str(nom)
            value = str(parametros.getvalue(variable))
            Xconfiguracion[nom]=value
        print(actualizaXconfiguracion(False))
# *************************************
def obtentablaeventos(codigo):
    lineas=""
    try:
        with open(
            os.path.join(carpetaInicio[0], "eventos.txt"),
                "r",
                encoding="cp1252",
                errors="ignore",
            ) as f:
                lineas= f.readlines()
                f.close()
        #return lineas
    except:
        return ""
    tx="<table>"
    totallineas =len(lineas)-1
    T0 = datetime.datetime.now()
    for j in range(totallineas,0,-1):
        ls=lineas[j].split(" ")
        if codigo!=ls[2]:continue
        t1=ls[0].split("-")
        t2=ls[1].split(":")
        T1=datetime.datetime(int(t1[0]),int(t1[1]),int(t1[2]),int(t2[0]),int(t2[1]),int(t2[2][0:1]))
        TT=T0-T1
        TS=str(int(TT.seconds/60))
        tx=tx+"<tr><th>"+ls[0]+"</th><th>"+ls[1][0:8]+"</th><th>"+ls[4]+"</th><th>"+TS+"</th></tr>"
        T0=T1
    return tx+"</table>"
# *************************************
def app2(environ, respond):
    fn = os.path.join(
        path[0], environ["PATH_INFO"][1:])
    if (not os.path.exists(fn)):
        fn = os.path.join(carpetaInicio[0], environ["PATH_INFO"][1:])

    if (environ["REQUEST_METHOD"] == "POST" and 
        (fn.split(os.path.sep)[-1] in ["PROCESAPERSIANA","PROCESACONFIGURACION"])):
        # Cuando se acepta el form de datos se recibe aqui para procesar lo recibido
        if (environ["CONTENT_TYPE"]=='application/x-www-form-urlencoded'):
            post_env = environ.copy()
            post = cgi.FieldStorage(
                fp=environ["wsgi.input"], environ=post_env, keep_blank_values=True
            )
            guardaParametros(post,fn.split(os.path.sep)[-1])
        respond("200 OK", [("Content-Type", "text/html; charset=utf-8")])
        return [b"<h2><br><br><br><center>Los valores han sido salvados en el servidor. <br> Pulse 'Regresar al Programa' para volver</center></h2>"]

    if (environ["REQUEST_METHOD"] == "POST"): # permite obtener los valores de un fichero y no de la taba de registros.
        if ((fn.split(os.path.sep)[-1] in ["OBTIENECONFIGURACION"])):
            obtentblVE()
            print("OBTIENE LA CONFIGURACION")
            datos=actualizaXconfiguracion(True)
            respond("200 OK", [("Content-Type", "text/plain; charset=utf-8")])
            return [bytes(json.dumps(datos), encoding="cp1252")]

        if ((fn.split(os.path.sep)[-1] in ["EVENTOS"])):
            print("OBTIENE EVENTOS",environ["HTTP_BODY"])
            codigo= token(environ["HTTP_BODY"],1,'"')
            datos={"CODIGO":codigo}
            #datos=actualizaXconfiguracion(True)
            datos["TABLAEVENTOS"]=obtentablaeventos(codigo)
            respond("200 OK", [("Content-Type", "text/plain; charset=utf-8")])
            return [bytes(json.dumps(datos), encoding="cp1252")]


    if "COMPRUEBA" == fn.split(os.path.sep)[-1]:
        respond("200 OK", [("Content-Type", "text/plain")])
        return [b"ok"]

    if "CREATXT" == fn.split(os.path.sep)[-1]:
        web2, txt = obtenImagenes()
        creaIndex(txt)
        respond("200 OK", [("Content-Type", "text/plain")])
        return [b" creado index.txt"]

    if os.path.exists(fn):
        if "." in fn.split(os.path.sep)[-1]:
            type = mimetypes.guess_type(fn)[0]
            respond("200 OK", [("Content-Type", type)])
            return util.FileWrapper(open(fn, "rb"))
        else: # el path existe, por lo que si no es un archivo, es una carpeta.
            web2, txt = obtenImagenes()
            web = web1 + web2 + web3
            creaIndex(web, txt)
            fn = os.path.join(fn, "index.html")
            if os.path.exists(fn):
                type = mimetypes.guess_type(fn)[0]
                respond("200 OK", [("Content-Type", type)])
                return util.FileWrapper(open(fn, "rb"))
            else:
                respond("404 Not Found", [("Content-Type", "text/plain")])
                return [b"No encontrado el fichero "]
    else:
        deve = conectaserver(str(environ))
        if len(deve) == 0:
            respond("200 OK", [("Content-Type", "text/plain")])
            return [b"NO Ok"]
        else:
            respond("200 OK", [("Content-Type", "text/plain; charset=utf-8")])
            return [deve]


# ***************************************
class proceso(threading.Thread):
    def __init__(self, accion):
        threading.Thread.__init__(self)
        self.accion = accion

    def run(self):
        if self.accion == "actualizadsp":
            cliente = mqtt.Client()
            cliente.on_connect = on_connect
            cliente.on_message = on_message
            intentos=0
            while True:
                try:
                    print("Intento de conectar al Broker Mqtt")
                    cliente.connect(hostIni[0], 1883, 60)
                    cliente.loop_start()
                    confirmaCliente[0]=1
                    print("Mqtt conectado en",hostIni[0])
                    break
                except:
                    intentos=intentos+1
                    # poner una web indicando este error
                    print("Intento de conectar al Broker Mqtt",intentos)
                    continue
            print(datetime.datetime.now(),"Espera para:","actualizadispositivos()")
            actualizadispositivos(tiempodecontrol > ultimotiemporegistrado)  # Si es falso, se recopera el estado anterior.
        
        if self.accion == "general":
            print(datetime.datetime.now(),"Activado proceso general")
            while 1:
                revisaEstados()
        if self.accion == "server2":
            httpd2 = simple_server.make_server("", portbase[0], app2)
            print(datetime.datetime.now(),
                "Servidor principal {} en puerto {}, control-C to stop\n".format(
                    path[0], portbase[0]
                )
            )
            try:
                httpd2.serve_forever()
            except KeyboardInterrupt:
                print(datetime.datetime.now(),"Cerrando servidor Principal.")
                httpd2.server_close()
        print(datetime.datetime.now(),"funciona todo")


# *************************************************
if __name__ == "__main__":
    print(datetime.datetime.now(),"Arranque","ficherodeconfiguracion()")
    ficherodeconfiguracion()
    Xconfiguracion["XSal2021.py"]=version
    print(actualizaXconfiguracion(False))
    
    cargaficheros()
    
    # actualizaestados=True # esta variable permite actualizar todos los estados iniciales de central a dispositivos o de dispositivos a central
    tiempodecontrol = int(float(obtenvariable("TIEMPODEFALLOLUZ", 600)))
    print(datetime.datetime.now(),"Registro de tiempos","registraconsultatiempoendisco()")
    ultimotiemporegistrado = registraconsultatiempoendisco(True)
    print(
        "Tiempo registrado vs tiempo de control",
        ultimotiemporegistrado,
        tiempodecontrol,
    )
   
    tiempoactualizacionfalloluz[0] = int(float(
        obtenvariable("TIEMPOACTUALIZACIONFALLOLUZ", 60))
    )
    print(datetime.datetime.now(),"Espera para:","registraconsultatiempoendisco()")
    registraconsultatiempoendisco(False)
    print("Amanece/Atardece", amatardece(utc, datetime.datetime.now()))
    creacrono("salvadatosendisco", 5)
    reiniciacrono("consultaestados", 5)
    creacrono("emitemail", int(obtenvariable("tiempolotemail",10)))
    
    paracrono("emitemail")

    revisaficheroeventos()

    general = proceso("general")
    server2 = proceso("server2")
    actualizadsp= proceso("actualizadsp")
    actualizadsp.start()
    general.start()
    server2.start()