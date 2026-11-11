/* ============================================================================
   SERVIDOR DE RESEÑAS - SERVIC PC
   ----------------------------------------------------------------------------
   Este archivo es para pegar en Google Apps Script (script.google.com).
   Con el tenes una planilla de Google como base de datos, GRATIS y sin
   servidor propio: las reseñas que mandan los clientes de la web llegan
   a TU planilla y las podes ver, aprobar o rechazar desde el panel.

   COMO SE USA (resumen, la guia completa esta en docs/SERVIDOR-RESENAS.md):
   1) Crear una planilla de Google con dos hojas: "Reseñas" y "Config".
   2) En la hoja "Reseñas", la fila 1 tiene estos títulos:
         id | fecha | nombre | estrellas | texto | estado
   3) En la hoja "Config", en la celda A1, ponés tu clave de administrador.
   4) Pegás este código en Extensiones > Apps Script, guardás y desplegás
      como "Web App" con permiso "Cualquier persona".
   5) Copiás la dirección que te da (termina en /exec) y la pegás en el
      panel de administración, en la pestaña "Datos y acceso".
   ========================================================================== */

/* Nombre de las hojas de la planilla */
var HOJA_RESENAS = "Reseñas";
var HOJA_CONFIG = "Config";

/* Columnas de la hoja de reseñas, en orden */
var COLUMNAS = ["id", "fecha", "nombre", "estrellas", "texto", "estado"];

/* ==========================================================================
   1) LO QUE PIDE EL NAVEGADOR
   ========================================================================== */

/* Se llama con GET: action=listar (trae las reseñas), estado o borrar */
function doGet(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var accion = p.accion ? p.accion : "listar";

    if (accion === "listar") {
      return json({ ok: true, resenas: leerResenas() });
    }

    if (accion === "estado" || accion === "borrar") {
      if (!claveCorrecta(p.clave)) {
        return json({ ok: false, error: "Clave de administrador incorrecta." });
      }
      if (accion === "estado") {
        cambiarEstado(p.id, p.estado);
        return json({ ok: true, mensaje: "Estado cambiado a " + p.estado + "." });
      }
      borrarFila(p.id);
      return json({ ok: true, mensaje: "Reseña borrada." });
    }

    return json({ ok: false, error: "Acción desconocida." });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

/* Se llama con POST: es lo que usa el formulario de la web */
function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var accion = p.accion ? p.accion : "nueva";

    if (accion === "nueva") {
      agregarReseña(p);
      return json({
        ok: true,
        mensaje: "¡Gracias! Tu opinión fue enviada y ya la estamos revisando."
      });
    }

    if (accion === "estado" || accion === "borrar") {
      if (!claveCorrecta(p.clave)) {
        return json({ ok: false, error: "Clave de administrador incorrecta." });
      }
      if (accion === "estado") {
        cambiarEstado(p.id, p.estado);
        return json({ ok: true, mensaje: "Estado cambiado." });
      }
      borrarFila(p.id);
      return json({ ok: true, mensaje: "Reseña borrada." });
    }

    return json({ ok: false, error: "Acción desconocida." });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

/* ==========================================================================
   2) TRABAJO CON LA PLANILLA
   ========================================================================== */

/* Devuelve todas las reseñas como una lista de objetos */
function leerResenas() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_RESENAS);
  if (!hoja) { return []; }

  var datos = hoja.getDataRange().getValues();
  if (datos.length < 2) { return []; }

  var cabecera = datos[0];
  var lista = [];

  for (var i = 1; i < datos.length; i++) {
    if (!datos[i][0]) { continue; }         /* fila vacia */
    var objeto = {};
    for (var j = 0; j < cabecera.length; j++) {
      objeto[cabecera[j]] = datos[i][j];
    }
    objeto.estrellas = Number(objeto.estrellas) || 0;
    objeto.estado = objeto.estado ? String(objeto.estado) : "pendiente";
    lista.push(objeto);
  }
  return lista;
}

/* Agrega una reseña nueva al final de la planilla */
function agregarReseña(p) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_RESENAS);
  if (!hoja) { throw new Error("No existe la hoja " + HOJA_RESENAS); }

  /* Si la hoja esta vacia, se escriben los titulos */
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(COLUMNAS);
  }

  hoja.appendRow([
    p.id ? p.id : ("r" + new Date().getTime()),
    p.fecha ? p.fecha : new Date().toISOString().slice(0, 10),
    p.nombre ? p.nombre : "Anónimo",
    Number(p.estrellas) || 0,
    p.texto ? p.texto : "",
    "pendiente"     /* siempre nace pendiente: el dueño la aprueba */
  ]);
}

/* Cambia el estado de una reseña (aprobada / rechazada / pendiente) */
function cambiarEstado(id, estado) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_RESENAS);
  if (!hoja) { return; }

  var datos = hoja.getDataRange().getValues();
  for (var i = 1; i < datos.length; i++) {
    if (String(datos[i][0]) === String(id)) {
      hoja.getRange(i + 1, COLUMNAS.indexOf("estado") + 1).setValue(estado);
      return;
    }
  }
}

/* Borra la fila de una reseña */
function borrarFila(id) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_RESENAS);
  if (!hoja) { return; }

  var datos = hoja.getDataRange().getValues();
  for (var i = 1; i < datos.length; i++) {
    if (String(datos[i][0]) === String(id)) {
      hoja.deleteRow(i + 1);
      return;
    }
  }
}

/* Compara la clave que manda el panel con la de la hoja Config */
function claveCorrecta(claveRecibida) {
  if (!claveRecibida) { return false; }
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA_CONFIG);
  if (!hoja) { return false; }
  var claveReal = hoja.getRange("A1").getValue();
  return claveReal && String(claveReal) === String(claveRecibida);
}

/* Devuelve la respuesta en formato JSON (con permiso para que la lea
   cualquier pagina, asi funciona desde GitHub Pages) */
function json(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
