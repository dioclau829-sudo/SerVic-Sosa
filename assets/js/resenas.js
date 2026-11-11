/* ============================================================
   RESENAS DE LOS CLIENTES
   Archivo: assets/js/resenas.js
   Se usa en index.html y en Reseñas.html.

   QUE HACE:
   1) Dibuja las opiniones que el administrador YA APROBO.
   2) Recibe una opinion nueva del visitante y la deja pendiente,
      para que aparezca en la campana del panel de administracion.
   3) Ofrece la opcion de mandarla por WhatsApp, que es la via
      mas directa para que le llegue al taller.
   ============================================================ */

/* Dibuja las opiniones publicadas dentro del contenedor indicado */
function pintarOpiniones(idContenedor) {
  var contenedor = document.getElementById(idContenedor);
  if (!contenedor) { return; }

  var resenas = Tienda.resenasPublicas();
  contenedor.innerHTML = "";

  if (resenas.length === 0) {
    contenedor.innerHTML = '<p class="centro">Todavia no hay opiniones publicadas. Si fuiste cliente, deja la primera.</p>';
    return;
  }

  resenas.forEach(function (r) {
    var estrellas = "";
    for (var i = 0; i < 5; i++) {
      estrellas += '<i class="' + (i < r.estrellas ? "fas" : "far") + ' fa-star"></i>';
    }

    var tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-resena";
    tarjeta.innerHTML =
      '<div class="info-usuario">' +
        '<span class="nombre-usuario"><i class="fas fa-user-circle"></i> ' + escapar(r.nombre) + '</span>' +
        '<span class="estrellas">' + estrellas + '</span>' +
      '</div>' +
      '<p class="comentario">"' + escapar(r.texto) + '"</p>';
    contenedor.appendChild(tarjeta);
  });
}

/* Cuenta cuantas opiniones hay publicadas, para el texto del indice */
function contarOpiniones(idContenedor) {
  var contenedor = document.getElementById(idContenedor);
  if (!contenedor) { return; }
  var total = Tienda.resenasPublicas().length;
  contenedor.innerHTML = total === 1
    ? "1 opinion publicada por clientes."
    : total + " opiniones publicadas por clientes.";
}

/* Envia la opinion: queda pendiente de revision en el panel */
function enviarResena() {
  var nombre = document.getElementById("nombreCliente").value.trim();
  var texto = document.getElementById("textoCliente").value.trim();

  if (!nombre || !texto) {
    alert("Cargá tu nombre y tu opinión.");
    return;
  }

  var resenas = Tienda.resenas();
  resenas.push({
    id: "r" + Date.now(),
    nombre: nombre,
    estrellas: parseInt(document.getElementById("puntajeCliente").value, 10),
    texto: texto,
    fecha: fechaHoy(),
    estado: "pendiente"
  });

  if (!Tienda.guardarResenas(resenas)) {
    alert("No se pudo guardar tu opinión. Si estás abriendo la página con doble clic, "
        + "probá abrirla con un servidor local (Live Server) o mandala por WhatsApp.");
    return;
  }

  document.getElementById("nombreCliente").value = "";
  document.getElementById("textoCliente").value = "";

  var aviso = document.getElementById("avisoResena");
  aviso.textContent = "¡Gracias " + nombre + "! Tu opinión fue enviada y ya la estamos revisando.";
  aviso.classList.remove("oculto");
}

/* Abre el chat de WhatsApp con la opinion ya escrita */
function enviarResenaPorWhatsApp() {
  var nombre = document.getElementById("nombreCliente").value.trim();
  var texto = document.getElementById("textoCliente").value.trim();
  var puntos = document.getElementById("puntajeCliente").value;

  if (!nombre || !texto) {
    alert("Cargá tu nombre y tu opinión primero.");
    return;
  }

  var mensaje = "Hola Servic PC, quiero dejar una reseña (" + puntos + " estrellas)\n" +
                "Mi nombre es " + nombre + "\n" +
                "Mi opinión: " + texto;

  window.open("https://wa.me/5493757587830?text=" + encodeURIComponent(mensaje), "_blank");

  var aviso = document.getElementById("avisoResena");
  aviso.textContent = "Se abrió el chat de WhatsApp con tu opinión escrita. Solo mandala y gracias!";
  aviso.classList.remove("oculto");
}

/* Arranque: se leen los datos y se dibuja lo que haya */
function iniciarResenas(idContenedor) {
  Tienda.iniciar().then(function () {
    pintarOpiniones(idContenedor);
    contarOpiniones("contadorOpiniones");
  });
}
