/* ============================================================
   CAPA DE DATOS DE SERVIC PC
   Archivo: assets/js/datos.js
   Se usa en las 4 páginas + en el panel de administracion.

   COMO GUARDAMOS LOS DATOS:
   - localStorage: queda guardado en el navegador donde se carga.
     Sirve para que el administrador vea sus cambios al instante.
   - assets/js/datos.json: archivo opcional que se sube al servidor.
     Si esta, TODOS los que entran a la web ven esos datos.
   - Si no hay ninguno de los dos, se usan los datos por defecto
     que estan en catalogo.js.

   El panel tiene botones para EXPORTAR (bajar datos.json) e
   IMPORTAR (cargar un datos.json), para pasar del modo local
   al modo publicado sin tocar codigo.
   ============================================================ */

/* ---------- Llaves (nombre de cada dato guardado) ---------- */
var CLAVES = {
  productos: "servicpc_productos",
  resenas:   "servicpc_resenas",
  trabajos:  "servicpc_trabajos",
  mantenimientos: "servicpc_mantenimientos",
  config:    "servicpc_config",
  sesion:    "servicpc_sesion"
};

/* ---------- Categorias del catalogo ---------- */
var CATEGORIAS = {
  "Memoria RAM": "Memoria RAM",
  "Almacenamiento": "Almacenamiento",
  "Procesador": "Procesador",
  "Placa madre": "Placa madre",
  "Placa de video": "Placa de video",
  "Gabinete": "Gabinete",
  "Refrigeracion": "Refrigeración",
  "Periferico": "Periférico",
  "Conectividad": "Conectividad",
  "Herramientas": "Herramientas"
};

/* ---------- Datos por defecto ---------- */
var RESENAS_INICIALES = [
  { id: "r1", nombre: "Alejandro G.", estrellas: 5, texto: "Excelente atención. Le hicieron una limpieza interna completa y cambio de pasta térmica a mi notebook porque se calentaba mucho. Quedó espectacular y silenciosa.", fecha: "2026-10-02", estado: "aprobada" },
  { id: "r2", nombre: "Claudio S.", estrellas: 5, texto: "Compré un disco sólido SSD de 1TB y me instalaron el sistema operativo de cero. La velocidad de la computadora cambió por completo, arranca en 10 segundos.", fecha: "2026-10-14", estado: "aprobada" },
  { id: "r3", nombre: "Mariana K.", estrellas: 4, texto: "Muy buen servicio para el formateo e instalación de programas que necesitaba para el colegio. Demoraron un poquito más de lo estimado pero el trabajo fue impecable.", fecha: "2026-11-05", estado: "aprobada" }
];

var TRABAJOS_INICIALES = [
  { id: "t1", titulo: "Cambio de disco a SSD M.2", texto: "La notebook arrancaba en 3 minutos. Le pusimos un disco SSD de 1TB: ahora arranca en 12 segundos y le duplicamos la batería.", imagen: "assets/productos/real-ssd-m2.webp" },
  { id: "t2", titulo: "Limpieza interna y cambio de pasta térmica", texto: "La máquina se apagaba sola cuando rendía. Limpiamos disipadores, repusimos la pasta térmica y cambiamos la bateria de la pila.", imagen: "assets/productos/real-pasta-termica.webp" },
  { id: "t3", titulo: "Reemplazo de cooler RGB", texto: "El ventilador del gabinete sonaba fuerte y tiraba aire caliente. Colocamos un cooler silencioso de 120mm con luces y quedó como nuevo.", imagen: "assets/productos/real-cooler-rgb.webp" }
];

