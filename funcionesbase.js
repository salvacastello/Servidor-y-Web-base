//IF YOU WANT TO CONTACT WITH ME, CALL 034 661.56.30.60
//MY NAME IS SALVADOR CASTELLO. CALL TIME SPAIN
//Variables ID
//************************************
var seleccion1 = 'configurar';
var Icono = [];
var NombreClase = [""];
var recno = [];
var recno2 = [];
var dispositivos = [""];
var relaciones = [];
var programasborrados = [];

//Variables generales
//************************************
var dibujofondo = [];
var nomdibujofondo = [];

var tamanoicono;
var incrementotamanoicono;
var opacidad;
var opacidadfondo0;
var opacidadfondo;
var dibujofondo0;
var planoactivo;
var ruta;
var conexion = obtencodigo(relaciones);

//Variables auxiliares
//************************************
var iddibujofondo = [];
var ordendibujofondo = [];
var formaicono = [];
var gtamanoicono;
var gincrementotamanoicono;
var gopacidad;
var gdibujofondo = [];
var gopacidadfondo0;
var gopacidadfondo;
var gdibujofondo0;
var gplanoactivo;
var gnomdibujofondo = [];
var gordendibujofondo = [];
var gultimoplano = 0;
var gcambiafondo = false;

//*************************************
var anchofondo;
var altofondo;
var colorfondobarra;
var colortextobarra;
var colorseleccionbarra;
var ultimoplano = 0;


//Variables de estado
var onoff = [];

//Variables auxiliares

var respuesta = "";
var ultimdato = '-1';//'999999999999';
var prueba = 0;
var marcar = false; // para con un click fijar un icono para moverlo
var elementomarcado = ""; //id del elemento marcado
var seleccion1 = "posicionar";
var iconoActivo = -1;
var CodiconoActivo = "";
var numeroIconoActivo = -1;
var semaforo = false;
var separadorcampo = String.fromCharCode(248) + String.fromCharCode(247);
var separadorrecno = String.fromCharCode(198) + String.fromCharCode(199);
var separadorlocal = String.fromCharCode(222) + String.fromCharCode(223);
var cadenaxr = String.fromCharCode(230) + String.fromCharCode(254);
var envoltorio = String.fromCharCode(245) + String.fromCharCode(246);

var procesoactivo = "principal";
//var NombreClase=[];
var pathImagen = ["0"]; //Hasta que este valor no este a 1, la lectura no es válida
var pathImagentext = "http://localhost:8887/CREATXT";
datosfoto = {};
var tamtrozo = 57344;
var Tlatencia=2000;
var ayudaActiva=[""];

//*************recno[i]="icono;TTY53;R;v1.0;valor1;valor2"  
function diccionario(tabla, variable) {
  switch (tabla) {
    case "clases":
      switch (variable) {
        case "NombreClase": return 1;
        case "ImagenClase": return 5;
        case "FraseClase": return 6;
        case "formaClase": return 7;
        case "ultimo": return 8;
        default: return -1;
      }
      break;
    case "iconos":
      switch (variable) {
        case "Icono": return 1;
        case "Plano": return 5;
        case "Nombre": return 6;
        case "yposi": return 7;
        case "xposi": return 8;
        case "Ubicacion": return 9;
        case "Imagen": return 10;
        case "formaicono1": return 11;
        case "Frase": return 12;
        case "Tipoeicono": return 13;
        case "Tiposicono": return 14;
        case "Clase": return 15;
        case "Enlace": return 16;
        case "informar": return 17;
        case "email": return 18;
        case "Eliminar": return 19;
        case "ultimo": return 20;
        default: return -1;
      }
      break;
    case "planos":
      switch (variable) {
        case "Coddibujofondo": return 1;
        case "Nomdibujofondo": return 5;
        case "Dibujofondo": return 6;
        case "Ordendibujofondo": return 7;
        case "Eliminar": return 8;
        case "ultimo": return 9;
        default: return -1;
      }
      break;
    case "generales":
      switch (variable) {
        case "General": return 1;
        case "Planoactivo": return 5;
        case "Tamanoicono": return 6;
        case "Incrementotamanoicono": return 7;
        case "opacidad": return 8;
        case "opacidadfondo0": return 9;
        case "anchofondo": return 10;
        case "altofondo": return 11;
        case "colortextobarra": return 12;
        case "colorfondobarra": return 13;
        case "dibujofondo0": return 14;
        case "opacidadfondo": return 15;
        case "ruta": return 16;
        case "ultimo": return 17;
        default: return -1;
      }
      break;
    case "estados":
      switch (variable) {
        case "Icono": return 1;
        case "onoff": return 5;
        case "ultimo": return 6;
        default: return -1;
      }
      break;
    case "programas":
      switch (variable) {
        case "Icono": return 1;
        case "tipodeconexion": return 5;
        case "horadeconexion": return 6;
        case "minutodeconexion": return 7;
        case "lunesdeconexion": return 8;
        case "martesdeconexion": return 9;
        case "miercolesdeconexion": return 10;
        case "juevesdeconexion": return 11;
        case "viernesdeconexion": return 12;
        case "sabadodeconexion": return 13;
        case "domingodeconexion": return 14;
        case "valoraccion": return 15;
        case "validadesde": return 16;
        case "validahasta": return 17;
        case "incluyedias": return 18;
        case "excluyedias": return 19;
        case "codigoprograma": return 20;
        case "HorasVEHasta": return 21;
        case "HorasVE": return 22;
        case "Eliminar": return 23;
        case "ultimo": return 24;
        default: return -1;
      }
      break;
    case "relaciones":
      switch (variable) {
        case "Icono": return 1;
        case "codigorelacion": return 5;
        case "iconodispositivo": return 6;
        case "entradarel": return 7;
        case "accion": return 8;
        case "evento": return 9;
        case "retardo": return 10;
        case "valoref": return 11;
        case "factor": return 12;
        case "salida": return 13;
        case "valorefa": return 14;
        case "factora": return 15;
        case "codigounion": return 16;
        case "tmp": return 17;
        case "Eliminar": return 18;
        case "ultimo": return 19;
        default: return -1;
      }
    case "dispositivos":
      switch (variable) {
        case "dispositivo": return 1;
        case "tipo": return 5;
        case "cpu": return 6;
        case "estado": return 7;
        case "paramdsp": return 8;
        case "Eliminar": return 9;
        case "ultimo": return 10;
        default: return -1;
      }
      break;
  }
}
//******************************************************************
function consultaConfiguracion(hoja="OBTIENECONFIGURACION",body="") { // se realiza este proceso desde una web de consulta y se
  // envía la información de la web para su procesamiento o bien se recibe la información de los 
  // inputs de la web
  var enviar=encodeURIComponent([body]);
  //hoja="OBTIENECONFIGURACION";
  fetch( hoja, {
          method: 'POST',
          headers: {
          'content-type': 'text/plain',
          body: JSON.stringify(enviar), // esto envía los datos para su procesamiento en el servidor
          
      }})
      .then(function(response) {
      return response.json();
      })
      .then(function(data) {
        sessionStorage.setItem("dato",JSON.stringify(data));
        if(hoja=="OBTIENECONFIGURACION"){
          setInterval(LanzaDatos, (data["TLATENCIA"]));
        }
        return data;
       
      })
      .catch(function(err) {
          console.log(err);
      });
  //return "";  
  }
  //*****************************************************************
function enviadatos(regla="",hoja="*") {
  var m =parseInt(ultimdato)+1;
  ultimdato=m.toString();
  var env=cadenaxr + ultimdato + cadenaxr +'?'+cadenaxr+conexion+cadenaxr+regla+cadenaxr;
  var enviar=encodeURIComponent(env);
  respuesta=''
  fetch( hoja, {
      method: 'POST',
      
      headers: {
      'content-type': 'text/plain',
      enviar
  }})
  
  .then(function(response) {
    //console.log( response);
      return response.json();
  })
  .then(function(data) {
    respuesta = decodeURIComponent(data["DATOS"]);
    if(!(respuesta=="")){
    ultimdato = token(respuesta,1,cadenaxr); 
    if (ultimdato!=""){
    procesarecibidos(respuesta);}
          }  
  })
  .catch(function(err) {
      console.error(err);
  });
  //return "";  
  }
  //*********************************************************
function EstaBorrado(tabl, identificador) {
  var a = registro(tabl, identificador, "Eliminar", "", "R");
  return (a == "1") || (a == "2");
}
//*************************************************  
function idopcion(id, regla, texto, accion) {
  if (!id || !accion) { return; }
  var r = texto;
  if (typeof (texto) == 'string') {
    if (texto.length > 0) { texto = token(texto, 0, separadorlocal); }
    else { texto = ''; }
  }
  var elem = document.getElementById(id);

  var long = elem.length;

  switch (accion) {
    case "elementos":
      return long;
    case "anade":
    if (regla == -1) { regla = long; }
      if (regla >= long) {
        for (ik = long; ik <= regla; ik++) {
          var opcion = document.createElement("option");
          if (ik == regla) {
            opcion.text = texto;
          } else {
            opcion.text = "";
          }
          opcion.value = regla;
          elem.options.add(opcion);
        }
      } else {
        elem.selectedIndex = regla;
        elem.options[regla].text = texto;
        elem.value=regla;
      }
      return regla;
      break;

    case "selecciona":
      if (regla >= long) { regla = long - 1; }
      if (regla < 0) { regla = elem.selectedIndex; }
      if (regla < 0) { regla == long - 1; }
      elem.selectedIndex = regla;
      return regla;
      break;

    case "borra":
      if (regla < 0) { regla = long - 1; }
      if (regla < long) {
        for (ij = long; ij >= regla; ij--) {
          //elem.selectedIndex=ij;
          elem.remove(ij);
        }
      }

      break;
    case "desactiva":
      if (regla < 0) { regla = elem.selectedIndex; }
      if (regla < long) {
        elem.options[regla].disabled = true;
      }
      break;
    case "activa":
      if (regla < 0) { regla = elem.selectedIndex; }
      if (regla < long) {
        elem.options[regla].disabled = false;
      }
      break;
    case "obtiene":

      if (regla == -1) { regla = elem.selectedIndex; }
      if (regla == -1) { return 0; }
      if (regla >= long) { regla = long - 1; }
      return elem.options[regla].text;
      break;
    case "obtiene2":
      if (regla == -1) { regla = elem.selectedIndex; }
      if (regla == -1) { return 0; }
      if (regla >= long) { regla = long - 1; }
      return regla;
      break;

    case "actualiza":
      if (regla >= long) { return 0; }
      if (regla == -1) { regla = elem.selectedIndex; } else { elem.selectedIndex = regla; }
      if (regla == -1) { return 0; }
      if (regla < long) {
        elem.selectedIndex = regla;
        elem.options[regla].text = texto;
      } else { idopcion(id, regla, texto, "anade") }
      break;
    case "marca":
      var clase = document.createAttribute("class");
      clase.value = "marcado";
      if (regla == -1) { regla = elem.selectedIndex; } else { elem.selectedIndex = regla; }
      if (regla == -1) { return 0; }
      elem.options[elem.selectedIndex].setAttributeNode(clase);
      return 1;
      break;
    case "desmarca":
      var clase = document.createAttribute("class");
      clase.value = "";
      if (regla >= long) { regla = long - 1; }
      if (regla == -1) { regla = elem.selectedIndex; } else { elem.selectedIndex = regla; }
      if (regla == -1) { return 0; }
      elem.options[elem.selectedIndex].setAttributeNode(clase);
      return 1;
      break;
    case "elimina":
      elem.remove(regla);
      return regla;
      break;
    case "buscatxt":
      for (qx = 0; qx < long; qx++) { if (elem.options[qx].text == texto) { elem.selectedIndex = qx; return qx; } }
      return 0;
      break;
  }
  return regla;
}
//******************************************************************
function FiltraRegistros(tabx) {
  function sonRecnos(reg) {
    return (token(reg, 0, separadorcampo) == tabx) && (!EstaBorrado(tabx, token(reg, 1, separadorcampo)));
  }
  var totalicons = recno.filter(sonRecnos);
  todos = totalicons.length
  for (op1 = 0; op1 < todos; op1++) {
    switch (tabx) {
      case "iconos":
        Icono[op1] = token(totalicons[op1], 1, separadorcampo);
        break;
      case "planos":
        iddibujofondo[op1] = token(totalicons[op1], 1, separadorcampo);
        break;
      case "dispositivos":
        dispositivos[op1] = token(totalicons[op1], 1, separadorcampo);
        break;
    }
  }
}
//******************************************************************
function registro(tabla, id, pos, valor, accion) {

  //recno[i]="icono;TTY53;P;v1.0;no def;valor1;valor2"
  // tabla,id,estado,version, ,valores...
  //recno[i]="recuperable"
  //estado=P=pendiente emitir R=recibido D=recibido y procesado E=emitido 
  // accion R=lectura, W= escritura
  if (tabla == "" || id == "") { return ""; }
  var sl = true;
  var tabl;
  var clax = ["clases", "iconos", "planos", "generales", "estados", "programas", "relaciones", "dispositivos"];
  for (tabl in clax) {
    if (clax[tabl] == tabla) { sl = false; break; }
  }
  if (sl) { return ""; }


  if (isNaN(pos)) {
    posicion = diccionario(tabla, pos);
    if (posicion == -1) { return 1 / 0; }
  }
  else { posicion = pos; }
  var version = "V201905";

  function recnoxxx() {
    var recupera = -1;
    var finrec = recno.length;
    for (var re = 0; re < finrec; re++) {

      if ((token(recno[re], 0, separadorcampo) == tabla) && (token(recno[re], 1, separadorcampo) == id)) {
        numeroIconoActivo = re;
        return re;
      }

      if (recno[re] == "recuperable") { recupera = re; }
    }
    if (accion == "R") { return -1; }
    if (recupera == -1) { re = recno.length; } else { re = recupera; }
    recno[re] = tabla + separadorcampo + id + separadorcampo;

    return re;
  }
  var rf = recnoxxx();
  switch (accion) {
    case "R":

      if (rf == -1) { return ""; } else { return token(recno[rf], posicion, separadorcampo); }
      break;
    case "W":

      var numtok = numtoken(recno[rf], separadorcampo);
      var tmp = "";
      var sep = separadorcampo;
      //var ult=Math.max(posicion,numtok);
      var ult = diccionario(tabla, "ultimo");
      var kj = 0;
      for (kl = 0; kl < 5; kl++) {
        kj = kl
        if (token(recno[rf], kl, separadorcampo) != "") { kj = -1; }
        switch (kj) {
          case 2:
            tmp = tmp + "P" + sep;
            break;
          case 3:
            tmp = tmp + version + sep;
            break;
          case 4:
            tmp = tmp + "web" + sep;
            break;
          default:
            tmp = tmp + token(recno[rf], kl, separadorcampo) + sep;
        }
      }
      for (kl = 5; kl <= ult; kl++) {
        if (kl == ult) { sep = ""; }
        if (kl == posicion) { tmp = tmp + valor + sep; } else { tmp = tmp + token(recno[rf], kl, separadorcampo) + sep; }
      }
      recno[rf] = tmp;
      publicardato(tmp);
      return rf;
      break;
  }
}
//***********************************************************
function publicardato(regla) {
  //-ordenar por P- pendientes de emitir
  // emitir y pasar a E- emitido
  // 2 version 
  // 3 estado
  //ultimodatotransmitido
  var tabla = token(regla, 0, separadorcampo);
  var codigo = token(regla, 1, separadorcampo);
  if (tabla == "" || codigo == "") { return; }
  var ultimo = registro(tabla, codigo, "ultimo", "", "R");
  if (ultimo == "1") {
    enviadatos(regla);
  }
}
//******************************************************************
function procesarecibidos(regla) {
  //if (procesoactivo =="parametros"){return;}
  var numt = numtoken(regla, separadorrecno);
  for (st = 0; st < numt; st++) {
    cadto = token(regla, st, separadorrecno);
    if (cadto != '') { procesarecibido(token(cadto, 4, cadenaxr)); }
  }
}
//******************************************************************
function procesarecibido(regla) {
  var regla;
  if (regla.indexOf(envoltorio, 0) > -1) {
    regla = token(regla, 1, envoltorio);
    var clase = token(regla, 0, separadorcampo);

    switch (clase) {
      case "IMAGENES":
        var td = pathImagen.length;
        for (ki = 0; ki < td - 1; ki++) { pathImagen.pop(); }
        pathImagen[0] = "1";
        var todos = numtoken(regla, separadorcampo);
        for (is = 0; is < todos; is++) {
          pathImagen.push(token(regla, is, separadorcampo));
        }
        return;
      case "PATHIMAGENES":
        pathImagentext = token(regla, 1, separadorcampo);
        return;
      case "PATHX":
        break;
      case "FOTOS":
        //tipo+1+numerotrozo+2+numerodetrozos+3+clavefoto 
        var numerotrozo = token(regla, 1, separadorcampo);
        if (numerotrozo == "-1") { return; }
        enviaFoto(numerotrozo, true, token(regla, 3, separadorcampo));
        return;
      case "LOCALHOST":
        break;
    }
  }
  var tabla = token(regla, 0, separadorcampo);
  var codigo = token(regla, 1, separadorcampo);
  var rr = registro(tabla, codigo, "ultimo", 0, "W");
  recno[rr] = regla;
  var borrarelemento = 0;
  if (diccionario(tabla, "Eliminar") > -1) {
    var xx = registro(tabla, codigo, "Eliminar");
    if ((xx == "1") || (xx == "2")) {
      borrarelemento = 1;
    }
  }
  var elemento = -1;
  var numiconos = Icono.length;
  switch (tabla) {
    case "iconos":

      var estaicono = 0;
      for (k = 0; k < numiconos; k++) {
        if (Icono[k] == codigo) {
          estaicono = 1; estableceTamano(k); break;
        }
        if (borrarelemento) {
          iconoActivo = Icono.findIndex(buscaIcono)
          recno.splice(rr, 1);
          if (iconoActivo > -1) {
            var icon = document.getElementById("IconoNumero" + iconoActivo);
            icon.style.display = "none";
            icon.className = "iconoborrado";
          } else { iconoActivo = 0; }
        }
      }
      if (!estaicono) { Icono[numiconos] = codigo; creaicono(numiconos); muestraIconos(true, "procesa"); }

    case "estados":
      var numiconos = Icono.length;
      var estaicono = 0;
      for (k = 0; k < numiconos; k++) { if (Icono[k] == codigo) { estaicono = 1; estableceTamano(k); break; } }
      break;
    case "generales":
      salvaderecnos();
      for (k = 0; k < numiconos; k++) { estableceTamano(k); }
      break;

    case "planos":
      if (borrarelemento) {
        recno.splice(rr, 1);
      }
      salvaderecnos();
      break;

    case "dispositivos":
      break;
      totalrecnos = recno.length;
      encontrado = -1;
      for (h = 0; h < totalrecnos; h++) {
        if ((token(recno[h], 0, separadorcampo) == "dispositivos") && (token(recno[h], 1, separadorcampo) == codigo)) {
          encontrado = h;
          break;
        }
      }
      if (encontrado == -1) {
        recno.append(regla);
      }
      else { recno[encontrado] = regla }
      break;
    default:
      if (borrarelemento) {
        recno.splice(rr, 1);
      }
      break;
  }

  function buscaIcono(elem) {
    return elem == codigo;
  }
}
//******************************************************************


