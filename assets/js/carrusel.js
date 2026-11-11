/* ============================================================
   CARRUSEL DE TRABAJOS REALIZADOS
   Archivo: assets/js/carrusel.js
   Se usa en index.html.

   Las tarjetas salen de la capa de datos (datos.js): los trabajos
   subidos desde el panel de administracion mas los que vienen
   por defecto. Cambia solo, con flechitas y con los puntitos.
   ============================================================ */

var Carrusel = {
  indice: 0,
  trabajos: [],
  temporizador: null,
  TIEMPO: 5000,          /* milisegundos entre cambio y cambio */

  /* Arma el carrusel con los trabajos que hay */
  iniciar: function () {
    var misma = this;
    this.trabajos = Tienda.trabajosPublicos();
    if (this.trabajos.length === 0) { return; }
    if (this.trabajos.length === 1) {
      this.pintar();
      return;
    }
    this.pintar();
    this.pintarPuntos();
    this.arrancar();
  },

  /* Dibuja la tarjeta que toca */
  pintar: function () {
    var trabajo = this.trabajos[this.indice];
    if (!trabajo) { return; }

    document.getElementById("carruselImagen").src = trabajo.imagen;
    document.getElementById("carruselImagen").alt = trabajo.titulo;
    document.getElementById("carruselTitulo").textContent = trabajo.titulo;
    document.getElementById("carruselTexto").textContent = trabajo.texto;
    document.getElementById("carruselContador").textContent =
      (this.indice + 1) + " / " + this.trabajos.length;
  },

  /* Dibuja los puntitos de abajo */
  pintarPuntos: function () {
    var contenedor = document.getElementById("carruselPuntos");
    contenedor.innerHTML = "";
    var misma = this;

    for (var i = 0; i < this.trabajos.length; i++) {
      var punto = document.createElement("button");
      punto.className = "punto" + (i === this.indice ? " activo" : "");
      punto.setAttribute("aria-label", "Trabajo " + (i + 1));
      punto.onclick = (function (indice) {
        return function () { misma.irA(indice); };
      })(i);
      contenedor.appendChild(punto);
    }
  },

  /* Cambia de trabajo */
  irA: function (indice) {
    if (this.trabajos.length === 0) { return; }
    this.indice = (indice + this.trabajos.length) % this.trabajos.length;
    this.pintar();
    this.pintarPuntos();
  },

  /* Adelante o atras */
  mover: function (paso) {
    this.irA(this.indice + paso);
  },

  /* Arranca el passage automatico */
  arrancar: function () {
    var misma = this;
    this.detener();
    this.temporizador = setInterval(function () { misma.mover(1); }, this.TIEMPO);
  },

  /* Frena el passage automatico */
  detener: function () {
    if (this.temporizador) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }
};