/* ---------- Los servicios de mantenimiento que se muestran con vista previa ---------- */
var MANTENIMIENTOS_INICIALES = [
  { id: "m1", titulo: "Limpieza interna completa", texto: "Abrimos la máquina, limpiamos ventiladores, disipadores y placas, y cambiamos la pasta térmica. El equipo vuelve a trabajar frío y silencioso.", precio: "$15.000", imagen: "assets/productos/real-pasta-termica.webp", video: "" },
  { id: "m2", titulo: "Cambio de disco a SSD", texto: "Reemplazamos el disco lento por un SSD NVMe, instalamos el sistema de cero y actualizamos los drivers. Arranque en segundos.", precio: "$45.000", imagen: "assets/productos/real-ssd-m2.webp", video: "" },
  { id: "m3", titulo: "Reemplazo de cooler RGB", texto: "Cambiamos el ventilador quemado o ruidoso por uno nuevo de 120mm con luces, y verificamos las temperaturas del equipo.", precio: "$9.500", imagen: "assets/productos/real-cooler-rgb.webp", video: "" },
  { id: "m4", titulo: "Ampliación de memoria RAM", texto: "Agregamos o cambiamos los módulos de memoria para que la computadora no se quede sin recursos cuando abrís muchos programas a la vez.", precio: "$28.000", imagen: "assets/productos/real-ram-pc.webp", video: "" },
  { id: "m5", titulo: "Formateo e instalación", texto: "Formateamos, instalamos el sistema, los programas que usás y dejamos todo listo para usar. Se lleva tu configuración.", precio: "$25.000", imagen: "assets/productos/real-hdd.webp", video: "" },
  { id: "m6", titulo: "Cambio de fuente de alimentación", texto: "Reemplazamos la fuente que falló o que no alcanzaba la potencia del equipo, con instalación y prueba de carga.", precio: "$38.000", imagen: "assets/productos/fuente-alimentacion.webp", video: "" }
];

/* ============================================================
   1) LEER Y GUARDAR EN EL NAVEGADOR
   ============================================================ */
function leerClave(clave, porDefecto) {
  try {
    var bruto = localStorage.getItem(clave);
    if (!bruto) { return porDefecto; }
    return JSON.parse(bruto);
  } catch (error) {
    return porDefecto;
  }
}

function guardarClave(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    /* No se pudo guardar (el navegador esta bloqueando el almacenamiento
       o la imagen es muy pesada). Quien llama avisa al usuario. */
    return false;
  }
}

function borrarClave(clave) {
  localStorage.removeItem(clave);
}

/* ============================================================
   2) COMBINAR LISTAS
   Mergea dos arreglos por id: lo que viene segundo pisa a lo
   que viene primero. Sirve para combinar los datos por defecto
   con los del panel y con los del archivo publicado.
   ============================================================ */
function combinar(base, extra) {
  var mapa = {};
  base.forEach(function (item) { mapa[item.id] = item; });
  (extra || []).forEach(function (item) {
    if (item && item.id) { mapa[item.id] = item; }
  });
  return Object.keys(mapa).map(function (k) { return mapa[k]; });
}

/* Quita los elementos marcados como borrados */
function quitarBorrados(lista) {
  return lista.filter(function (item) { return !item.borrado; });
}

/* Marca un elemento como borrado en vez de sacarlo de la lista.
   Si lo sacamos, al volver a leer los datos se mezcla con los
   valores por defecto y el elemento "regresa". Con la marca
   (borrado: true) queda tachado para siempre. */
function marcarBorrado(lista, id) {
  lista.forEach(function (item) {
    if (item.id === id) { item.borrado = true; }
  });
  return lista;
}

/* Devuelve true si el navegador permite guardar datos.
   Algunos navegadores bloquean el almacenamiento cuando la pagina
   se abre con doble clic (file://); en ese caso el panel avisa. */
function puedeGuardar() {
  try {
    localStorage.setItem("servicpc_prueba", "1");
    localStorage.removeItem("servicpc_prueba");
    return true;
  } catch (error) {
    return false;
  }
}

/* ============================================================
   3) OBJETO PRINCIPAL: TIENDA
   ============================================================ */