function registro2(tabla, id, pos, valor, accion) {

  if (isNaN(pos)) { posicion = diccionario(tabla, pos); } else { posicion = pos; }

  function recno2xxx() {
    var recupera = -1;
    for (re = 0; re < recno2.length; re++) {

      if ((token(recno2[re], 0, separadorcampo) == tabla) && (token(recno2[re], 1, separadorcampo) == id)) { return re; }

      if (recno2[re] == "recuperable") { recupera = re; }
    }
    if (accion == "R") { return -1; }
    if (recupera == -1) { re = recno2.length; } else { re = recupera; }
    recno2[re] = tabla + separadorcampo + id + separadorcampo + "P";
    return re;
  }
  var rf = recno2xxx();
  switch (accion) {
    case "R":

      if (rf == -1) { return ""; } else { return token(recno2[rf], posicion, separadorcampo); }
      break;

    case "W":
      var numtok = numtoken(recno2[rf], separadorcampo);
      var tmp = "";
      var sep = separadorcampo;
      var ult = Math.max(posicion, numtok);

      for (kl = 0; kl <= ult; kl++) {
        if (kl == ult) { sep = ""; }
        if (kl == posicion) { tmp = tmp + valor + sep; } else { tmp = tmp + token(recno2[rf], kl, separadorcampo) + sep; }
      }
      recno2[rf] = tmp;
      return valor;
      break;
  }
}
//*********************************************************
function numtoken(cadena, separador) {
  //str.indexOf("locate",50);
  var df = 0;
  var tokens = 0;
  while (df > -1) {
    df = cadena.indexOf(separador, df); if (df > -1) { df++; tokens++; } else { return tokens; }
  }
}
//*********************************************************
function obtencodigo(vector = []) {
  function xxp() {
    var v = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P"];
    return v[Math.floor((Math.random() * 15))] + v[Math.floor((Math.random() * 15))] + v[Math.floor((Math.random() * 15))] + Math.floor((Math.random() * 100));
  }
  var p = xxp();
  while (p in vector) { p = xxp(); }
  return p;
}
//*************************************************
function token(cadena, Numero, separador) {
  var longitud, tok = 0, l = 0, comienza = 0, termina = 0;
  if (typeof (cadena) != "string") { return ""; }
  var r = 0, ls; darlavuelta = false;
  longitud = cadena.length;
  ls = separador.length;
  var cadena1 = "";
  if (Numero < 0) { darlavuelta = true; Numero = Numero * (-1) - 1; cadena = dalavuelta(cadena); separador = dalavuelta(separador); }
  while (l <= Numero) {
    r = cadena.indexOf(separador, comienza);
    if (r == -1) { if (!comienza) { ls = 1; } if (Numero == tok) { if (darlavuelta) { return dalavuelta(cadena.slice(comienza + ls - 1)); } return cadena.slice(comienza + ls - 1); } else { return "" } }
    else {
      termina = r;
      if (Numero == tok) {
        if ((comienza + ls - 2) == termina) { return ""; } else {
          if (!comienza) { ls = 1; }
          if (darlavuelta) { return dalavuelta(cadena.slice(comienza + ls - 1, termina)); }
          return cadena.slice(comienza + ls - 1, termina);
        }
      }
      else {
        comienza = termina + 1;
        tok += 1;
      }
    }
    l++;
  }
  return "token error";
}
//*******************************************************************
function dalavuelta(cadena) {
  var cadaux = "";
  var longitud;
  longitud = cadena.length;
  for (k = 0; k <= longitud; k++) { cadaux += cadena.charAt(longitud - k); }
  return cadaux;
}
//*******************************************************************
function cambiabackslash(caracter, cadena) {
  var longitud = cadena.length, as, cad = "";
  for (i = 0; i <= longitud; i++) {
    as = cadena.charAt(i); if (cadena.charCodeAt(i) == 92) { as = caracter; }
    cad += as;
  }
  return cad;
}

//*******************************************************************
function menuAltas(caso) {// falta arreglar lo del indice
  var num;


    if(caso=='terminar'){
      menuseleccion('posicionar');
      menuseleccion('posicionar');
      return;} 
    else{ 
      num = NombreClase.indexOf(caso);
    }


  var indice = Icono.length;
  /*
  switch (caso) {
    case 'terminar':
      menuseleccion('posicionar');
      menuseleccion('posicionar');
      return;
    case 'Iluminación':
      num = 1;
      break;
    case 'Calefacción':
      num = 2;
      break;
    case 'Persianas':
      num = 3;
      break;
    case 'Estores':
      num = 4;
      break;
    case 'Toldos':
      num = 5;
      break;
    case 'Puertas':
      num = 6;
      break;
    case 'Agua':
      num = 7;
      break;
    case 'Riego':
      num = 8;
      break;
    default:
      num = 0;
      break;
  }
  */
  Icono[indice] = obtencodigo(Icono);
  var imr = registro("clases", caso, "ImagenClase", "", "R");
  var plax = token(nomdibujofondo[planoactivo], 1, separadorlocal);
  registro("iconos", Icono[indice], "Plano", plax, "W");
  registro("iconos", Icono[indice], "Imagen", imr, "W");
  registro("iconos", Icono[indice], "Nombre", NombreClase[num], "W");
  var xx1 = registro("clases", caso, "FraseClase", "", "R");
  registro("iconos", Icono[indice], "Frase", xx1, "W");
  registro("iconos", Icono[indice], "xposi", Math.random() * 20 - 15 + "px", "W");
  registro("iconos", Icono[indice], "yposi", Math.random() * 70 + 50 + "px", "W");
  registro("iconos", Icono[indice], "Ubicacion", "pendiente de asignación", "W");
  registro("iconos", Icono[indice], "Clase", NombreClase[num], "W");
  var formai = registro("clases", caso, "formaClase", "", "R");
  registro("iconos", Icono[indice], "formaicono1", formai, "W");
  creaicono(indice);
}
// *******************************************************************
function menuseleccion(ev) {
  if (semaforo) { return; }
  var opc = ["posicionar", "nuevo", "configurar"];
  var sel;
  var x = document.getElementById("myTopnav");
  var q = x.getElementsByTagName("a");
  var pos;
  var i = 0;
  var str;
  var posi = 0;
  var actual = 0;
  var posicionar = -1;

  for (sel in opc) {
    document.getElementById("nuevo").style.display = "none";
    document.getElementById("configurar1").style.display = "none";

    str = q[i].className;

    pos = str.indexOf("posicionar");
    if (pos > -1) {
      posicionar = i;

    }
    pos = q[i].className.indexOf("active");
    if (pos > -1) {
      q[i].className = str.replace(" active", "");
      actual = i;
    }
    if (opc[i] == ev) {
      q[i].className += " active"; posi = i;
    }

    i++;
  }
  if (marcar) { document.getElementById(elementomarcado).style.visibility = "hidden" }
  elementomarcado = "";
  marcar = false;

  switch (ev) {
    case 'posicionar':
      if (actual != posi) { seleccion1 = "posicionar"; break; }
      if (q[posi].childNodes[0].nodeValue == "Guardar") {

        q[posi].childNodes[0].nodeValue = "Posicionar";
        //funcion guardar()
        seleccion1 = "posicionar";
      } else {
        q[posi].childNodes[0].nodeValue = "Guardar";
        seleccion1 = "guardarposicion";
      }
      break;
    case 'nuevo':
      if (seleccion1 == "guardarposicion") {
        q[actual].childNodes[0].nodeValue = "Posicionar";
        //funcion guardar()
      }
      if (seleccion1 == 'nuevo') { menuseleccion('posicionar'); break; }
      seleccion1 = "nuevo";
      document.getElementById("nuevo").style.display = "block";
      var bor = document.getElementById("myTopnav");
      document.getElementById("nuevo").style.top = bor.clientHeight + 8 + "px";

      break;

    case 'configurar':
      if (seleccion1 == "guardarposicion") {
        q[actual].childNodes[0].nodeValue = "Posicionar";
        //funcion guardar()
      }
      if (seleccion1 == 'configurar') { menuseleccion('posicionar'); break; }
      seleccion1 = "configurar";
      var bor = document.getElementById("myTopnav");
      document.getElementById("configurar1").style.top = bor.clientHeight + 8 + "px";
      document.getElementById("configurar1").style.display = "block";
      break;
    case 'planoanterior':

      if (planoactivo > 0) {
        planoactivo--;
        var plano = document.getElementById("cuadrofondo00");
        var srcplano = document.createAttribute("src");
        srcplano.value = dibujofondo[planoactivo];
        plano.setAttributeNode(srcplano);
        document.getElementById("numplanomenu").innerHTML = planoactivo;
        idopcion("numplanomenu1", planoactivo, "", "selecciona");
      }
      muestraIconos(true, "menuselección planoanterior");
      break;
    case 'planosiguiente':
      if (planoactivo < dibujofondo.length - 1) {
        planoactivo++;
        var plano = document.getElementById("cuadrofondo00");
        var srcplano = document.createAttribute("src");
        srcplano.value = dibujofondo[planoactivo];
        plano.setAttributeNode(srcplano);
        document.getElementById("numplanomenu").innerHTML = planoactivo;
        idopcion("numplanomenu1", planoactivo, "", "selecciona");
      }
      muestraIconos(true, "menuselección planosiguiente");
      break;
    case 'planonumero':

      //planoactivo = document.getElementById("numplanomenu1").value;
      planoactivo = idopcion("numplanomenu1", -1,"", "selecciona");
      var plano = document.getElementById("cuadrofondo00");
      var srcplano = document.createAttribute("src");
      srcplano.value = dibujofondo[planoactivo];
      plano.setAttributeNode(srcplano);
      document.getElementById("numplanomenu").innerHTML = planoactivo;
      muestraIconos(true, "menuselección planonumero");

      break;
  }

  if ((seleccion1 == "guardarposicion") && (q[posicionar].className.indexOf("guardar") == -1)) {
    q[posicionar].className += " guardar";
  }
  if ((seleccion1 != "guardarposicion") && (q[posicionar].className.indexOf("guardar") > -1)) { q[posicionar].className = q[posicionar].className.replace(" guardar", ""); }
}
//******************************************************************
function menuConfigurar(ev) {
  document.getElementById("configurar1").style.display = "none"; //Oculta menús
  switch (ev) {
    case "parametros":
      {
        datos = consultaConfiguracion("OBTIENECONFIGURACION","");
        paraventana("configura.html",JSON.stringify(datos));
        break;
      }

    case "clases":
      {
        document.getElementById("myTopnav").style.display = "none"; //Oculta menús
        document.getElementById("cuadrofondo").style.display = "none"; //Oculta menús
        muestraIconos(false, "menu configurar false");

        var icono0 = document.getElementById("imagenicono"); // Icono Grande
        var formulario = document.getElementById("editaclases");
        var formulario2 = document.getElementById("coloronoff");
        var formulario0 = document.getElementById("editacolorclases");

        formulario.style.display = "block"; // Muestra formulario
        formulario.style.backgroundColor = "rgba(200, 200, 200, 0.9)";
        formulario.style.zIndex = 15;
        formulario.style.display = "block";
        formulario.appendChild(icono0);
        formulario0.appendChild(formulario2);
        document.getElementById("ddefecicono").style.display = "none";

        seleccionaclase(document.getElementById("claseclase"));

      }
      break
    case "general":
      {
        document.getElementById("myTopnav").style.display = "none"; //Oculta menús
        document.getElementById("cuadrofondo").style.display = "none"; //Oculta menús
        muestraIconos(false, "menu configurar false");
        document.getElementById("fondo0").style.display = "none";
        document.getElementById("general").style.display = "block";
        general();
      }
      break
  }
}
//*******************************************************************
function AsignaEventos(elmnt) {
  var pos1, pos2, pos3, pos4, nid;
  document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  document.getElementById(elmnt.id).onmouseover = dragMouseOver;
  document.getElementById(elmnt.id).onmouseout = dragMouseOut;
  // *******************************************************************  
  function dragMouseOut(e) {
    elmnt.style.opacity = opacidad;
    elmnt.style.border = "none";
    elmnt.style.zIndex = "3";

    if (!marcar) { elmnt.style.visibility = "hidden"; }

    var c = elmnt.childNodes;

    c[2].style.visibility = "visible";
    c[2].style.height = tamanoicono + "px";
    c[2].style.width = tamanoicono + "px";
  }
  // ******************************************************************* 
  function dragMouseOver(e) {

    if (!marcar) { elmnt.style.visibility = "visible"; }

    EstableceColorFondoIcono(token(elmnt.id, 1, "cartera"))
    elmnt.style.cursor = "pointer";
    elmnt.style.zIndex = "4";
    if (seleccion1 == "guardarposicion") { elmnt.style.cursor = "move"; }
    var a = incrementotamanoicono * tamanoicono;
    var c = elmnt.childNodes;
    c[2].style.height = a + "px";
    c[2].style.width = a + "px";
    c[2].style.top = 0.3 * a + "px";
    c[3].style.top = 0.3 * a + "px";
    c[3].style.left = "5%";
    c[3].style.position = "absolute";
  }
  // ******************************************************************* 
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  // *******************************************************************
  function elementDrag(e) {
    if ("guardarposicion" == seleccion1) {
      e = e || window.event;
      e.preventDefault;
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      var p6 = (elmnt.offsetTop - pos2) + "px";
      var p7 = (elmnt.offsetLeft - pos1) + "px";

      elmnt.style.top = p6;
      elmnt.style.left = p7;

    }
  }
  //*******************************************************************   
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      if (!f.type.match('image.*')) { continue; }
      var reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          document.getElementById("cuadroprogreso").style.display = "block";
          enviaFoto(e.target.result, false)
          cambiaImagen(0);
        };
      })(f);
      reader.readAsDataURL(f);
    }
  }
  //******************************************************************
  function enviaFoto(foto1 = "", estrozo = false, clavefoto = "", cancela = false) {
    var clcancela = false;
    if (cancela) {
      clavefoto = document.getElementById("NombreFicherodeDescarga").innerHTML;
      n = -1;
      numtrozos = 0;
      enviadatos(envoltorio + "FOTOS" + separadorcampo + String(n) + separadorcampo + String(numtrozos) + separadorcampo + clavefoto + separadorcampo + "Cancela" + separadorcampo);
      document.getElementById("cuadroprogreso").style.display = "none";
      return;
    }
    
    var k = 0;
    var h = tamtrozo;
    var n = 0;
    if (estrozo) {
      
      n = parseInt(foto1) + 1;//si es trozo foto1 es el número y si no es la cadena completa 
      var numtrozos = datosfoto[clavefoto].ntrozos;
      var i = n / numtrozos;
      var barra = document.getElementById("barraprogreso");
      barra.setAttribute("value", i * 100);
      document.getElementById("sbarraprogreso").innerHTML = parseInt(100 * i) + " %";
      k = n * tamtrozo;
      h = k + tamtrozo;
      var trozo = datosfoto[clavefoto].contenido.slice(k, h);
      if (trozo == "") {
        var path = pathImagentext.slice(0, pathImagentext.length - 7);
        muestraImagen(path + clavefoto + "." + datosfoto[clavefoto].extension);
        document.getElementById("cuadroprogreso").style.display = "none";
        return;
      }
    } else {
      var clavefoto = obtencodigo() + obtencodigo();
      document.getElementById("NombreFicherodeDescarga").innerHTML = clavefoto;
      var numtrozos = parseInt((foto1.length + tamtrozo - 1) / tamtrozo) - 1;
      var extension = foto1.slice(11, 25);
      extension = token(extension, 0, ";bas");
      datosfoto[clavefoto] = { contenido: foto1, ntrozos: numtrozos, extension: extension };
      var trozo = foto1.slice(k, h);
      if (trozo == "") { return; }
    }
    enviadatos(envoltorio + "FOTOS" + separadorcampo + String(n) + separadorcampo + String(numtrozos) + separadorcampo + clavefoto + separadorcampo + trozo + separadorcampo);
  }
  //******************************************************************
  function LanzaDatos() {
    //if (!(procesoactivo in  ["general","principal"])){return;}
    compruebaImagenes();
    
    if (document.getElementById("myTopnav").style.display == "none") { ; } else {
      enviadatos("");
    }
  }
  //******************************************************************
  function salmensaje2() {
    document.getElementById("mensaje2").style.display = "none";
  }
  //******************************************************************
  function salmensaje() {
    document.getElementById("mensaje").style.display = "none";
    enviadatos("");
  }
  //******************************************************************
  window.onclick = function (event) {
    if (event.target.id == "cuadro" || event.target.id == "cuadrofondo00" || event.target.id == "fondo00" || event.target.id == "") {
      //document.getElementById("mensaje").style.display = "none";
      posicionaricono(event.target);
      if (!(seleccion1 == "guardarposicion" || seleccion1 == "posicionar")) { menuseleccion("posicionar"); }
    }
  }
  //******************************************************************
  function salvaderecnos() {
    idopcion("numplanomenu1", -1, "", "borra");
    dibujofondo = [];
    nomdibujofondo = [];
    iddibujofondo = [];
    FiltraRegistros("planos");
    AsignaDatos();
    rellenanombreplanoicono();
  }
  //******************************************************************
  function paraventana2(hoja){
    if (hoja == "") { document.getElementById("mensaje2").style.display = "none"; return; }
    mesa=document.getElementById("webmensaje2");
    
    var parasrc = document.createAttribute("src");
    parasrc.value=hoja;
    mesa.setAttributeNode(parasrc);
    document.getElementById("mensaje2").style.display = "block";
    return
  }
  //******************************************************************
  function paraventana(hoja,ref=""){
    if (hoja == "") { document.getElementById("mensaje").style.display = "none"; return; }
    mesa=document.getElementById("webmensaje");
    
    var parasrc = document.createAttribute("src");
    parasrc.value=hoja;
    if (typeof(Storage) == "undefined") {
      ref="";
      alert("El navegador no es compatible con la ayuda. Pruebe con otro dispositivo que tenga Google o Crome")
    }
    if (hoja =="configura.html"){ayudaActiva[0]="parametros del programa";}
    if (hoja =="parametrosPersiana.html"){ayudaActiva[0]="dispositivo persiana";}
    sessionStorage.setItem("dato",ref);
  
    mesa.setAttributeNode(parasrc);
    document.getElementById("mensaje").style.display = "block";
    return
  }
  //******************************************************************
  function paraventanaSelf(obj){
    ref={};
    switch(obj.id){
      case "parametrosPersiana.html":
        valor =  idopcion("enlaceicono", -1, "", "obtiene");
        if ("enlace"==token(valor,1," ")){ return;}
        ref["CODIGO"]=valor;
        ref["TIPO"]=registro("dispositivos", valor, "tipo", "", "R");
        ref["CPU"]=registro("dispositivos", valor, "cpu", "", "R");
        ref["TPERSIANA"]=registro("dispositivos", valor, "paramdsp", "", "R");
        ref["TENTRADA"]=tipodsp(ref["TIPO"],0)
        ref["TSALIDA"]=tipodsp(ref["TIPO"],1)
        return paraventana(obj.id,JSON.stringify(ref));
      }
  }
  //******************************************************************
  function obtieneConfiguracion(datos){

    hj= document.getElementsByClassName("estdsp"); // se trata de la web estadodispositivos.html

    if (hj.length>0){
      hj[0].innerHTML=datos["TABLAEVENTOS"];
    }

    elementos=document.getElementsByTagName("input");
    for (elemento in elementos){
      tp = elementos[elemento].type;
      if ( tp == "text" || tp=="number"|| tp=="email"){
        if (elementos[elemento].name in datos){ 
        elementos[elemento].value=datos[elementos[elemento].name];
    }}}
    // hoja de datos de precio por hora
    hve=document.getElementsByClassName("HVE");
	
  if (hve.length>0){
    for (elemento in hve){
      hve[elemento].value=conviertenum(datos["TablaHorasHoy"][elemento],4);
    }
    
		document.getElementById("phve").innerHTML="Precio Horas en "+datos["DIATARIFAShoy"]+":"
	
    hvem=document.getElementsByClassName("HVEM");
    cumanana=document.getElementById("phvemanana");

    var e = new Date();
    var d = new Date(e.getFullYear(),e.getMonth(),e.getDate()+1);
    if (datos["DIATARIFASManana"]==formatfecha2(d)){
      document.getElementById("phvecuadro").style.visibility = "visible";
      cumanana.innerHTML=" Mañana "
    }else{document.getElementById("phvecuadro").style.visibility = "hidden";}

    for (elemento in hvem){
      hvem[elemento].value=conviertenum(datos["TablaHorasManana"][elemento],4);
    }
	}
}
  //********************************************************************************
  function conviertenum(num, digitos){
    exp = Math.pow(10,digitos);
    num=exp*num;
    return parseInt(num,10)/exp;
  }
  //********************************************************************************
  function ayuda(refid) {
    ref = refid.id;
    if (ref=="AyudaParametros"){
      ref = ayudaActiva[0];
    }
    if (token(ref,0,separadorlocal)=="informaPreLuz1"){
      datos = consultaConfiguracion("OBTIENECONFIGURACION","");
      //paraventana2("PrecioHorasVE.html");
      paraventana("PrecioHorasVE.html",JSON.stringify(datos));
      return;
    }
    var relaciones={};
    relaciones["myTopnav"]="_Toc98879062";
    relaciones["relaciones"]="_Toc98879111";
    relaciones["programacion_de_tiempos"]="_Toc98879106";
    relaciones["ayudamenugeneral"]="_Toc98879062";
    relaciones["definicion de clases"]="_Toc98879091";
    relaciones["edicion de iconos"]="_Toc98879072";
    relaciones["configuracion de planos"]="_Toc98879092";
    relaciones["parametros del programa"]="_Toc98879123";
    relaciones["dispositivo persiana"]="_Toc39258806";

    referencia="";
    if (ref in relaciones){referencia=relaciones[ref];}
    paraventana2("Memoria%20del%20proyecto2.htm#"+referencia);
   return;
  }
  //******************************************************************
  function accionprograma(v) {
    var a, b;
    if (token(v.id, 0, separadorlocal) == "dttmpv1") {
      a = token(v.id, 1, "dttmpv1");
      b = "dttmpv1imagen";
    } else {
      a = token(v.id, 1, "dttmpv1imagen");
      b = "dttmpv1";
      if (a.value > 100) { a.value = 100; }
      if (a.value < 0) { a.value = 0; }
    }

    var cv = document.getElementById(b + a);
    cv.value = v.value;
  }
  //******************************************************************
  function muestraconjuntoprogramas() { // cada vez que se accede a esta ventana, se crean o reciclan segmentos para 
    // ver las programaciones del icono. Existen tantos segmentos (objetos de programas) activos como el creado en el
    // acceso con mayor número de programaciones. Estos segmentos, se rellenan con los nuevos datos o bien se ocultan.

    document.getElementById("cajaprograma").style.display = "inline-block";
    var segmentos = document.getElementsByClassName("cajasalargadas");
    var numsegmentos = segmentos.length; // programas disponibles.
    var codpr = obtieneconjuntoprogramas(); //Obtiene los programas activos del registro general
    var programastotales = codpr.length; // programas que hay que mostar.
    var tfb = "";
    var a = programasborrados.length;
    for (x =0; x<a; x++){
      programasborrados.pop();
    }

    for (x = 0; x < numsegmentos; x++) { // inicializa los segmentos y los oculyta
      //rellenablancosprogramas(tfb);
      document.getElementById("cajaprogramaC" + tfb).style.display = "none";
      tfb = tfb + separadorlocal;}
    for (x = 0; x < programastotales; x++) { // crea las lineas de programa que hacen falta
      rellenaprogramacion(nuevalineaprograma(),codpr[x]);
    }
    if (programastotales==0){nuevalineaprograma();}
  }
  //************************************************************
  function rellenablancosprogramas(finalt) {

    var tmpdia;
    var selector;
    try {
      document.getElementById("formasdetiempos1" + finalt).value = 0;
    } catch (error) {
      document.getElementById("tx").innerHTML = error;
      //console(error)
    }

    document.getElementById("dttmp1" + finalt).value = "";
    document.getElementById("segft1" + finalt).value = "";
    document.getElementById("dttma1" + finalt).value = "";
    document.getElementById("dttmb1" + finalt).value = "";
    tmpdia = document.getElementById("cuadrodial1" + finalt);
    { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiam1" + finalt);
    { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiax1" + finalt);
    { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiaj1" + finalt);
    { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiav1" + finalt);
    { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodias1" + finalt);
    { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiad1" + finalt);
    { seleccionadiaxx(tmpdia, false); }
    document.getElementById("validadesde" + finalt).value = "";
    document.getElementById("validahasta" + finalt).value = "";
    
    document.getElementById("dttmpv1" + finalt).value = 0;
    document.getElementById("dttmpv1imagen" + finalt).value = 0;
    //var cod;
    //if (finalt.length == 0) { cod = ""; } else { cod = obtencodigogramacion(); }
    //cod = obtencodigogramacion();
    //document.getElementById("codigoprograma1" + finalt).innerHTML = cod;
    //document.getElementById("codigoprograma0" + finalt).innerHTML = CodiconoActivo;
    var lista1 = document.getElementById("listamuestrafecha1qwert" + finalt);
    while (lista1.options.length) { lista1.remove(0); }
    var lista1 = document.getElementById("listamuestrafecha2qwert" + finalt);
    while (lista1.options.length) { lista1.remove(0); }
  }
  //************************************************************
  function obtieneconjuntoprogramas() {// icono + clave programa. Obtiene los programas guardados en el registro general
    var clave;
    function sonlineasdeprograma(reg) { //"CodiconoActivo" es el identiofocador del icono activo por el que se accede a la programación
      // Los registros de programa disponen de una clave principal compuesta por el icono y la clave del programa
      // Obtener el conjunto de programas se hace mediante un filtro
      clave = token(reg, 1, separadorcampo);
      return (token(reg, 0, separadorcampo) == "programas") && (!EstaBorrado("programas", clave)) && (token(clave, 0, separadorlocal) == CodiconoActivo);
    }
    var linok = [];
    var codok = [];
    linok = recno.filter(sonlineasdeprograma); // array de programas del icono
    var numlinok = linok.length;
    for (p = 0; p < numlinok; p++) {
      codok[p] = token(linok[p], 1, separadorcampo); // obtiene los códigos de cada programa de un icono
    }
    return codok;
  }
  //************************************************************
  function nuevalineaprograma() {

    var ctolineas = document.getElementsByClassName("cajasalargadas");
    var todoslossegmentos = ctolineas.length; // Obtiene el conjunto de segmentos 
    var ocultos = 0;
    var primero;
    var finalt="";
    for (segmento=0;segmento<todoslossegmentos;segmento++) {
      if (ctolineas[segmento].style.display == "none") {
        ocultos++;
        if (ocultos == 1) { ctolineas[segmento].style.display = "grid";
        var ific=token( ctolineas[segmento].id,0,separadorlocal);
        finalt=token(ctolineas[segmento].id,1,ific);
        break; }// Recupera un oculto
      }
    } // obtiene el conjunto de ocultos
    if (ocultos == 0) {// no hay ocultos por lo que se ha de crear uno nuevo
      var cuadro = document.getElementById("cajaprograma");
      //var cajaprogramac = document.getElementById("cajaprogramaC");
      var cajaprogramac = ctolineas[0];
      var caja0 = document.createElement("div");
      var clcaja0 = document.createAttribute("class");
      clcaja0.value = "cajasalargadas";
      caja0.innerHTML = cajaprogramac.innerHTML;// esto copia todos los elementos del segmento
      caja0.setAttributeNode(clcaja0);
      caja0.id=cajaprogramac.id;
      cuadro.appendChild(caja0); // tengo un segmento nuevo. Falta cambiar las Id.
      // obtengo todos los segmentos 
      var Objp = caja0.getElementsByTagName("*"); // de un segemento, considero todos los objetos que lo forman
      //var totalsegmentos = ncaja.length;
      for (n=0;n<todoslossegmentos;n++){
        finalt=finalt+separadorlocal;
      }
      caja0.id = caja0.id+ finalt;
      numObjp = Objp.length;
      for (j = 0; j < numObjp; j++) {
        if (Objp[j].id) {
          Objp[j].id = Objp[j].id + finalt;
        }
      }
    }
    rellenablancosprogramas(finalt);
    var codprograma = document.getElementById("codigoprograma1" + finalt);
    document.getElementById("codigoprograma0" + finalt).innerHTML = CodiconoActivo;
    var se = document.getElementById("formasdetiempos1" + finalt);
    selectordetiempos(se); // CONTROLA LOS CAMPOS VISIBLES EN BASE A LA SELECCION
    codprograma.innerHTML = obtencodigogramacion();
    return codprograma;
  }
  //************************************************************
  function obtencodigogramacion() {
    var ctolineas1 = [];
    var ctolineas;
    ctolineas = document.getElementsByClassName("codigodeprograma");
    var tope = ctolineas.length;
    for (h = 0; h < tope; h++) { ctolineas1[h] = ctolineas[h].innerHTML; }
    return obtencodigo(ctolineas1);
  }
  //************************************************************
  function rellenaprogramacion(objeto,clavepr) { //Con la clave de cada programa y el identificativo del segmento en 
    cod1   = token(objeto.id,0,separadorlocal);
    finalt = token(objeto.id,1,cod1);
    //clavepr= CodiconoActivo + separadorlocal + cod1;
    // la ventana se rellenan los atributos de los objetos de programas.
    var bn;
    //var cuadro=document;
    var tmpdia;
    var selector = document.getElementById("formasdetiempos1" + finalt);
    bn = registro("programas", clavepr, "tipodeconexion", "", "R");
    if (bn) { selector.value = bn; } else { selector.value = 0; }
    selectordetiempos(selector);
    document.getElementById("dttmp1" + finalt).value = registro("programas", clavepr, "horadeconexion", "", "R");
    document.getElementById("segft1" + finalt).value = registro("programas", clavepr, "minutodeconexion", "", "R");
    document.getElementById("dttma1" + finalt).value = registro("programas", clavepr, "HorasVEHasta", "", "R");
    document.getElementById("dttmb1" + finalt).value = registro("programas", clavepr, "HorasVE", "", "R");
    tmpdia = document.getElementById("cuadrodial1" + finalt);
    if (registro("programas", clavepr, "lunesdeconexion", "", "R") == "1") { seleccionadiaxx(tmpdia, true); } else { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiam1" + finalt);
    if (registro("programas", clavepr, "martesdeconexion", "", "R") == "1") { seleccionadiaxx(tmpdia, true); } else { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiax1" + finalt);
    if (registro("programas", clavepr, "miercolesdeconexion", "", "R") == "1") { seleccionadiaxx(tmpdia, true); } else { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiaj1" + finalt);
    if (registro("programas", clavepr, "juevesdeconexion", "", "R") == "1") { seleccionadiaxx(tmpdia, true); } else { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiav1" + finalt);
    if (registro("programas", clavepr, "viernesdeconexion", "", "R") == "1") { seleccionadiaxx(tmpdia, true); } else { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodias1" + finalt);
    if (registro("programas", clavepr, "sabadodeconexion", "", "R") == "1") { seleccionadiaxx(tmpdia, true); } else { seleccionadiaxx(tmpdia, false); }
    tmpdia = document.getElementById("cuadrodiad1" + finalt);
    if (registro("programas", clavepr, "domingodeconexion", "", "R") == "1") { seleccionadiaxx(tmpdia, true); } else { seleccionadiaxx(tmpdia, false); }
    document.getElementById("validadesde" + finalt).value = registro("programas", clavepr, "validadesde", "", "R");
    document.getElementById("validahasta" + finalt).value = registro("programas", clavepr, "validahasta", "", "R");
    document.getElementById("dttmpv1" + finalt).value = registro("programas", clavepr, "valoraccion", "", "R");
    accionprograma(document.getElementById("dttmpv1" + finalt));
    document.getElementById("codigoprograma1" + finalt).innerHTML = registro("programas", clavepr, "codigoprograma", "", "R");
    document.getElementById("codigoprograma0" + finalt).innerHTML = token(registro("programas", clavepr, "Icono", "", "R"), 0, separadorlocal);
    var incdias = registro("programas", clavepr, "incluyedias", "", "R");
    var nto = numtoken(incdias, separadorlocal);
    var lista1 = document.getElementById("listamuestrafecha1qwert" + finalt);
    while (lista1.options.length) {
      lista1.remove(0);
    }
    for (t = 0; t < nto + 1; t++) {
      var ttxt = token(incdias, t, separadorlocal);
      if (ttxt.length==0){continue;}
      var c = document.createElement("option");
      c.text=ttxt;
      lista1.options.add(c, t);
    }
    var incdias = registro("programas", clavepr, "excluyedias", "", "R");
    var nto = numtoken(incdias, separadorlocal);
    var lista1 = document.getElementById("listamuestrafecha2qwert" + finalt);
    while (lista1.options.length) {
      lista1.remove(0);
    }
    for (t = 0; t < nto + 1; t++) {
      var ttxt = token(incdias, t, separadorlocal);
      if (ttxt.length==0){continue;}
      var c = document.createElement("option");
      c.text=ttxt;
      lista1.options.add(c, t);
    }
  }
  //************************************************************
  function seleccionadiaxx(dia, valor) {
    var str = dia.getAttribute("class");
    if (valor) { str = "cuadrodia diaselect"; } else { str = "cuadrodia"; }
    var nm = document.createAttribute("class");
    nm.value = str;
    dia.setAttributeNode(nm);
  }
  //************************************************************
  function insertafechapr(fe) {
    var str = token(fe.id, 0, "qwert"); // Esta cadena identifica la orden dada por primera parte del ID del objeto
    // con esa cadena se puede acceder a los demás objetos que hay que modificar
    var finaltok = token(fe.id, 1, "qwert");
    var obtenfe1 = document.getElementById("datodetiempos1qwert" + finaltok);
    var obtenfe2 = document.getElementById("datodetiempos2qwert" + finaltok);

    switch (str) {
      case "aceptafecha1":

        if (!obtenfe1.value) { return; }
        var li = document.createElement("option");
        li.innerHTML = obtenfe1.value;
        document.getElementById("listamuestrafecha1qwert" + finaltok).appendChild(li);
        break;
      case "eliminafecha1":
        var li = document.getElementById("listamuestrafecha1qwert" + finaltok);
        if (li.selectedIndex < 0) { li.remove(li.length - 1); } else { li.remove(li.selectedIndex); }

        break;
      case "aceptafecha2":
        if (!obtenfe2.value) { return; }
        var li = document.createElement("option");
        li.innerHTML = obtenfe2.value;
        document.getElementById("listamuestrafecha2qwert" + finaltok).appendChild(li);
        break;
      case "eliminafecha2":
        var li = document.getElementById("listamuestrafecha2qwert" + finaltok);
        if (li.selectedIndex < 0) { li.remove(li.length - 1); } else { li.remove(li.selectedIndex); }
        break;
      case "eliminaprograma1":
        //rellenablancosprogramas(finaltok); // se elimina todo excepto ("codigoprograma1" + finalt) que se usa
        // para eliminar el registro de la tabla cuando se salva

        var codpr = document.getElementById("codigoprograma1" + finaltok).innerHTML; // obtiene el código del segmento que lo identificará en registros
        var clavepr = CodiconoActivo + separadorlocal + codpr; 
        // clave de registro formada por ICONO + Clave de programa
        // Esta clave relaciona los elementos guardados en el registro con los segmentos visibles
        // clavepr es el ID del programa y esta formada por el id del icono + id de la clave de proegrama (redundancia de clave)
        if (document.getElementById("cajaprogramaC" + finaltok).style.display != "none") {
          if(registro("programas", clavepr, "ultimo","", "R")!=""){programasborrados.push(clavepr);}} //Añade el código de borrado}
        document.getElementById("cajaprogramaC" + finaltok).style.display = "none";
        break;
    }
  }
  //******************************************************
  function salvarlineaprograma(ev) { // Salva los bloques visibles.

   
    var cuadro = document.getElementById("cajaprograma");
    if (ev.id == "guardardatospr") {
      var codpr = obtieneconjuntoprogramas();
      var programastotales = codpr.length;
       // Borra los registros incluidos en programasborrados.
       var a = programasborrados.length;
      for (x =0; x<a; x++){
      clavepr = programasborrados.pop();
      registro("programas", clavepr, "Eliminar", 1, "W");
    }
      var codigosprograma = document.getElementsByClassName("cajasalargadas");
      var numcodigosprograma = codigosprograma.length;
      var finntpr;
      var xlp;

      for (h = 0; h < numcodigosprograma; h++) {
        //ntpr = numtoken(codigosprograma[h].id, separadorlocal);
        finntpr = token(codigosprograma[h].id, 1, "cajaprogramaC");
        xlp = document.getElementById("cajaprogramaC" + finntpr);
        var codpr1 = xlp.innerHTML;
        evaluaSegmento(xlp);
      }
    }

    cuadro.style.display = "none";

    //**********añadido respecto el general
    document.getElementById("myTopnav").style.display = "block"; //menús, vuelve a mostrarlos
    document.getElementById("cuadrofondo").style.display = "block";
    muestraIconos(true, "general planos guardageneral");
    document.getElementById("fondo0").style.display = "block";
    //**********
  }
  //******************************************************
  function sumafecha(fecha, cantidad, tipo, devuelve) {
    var d;
    var ms;
    if (fecha == "ahora") {
      d = new Date();
      ms = d.getTime();
    } else { d = new Date(fecha); ms = d.getTime(); }

    switch (tipo) {
      case "minutos":
        ms = 60000 * cantidad + ms
        break;
      case "horas":
        ms = 60 * 60000 * cantidad + ms
        break;
      case "dias":
        ms = 24 * 60 * 60000 * cantidad + ms
        break;
      case "meses":
        ms = 30 * 24 * 60 * 60000 * cantidad + ms
        break;
      case "años":
        ms = 365.25 * 24 * 60 * 60000 * cantidad + ms
        break;
    }

    var re = new Date(ms);
    fec = formatfecha(ms);
    switch (devuelve) {
      case 'fecha':
        return fec;
        break;
      case 'horas':
        return re.getHours();
        break;
      case 'minutos':
        return re.getMinutes();
        break;

    }
    
    
  }
  function formatfecha(ms) {
    var re = new Date(ms);
    var ano = re.getFullYear();
    var mes = re.getMonth() + 1;
    var dia = re.getDate();
    if (mes < 10) { mes = '0' + mes; }
    if (dia < 10) { dia = '0' + dia; }
    var str = new String(dia + '-' + mes + '-' + ano);
    return str;
  }
  function formatfecha2(ms) {

    var re = new Date(ms);
    var ano = re.getFullYear();
    var mes = re.getMonth() + 1;
    var dia = re.getDate();
    if (mes < 10) { mes = '0' + mes; }
    if (dia < 10) { dia = '0' + dia; }
    var str = new String(ano + '-' + mes + '-' + dia);
    return str;

  }
  //******************************************************************
  function evaluaSegmento(segmento) { // registra y evalúa los datos de un segmento
    var ref1 = token(segmento.id, 0, separadorlocal); // obtiene el identificado de segmento de JS
    var finntpr = token(segmento.id, 1, ref1); // Obtiene el orden de segmento en la 
    // ventana = número de posición del segmento como número de veces que se repite "separadorlocal"
    var codpr = document.getElementById("codigoprograma1" + finntpr).innerHTML; // obtiene el código del segmento que lo identificará en registros
    var whoras;
    var wminutos;
    var wdesde;
    var elementossegmento = segmento.getElementsByTagName("*"); // obtiene todos los elementos del segmento
    var numelementos = elementossegmento.length;
    var clavepr = CodiconoActivo + separadorlocal + codpr; // clave de registro formada por ICONO + Clave de programa
    // Esta clave relaciona los elementos guardados en el registro con los segmentos visibles
    // clavepr es el ID del programa y esta formada por el id del icono + id de la clave de proegrama (redundancia de clave)
    if (segmento.style.display == "none") {
      //registro("programas", clavepr, "Eliminar", 1, "W");
      return;
    }
    registro("programas", clavepr, "ultimo", 0, "W");
    opcioncero = 0;
    horasopc0 = 0;
    minutosopc0 = 0;

    for (w = 0; w < numelementos; w++) { // cada elemnto del segmento se evalúa y se registra en la tabla general
      objetopantalla = elementossegmento[w].id;

      if (objetopantalla) {
        odp = token(objetopantalla, 0, separadorlocal);
        if (odp == "formasdetiempos1") {
          if (elementossegmento[w].value == '0') { opcioncero = 1; } // Si la opción elegida es la 0, se ha de generar un nuevo registro con el valor puntual exacto
        }
        if (opcioncero) {
          if (odp == "formasdetiempos1") { elementossegmento[w].value = '1'; }
          if (odp == "dttmp1") { horasopc0 = elementossegmento[w].value; whoras = w; }
          if (odp == "segft1") { minutosopc0 = elementossegmento[w].value; wminutos = w; }
          if (odp == "validadesde") {
            var bx = (horasopc0 * 1 + minutosopc0 / 60);
            elementossegmento[whoras].value = sumafecha('ahora', bx, 'horas', 'horas');
            elementossegmento[wminutos].value = sumafecha('ahora', minutosopc0, 'minutos', 'minutos');
            elementossegmento[w].value = sumafecha('ahora', bx, 'horas', 'fecha'); wdesde = w;
          }

          if (odp.slice(0, 9) == "cuadrodia") {
            var nm = document.createAttribute("class");
            nm.value = "cuadrodia diaselect";
            elementossegmento[w].setAttributeNode(nm);
          }

          if (odp == "validahasta") { elementossegmento[w].value = elementossegmento[wdesde].value }
        }

        if (opcioncero == 0) { evalIdprogramacion(elementossegmento[w], codpr); } // registro de un elemento del segmento en la tabla general
      }
    }
    if (opcioncero) { evaluaSegmento(segmento); return; }
    // si hora y minutos es blanco, se borra el registro
    registro("programas", clavepr, "ultimo", 1, "W");

  }
  //******************************************************
  function evalIdprogramacion(idp, codpr) { // Evalua y registra cada cuadrado de 
    //la ventana de Programación

    odp = token(idp.id, 0, separadorlocal);
    regla = idp.value;
    var clavepr = CodiconoActivo + separadorlocal + codpr;
    switch (odp) {
      case "formasdetiempos1":
        registro("programas", clavepr, "tipodeconexion", regla, "W");
        break;
      case "dttmp1":
        registro("programas", clavepr, "horadeconexion", regla, "W");
        break;
      case "segft1":
        registro("programas", clavepr, "minutodeconexion", regla, "W");
        break;
      case "dttma1":
        registro("programas", clavepr, "HorasVEHasta", regla, "W");
        break;
      case "dttmb1":
        registro("programas", clavepr, "HorasVE", regla, "W");
        break;
      case "cuadrodial1":
        regla = 0;
        if (idp.getAttribute("class").indexOf(" diaselect") > -1) { regla = 1; }
        registro("programas", clavepr, "lunesdeconexion", regla, "W");
        break;
      case "cuadrodiam1":
        regla = 0;
        if (idp.getAttribute("class").indexOf(" diaselect") > -1) { regla = 1; }
        registro("programas", clavepr, "martesdeconexion", regla, "W");
        break;
      case "cuadrodiax1":
        regla = 0;
        if (idp.getAttribute("class").indexOf(" diaselect") > -1) { regla = 1; }
        registro("programas", clavepr, "miercolesdeconexion", regla, "W");
        break;
      case "cuadrodiaj1":
        regla = 0;
        if (idp.getAttribute("class").indexOf(" diaselect") > -1) { regla = 1; }
        registro("programas", clavepr, "juevesdeconexion", regla, "W");
        break;
      case "cuadrodiav1":
        regla = 0;
        if (idp.getAttribute("class").indexOf(" diaselect") > -1) { regla = 1; }
        registro("programas", clavepr, "viernesdeconexion", regla, "W");
        break;
      case "cuadrodias1":
        regla = 0;
        if (idp.getAttribute("class").indexOf(" diaselect") > -1) { regla = 1; }
        registro("programas", clavepr, "sabadodeconexion", regla, "W");
        break;
      case "cuadrodiad1":
        regla = 0;
        if (idp.getAttribute("class").indexOf(" diaselect") > -1) { regla = 1; }
        registro("programas", clavepr, "domingodeconexion", regla, "W");
        break;
      case "validadesde":
        registro("programas", clavepr, "validadesde", regla, "W");
        break;
      case "validahasta":
        registro("programas", clavepr, "validahasta", regla, "W");
        break;
      case "dttmpv1":
        registro("programas", clavepr, "valoraccion", regla, "W");
        break;
      case "codigoprograma1":
        registro("programas", clavepr, "codigoprograma", codpr, "W");
        break;
      case "listamuestrafecha1qwert":
        var nf = idp.options.length;
        regla = "";
        for (q = 0; q < nf; q++) { if (idp.options[q].value) { regla = regla + idp.options[q].value + separadorlocal; } }
        registro("programas", clavepr, "incluyedias", regla, "W");
        break;
      case "listamuestrafecha2qwert":
        regla = "";
        var nf = idp.options.length;
        for (q = 0; q < nf; q++) { if (idp.options[q].value) { regla = regla + idp.options[q].value + separadorlocal; } }
        registro("programas", clavepr, "excluyedias", regla, "W");
        break;
    }
  }
  //************************************************************
  function seleccionadia(dia) {
    var str = dia.getAttribute("class");
    if (str.indexOf(" diaselect") > -1) { str = "cuadrodia"; } else { str = str + " diaselect"; }
    var nm = document.createAttribute("class");
    nm.value = str;
    dia.setAttributeNode(nm);
  }
  //************************************************************
  function selectordetiempos(selector) {
    var finaltok = token(selector.id, 1, "formasdetiempos");
    var tiempo = document.getElementById("segft" + finaltok);
    var dia = [];
    dia[0] = document.getElementById("cuadrodial" + finaltok);
    dia[1] = document.getElementById("cuadrodiam" + finaltok);
    dia[2] = document.getElementById("cuadrodiax" + finaltok);
    dia[3] = document.getElementById("cuadrodiaj" + finaltok);
    dia[4] = document.getElementById("cuadrodiav" + finaltok);
    dia[5] = document.getElementById("cuadrodias" + finaltok);
    dia[6] = document.getElementById("cuadrodiad" + finaltok);
    var horaHasta = document.getElementById("dttma" + finaltok);
    var horas = document.getElementById("dttmb" + finaltok);


    //tiempo.style.display = "inline-block";

    for (k = 0; k < 7; k++) {
      if (!(selector.value == 0)) {
        dia[k].style.display = "inline-block";
      } else { dia[k].style.display = "none"; }
    }
    if(selector.value == 4){
      horaHasta.style.display = "inline-block";
      horas.style.display = "inline-block";
      tiempo.style.display = "none";
      document.getElementById("NOVE" + finaltok).style.display = "none";
      document.getElementById("VE" + finaltok).style.display = "inline-block";
      document.getElementById("ONOFF" + finaltok).style.display = "none";
      document.getElementById("ONOFFlabel" + finaltok).style.display = "inline-block";
    }else{
      horaHasta.style.display = "none";
      horas.style.display = "none";
      tiempo.style.display = "inline-block";
      document.getElementById("VE" + finaltok).style.display = "none";
      document.getElementById("NOVE" + finaltok).style.display = "inline-block";
      document.getElementById("ONOFF" + finaltok).style.display = "inline-block";
      document.getElementById("ONOFFlabel" + finaltok).style.display = "none";
    }
  }
  //******************************************************************
  //******************************************************************
  //******************************************************************
  //************     CLASES             ******************************
  //******************************************************************
  //******************************************************************
  //******************************************************************
  //******************************************************************
  function rellenaNombresclase() {
    NombreClase[1] = "Iluminación";
    NombreClase[2] = "Puertas";
    NombreClase[3] = "Agua";
    NombreClase[4] = "Riego";
    NombreClase[5] = "Calefacción";
    NombreClase[6] = "Persianas";
    NombreClase[7] = "Estores";
    NombreClase[8] = "Toldos";
    NombreClase[0] = "Otros";
    for (jk = 0; jk < NombreClase.length; jk++) {
      var opcion0 = document.createElement("option");
      var opcion1 = document.createElement("option");

      opcion0.text = NombreClase[jk];
      opcion0.value = NombreClase[jk];
      opcion1.text = NombreClase[jk];
      opcion1.value = NombreClase[jk];


      document.getElementById("claseicono").options.add(opcion0);
      document.getElementById("claseclase").options.add(opcion1);
    }
  }
  //***********************************************************************
  function establecedatospordefecto() {
    var num = -1;
    var ev = document.getElementById("claseicono");
    for (i = 0; i < NombreClase.length; i++) { if (NombreClase[i] == ev.value) { num = i; break; } }
    if (num == -1) { return; }

    //formaicono[iconoActivo]=formaClase[num];
    formaicono[iconoActivo] = registro("clases", ev.value, "formaClase", "", "R");
    var icono1 = document.getElementById("imagen1icono"); // Icono pequeño
    var icono0 = document.getElementById("imagenicono"); // Icono Grande
    var accion = token(formaicono[iconoActivo], 2, "|");
    var src = document.createAttribute("src");
    var src1 = document.createAttribute("src");
    //src.value=ImagenClase[num];
    //src1.value=ImagenClase[num];
    src.value = registro("clases", ev.value, "ImagenClase", "", "R");
    src1.value = registro("clases", ev.value, "ImagenClase", "", "R");


    icono1.setAttributeNode(src1);
    icono0.setAttributeNode(src);

    document.getElementById("colonicono").value = token(formaicono[iconoActivo], 0, "|");
    document.getElementById("coloficono").value = token(formaicono[iconoActivo], 1, "|");
    document.getElementById("fileticono").value = "";
    document.getElementById("anchoicono").value = token(accion, 0, ",") * 100;
    document.getElementById("giroxicono").value = token(accion, 1, ",") * 100;
    document.getElementById("giroyicono").value = token(accion, 2, ",") * 100;
    document.getElementById("altoicono").value = token(accion, 3, ",") * 100;
    document.getElementById("bandaicono").value = token(formaicono[iconoActivo], 3, "|");

    var matriz = "matrix(" + token(accion, 0, ",") + "," + token(accion, 1, ",") + "," + token(accion, 2, ",") + "," + token(accion, 3, ",") + ",0,0)";

    icono1.style.WebkitTransform = matriz;
    icono1.style.msTransform = matriz;
    icono1.style.transform = matriz;

    cambiatamano(icono1);
  }
  //******************************************************************
  function seleccionaclase(ev) {

    var icono1 = document.getElementById("imagen1icono"); // Icono pequeño
    var icono0 = document.getElementById("imagenicono"); // Icono Grande
    var src = document.createAttribute("src"); // Muestra imagenes
    var src1 = document.createAttribute("src");
    var num = -1;

    for (i = 0; i < NombreClase.length; i++) {
      if (NombreClase[i] == ev.value) { num = i; break; }
    }
    if (num == -1) { return; }
    iconoActivo = 0;
    formaicono[iconoActivo] = registro("clases", ev.value, "formaClase", "", "R");
    src.value = registro("clases", ev.value, "ImagenClase", "", "R");
    src1.value = registro("clases", ev.value, "ImagenClase", "", "R");
    icono1.setAttributeNode(src1);
    icono0.setAttributeNode(src);
    var accion = token(formaicono[iconoActivo], 2, "|");
    document.getElementById("fraseclase").value = registro("clases", NombreClase[num], "FraseClase", "", "R");

    document.getElementById("colonicono").value = token(formaicono[iconoActivo], 0, "|");
    document.getElementById("coloficono").value = token(formaicono[iconoActivo], 1, "|");
    document.getElementById("fileticono").value = "";
    document.getElementById("anchoicono").value = token(accion, 0, ",") * 100;
    document.getElementById("giroxicono").value = token(accion, 1, ",") * 100;
    document.getElementById("giroyicono").value = token(accion, 2, ",") * 100;
    document.getElementById("altoicono").value = token(accion, 3, ",") * 100;
    document.getElementById("bandaicono").value = token(formaicono[iconoActivo], 3, "|");
    var matriz = "matrix(" + token(accion, 0, ",") + "," + token(accion, 1, ",") + "," + token(accion, 2, ",") + "," + token(accion, 3, ",") + ",0,0)";

    icono1.style.WebkitTransform = matriz;
    icono1.style.msTransform = matriz;
    icono1.style.transform = matriz;
  }
  //*******************************************************************
  function editaclases(ev) {
    var parametro = ev.getAttribute("id").slice(0, 5);
    switch (parametro) {
      case 'cance': {
      } break;
      case 'guard': {
        var nomc = document.getElementById("claseclase");
        var img1 = document.getElementById("imagen1icono").getAttributeNode("src").value;
        registro("clases", nomc.value, "ultimo", 0, "W");

        registro("clases", nomc.value, "ImagenClase", img1, "W");
        var frase = document.getElementById("fraseclase").value;
        registro("clases", nomc.value, "FraseClase", frase, "W");
        registro("clases", nomc.value, "formaClase", formaicono[0], "W");
        registro("clases", nomc.value, "ultimo", 1, "W");
      } break;
    }
    //menuseleccion('posicionar');
    cambiaImagen(0);
    document.getElementById("myTopnav").style.display = "block";
    document.getElementById("cuadrofondo").style.display = "block";

    muestraIconos(true, "editaclases");

    document.getElementById("editaclases").style.display = "none";
    document.getElementById("ddefecicono").style.display = "block";

    var formulario = document.getElementById("editacolorclases");
    var formulario2 = document.getElementById("coloronoff");
    var icono0 = document.getElementById("imagenicono"); // Icono Grande
    var icono = document.getElementById("iimagenicono"); // Icono Grande
    icono.appendChild(icono0);
    icono0.style.top = "15px";
    formulario.appendChild(formulario2);
  }
  //******************************************************************

  //******************************************************************
  //******************************************************************
  //******************************************************************
  //************     ICONOS            ******************************
  //******************************************************************
  //******************************************************************
  //******************************************************************
  //******************************************************************

  function cambiatamano(reg) {
    //color on, color off, ancho, alto, giro x, giro y, borde

    var parametro = reg.getAttribute("id").slice(0, 5);
    var ob = document.getElementById("imagen1icono");
    var accion = token(formaicono[iconoActivo], 2, "|");

    var pp0 = token(accion, 0, ",");
    var pp1 = token(accion, 1, ",");
    var pp2 = token(accion, 2, ",");
    var pp3 = token(accion, 3, ",");
    var colon = token(formaicono[iconoActivo], 0, "|");
    var colof = token(formaicono[iconoActivo], 1, "|");
    var banda = token(formaicono[iconoActivo], 3, "|");

    switch (parametro) {
      case "ancho":
        { pp0 = reg.value / 50; }
        break
      case "girox":
        { pp1 = reg.value / 100; }
        break
      case "giroy":
        { pp2 = reg.value / 100; }
        break
      case "altoi":
        { pp3 = reg.value / 50; }
        break
      case "banda":
        { banda = reg.value; }
      case "colon":
        { colon = reg.value; }
        break
      case "colof":
        { colof = reg.value; }
        break
      case "guard":
        {

          registro("iconos", Icono[iconoActivo], "ultimo", 0, "W");
          registro("iconos", Icono[iconoActivo], "Nombre", document.getElementById("nombreicono").value, "W");
          var cartera = document.getElementById("cartera" + iconoActivo).getElementsByTagName("h3");
          cartera[0].innerHTML = document.getElementById("nombreicono").value;
          registro("iconos", Icono[iconoActivo], "Frase", document.getElementById("fraseicono").value, "W");
          registro("iconos", Icono[iconoActivo], "email", document.getElementById("email").value, "W");

          
          var inf="0";if(document.getElementById("informar").checked){inf="1";}
          registro("iconos", Icono[iconoActivo], "informar",inf, "W");

          var uio = document.getElementById("planoicono");
          var uio1 = uio.options[uio.selectedIndex].text;
          var cuio = document.getElementById("claseicono");
          var cuio1 = "";
          if (cuio.selectedIndex > -1) { cuio1 = cuio.options[cuio.selectedIndex].text; }
          registro("iconos", Icono[iconoActivo], "Plano", uio1, "W");
          registro("iconos", Icono[iconoActivo], "Clase", cuio1, "W");
          registro("iconos", Icono[iconoActivo], "Tiposicono", document.getElementById("tiposicono").value, "W");
          registro("iconos", Icono[iconoActivo], "Tipoeicono", document.getElementById("tipoeicono").value, "W");

          registro("iconos", Icono[iconoActivo], "Ubicacion", document.getElementById("lugaricono").value, "W");
          var vb = document.getElementById("enlaceicono").value;

          var vc = idopcion("enlaceicono", -1, "", "obtiene");
          registro("iconos", Icono[iconoActivo], "Enlace", vc, "W");

          registro("iconos", Icono[iconoActivo], "Imagen", ob.src, "W");
          var formai = formaicono[iconoActivo];

          registro("iconos", Icono[iconoActivo], "formaicono1", formai, "W");
          registro("iconos", Icono[iconoActivo], "ultimo", 1, "W");

          cambiaImagen(0);
          var formulario = document.getElementById("edicionicono");
          formulario.style.display = "none";

          estableceTamano(iconoActivo);
          document.getElementById("myTopnav").style.display = "block";
          document.getElementById("cuadrofondo").style.display = "block";
          muestraIconos(true);
          cargaEstado(iconoActivo);

          return;
        }
        break
      case "cance":
        cambiaImagen(0);
        document.getElementById("edicionicono").style.display = "none";
        document.getElementById("myTopnav").style.display = "block";
        document.getElementById("cuadrofondo").style.display = "block";

        muestraIconos(true, "cambiatamano, cance");

        return;
        break
      case "elimi":
        cambiaImagen(0);
        var formulario = document.getElementById("edicionicono");
        formulario.style.display = "none";
        document.getElementById("myTopnav").style.display = "block";
        document.getElementById("cuadrofondo").style.display = "block";

        muestraIconos(true, "cambiatamano, elimi");

        borraIcono();
        return;
        break
    }

    if (!pp0 || pp0 == "") { pp0 = document.getElementById("anchoicono").value / 50; }
    if (!pp1 || pp1 == "") { pp1 = document.getElementById("giroxicono").value / 100; }
    if (!pp2 || pp2 == "") { pp2 = document.getElementById("giroyicono").value / 100; }
    if (!pp3 || pp3 == "") { pp3 = document.getElementById("altoicono").value / 50; }
    accion = pp0 + "," + pp1 + "," + pp2 + "," + pp3;
    colon = document.getElementById("colonicono").value;
    colof = document.getElementById("coloficono").value;

    var b = banda + "px"
    var matriz = "matrix(" + pp0 + "," + pp1 + "," + pp2 + "," + pp3 + ",0,0)";
    formaicono[iconoActivo] = colon + "|" + colof + "|" + accion + "|" + banda;

    ob.style.WebkitTransform = matriz;
    ob.style.msTransform = matriz;
    ob.style.transform = matriz;
    ob.style.borderWidth = b;
  }
  //******************************************************************
  function tipodsp(tdsp,inout){
    switch (tdsp) {
      case "":
        if (inout){return "";}
        return "";
      case "1":
        if (inout){return "On-Off";}
        return "On-Off";
      case "2":
        if (inout){return "On-Off";}
        return "Variable";
      case "3":
        if (inout){return "Variable";}
        return "On-Off";
      case "4":
        if (inout){return "Variable";}
        return "Variable";
      case "1B":
          if (inout){return "Abto-Cerrado";}
          return "2-Salidas";
    }
  }
  //******************************************************************
  function edicionicono() { // rellena toda la informacion del icono

    document.getElementById("myTopnav").style.display = "none"; //Oculta menús
    document.getElementById("cuadrofondo").style.display = "none";

    muestraIconos(false, "edicion icono false");

    formaicono[iconoActivo] = registro("iconos", Icono[iconoActivo], "formaicono1", "", "R");
    //formaicono1[iconoActivo];
    var icono1 = document.getElementById("imagen1icono"); // Icono pequeño
    var icono0 = document.getElementById("imagenicono"); // Icono Grande
    var formulario = document.getElementById("edicionicono");
    var formulario0 = document.getElementById("ccoloronoff");
    var formulario01 = document.getElementById("coloronoff");
    formulario0.appendChild(formulario01);

    var accion = token(formaicono[iconoActivo], 2, "|");
    var iconoc = document.getElementById("IconoNumero" + iconoActivo);
    formulario.style.display = "block"; // Muestra formulario
    //formulario.style.backgroundColor = "rgba(200, 200, 200, 0.9)";
    formulario.style.zIndex = 10;
    var src = document.createAttribute("src"); // Muestra imagenes
    var src1 = document.createAttribute("src");

    src.value = registro("iconos", Icono[iconoActivo], "Imagen", "", "R");
    src1.value = registro("iconos", Icono[iconoActivo], "Imagen", "", "R");
    icono1.setAttributeNode(src1);
    icono0.setAttributeNode(src);

    document.getElementById("nombreicono").value = registro("iconos", Icono[iconoActivo], "Nombre", "", "R");
    document.getElementById("fraseicono").value = registro("iconos", Icono[iconoActivo], "Frase", "", "R");
    document.getElementById("email").value = registro("iconos", Icono[iconoActivo], "email", "", "R");

    if(registro("iconos", Icono[iconoActivo], "informar", "", "R")=="1")
    {document.getElementById("informar").checked=true;}else{document.getElementById("informar").checked=false;}

    document.getElementById("idicono").value = Icono[iconoActivo];
    var xcv = registro("iconos", Icono[iconoActivo], "Plano", "", "R");
    var indce = obtenindice("planoicono", xcv);
    idopcion("planoicono", indce, "", "selecciona");
    document.getElementById("nombreplanoicono").value = nombreplanoicono(document.getElementById("planoicono")[indce].text, indce);
    document.getElementById("claseicono").value = registro("iconos", Icono[iconoActivo], "Clase", "", "R");
    document.getElementById("tipoeicono").value = registro("iconos", Icono[iconoActivo], "Tipoeicono", "", "R");
    document.getElementById("tiposicono").value = registro("iconos", Icono[iconoActivo], "Tiposicono", "", "R");
    document.getElementById("urlicono").value = src.value;
    document.getElementById("lugaricono").value = registro("iconos", Icono[iconoActivo], "Ubicacion", "", "R");



    idopcion("enlaceicono", 1, "", "borra");
    FiltraRegistros("dispositivos");
    var totalDispositivos = dispositivos.length;
    for (j = 0; j < totalDispositivos; j++) { idopcion("enlaceicono", j + 1, dispositivos[j], "anade"); }

    var az = registro("iconos", Icono[iconoActivo], "Enlace", "", "R");// Este es la clave de dispositivos
    var tipodispositivo = registro("dispositivos", az, "tipo", "", "R");

    document.getElementById("tipoeicono").value = tipodsp(tipodispositivo,1);
    document.getElementById("tiposicono").value = tipodsp(tipodispositivo,0);

    var sel = idopcion("enlaceicono", -1, az, "buscatxt");
    //idopcion("enlaceicono",sel,"","selecciona");
    //document.getElementById("enlaceicono").value

    document.getElementById("colonicono").value = token(formaicono[iconoActivo], 0, "|");
    document.getElementById("coloficono").value = token(formaicono[iconoActivo], 1, "|");
    //document.getElementById("defecicono").value="a saber";
    document.getElementById("fileticono").value = "";
    document.getElementById("anchoicono").value = token(accion, 0, ",") * 100;
    document.getElementById("giroxicono").value = token(accion, 1, ",") * 100;
    document.getElementById("giroyicono").value = token(accion, 2, ",") * 100;
    document.getElementById("altoicono").value = token(accion, 3, ",") * 100;
    document.getElementById("bandaicono").value = token(formaicono[iconoActivo], 3, "|");

    var matriz = "matrix(" + token(accion, 0, ",") + "," + token(accion, 1, ",") + "," + token(accion, 2, ",") + "," + token(accion, 3, ",") + ",0,0)";

    icono1.style.WebkitTransform = matriz;
    icono1.style.msTransform = matriz;
    icono1.style.transform = matriz;

    icono1.style.borderWidth = iconoc.style.borderWidth;
    cambiatamano(icono1);
  }
  //*******************************************************************
  function obtennombreplanoicono(ev) {
    document.getElementById("nombreplanoicono").value = nombreplanoicono(ev.options[ev.selectedIndex].text, ev.selectedIndex);
  }
  //*******************************************************************
  function rellenanombreplanoicono() {
    var pl = document.getElementById("planoicono");
    idopcion("planoicono", 0, "", "borra"); //MODIFICADO
    idopcion("planoicono", -1, "Todos", "anade");
    var pp = "";
    for (h = 0; h < nomdibujofondo.length; h++) {
      if (token(nomdibujofondo[h], 1, separadorlocal) != "") {
        idopcion("planoicono", -1, token(nomdibujofondo[h], 1, separadorlocal), "anade");
      }
    }
  }
  //*******************************************************************
  function nombreplanoicono(tt, indice) {
    if (tt == "Todos") { return "Todos"; }
    for (l = 0; l < nomdibujofondo.length; l++) {
      if (token(nomdibujofondo[l], 1, separadorlocal) == tt) { return token(nomdibujofondo[l], 0, separadorlocal); }
    }
    return "PLANO BORRADO";
    idopcion("planoicono", indice, "", "desactiva");
  }
  //*******************************************************************
  function obtenindice(idpl, valx) {
    var pln = document.getElementById(idpl);
    for (u = 0; u < pln.length; u++) {
      if (pln.options[u].text == valx) {
        return u;
      }
    }
    return -1;
  }
  //********************************************************************
  function muestracolx(ev) {
    var icono1 = document.getElementById("imagen1icono");
    icono1.style.borderColor = ev.value;
  }
  //*******************************************************************
  function cambiaImagen(mostrar) {
    if (mostrar) {
      document.getElementById("cuadroNuevaImagen").style.display = "inline-block";
    }
    else {
      document.getElementById("cuadroNuevaImagen").style.display = "none";
    }
  }
  //*******************************************************************

  function intensidad(ev) {
    registro("estados", Icono[iconoActivo], "ultimo", 0, "W");
    registro("estados", Icono[iconoActivo], "onoff", ev.value / 100, "W");
    registro("estados", Icono[iconoActivo], "ultimo", 1, "W");
  }
  //*******************************************************************
  function borraIcono() {
    var icon = document.getElementById("IconoNumero" + iconoActivo);
    icon.style.display = "none";
    icon.className = "iconoborrado";
    registro("iconos", Icono[iconoActivo], "ultimo", 0, "W");
    registro("iconos", Icono[iconoActivo], "Eliminar", 1, "W");
    registro("iconos", Icono[iconoActivo], "ultimo", 1, "W");
  }
  //*******************************************************************
 // function creatablaeventos(icono){
//    datos = consultaConfiguracion("EVENTOS",icono);
    //document.getElementById("tx").innerHTML=datos;
    //console.log(datos);
  //  return datos["CODIGO"];
    //return 'este es el uno modificado :<input type="text" name="uno"> y este el otro:<input type="text" name="dos">'
 // }
  //*******************************************************************
  function pec(fun) {
    var caja = document.getElementsByClassName("caja")[0]
    caja.style.visibility = "hidden";
    muestraIconos(true, "pec");

    semaforo = false;
    switch (fun) {
      case 'consulta':
        CodiconoActivo = registro("iconos", Icono[iconoActivo], "Icono", "", "R");
        //TABLAEVENTOS='este es el uno modificado :<input type="text" name="uno"> y este el otro:<input type="text" name="dos">'
        //TABLAEVENTOS=creatablaeventos(CodiconoActivo);
        TABLAEVENTOS=consultaConfiguracion("EVENTOS",CodiconoActivo);
        paraventana("estadosdispositivos.html",JSON.stringify(TABLAEVENTOS));
        //paraventana("estadosdispositivos.html",JSON.stringify({["CODIGO"]:[CodiconoActivo],["TABLAEVENTOS"]:[TABLAEVENTOS]}));
        break;
      case 'otros':
        break;
      case 'edicion':
        edicionicono();
        break;
      case 'programacion':

        CodiconoActivo = registro("iconos", Icono[iconoActivo], "Icono", "", "R");
        document.getElementById("myTopnav").style.display = "none";
        document.getElementById("cuadrofondo").style.display = "none";
        muestraIconos(false, "programación");
        document.getElementById("fondo0").style.display = "block";
        muestraconjuntoprogramas();
        break;
      case 'consultas':
        CodiconoActivo = registro("iconos", Icono[iconoActivo], "Icono", "", "R");
        document.getElementById("myTopnav").style.display = "none";
        document.getElementById("cuadrofondo").style.display = "none";
        muestraIconos(false, "programación");
        document.getElementById("fondo0").style.display = "block";
        cargarelacion();
        break;
      case 'on':
        registro("estados", Icono[iconoActivo], "ultimo", 0, "W");
        registro("estados", Icono[iconoActivo], "onoff", 1, "W");
        registro("estados", Icono[iconoActivo], "ultimo", 1, "W");
        //onoff[iconoActivo]=1;
        document.getElementById("intensidad").value = 100;
        cargaEstado(iconoActivo);
        break;
      case 'off':
        registro("estados", Icono[iconoActivo], "ultimo", 0, "W");
        registro("estados", Icono[iconoActivo], "onoff", 0, "W");
        registro("estados", Icono[iconoActivo], "ultimo", 1, "W");
        //onoff[iconoActivo]=0;
        document.getElementById("intensidad").value = 0;
        cargaEstado(iconoActivo);
        break;
      case 'intensidad':

        var i1 = document.getElementById("intensidad");
        intensidad(i1);
        i1.value = registro("estados", Icono[iconoActivo], "onoff", "", "R");
        //i1.value=onoff[iconoActivo];
        cargaEstado(iconoActivo);
        break;
    }
  }
  // *******************************************************************
  function muestraIconos(muestra, donde) {
    var y = document.getElementsByClassName("cartera");
    var kl;
    var totalic = y.length;
    if (muestra) {

      if (planoactivo < 0) { planoactivo = 0; }
      for (ic = 0; ic < totalic; ic++) {

        kl = registro("iconos", Icono[ic], "Plano", "", "R");
        if (nomdibujofondo[planoactivo] == undefined) { continue; }
        if ((kl == token(nomdibujofondo[planoactivo], 1, separadorlocal)) || (kl == "Todos")) {
          y[ic].style.display = "inline-block";
        }
        else { y[ic].style.display = "none"; }
      }
    } else {
      for (ir = 0; ir < y.length; ir++) { y[ir].style.display = "none"; }

    }

  }
  //*******************************************************************
  function posicionaricono(elmnt) {

    if (seleccion1 != "guardarposicion") { elementomarcado = ""; marcar = false; return; }
    //if(elmnt.id==""){return;}
    var elemento;
    //if(elmnt.id==""){elemento="xxxxxxx";}else

    { elemento = elmnt.id.slice(0, 7); }
    var elemactual;

    if (elemento != "cartera" && !marcar) { return; }
    if (elemento == "cartera" && !marcar) { elementomarcado = elmnt.id; marcar = true; return; }
    if (elemento == "cartera" && marcar && elementomarcado != elmnt.id) {
      return;
    }

    if (elemento == "cartera" && marcar && elementomarcado == elmnt.id) { marcar = false; elementomarcado = ""; return; }

    //queda elemento!="cartera"&&marcar que ha de ejecutar el resto

    elmnt = document.getElementById(elementomarcado);
    e = window.event;
    e.preventDefault;
    var pos3 = e.clientX;
    var pos4 = e.clientY;

    var pos6 = (pos4 - 25) + "px";
    var pos7 = (pos3 - 100) + "px";
    registro("iconos", Icono[elementomarcado.slice(7)], "ultimo", 0, "W");
    registro("iconos", Icono[elementomarcado.slice(7)], "xposi", pos7, "W");
    registro("iconos", Icono[elementomarcado.slice(7)], "yposi", pos6, "W");
    registro("iconos", Icono[elementomarcado.slice(7)], "ultimo", 1, "W");

    //xposi[elementomarcado.slice(7)]=pos7;
    //yposi[elementomarcado.slice(7)]=pos6;
    elmnt.style.left = pos7;
    elmnt.style.top = pos6;
    elementomarcado = "";
    marcar = false;
    //muestraIconos(0,"posionaricono final");
  }
  // *******************************************************************
  function menuIcono(elmnt, numeroImg, dblclick) {
    if (("posicionar" != seleccion1) && dblclick) { menuseleccion("posicionar"); }

    if (("posicionar" != seleccion1) && !dblclick) {
      posicionaricono(elmnt);
      return;
    }

    semaforo = true;

    var caja = document.getElementsByClassName("caja");
    elmnt.style.visibility = "hidden";
    caja[0].style.visibility = "visible";

    iconoActivo = numeroImg;

    var xps = registro("iconos", Icono[numeroImg], "xposi", "", "R");
    var yps = registro("iconos", Icono[numeroImg], "yposi", "", "R");

    //caja[0].style.left=xps;

    caja[0].style.top = yps.slice(0, yps.indexOf("px")) - 90 + "px";

    caja[0].style.left = xps.slice(0, xps.indexOf("px")) - 120 + "px";



    //caja[0].style.top=yposi[numeroImg].slice(0,yposi[numeroImg].indexOf("px"))-90 +"px";

    //caja[0].style.right=xposi[numeroImg].slice(0,xposi[numeroImg].indexOf("px"))-120 +"px"; 


    document.getElementsByClassName("item1")[0].getAttributeNode("src").value = registro("iconos", Icono[numeroImg], "Imagen", "", "R");


    document.getElementsByClassName("nombreImagen")[0].childNodes[0].nodeValue = registro("iconos", Icono[numeroImg], "Nombre", "", "R");
    //Nombre[numeroImg];

    //document.getElementById("intensidad").value=onoff[numeroImg]*100;
    document.getElementById("intensidad").value = registro("estados", Icono[numeroImg], "onoff", "", "R") * 100;

    muestraIconos(false, "menuicono false");

    elmnt.preventDefault;

  }
  // *******************************************************************
  function creaicono(numeroImg) {

    var cuadro = document.getElementById("cuadro");
    var textoimagen = document.createElement("h3");
    var iconomovil = document.createElement("img");
    var cartera = document.createElement("div");
    var spam = document.createElement("spam");
    var NombreIcono = document.createElement("p");
    var intensidad = document.createElement("div");

    var claseintensidad = document.createAttribute("class");
    var clasecarterafondo = document.createAttribute("class");
    var clasecartera = document.createAttribute("class");
    var clasedibujo = document.createAttribute("class");
    var dibujo = document.createAttribute("src");

    clasecartera.value = "cartera";
    claseintensidad.value = "intensidad";

    iconomovil.style.position = "relative";
    iconomovil.style.opacity = opacidad;
    clasedibujo.value = "icono";
    var imgx = registro("iconos", Icono[numeroImg], "Imagen", "", "R");
    if (imgx == "") {
      //imgx = "https://lolahome.es/media/catalog/product/cache/1/small_image/250x250/9df78eab33525d08d6e5fb8d27136e95/l/a/lampara-de-techo-comedor-dorado-107548.jpg";
      registro("iconos", Icono[numeroImg], "Imagen", imgx, "W");
    }

    dibujo.value = imgx;

    intensidad.setAttributeNode(claseintensidad);
    cartera.setAttributeNode(clasecartera);
    cartera.id = "cartera" + numeroImg;
    cuadro.appendChild(cartera);
    cartera.appendChild(spam);
    cartera.appendChild(intensidad);

    iconomovil.setAttributeNode(clasedibujo);
    iconomovil.setAttributeNode(dibujo);

    iconomovil.id = "IconoNumero" + numeroImg;

    cartera.appendChild(iconomovil);

    var xx11 = registro("iconos", Icono[numeroImg], "Nombre", "", "R");

    textoimagen.appendChild(document.createTextNode(xx11));

    NombreIcono.appendChild(textoimagen);
    cartera.appendChild(NombreIcono);
    cartera.style.left = registro("iconos", Icono[numeroImg], "xposi", "", "R");
    cartera.style.top = registro("iconos", Icono[numeroImg], "yposi", "", "R");
    //cartera.style.left = xposi[numeroImg];
    //cartera.style.top =  yposi[numeroImg];

    estableceTamano(numeroImg);
    cartera.style.visibility = "hidden";
    cartera.onclick = function () { menuIcono(cartera, numeroImg, false) };
    cartera.ondblclick = function () { menuIcono(cartera, numeroImg, true) };
    var c = cartera.childNodes;
    c[2].style.visibility = "visible";
    AsignaEventos(cartera);
  }
  // *******************************************************************
  function estableceTamano(elemento) {

    var iconoc = document.getElementById("IconoNumero" + elemento);
    iconoc.style.height = tamanoicono + "px";
    iconoc.style.width = tamanoicono + "px";

    var formai = registro("iconos", Icono[elemento], "formaicono1", "", "R");

    if (formai == "" || !formai) {
      registro("iconos", Icono[elemento], "formaicono1", "#ff0000|#1100ff|1,0.0,0.0,1|4", "W");
      //formaicono1[elemento]="#ff0000|#1100ff|1,0.0,0.0,1|4";
    }
    formai = registro("iconos", Icono[elemento], "formaicono1", "", "R");
    var matriz = "matrix(" + token(formai, 2, "|") + ",0,0)"
    iconoc.style.WebkitTransform = matriz;
    iconoc.style.msTransform = matriz;
    iconoc.style.transform = matriz;

    var b = token(formai, 3, "|") + "px solid white"
    iconoc.style.border = b;
    iconoc.style.opacity = opacidad;
    iconoc.style.borderRadius = "3px";
    cargaEstado(elemento);

  }
  //*******************************************************************
  function EstableceColorFondoIcono(elemento) {
    var colorfondo = "rgba(110,110,0,0.9)";
    var dispositivo = registro("iconos", Icono[elemento], "Enlace", "", "R");
    var condispositivo = true;
    if (dispositivo.slice(0, 10) == "Sin enlace" || dispositivo == "") {
      condispositivo = false;
    }

    if (condispositivo) {
      estado = registro("dispositivos", dispositivo, "estado", "", "R");
      if (estado == "") { estado = "0"; }
      if (estado == "1") {
        colorfondo = "rgba(60,250,10,0.9)";
      } else { colorfondo = "rgba(254,50,30,0.9)"; }
    }
    document.getElementById("cartera" + elemento).style.backgroundColor = colorfondo;
  }
  //*******************************************************************
  function cargaEstado(elemento) {

    var iconoc = document.getElementById("IconoNumero" + elemento);
    var car = document.getElementById("cartera" + elemento);
    //var colon=token(formaicono1[elemento],0,"|");
    //var coloff=token(formaicono1[elemento],1,"|");

    //var colon = "#ff00aa";
    //var coloff = "#aaff00";
    var colorfondo = "rgba(110,110,0,0.9)";
    var xxon = registro("estados", Icono[elemento], "onoff", "", "R") * 1;
    //Obtener si ese icomo tine un dispositivo asociado y en caso afirmativo, si este esta activo o no
    var dispositivo = registro("iconos", Icono[elemento], "Enlace", "", "R");
    var estado = "";
    var tipo = "";
    var cpu = "";
    var condispositivo = true;

    if (dispositivo.slice(0, 10) == "Sin enlace" || dispositivo == "") {
      condispositivo = false;
    }

    if (condispositivo) {
      estado = registro("dispositivos", dispositivo, "estado", "", "R");
      if (estado == "") { estado = "0"; }
      tipo = registro("dispositivos", dispositivo, "tipo", "", "R");
      cpu = registro("dispositivos", dispositivo, "cpu", "", "R");
      if (estado == "1") {
        colorfondo = "rgba(60,250,10,0.9)";
      } else { colorfondo = "rgba(254,50,30,0.9)"; }
    }
    //var fondo = "linear-gradient(to bottom, " + colon + " " + xxon * 100 + "%, " + coloff + " 0%)";
    //car.childNodes[1].style.backgroundImage=fondo;
    car.style.backgroundColor = colorfondo;
    var a = xxon * 100 + "%";
    car.childNodes[1].style.height = a;
    var z = 1;
    if (xxon > 0.5) { z = 0; }

    var formai = registro("iconos", Icono[elemento], "formaicono1", "", "R");

    iconoc.style.borderColor = token(formai, z, "|");
    iconoc.src = registro("iconos", Icono[elemento], "Imagen", "", "R");

  }
  // Variables

  //*****************************************************
  function creaiconos() {
    for (j = 0; j < Icono.length; j++) {
      if (Icono[j]) { creaicono(j); }
    }
  }
  //******************************************************************
  //******************************************************************
  //******************************************************************
  //******************************************************************
  //************         PLANOS         ******************************
  //******************************************************************
  //******************************************************************
  //******************************************************************
  //******************************************************************
  function ordenadibujos() {
    var gdibujofondo1 = [];
    var gnomdibujofondo1 = [];
    var j;
    var faltauno = false;

    for (var ij = 0; ij < gordendibujofondo.length; ij++) {

      if (gdibujofondo[ij] == "") {
        faltauno = true;
        gdibujofondo.splice(ij, 1);
        gordendibujofondo.splice(ij, 1);
        gnomdibujofondo.splice(ij, 1);
        ij--;
      }
    }
    if (faltauno) {
      for (var ij = 0; ij < gordendibujofondo.length; ij++) {
        gordendibujofondo[ij] = token(gordendibujofondo[ij], 0, "|") + "|" + ij;
      }
    }
    var k = 0;
    var z;
    gordendibujofondo.sort(function (a, b) {
      var x = token(a, 0, "|") * 1;
      var y = token(b, 0, "|") * 1;
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    })

    var tope = gdibujofondo.length;
    for (ij = 0; ij < tope; ij++) {
      j = token(gordendibujofondo[ij], 1, "|") * 1;
      gdibujofondo1[ij] = gdibujofondo[j];
      gnomdibujofondo1[ij] = gnomdibujofondo[j];
    }
    //gplanoactivo=0;
    for (ij = 0; ij < gordendibujofondo.length; ij++) {
      if ((token(gordendibujofondo[ij], 0, "|") * 10) % 10 == 0) { gplanoactivo = ij; break; }
    }
    j = 0;

    for (ij = 0; ij < gordendibujofondo.length; ij++) {
      if (!(gdibujofondo1[ij] == "")) {
        gdibujofondo[ij] = gdibujofondo1[ij];
        gnomdibujofondo[ij] = gnomdibujofondo1[ij];
        idopcion("posplanta", ij, gnomdibujofondo[ij], "actualiza");
        gordendibujofondo[ij] = (ij + 0.5) + "|" + ij;
        j++;
      } else { break; }
    }
    gultimoplano = j;
    idopcion("posplanta", gplanoactivo, "", "selecciona");
  }
  //*************************************************
  function compruebaImagenes() {
    if (pathImagen[0] != "1") { return; }

    pathImagen[0] = "0";
    var marco = document.getElementById("fotosicono");
    var marco1 = document.getElementById("fotosicono1");
    var marco2 = document.getElementById("fotosicono2");
    marco.style.display = "block";
    var todas = pathImagen.length;
    var fotoalmacen;
    var clasefotos;
    //var clasecajafotos;
    var imagenalmacen;
    var base
    for (kl = 2; kl < todas; kl++) {

      fotoalmacen = document.createElement("img");
      fotoalmacen.alt = pathImagen[kl];
      clasefotos = document.createAttribute("class");
      clasefotos.value = "clasefotos";
      fotoalmacen.setAttributeNode(clasefotos);
      imagenalmacen = document.createAttribute("src");
      fotoalmacen.setAttributeNode(imagenalmacen);
      marco1.appendChild(fotoalmacen);
      imagenalmacen.value = pathImagen[kl];
      fotoalmacen.id = pathImagen[kl];
      fotoalmacen.onclick = function () {
        var elems = document.getElementsByClassName('clasecajafotos');
        for (var ix = 0; ix < elems.length; ix++) {
          elems[ix].className = "clasefotos";
        }
        this.className = "clasecajafotos";
      }
      fotoalmacen.ondblclick = function () {
        seleccionfoto('aceptar', this.alt)
        marco.style.display = "none";
      }
    }
    var btn = document.createElement("BUTTON");
    var claseboton = document.createAttribute("class");
    var t = document.createTextNode("Cancelar");
    claseboton.value = "buscaimagen";
    btn.setAttributeNode(claseboton);
    btn.appendChild(t);
    marco2.appendChild(btn);
    btn.style.height = 50 + "px";
    btn.style.width = 48 + "%";
    btn.id = "Imagenboton1";
    btn.onclick = function () { marco.style.display = "none"; seleccionfoto('cancelar', "") };

    btn = document.createElement("BUTTON");
    claseboton = document.createAttribute("class");
    t = document.createTextNode("Aceptar");
    btn.setAttributeNode(claseboton);
    claseboton.value = "buscaimagen";
    btn.appendChild(t);
    marco2.appendChild(btn);
    btn.style.height = 50 + "px";
    btn.style.width = 48 + "%";
    btn.id = "Imagenboton2";
    btn.onclick = function () { marco.style.display = "none"; seleccionfoto('buscarseleccion', "") };

  }
  //*************************************************
  function listaerrores(error) {
    // listar errores
    return
  }
  //*************************************************
  function seleccionfoto(ac, foto) {
    try {
      switch (ac) {
        case 'buscarseleccion':
          var fotoseleccionada = document.getElementsByClassName('clasecajafotos');
          if (fotoseleccionada.length > 0) { muestraImagen(fotoseleccionada[0].src); }
          break;
        case 'aceptar':
          muestraImagen(foto);
          break;
        case 'cancelar':
          break;
      }
    }
    catch (err) {
      listaerrores(err);
    }

    //var container = document.getElementById('container');
    finally {
      var elemento;
      var todas = pathImagen.length;
      for (kl = 2; kl < todas; kl++) {
        document.getElementById(pathImagen[kl]).remove();
      }
      document.getElementById("Imagenboton1").remove();
      document.getElementById("Imagenboton2").remove();
    }
  }
  //*************************************************
  function seleccionfile(ac) {
    switch (ac) {
      case 'almacen':
        enviadatos(envoltorio + "IMAGENES" + separadorcampo);
        pathImagen[0] = "2";
        break;
      case 'cancelacopia':
        enviaFoto("", "", "", true);
        break;
      case 'cancelar':
        gcambiafondo = false;
        break;
      case 'aceptar':
        break;
    }

    cambiaImagen(0);

    var file1 = "";
    var file2 = document.getElementById("fileticono").value;

    var file = file1
    if (file.length != 0) { file2 = file; }
    if (file2.length == 0) { return; }
    file = file2;
    muestraImagen(file);
  }
  //************************************************************
  function muestraImagen(file) {
    var src = document.createAttribute("src"); // Muestra imagenes
    var src1 = document.createAttribute("src");
    src.value = file;
    src1.value = file;
    //**************
    if (procesoactivo == "principal") {
      var icono1 = document.getElementById("imagen1icono"); // Icono pequeño
      var icono0 = document.getElementById("imagenicono"); // Icono Grande
      icono1.setAttributeNode(src1);
      icono0.setAttributeNode(src);
    }
    //**************
    if (procesoactivo == "general") {
      seleccion1 = 'posicionar';
      var opcion = document.getElementById("posplanta");
      if (!gcambiafondo) {
        if (gplanoactivo == 1000) {
          var codpl = obtencodigo(gnomdibujofondo);
          gnomdibujofondo[gultimoplano] = file.slice(0, 20) + separadorlocal + codpl;
          gordendibujofondo[gultimoplano] = gultimoplano + 0.5 + "|" + gultimoplano;
          gplanoactivo = gultimoplano;
          idopcion("posplanta", gplanoactivo, gnomdibujofondo[gplanoactivo], "anade");
          document.getElementById("nombreplanta").value = token(gnomdibujofondo[gplanoactivo], 0, separadorlocal);
          document.getElementById("codigoplanta").value = codpl;
          document.getElementById("ordenplanta").value = token(gordendibujofondo[gplanoactivo], 1, "|") * 1;
          gultimoplano++;
        }
        gdibujofondo[gplanoactivo] = file;
        var plano = document.getElementById("imagenplano");
        plano.setAttributeNode(src);
        idopcion("posplanta", gplanoactivo, "", "selecciona");
      }
      if (gcambiafondo) {
        gcambiafondo = false;
        var fondo = document.getElementById("fondo");
        fondo.setAttributeNode(src);
        gdibujofondo0 = file;
      }
    }
  }
  //******************************************************************
  function general() { // rellena toda la informacion de la hoja

    var plano = document.getElementById("imagenplano");
    var fondo = document.getElementById("fondo");
    var src0 = document.createAttribute("src");
    var src1 = document.createAttribute("src");
    var src2 = document.createAttribute("src");
    //AsignaDatos()
    gplanoactivo = planoactivo;
    procesoactivo = "general";

    gtamanoicono = tamanoicono;
    gincrementotamanoicono = incrementotamanoicono;
    gopacidad = opacidad;
    gnomdibujofondo = [];
    gdibujofondo = [];
    var p = 0;
    var numpla = nomdibujofondo.length;
    idopcion("posplanta", -1, "", "borra");
    for (m = 0; m < numpla; m++) {
      if (typeof (nomdibujofondo[m]) == "string" && token(nomdibujofondo[m], 0, separadorlocal) != "") {
        gordendibujofondo[p] = registro("planos", token(nomdibujofondo[m], -1, separadorlocal), "Ordendibujofondo", "", "R");
        if (gordendibujofondo[p] == "") { gordendibujofondo[p] = (p + 0.5 + "|" + p); }
        gdibujofondo[p] = dibujofondo[m];
        gnomdibujofondo[p] = nomdibujofondo[m];
        idopcion("posplanta", p, nomdibujofondo[m], "anade");
        p++;
      }
    }
    gultimoplano = p - 1;
    //ordenadibujos();
    if (gplanoactivo >= gultimoplano) { gplanoactivo = gultimoplano; }
    if (gplanoactivo < 0) { gplanoactivo = 0; }
    while (!(typeof (gdibujofondo[gplanoactivo]) == "string" && gdibujofondo[gplanoactivo] != "")) {
      gplanoactivo--;
      gultimoplano--;
      if (gplanoactivo == 0) { break; }
    }
    idopcion("posplanta", gplanoactivo, gnomdibujofondo[gplanoactivo], "selecciona");
    src1.value = gdibujofondo[gplanoactivo];
    src0.value = dibujofondo0;
    fondo.setAttributeNode(src0);
    plano.setAttributeNode(src1);

    gopacidadfondo0 = opacidadfondo0;
    gopacidadfondo = opacidadfondo;
    gdibujofondo0 = dibujofondo0;
    plano.style.opacity = opacidadfondo;
    fondo.style.opacity = opacidadfondo0;
    var opcfondogeneral = document.getElementById("opcfondogeneral");
    var opcplanogeneral = document.getElementById("opcplanogeneral");
    opcfondogeneral.value = gopacidadfondo0 * 100;
    opcplanogeneral.value = gopacidadfondo * 100;
    var idnombreplano = document.getElementById("nombreplanta");
    idnombreplano.value = token(gnomdibujofondo[gplanoactivo], 0, separadorlocal);
    document.getElementById("codigoplanta").value = token(gnomdibujofondo[gplanoactivo], -1, separadorlocal);
    document.getElementById("ordenplanta").value = token(gordendibujofondo[gplanoactivo], 1, "|") * 1;
    var tamiconogeneral = document.getElementById("tamiconogeneral");
    var inctamiconogeneral = document.getElementById("inciconogeneral");
    var opcconogeneral = document.getElementById("opciconogeneral");
    var iconomuestra = document.getElementById("imageniconogeneral");
    src2.value = gdibujofondo[0];
    iconomuestra.setAttributeNode(src2);
    tamiconogeneral.value = gtamanoicono;
    inctamiconogeneral.value = gtamanoicono * gincrementotamanoicono;
    opcconogeneral.value = gopacidad * 100;
  }
  //******************************************************************
  function salvadegeneral() {

    var opcplanos = document.getElementById("numplanomenu1");
    var p = 0;
    var a1;
    var a2;

    idopcion("numplanomenu1", 0, "", "borra");
    var numplanos = iddibujofondo.length;
    for (var gh = 0; gh < numplanos; gh++) {
      nomdibujofondo.pop();
      dibujofondo.pop();
      ordendibujofondo.pop();
      registro("planos", iddibujofondo[gh], "Eliminar", "1", "W");
    }


    //var dblon=nomdibujofondo.length;
    //for(var z=0;z<dblon;z++){
    //a1=nomdibujofondo[z];
    //a2=token(a1,-1,separadorlocal);
    //registro("planos",a2,"Eliminar","1","W");
    //}
    //for(var z=0;z<dblon;z++){
    //nomdibujofondo.pop();
    //dibujofondo.pop();
    //ordendibujofondo.pop();
    //}
    planoactivo = gplanoactivo;

    //var numpla=document.getElementById("posplanta").options.length;
    var numpla = gdibujofondo.length;

    for (m = 0; m < numpla; m++) {// SALVA LOS DATOS A REGISTROS

      //if(gnomdibujofondo[m].length>separadorlocal.length+2)
      {
        ordendibujofondo[p] = gordendibujofondo[m];
        dibujofondo[p] = gdibujofondo[m];
        nomdibujofondo[p] = gnomdibujofondo[m];
        idopcion("numplanomenu1", p, gnomdibujofondo[m], "anade");
        a1 = token(nomdibujofondo[p], -1, separadorlocal);
        a2 = token(nomdibujofondo[p], 0, separadorlocal);



        registro("planos", a1, "ultimo", 0, "W");
        registro("planos", a1, "Eliminar", "0", "W");
        registro("planos", a1, "Ordendibujofondo", ordendibujofondo[p], "W");//MODIFICADO
        registro("planos", a1, "Dibujofondo", dibujofondo[p], "W");
        registro("planos", a1, "Nomdibujofondo", a2, "W");
        registro("planos", a1, "ultimo", 1, "W");
        p++;
      }

    }
    ultimoplano = numpla;
    if (planoactivo >= ultimoplano) { planoactivo = ultimoplano - 1; }
    idopcion("numplanomenu1", planoactivo, "", "selecciona");

    document.getElementById("numplanomenu").innerHTML = planoactivo;
    idopcion("numplanomenu1", planoactivo, "", "selecciona");

    var plano = document.getElementById("cuadrofondo00");
    var fondo = document.getElementById("fondo00");
    var srcplano = document.createAttribute("src");
    var srcfondo = document.createAttribute("src");

    dibujofondo0 = gdibujofondo0;
    srcplano.value = dibujofondo[planoactivo];
    srcfondo.value = dibujofondo0;
    fondo.setAttributeNode(srcfondo);
    plano.setAttributeNode(srcplano);
    tamanoicono = gtamanoicono;
    incrementotamanoicono = gincrementotamanoicono;
    opacidad = gopacidad;

    opacidadfondo0 = gopacidadfondo0;
    opacidadfondo = gopacidadfondo;

    plano.style.opacity = opacidadfondo;
    fondo.style.opacity = opacidadfondo0;
    var iconoc = document.getElementsByClassName("icono");
    for (ic = 0; ic < iconoc.length; ic++) {
      iconoc[ic].style.height = tamanoicono + "px";
      iconoc[ic].style.width = tamanoicono + "px";
      iconoc[ic].style.opacity = opacidad;
    }
    rellenanombreplanoicono();

    registro("generales", "x", "ultimo", 0, "W");
    registro("generales", "x", "Planoactivo", planoactivo, "W");
    registro("generales", "x", "Tamanoicono", tamanoicono, "W");
    registro("generales", "x", "Incrementotamanoicono", incrementotamanoicono, "W");
    registro("generales", "x", "opacidad", opacidad, "W");
    registro("generales", "x", "opacidadfondo0", opacidadfondo0, "W");
    registro("generales", "x", "anchofondo", anchofondo, "W");
    registro("generales", "x", "altofondo", altofondo, "W");
    registro("generales", "x", "colortextobarra", colortextobarra, "W");
    registro("generales", "x", "colorfondobarra", colorfondobarra, "W");
    registro("generales", "x", "dibujofondo0", dibujofondo0, "W");
    registro("generales", "x", "opacidadfondo", opacidadfondo, "W");
    registro("generales", "x", "ultimo", 1, "W");
  }
  //***********************************************************
  function generalplanos(ev) {

    var plano = document.getElementById("imagenplano");
    var fondo = document.getElementById("fondo");
    var src0 = document.createAttribute("src");
    var src1 = document.createAttribute("src");
    var iconomuestra = document.getElementById("imageniconogeneral");
    procesoactivo = "general";
    gultimoplano = gnomdibujofondo.length;


    if (gplanoactivo < 0 || gplanoactivo > gultimoplano) { gplanoactivo = 0; }
    switch (ev.id) {
      case "anteriorplanta":
        if (gplanoactivo > 0) {
          gplanoactivo--;
          src1.value = gdibujofondo[gplanoactivo];
          plano.setAttributeNode(src1);
          idopcion("posplanta", gplanoactivo, gnomdibujofondo[gplanoactivo], "selecciona");
        }
        break;
      case "siguienteplanta":
        if (gplanoactivo < (gultimoplano - 1)) {
          gplanoactivo++;

          //while (typeof(gdibujofondo[gplanoactivo]!="string"))
          //if (typeof(gdibujofondo[gplanoactivo]!="string"))

          src1.value = gdibujofondo[gplanoactivo];
          plano.setAttributeNode(src1);
          idopcion("posplanta", gplanoactivo, gnomdibujofondo[gplanoactivo], "selecciona");
        }
        break;
      case "nuevaplanta":
        document.getElementById("fileticono").value = "";
        gplanoactivo = 1000;
        gordendibujofondo[gultimoplano] = gultimoplano + 0.5 + "|" + gultimoplano;
        document.getElementById("cuadroNuevaImagen").style.display = "block";;
        return;
        break;

      case "eliminaplanta":
        var opcion = document.getElementById("posplanta");
        if (gdibujofondo.length <= 1) { return; }

        gultimoplano = gdibujofondo.length;
        if (gplanoactivo >= gultimoplano) { gplanoactivo = gultimoplano - 1; }


        gdibujofondo.splice(gplanoactivo, 1);
        gordendibujofondo.pop();
        gnomdibujofondo.splice(gplanoactivo, 1);

        gultimoplano = gdibujofondo.length;

        gplanoactivo--;
        if (gplanoactivo < 0) { gplanoactivo = 0; }
        if (gplanoactivo >= gdibujofondo.length) { gplanoactivo = gdibujofondo.length - 1; }
        idopcion("posplanta", gplanoactivo, "", "selecciona");
        src0.value = gdibujofondo[gplanoactivo];
        plano.setAttributeNode(src0);

        idopcion("posplanta", -1, "", "borra");
        break;
      case "cambiaplanta":
        document.getElementById("fileticono").value = "";
        var nimg = document.getElementById("cuadroNuevaImagen");
        nimg.style.display = "block";
        //nimg.style.zIndex=20;
        break;
      case "guardargeneral":

        document.getElementById("myTopnav").style.display = "block"; //menús
        document.getElementById("cuadrofondo").style.display = "block";
        muestraIconos(true, "general planos guardageneral");
        document.getElementById("fondo0").style.display = "block";
        document.getElementById("general").style.display = "none";
        salvadegeneral();
        //menuseleccion('posicionar');
        procesoactivo = "principal";
        return;

      case "descartargeneral":
        document.getElementById("myTopnav").style.display = "block"; //menús
        document.getElementById("cuadrofondo").style.display = "block";
        muestraIconos(true, "general planos descartageneral");
        document.getElementById("fondo0").style.display = "block";
        document.getElementById("general").style.display = "none";
        //menuseleccion('posicionar');
        procesoactivo = "principal";
        return;

      case "posplanta":
        gplanoactivo = ev.selectedIndex;
        src1.value = gdibujofondo[gplanoactivo];
        plano.setAttributeNode(src1);
        break;
      case "nombreplanta":
        gnomdibujofondo[gplanoactivo] = ev.value + separadorlocal + document.getElementById("codigoplanta").value
        idopcion("posplanta", gplanoactivo, gnomdibujofondo[gplanoactivo], "actualiza");
        break;

      case "ordenplanta":

        var puestos = ev.value;
        if (puestos <= 0) { puestos = 0; ev.value = puestos; }

        if (puestos > gultimoplano - 1) { puestos = gultimoplano - 1; ev.value = puestos; }

        var m = 0;
        if (gplanoactivo < puestos) { m = 1; }
        var v = (puestos * 1) + m;
        gordendibujofondo[gplanoactivo] = v + "|" + gplanoactivo;

        ordenadibujos();
        return;

      case "cambiafondo":
        gcambiafondo = true;
        document.getElementById("fileticono").value = "";
        document.getElementById("cuadroNuevaImagen").style.display = "block";
        return;
      case "tamiconogeneral":
        //document.getElementById("tx2").innerHTML=ev.value;
        gtamanoicono = ev.value;
        iconomuestra.style.height = ev.value + "px";
        iconomuestra.style.width = ev.value + "px";
        return;
      case "inciconogeneral":
        gincrementotamanoicono = ev.value / 100;
        iconomuestra.style.height = (gtamanoicono * ev.value / 100) + "px";
        iconomuestra.style.width = (gtamanoicono * ev.value / 100) + "px";
        return;
      case "opciconogeneral":
        gopacidad = ev.value / 100;
        iconomuestra.style.opacity = gopacidad;
        return;
      case "opcfondogeneral":
        gopacidadfondo0 = ev.value / 100;;
        fondo.style.opacity = gopacidadfondo0;
        return;
      case "opcplanogeneral":
        gopacidadfondo = ev.value / 100;
        plano.style.opacity = gopacidadfondo;
        return;
    }
    document.getElementById("nombreplanta").value = token(gnomdibujofondo[gplanoactivo], 0, separadorlocal);
    document.getElementById("codigoplanta").value = token(gnomdibujofondo[gplanoactivo], -1, separadorlocal);
    document.getElementById("ordenplanta").value = token(gordendibujofondo[gplanoactivo], 1, "|") * 1;
  }

  //******************************************************************
  //******************************************************************
  //******************************************************************
  //************     RELACIONES         ******************************
  //******************************************************************
  //******************************************************************
  //******************************************************************
  //******************************************************************

  function actualizaeventos(ev) {
    switch (ev.id) {

      case "resel12":
        if (idopcion("resel12", -1, "", "obtiene2") == 0) {
          idopcion("resel11", 0, "se pone a On", "actualiza");
          idopcion("resel11", 1, "se pone a Off", "actualiza");
          idopcion("resel11", 2, "supera el valor", "actualiza");
          idopcion("resel11", 3, "minora el valor", "actualiza");
        } else {
          idopcion("resel11", 0, "está en On", "actualiza");
          idopcion("resel11", 1, "está en Off", "actualiza");
          idopcion("resel11", 2, "supere el valor", "actualiza");
          idopcion("resel11", 3, "minore el valor", "codigounion");
        }
        idopcion("resel11", 0, "", "selecciona");
        break;
      case "resel11":
        var xc = idopcion("resel11", -1, "", "obtiene2");
        var zx = document.getElementById("rb211");
        if (xc == 2 || xc == 3) { zx.style.display = "block"; } else { zx.style.display = "none"; }
        break;

      case "resel31":
        var xc = idopcion("resel31", -1, "", "obtiene2");
        var zx = document.getElementById("rb311");

        if (xc == 3) { zx.style.display = "block"; } else { zx.style.display = "none"; }
        break;

    }
  }
  //******************************************************************
  function ponerrelacionpordefecto(clavepr) {

    registro2("relaciones", clavepr, "accion", 0, "W");
    registro2("relaciones", clavepr, "evento", 5, "W");
    registro2("relaciones", clavepr, "retardo", 0, "W");
    registro2("relaciones", clavepr, "factor", 1, "W");
    registro2("relaciones", clavepr, "factora", 1, "W");
    registro2("relaciones", clavepr, "valoref", 0, "W");
    registro2("relaciones", clavepr, "valorefa", 0, "W");
    registro2("relaciones", clavepr, "salida", 0, "W");
    registro2("relaciones", clavepr, "tmp", 0, "W");
    registro2("relaciones", clavepr, "codigounion", "SIN unión", "W");
    registro2("relaciones", clavepr, "Eliminar", 0, "W");
    gestionrelacion(document.getElementById("resel0"));
  }
  //******************************************************************
  function obtieneconjuntorelaciones2() {
    var clave;
    function sonlineasdeprograma2(reg) {
      clave = token(reg, 1, separadorcampo);
      return (token(reg, 0, separadorcampo) == "relaciones") && (token(clave, 0, separadorlocal) == CodiconoActivo);
    }
    var linok = [];
    var codok = [];
    linok = recno2.filter(sonlineasdeprograma2);
    var numlinok = linok.length;
    for (p = 0; p < numlinok; p++) {
      codok[p] = token(linok[p], 1, separadorcampo);
    }
    return codok;
  }
  //********************************************************
  function borrarelaciones() {
    var first = 1;
    var contador = 1000;
    while (first > -1 && contador > 0) {
      first = recno2.findIndex(myFunctionxxx);
      if (first > -1) { recno2.splice(first, 1); }
      contador--;
    }
    function myFunctionxxx(reg, index, array) {
      return token(reg, 0, separadorcampo) == "relaciones";
    }
    document.getElementById("myTopnav").style.display = "block"; //menús
    document.getElementById("cuadrofondo").style.display = "block";
    muestraIconos(true, "general planos guardageneral");
    document.getElementById("fondo0").style.display = "block";
  }
  //******************************************************************
  function gestionrelacion(boton) {
    var txtrelacion;
    var clavepr;

    switch (boton.id) {
      case "botonre02":
        document.getElementById("cuadrorelaciones").style.display = "none";
        borrarelaciones();
        break;
      case "botonre01":
        var xx;
        var bn;
        var todos = obtieneconjuntorelaciones2();
        var fg = todos.length;


        for (m = 0; m < fg; m++) {
          clavepr = todos[m];
          registro("relaciones", clavepr, "ultimo", 0, "W");
          xx = registro2("relaciones", clavepr, "codigorelacion", "", "R");
          registro("relaciones", clavepr, "codigorelacion", xx, "W");
          xx = registro2("relaciones", clavepr, "iconodispositivo", "", "R");
          registro("relaciones", clavepr, "iconodispositivo", xx, "W");
          xx = registro2("relaciones", clavepr, "entradarel", "", "R");
          registro("relaciones", clavepr, "entradarel", xx, "W");
          xx = registro2("relaciones", clavepr, "accion", "", "R");

          registro("relaciones", clavepr, "accion", xx, "W");
          xx = registro2("relaciones", clavepr, "evento", "", "R");
          registro("relaciones", clavepr, "evento", xx, "W");
          xx = registro2("relaciones", clavepr, "retardo", "", "R");
          registro("relaciones", clavepr, "retardo", xx, "W");
          xx = registro2("relaciones", clavepr, "factor", "", "R");
          registro("relaciones", clavepr, "factor", xx, "W");
          xx = registro2("relaciones", clavepr, "valoref", "", "R");
          registro("relaciones", clavepr, "valoref", xx, "W");
          xx = registro2("relaciones", clavepr, "factora", "", "R");
          registro("relaciones", clavepr, "factora", xx, "W");
          xx = registro2("relaciones", clavepr, "valorefa", "", "R");
          registro("relaciones", clavepr, "valorefa", xx, "W");
          xx = registro2("relaciones", clavepr, "salida", "", "R");
          registro("relaciones", clavepr, "salida", xx, "W");
          xx = registro2("relaciones", clavepr, "codigounion", "", "R");
          xx=token(xx,0,"[")

          if (obtenaccion2(clavepr, todos)) { xx = "SIN unión"; }

          registro("relaciones", clavepr, "codigounion", xx, "W");
          xx = registro2("relaciones", clavepr, "tmp", "", "R");
          registro("relaciones", clavepr, "tmp", xx, "W");
          xx = registro2("relaciones", clavepr, "Eliminar", "", "R");
          registro("relaciones", clavepr, "Eliminar", xx, "W");

          //if(xx!='1'){pr=pr+" NO* "+clavepr;}
          //if(xx=='1'){pr=pr+" ** "+clavepr;}

          registro("relaciones", clavepr, "ultimo", 1, "W");
        }
        document.getElementById("cuadrorelaciones").style.display = "none";
        borrarelaciones();
        break;

      case "botonre1":
      case "resel1":

        var ico2 = idopcion("resel1", -1, "", "obtiene2");
        var ico = Icono[ico2];
        var relx = obtencodigo(relaciones);
        var orden = idopcion("resel3", -1, ico + "-" + relx, "anade");
        idopcion("resel0", -1, ico + "-" + relx, "anade");

        registro2("relaciones", CodiconoActivo + separadorlocal + relx, "iconodispositivo", ico, "W");
        registro2("relaciones", CodiconoActivo + separadorlocal + relx, "codigorelacion", relx, "W");
        registro2("relaciones", CodiconoActivo + separadorlocal + relx, "tmp", ico + "-" + relx, "W");

        idopcion("resel3", orden, "", "marca");
        idopcion("resel0", orden, "", "marca");
        relaciones[relaciones.length] = CodiconoActivo + separadorlocal + relx;
        document.getElementById("textoreglaseleccionada").innerHTML = ico + "-" + relx;

        ponerrelacionpordefecto(CodiconoActivo + separadorlocal + relx);

        break;
      case "botonre2":
      case "resel2":
        var ico = idopcion("resel2", -1, "", "obtiene");
        var relx = obtencodigo(relaciones);
        var orden = idopcion("resel3", -1, ico + "-" + relx, "anade");

        idopcion("resel0", -1, ico + "-" + relx, "anade");
        idopcion("resel4", -1, ico + "-" + relx, "anade");

        idopcion("resel3", orden, "", "marca");
        idopcion("resel0", orden, "", "marca");
        relaciones[relaciones.length] = CodiconoActivo + separadorlocal + relx;
        document.getElementById("textoreglaseleccionada").innerHTML = ico + "-" + relx;

        registro2("relaciones", CodiconoActivo + separadorlocal + relx, "iconodispositivo", ico, "W");
        registro2("relaciones", CodiconoActivo + separadorlocal + relx, "entradarel", ico, "W");
        registro2("relaciones", CodiconoActivo + separadorlocal + relx, "codigorelacion", relx, "W");
        registro2("relaciones", CodiconoActivo + separadorlocal + relx, "tmp", ico + "-" + relx, "W");

        ponerrelacionpordefecto(CodiconoActivo + separadorlocal + relx);
        break;
      case "resel3":
        //idopcion("resel0", idopcion("resel3", -1, "", "obtiene2"), "", "selecciona");
        idopcion("resel0", idopcion("resel3", -1, "", "selecciona"), "", "selecciona");
        gestionrelacion(document.getElementById("resel0"));

        break;
      case "botonre4":
        var xx;
        var regla = idopcion("resel3", -1, "", "selecciona");
        var clavepr1 = obtenclaveprse(regla);
        //var codborrado=registro2("relaciones",clavepr1,"codigorelacion","","R");
        var codborrado = idopcion("resel3", -1, "", "obtiene");
        var todos = obtieneconjuntorelaciones2();
        var fg = todos.length;
        for (m = 0; m < fg; m++) {
          clavepr = todos[m];
          xx = registro2("relaciones", clavepr, "codigounion", "", "R");
          if (xx == codborrado) { registro2("relaciones", clavepr, "codigounion", "SIN unión", "W"); }
        }
        registro2("relaciones", clavepr1, "Eliminar", 1, "W");

        idopcion("resel3", regla, "", "elimina");
        idopcion("resel0", regla, "", "elimina");
        idopcion("resel4", regla + 1, "", "elimina");
        //registro("relaciones",clavepr,"Elimina","1","W")
        break;

      case "resel0":
        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        clavepr = obtenclaveprse(orden0);
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;
        idopcion("resel12", registro2("relaciones", clavepr, "accion", "", "R"), "", "selecciona");
        idopcion("resel11", registro2("relaciones", clavepr, "evento", "", "R"), "", "selecciona");
        document.getElementById("botonre21").value = registro2("relaciones", clavepr, "retardo", "", "R");

        var xc = idopcion("resel11", -1, "", "obtiene2");
        var zx = document.getElementById("rb211");
        if (xc == 2 || xc == 3) { zx.style.display = "block"; } else { zx.style.display = "none"; }
        document.getElementById("botonre241").value = registro2("relaciones", clavepr, "factor", "", "R") * 100;
        document.getElementById("botonre242").value = registro2("relaciones", clavepr, "valoref", "", "R");
        document.getElementById("botonre23").value = registro2("relaciones", clavepr, "valoref", "", "R");
        idopcion("resel31", registro2("relaciones", clavepr, "salida", "", "R"), "", "selecciona");
        //var xc=idopcion("resel31",-1,"","obtiene2");
        var xc = registro2("relaciones", clavepr, "salida", "", "R");
        var zx = document.getElementById("rb311");

        if (xc != "3") { zx.style.display = "none"; } else { zx.style.display = "block"; }
        document.getElementById("botonre341").value = registro2("relaciones", clavepr, "factora", "", "R") * 100;
        document.getElementById("botonre342").value = registro2("relaciones", clavepr, "valorefa", "", "R");
        document.getElementById("botonre33").value = registro2("relaciones", clavepr, "valorefa", "", "R");

        //*** actualiza resel4

        actualizaresel4(clavepr);

        var relacion  = registro2("relaciones", clavepr, "codigounion", "", "R");
        var icono = token(relacion,0,"-");
        var nombre = "["+registro("iconos", icono, "Nombre", "", "R")+"]";
        var tx=relacion+nombre;
        //var tx = registro2("relaciones", clavepr, "codigounion", "", "R");
        
        idopcion("resel4", "", tx, "buscatxt");

        //***123
        var xc = registro2("relaciones", clavepr, "accion", "", "R");
        var zx = document.getElementById("resel31");
        if (xc == "2") {
          idopcion("resel31", "0", "", "desactiva");
          idopcion("resel31", "1", "", "desactiva");
          idopcion("resel31", "2", "", "desactiva");
          idopcion("resel31", "3", "", "desactiva");
          idopcion("resel31", "4", "", "activa");
          idopcion("resel31", "4", "", "selecciona");
          registro2("relaciones", clavepr, "salida", "4", "W");
          gestionrelacion(zx);
          //zx.disabled=true;
        }
        else {
          zx.disabled = false;
          xc = idopcion("resel31", -1, "", "obtiene2");
          idopcion("resel31", "0", "", "activa");
          idopcion("resel31", "1", "", "activa");
          idopcion("resel31", "2", "", "activa");
          idopcion("resel31", "3", "", "activa");
          idopcion("resel31", "4", "", "desactiva");
          if (xc == "4") {
            idopcion("resel31", "0", "", "selecciona");
            registro2("relaciones", clavepr, "salida", "0", "W");
            gestionrelacion(zx);
          }
        }
        break;

      case "botonre12":
      case "resel12":
        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        var orden = idopcion("resel12", -1, "", "obtiene2");
        clavepr = obtenclaveprse(orden0);
        registro2("relaciones", clavepr, "accion", orden, "W");
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;

        var xc = registro2("relaciones", clavepr, "accion", "", "R");
        var zx = document.getElementById("resel31");
        if (xc == "2") {
          idopcion("resel31", "0", "", "desactiva");
          idopcion("resel31", "1", "", "desactiva");
          idopcion("resel31", "2", "", "desactiva");
          idopcion("resel31", "3", "", "desactiva");
          idopcion("resel31", "4", "", "activa");
          idopcion("resel31", "4", "", "selecciona");
          registro2("relaciones", clavepr, "salida", "4", "W");
          gestionrelacion(zx);
          //zx.disabled=true;
        }
        else {
          zx.disabled = false;
          xc = idopcion("resel31", -1, "", "obtiene2");
          idopcion("resel31", "0", "", "activa");
          idopcion("resel31", "1", "", "activa");
          idopcion("resel31", "2", "", "activa");
          idopcion("resel31", "3", "", "activa");
          idopcion("resel31", "4", "", "desactiva");
          if (xc == "4") {
            idopcion("resel31", "0", "", "selecciona");
            registro2("relaciones", clavepr, "salida", "0", "W");
            gestionrelacion(zx);
          }
        }
        break;
      case "botonre11":
      case "resel11":
        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        var orden = idopcion("resel11", -1, "", "obtiene2");
        clavepr = obtenclaveprse(orden0);
        registro2("relaciones", clavepr, "evento", orden, "W");
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;

        break;
      case "botonre22":
        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        clavepr = obtenclaveprse(orden0);
        orden = document.getElementById("botonre21").value;
        registro2("relaciones", clavepr, "retardo", orden, "W");
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;
        break;
      case "botonre23":
        var escala = document.getElementById("botonre241").value;
        document.getElementById("botonre242").value = document.getElementById("botonre23").value * escala / 100;
        break;

      case "botonre33":
        var escala = document.getElementById("botonre341").value;
        document.getElementById("botonre342").value = document.getElementById("botonre33").value * escala / 100;
        break;

      case "botonre25":
        var escala = document.getElementById("botonre241").value / 100;
        var valoref = document.getElementById("botonre242").value;

        var text1 = document.getElementById("botonre23").value * escala;
        document.getElementById("botonre242").value = text1

        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        clavepr = obtenclaveprse(orden0);

        registro2("relaciones", clavepr, "valoref", valoref, "W");
        registro2("relaciones", clavepr, "factor", escala, "W");
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;
        break;

      case "botonre35":
        var escala = document.getElementById("botonre341").value / 100;
        var valoref = document.getElementById("botonre342").value;

        var text1 = document.getElementById("botonre33").value * escala;
        document.getElementById("botonre342").value = text1

        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        clavepr = obtenclaveprse(orden0);

        registro2("relaciones", clavepr, "valorefa", valoref, "W");
        registro2("relaciones", clavepr, "factora", escala, "W");
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;
        break;

      case "botonre31":
      case "resel31":
        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        var orden = idopcion("resel31", -1, "", "obtiene2");
        clavepr = obtenclaveprse(orden0);
        registro2("relaciones", clavepr, "salida", orden, "W");
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;
        break;
      case "botonre41":
      case "resel4":

        var codunion = idopcion("resel4", -1, "", "obtiene");
        var orden0 = idopcion("resel0", -1, "", "obtiene2");
        var clavepr = obtenclaveprse(orden0);
        registro2("relaciones", clavepr, "codigounion", codunion, "W");
        txtrelacion = obtentextodelaregla(clavepr);
        document.getElementById("textoreglaseleccionada").innerHTML = txtrelacion;

        break;
    }
  }
  //******************************************************************
  function actualizaresel4(clavepr) {
    var todos = obtieneconjuntorelaciones2();
    idopcion("resel4", 1, "", "borra");
    var td = todos.length;
    var clas;
    for (var k = 0; k < td; k++) {
      clas = registro2("relaciones", todos[k], "accion", "", "R");
      if (todos[k] == clavepr) { continue; } // en caso que sea un interruptor, se añade

      

      if (clas == "2") { 
        icono  = registro2("relaciones", todos[k], "iconodispositivo", "", "R");
        nombre = "["+registro("iconos", icono, "Nombre", "", "R")+"]";
        idopcion("resel4", -1, icono 
      + "-" + registro2("relaciones", todos[k], "codigorelacion", "", "R")+nombre, "anade"); }
    }
  }
  //******************************************************************
  function obtenaccion2(regla, todos) {
    var clve = registro2("relaciones", regla, "codigounion", "", "R");
    if (clve == "SIN unión") { return true; }
    var tantos = todos.length;
    var codigorelacion = token(clve, -1, "-");
    codigorelacion = token(codigorelacion,0,"[")
    for (var cont = 0; cont < tantos; cont++) {
      if (registro2("relaciones", todos[cont], "codigorelacion", "", "R") == codigorelacion) {
        if (todos[cont] == registro2("relaciones", regla, "icono", "", "R")) { return true; }
        else {
          if (registro2("relaciones", todos[cont], "accion", "", "R") == "2") {
            return false;
          }
        }
      }
    }
    return true;
  }
  //******************************************************************
  function obtenclaveprse(regla) {
    var tmp = idopcion("resel3", regla, "", "obtiene");
    claverelacion = token(token(tmp, 0, "["),-1,"-");
    return CodiconoActivo + separadorlocal + claverelacion;
  }
  //******************************************************************
  function cargarelacion() {

    document.getElementById("cuadrorelaciones").style.display = "block";
    document.getElementById("dispositivo0").innerHTML = CodiconoActivo;
    document.getElementById("textoreglaseleccionada").innerHTML = "";
    //relaciones=obtieneconjuntorelaciones();


    idopcion("resel3", 0, "", "borra");
    idopcion("resel0", 0, "", "borra");
    idopcion("resel4", 1, "", "borra");

    idopcion("resel12", 0, "", "selecciona");
    idopcion("resel11", 0, "", "selecciona");
    idopcion("resel31", 0, "", "selecciona");
    idopcion("resel4", 0, "", "selecciona");
    document.getElementById("rb211").style.display = "none";
    document.getElementById("rb311").style.display = "none";


    var totalIconos = Icono.length;
    for (j = 0; j < totalIconos; j++) { idopcion("resel1", j, Icono[j] + "-" + registro("iconos", Icono[j], "Nombre", "", "R"), "anade"); }

    FiltraRegistros("dispositivos");
    totalDispositivos = dispositivos.length;
    for (j = 0; j < totalDispositivos; j++) { idopcion("resel2", j, dispositivos[j], "anade"); }


    //  ie=0
    //  iconodispositivo=1;
    //  entradarel=2;
    //  codigorelacion=3
    //  evento=4
    //  retardo=5
    //  valoref=6
    //  salida=7
    //  codigounion=8


    var clavepr;
    var relas = [];
    var claveop;
    var iconodispositivo;
    var entradarel;
    var codigorelacion;
    var nombreicono;
    relas = obtieneconjuntorelaciones();
    var ie = "I";
    var ulter = relas.length;

    var sust;
    for (ti = 0; ti < ulter; ti++) {
      clavepr = relas[ti];
      ie = "I";
      sust = registro("relaciones", clavepr, "iconodispositivo", "", "R")
      registro2("relaciones", clavepr, "iconodispositivo", sust, "W")
      sust = registro("relaciones", clavepr, "evento", "", "R")
      registro2("relaciones", clavepr, "evento", sust, "W")
      sust = registro("relaciones", clavepr, "retardo", "", "R")
      registro2("relaciones", clavepr, "retardo", sust, "W")
      sust = registro("relaciones", clavepr, "valoref", "", "R")
      registro2("relaciones", clavepr, "valoref", sust, "W")
      sust = registro("relaciones", clavepr, "salida", "", "R")
      registro2("relaciones", clavepr, "salida", sust, "W")
      sust = registro("relaciones", clavepr, "codigounion", "", "R")
      registro2("relaciones", clavepr, "codigounion", sust, "W")
      sust = registro("relaciones", clavepr, "tmp", "", "R")
      registro2("relaciones", clavepr, "tmp", sust, "W")
      sust = registro("relaciones", clavepr, "accion", "", "R")
      registro2("relaciones", clavepr, "accion", sust, "W")

      sust = registro("relaciones", clavepr, "factor", "", "R")
      registro2("relaciones", clavepr, "factor", sust, "W")
      sust = registro("relaciones", clavepr, "factora", "", "R")
      registro2("relaciones", clavepr, "factora", sust, "W")
      sust = registro("relaciones", clavepr, "valorefa", "", "R")
      registro2("relaciones", clavepr, "valorefa", sust, "W")

      sust = registro("relaciones", clavepr, "entradarel", "", "R")
      registro2("relaciones", clavepr, "entradarel", sust, "W")
      sust = registro("relaciones", clavepr, "codigorelacion", "", "R")
      registro2("relaciones", clavepr, "codigorelacion", sust, "W")

      if (registro("relaciones", clavepr, "iconodispositivo", "", "R") == "") { ie = "E"; }
      
      entradarel = registro("relaciones", clavepr, "entradarel", "", "R");
      codigorelacion = registro("relaciones", clavepr, "codigorelacion", "", "R");
      iconodispositivo = registro("relaciones", clavepr, "iconodispositivo", "", "R");

      nombreicono = "";
      if (iconodispositivo) { nombreicono = "["+registro("iconos", iconodispositivo, "Nombre", "", "R")+"]"; }

      claveop = iconodispositivo + "-" + codigorelacion;

      idopcion("resel3", -1, claveop+nombreicono, "anade");
      idopcion("resel0", -1, claveop+nombreicono, "anade");
      idopcion("resel4", -1, claveop+nombreicono, "anade");


      //registro2("relaciones",clavepr,"tmp",claveop,"W");

    }
  }
  //******************************************************************
  function obtentextodelaregla(clavepr) {

    var tmp0 = "";
    var tmp1 = "";
    var tmp2 = "";
    var tmp3 = "";
    var ie;
    if (registro2("relaciones", clavepr, "iconodispositivo", "", "R") == "") { ie = "E"; }
    var iconodispositivo = registro2("relaciones", clavepr, "iconodispositivo", "", "R");
    var entradarel = registro2("relaciones", clavepr, "entradarel", "", "R");
    var codigorelacion = registro2("relaciones", clavepr, "codigorelacion", "", "R");

    if (ie == "E") { tmp0 = "La entrada "; tmp1 = entradarel; } else { tmp0 = "El Icono "; tmp1 = iconodispositivo; tmp2 = " con nombre " + registro("iconos", tmp1, "Nombre", "", "R"); }
    var texto = tmp0 + tmp1 + tmp2;
    var desactiva = false;
    tmp0 = registro2("relaciones", clavepr, "accion", "", "R");
    tmp1 = idopcion("resel12", tmp0, "", "obtiene");
    texto = texto + ", " + tmp1;

    tmp0 = registro2("relaciones", clavepr, "evento", "", "R");
    tmp1 = idopcion("resel11", tmp0, "", "obtiene");
    texto = texto + ", " + tmp1;
    tmp3 = "";
    if (tmp0 > 1 && tmp0 < 4) { tmp3 = "=" + registro2("relaciones", clavepr, "valoref", "", "R") }
    if (tmp0 == 5) { desactiva = true; }
    if (desactiva) { return texto; }

    texto = texto + " " + tmp3;
    tmp1 = "";
    tmp0 = registro2("relaciones", clavepr, "retardo", "", "R");

    tmp1 = " con un retardo de " + tmp0 + " segundos";
    texto = texto + " " + tmp1;

    tmp0 = registro2("relaciones", clavepr, "salida", "", "R");
    tmp1 = idopcion("resel31", tmp0, "", "obtiene");
    texto = texto + " " + tmp1;

    tmp3 = "";
    if (tmp0 == 3) { tmp3 = "=" + registro2("relaciones", clavepr, "valorefa", "", "R") }
    texto = texto + " " + tmp3;


    tmp1 = "";
    tmp3 = "Sin unión";
    tmp0 = registro2("relaciones", clavepr, "codigounion", "", "R");

    if (!((tmp0 == "") || (tmp0 == "SIN unión"))) { tmp3 = " si se cumple además la regla " + tmp0; } else { tmp3 = ", " + tmp3; }
    texto = texto + tmp3;
    return texto;
  }
  //******************************************************************
  function obtieneconjuntorelaciones() {// icono + clave programa
    var clave;
    function sonlineasdeprograma(reg) {
      clave = token(reg, 1, separadorcampo);
      return (token(reg, 0, separadorcampo) == "relaciones") && (!EstaBorrado("relaciones", clave)) && (token(clave, 0, separadorlocal) == CodiconoActivo);
    }
    var linok = [];
    var codok = [];
    linok = recno.filter(sonlineasdeprograma);
    var numlinok = linok.length;
    for (p = 0; p < numlinok; p++) {
      codok[p] = token(linok[p], 1, separadorcampo);
    }
    return codok;
  }

  //*******************************************************************
  function AsignaDatos() {
    //carga variables de fondo
    //planoactivo=registro("generales","x","Planoactivo","","R");
    planoactivo = 0;
    tamanoicono = registro("generales", "x", "Tamanoicono", "", "R");
    incrementotamanoicono = registro("generales", "x", "Incrementotamanoicono", "", "R");
    opacidad = registro("generales", "x", "opacidad", "", "R");
    opacidadfondo0 = registro("generales", "x", "opacidadfondo0", "", "R");
    anchofondo = registro("generales", "x", "anchofondo", "", "R");
    altofondo = registro("generales", "x", "altofondo", "", "R");
    colortextobarra = registro("generales", "x", "colortextobarra", "", "R");
    colorfondobarra = registro("generales", "x", "colorfondobarra", "", "R");
    dibujofondo0 = registro("generales", "x", "dibujofondo0", "", "R");
    opacidadfondo = registro("generales", "x", "opacidadfondo", "", "R");
    ruta = registro("generales", "x", "ruta", "", "R");

    var bor;
    var co = 0;
    var ca;
    var sinnumero = 0;
    var numplanos = iddibujofondo.length;
    var noestan = "";
    var estan = "";
    var tp = "";
    var eliminarregistros = "";
    for (var gh = 0; gh < numplanos; gh++) {

      nomdibujofondo.pop();
      dibujofondo.pop();
      ordendibujofondo.pop();
    }
    for (var gh = 0; gh < numplanos; gh++) {
      bor = registro("planos", iddibujofondo[gh], "Eliminar", "", "R")
      if (bor == "0") {
        tp = registro("planos", iddibujofondo[gh], "Ordendibujofondo", "", "R");
        ca = token(tp, -1, "|");
        co = ca * 1;

        if (!(ca == "" || estan.indexOf("|" + ca + "|", 0) > -1 || co > numplanos)) {
          if (registro("planos", iddibujofondo[gh], "Nomdibujofondo", "", "R") == "") {
            //registro("planos",iddibujofondo[gh],"Eliminar","1","W");
            eliminarregistros = eliminarregistros + iddibujofondo[gh] + "|";

          }
          else {
            nomdibujofondo[co] = registro("planos", iddibujofondo[gh], "Nomdibujofondo", "", "R") + separadorlocal + iddibujofondo[gh];
            dibujofondo[co] = registro("planos", iddibujofondo[gh], "Dibujofondo", "", "R");
            ordendibujofondo[co] = co + "|" + co;
          }
          estan = estan + "|" + ca + "|";
        } else {
          noestan = noestan + "|" + iddibujofondo[gh]; sinnumero++;
        }
      }
    }

    var ident = "";

    for (var h = 0; h < sinnumero; h++) {
      ident = token(noestan, h, "|")
      for (var t = 0; t < numplanos; t++) {
        if (estan.indexOf("|" + t + "|", 0) == -1) {
          estan = estan + "|" + t + "|";
          co = t;
          break;
        }
      }
      nomdibujofondo[co] = registro("planos", ident, "Nomdibujofondo", "", "R") + separadorlocal + ident;
      dibujofondo[co] = registro("planos", ident, "Dibujofondo", "", "R");
      ordendibujofondo[co] = co + "|" + co;
    }

    //*** Imagen de fondo
    var fondo0 = document.getElementById("fondo00");
    var fondo = document.getElementById("cuadrofondo00");
    var formulario = document.getElementById("edicionicono");
    var src0 = document.createAttribute("src");
    var src1 = document.createAttribute("src");
    //fondo0.style.backgroundImage = dibujofondo0;
    //fondo.style.backgroundImage = dibujofondo[1];
    src1.value = dibujofondo[planoactivo];
    src0.value = dibujofondo0;
    fondo0.setAttributeNode(src0);
    fondo.setAttributeNode(src1);

    fondo.style.opacity = opacidadfondo;
    fondo0.style.opacity = opacidadfondo0;
    fondo.style.width = anchofondo + "px";
    fondo.style.height = altofondo + "px";

    formulario.style.width = anchofondo + "px";
    formulario.style.height = altofondo + "px";
    formulario.style.display = "none";
    var bn = nomdibujofondo.length;
    for (j = 0; j < bn; j++) {
      if (nomdibujofondo[j]) {
        idopcion("numplanomenu1", j, nomdibujofondo[j], "anade");
      }
    }
    ultimoplano = bn;
    idopcion("numplanomenu1", planoactivo, "", "selecciona");
    document.getElementById("numplanomenu").innerHTML = planoactivo;
    muestraIconos(false, "menuselección asignadatos");
    muestraIconos(true, "menuselección asignadatos");



    for (var gh = 0; gh < numplanos; gh++) {
      if (typeof (nomdibujofondo[gh]) != "string") {

        nomdibujofondo.splice(gh, 1);
        dibujofondo.splice(gh, 1);
        ordendibujofondo.splice(gh, 1);
      } else {
        if (nomdibujofondo[gh].length == 0) {
          nomdibujofondo.splice(gh, 1);
          dibujofondo.splice(gh, 1);
          ordendibujofondo.splice(gh, 1);
        }
      }
    }
    co = 0;
    while (token(eliminarregistros, co, "|") != "") {
      registro("planos", token(eliminarregistros, co, "|"), "Eliminar", "1", "W");
      co++;
    }

  }
  //*********************************************************************************
  function cargadatos() {

    //Generales ******************************

    //registro("planos","P01","Nomdibujofondo","planta Principal","W");
    //registro("planos","P01","Dibujofondo","http://dragontaleslive.com/wp-content/uploads/2018/09/casas-4-habitaciones-planos-de-youtube-plano-casa.jpg","W");

    registro("generales", "x", "Planoactivo", 0, "W");
    registro("generales", "x", "Tamanoicono", 35, "W");
    registro("generales", "x", "Incrementotamanoicono", "1.1", "W");
    registro("generales", "x", "opacidad", 1, "W");
    registro("generales", "x", "opacidadfondo0", 1, "W");
    registro("generales", "x", "opacidadfondo", 0.8, "W");
    registro("generales", "x", "anchofondo", 1250, "W");
    registro("generales", "x", "altofondo", 620, "W");
    registro("generales", "x", "colortextobarra", "#220011", "W");
    registro("generales", "x", "colorfondobarra", "#11bbaa", "W");
    //registro("generales","x","dibujofondo0","https://image.freepik.com/foto-gratis/fondo-piso-madera_53876-88628.jpg","W");

  }