/* ------------------------------------------------------------
   SERVIDOR DE RESEÑAS (opcional)
   ------------------------------------------------------------
   Si pegás acá la dirección de tu "Web App" de Google Apps Script,
   las reseñas que mandan los clientes se guardan en tu planilla de
   Google (gratis, sin servidor propio) y a vos te llegan de verdad.
   Si lo dejo vacio, todo funciona como antes, guardando en el
   navegador del visitante.

   La direccion tiene esta forma:
   https://script.google.com/macros/s/XXXXXXX/exec
   ------------------------------------------------------------ */
var SERVIDOR_RESENAS = "";

var Tienda = {

  /* Datos publicados en assets/js/datos.json (si existe) */
  publicados: null,

  /* La direccion del servidor de resenas:
     primero se busca en datos.json (para poder cambiarla sin tocar
     el codigo) y si no esta, se usa la de arriba. */
  servidor: function () {
    if (this.publicados && this.publicados.servidor) {
      return this.publicados.servidor;
    }
    return SERVIDOR_RESENAS;
  },

  /* La clave del administrador: solo la tiene el panel (nunca va
     en el codigo publico), asi que se guarda en este navegador. */
  claveAdmin: function () {
    var config = leerClave(CLAVES.config, {});
    return config.claveServidor || "";
  },
  guardarClaveAdmin: function (clave) {
    var config = this.config();
    config.claveServidor = clave;
    return guardarClave(CLAVES.config, config);
  },

  /* Al cargar la pagina, intento bajar el datos.json publicado.
     Si no existe o la pagina se abre desde el disco (file://),
     no pasa nada: se siguen usando los datos locales. */
  iniciar: function () {
    var misma = this;
    return new Promise(function (resolver) {
      try {
        fetch("assets/js/datos.json", { cache: "no-store" })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (datos) { misma.publicados = datos; })
          .catch(function () { misma.publicados = null; })
          .then(function () { resolver(); });
      } catch (error) {
        misma.publicados = null;
        resolver();
      }
    }).then(function () {
      /* Si hay servidor de resenas, se leen de ahi */
      return misma.cargarResenasDelServidor();
    });
  },

  /* --- Productos ---
     productos() devuelve la lista COMPLETA (incluidos los que estan
     marcados como borrados). Eso es lo que hay que guardar, para que
     un borrado no vuelva a aparecer. Para mostrar en pantalla se
     usa productosPublicos(), que ya filtra los borrados. */
  productosBase: function () {
    return (typeof CATALOGO !== "undefined") ? CATALOGO : [];
  },
  productos: function () {
    var base = this.productosBase();
    var remoto = (this.publicados && this.publicados.productos) || [];
    var local = leerClave(CLAVES.productos, null);
    return combinar(combinar(base, remoto), local || []);
  },
  productosPublicos: function () {
    return quitarBorrados(this.productos()).filter(function (p) {
      return p.publicado !== false;
    });
  },
  guardarProductos: function (lista) {
    return guardarClave(CLAVES.productos, lista);
  },

  /* --- Resenas --- */
  resenas: function () {
    /* Si hay servidor de resenas, el mandato es el que vale */
    if (this.resenasServidor) {
      return quitarBorrados(this.resenasServidor);
    }
    var base = RESENAS_INICIALES;
    var remoto = (this.publicados && this.publicados.resenas) || [];
    var local = leerClave(CLAVES.resenas, null);
    return combinar(combinar(base, remoto), local || []);
  },
  guardarResenas: function (lista) {
    return guardarClave(CLAVES.resenas, lista);
  },
  /* Solo las que el administrador aprobo */
  resenasPublicas: function () {
    return quitarBorrados(this.resenas()).filter(function (r) { return r.estado === "aprobada"; });
  },
  /* Las que todavia no se revisaron */
  resenasPendientes: function () {
    return quitarBorrados(this.resenas()).filter(function (r) { return r.estado === "pendiente"; });
  },

  /* ------------------------------------------------------------
     COMUNICACION CON EL SERVIDOR DE RESENAS (Google Apps Script)
     ------------------------------------------------------------ */

  /* Resenas que hay en el servidor (planilla de Google) */
  resenasServidor: null,

  hayServidor: function () {
    return this.servidor() ? true : false;
  },

  /* Baja la lista de resenas del servidor */
  cargarResenasDelServidor: function () {
    var url = this.servidor();
    var misma = this;
    if (!url) {
      this.resenasServidor = null;
      return Promise.resolve(null);
    }
    return fetch(url + "?accion=listar", { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (d) { misma.resenasServidor = (d && d.resenas) ? d.resenas : null; })
      .catch(function () { misma.resenasServidor = null; });
  },

  /* Manda una reseña nueva al servidor (la que escribe un cliente) */
  enviarResenaAlServidor: function (resena) {
    var url = this.servidor();
    if (!url) { return Promise.resolve({ ok: false, error: "No hay servidor configurado." }); }

    var cuerpo = new URLSearchParams();
    cuerpo.append("accion", "nueva");
    cuerpo.append("id", resena.id);
    cuerpo.append("fecha", resena.fecha);
    cuerpo.append("nombre", resena.nombre);
    cuerpo.append("estrellas", resena.estrellas);
    cuerpo.append("texto", resena.texto);

    return fetch(url, { method: "POST", body: cuerpo })
      .then(function (r) { return r.json(); })
      .catch(function (error) { return { ok: false, error: String(error) }; });
  },

  /* Cambia el estado de una reseña en el servidor (publicar o rechazar) */
  cambiarEstadoEnServidor: function (id, estado) {
    var url = this.servidor();
    if (!url) { return Promise.resolve({ ok: false, error: "No hay servidor configurado." }); }

    var cuerpo = new URLSearchParams();
    cuerpo.append("accion", "estado");
    cuerpo.append("clave", this.claveAdmin());
    cuerpo.append("id", id);
    cuerpo.append("estado", estado);

    return fetch(url, { method: "POST", body: cuerpo })
      .then(function (r) { return r.json(); })
      .catch(function (error) { return { ok: false, error: String(error) }; });
  },

  /* Borra una reseña del servidor */
  borrarEnServidor: function (id) {
    var url = this.servidor();
    if (!url) { return Promise.resolve({ ok: false, error: "No hay servidor configurado." }); }

    var cuerpo = new URLSearchParams();
    cuerpo.append("accion", "borrar");
    cuerpo.append("clave", this.claveAdmin());
    cuerpo.append("id", id);

    return fetch(url, { method: "POST", body: cuerpo })
      .then(function (r) { return r.json(); })
      .catch(function (error) { return { ok: false, error: String(error) }; });
  },

  /* --- Trabajos realizados (galeria del carrusel) --- */
  trabajos: function () {
    var base = TRABAJOS_INICIALES;
    var remoto = (this.publicados && this.publicados.trabajos) || [];
    var local = leerClave(CLAVES.trabajos, null);
    return combinar(combinar(base, remoto), local || []);
  },
  trabajosPublicos: function () {
    return quitarBorrados(this.trabajos());
  },
  guardarTrabajos: function (lista) {
    return guardarClave(CLAVES.trabajos, lista);
  },

  /* --- Servicios de mantenimiento (tarjetas con vista previa) --- */
  mantenimientos: function () {
    var base = MANTENIMIENTOS_INICIALES;
    var remoto = (this.publicados && this.publicados.mantenimientos) || [];
    var local = leerClave(CLAVES.mantenimientos, null);
    return combinar(combinar(base, remoto), local || []);
  },
  mantenimientosPublicos: function () {
    return quitarBorrados(this.mantenimientos());
  },
  guardarMantenimientos: function (lista) {
    return guardarClave(CLAVES.mantenimientos, lista);
  },

  /* --- Configuracion (password del administrador) --- */
  config: function () {
    return leerClave(CLAVES.config, { usuario: "admin", clave: hash("servicpc") });
  },
  guardarConfig: function (config) {
    return guardarClave(CLAVES.config, config);
  },

  /* --- Exportar / importar --- */
  exportar: function () {
    var datos = {
      productos: quitarBorrados(this.productos()),
      resenas: quitarBorrados(this.resenas()),
      trabajos: quitarBorrados(this.trabajos()),
      mantenimientos: quitarBorrados(this.mantenimientos()),
      generado: new Date().toISOString()
    };
    var texto = JSON.stringify(datos, null, 2);
    var blob = new Blob([texto], { type: "application/json" });
    var enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "datos.json";
    enlace.click();
    URL.revokeObjectURL(enlace.href);
  },
  importar: function (archivo) {
    var lector = new FileReader();
    lector.onload = function () {
      try {
        var datos = JSON.parse(lector.result);
        if (datos.productos) { this.guardarProductos(datos.productos); }
        if (datos.resenas) { this.guardarResenas(datos.resenas); }
        if (datos.trabajos) { this.guardarTrabajos(datos.trabajos); }
        if (datos.mantenimientos) { this.guardarMantenimientos(datos.mantenimientos); }
        alert("Datos importados. Recargá la pagina.");
        location.reload();
      } catch (error) {
        alert("El archivo no es un datos.json válido.");
      }
    }.bind(this);
    lector.readAsText(archivo);
  },

  /* Restablece todo a los datos originales */
  restablecer: function () {
    borrarClave(CLAVES.productos);
    borrarClave(CLAVES.resenas);
    borrarClave(CLAVES.trabajos);
    borrarClave(CLAVES.mantenimientos);
  }
};

/* ============================================================
   4) UTILIDADES
   ============================================================ */

/* Suma de letras para guardar la clave sin que se vea en texto.
   OJO: esto es una ofuscacion, no una seguridad de verdad.
   Para una pagina publica de verdad, el control de acceso
   tiene que estar en el servidor (Python, PHP, etc.). */
function hash(texto) {
  var h = 0x811c9dc5;
  for (var i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

/* Redimensiona una imagen antes de guardarla, para que no
   ocupe tanto lugar en el navegador. */
function redimensionarImagen(archivo, ladoMaximo, calidad) {
  return new Promise(function (resolver, rechazar) {
    var lector = new FileReader();
    lector.onload = function () {
      var imagen = new Image();
      imagen.onload = function () {
        var ancho = imagen.width;
        var alto = imagen.height;
        if (ancho > alto) {
          ancho = ladoMaximo;
          alto = Math.round(imagen.height * ladoMaximo / imagen.width);
        } else {
          alto = ladoMaximo;
          ancho = Math.round(imagen.width * ladoMaximo / imagen.height);
        }
        var lienzo = document.createElement("canvas");
        lienzo.width = ancho;
        lienzo.height = alto;
        lienzo.getContext("2d").drawImage(imagen, 0, 0, ancho, alto);
        resolver(lienzo.toDataURL("image/jpeg", calidad));
      };
      imagen.onerror = rechazar;
      imagen.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  });
}

/* Fecha de hoy en formato aaaa-mm-dd */
function fechaHoy() {
  var d = new Date();
  var mes = String(d.getMonth() + 1).padStart(2, "0");
  var dia = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + mes + "-" + dia;
}

/* Convierte 2026-10-14 en 14/10/2026 */
function fechaCorta(iso) {
  if (!iso) { return ""; }
  var p = String(iso).split("-");
  if (p.length !== 3) { return iso; }
  return p[2] + "/" + p[1] + "/" + p[0];
}

/* Escapa los textos que vienen del usuario para que no rompan el HTML */
function escapar(texto) {
  return String(texto == null ? "" : texto)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
