# Guía del código — Servic PC

Todo lo que se cambió, **qué es**, **para qué sirve** y **cómo funciona**.
Cada punto te dice en qué archivo y en qué línea está, para que lo puedas abrir y mostrarlo.

---

## 1. Las 4 páginas y la estructura de carpetas

```
Mi pagina web/
├── index.html          → Portada
├── Servicios.html      → Planes de precio y sistemas para negocios
├── Productos.html      → Catálogo de 67 repuestos
├── Reseñas.html        → Calificaciones, opiniones y formulario de reseña
├── panel.html          → PANEL DE ADMINISTRACIÓN (solo el dueño entra)
├── assets/
│   ├── logo-servic-circular.webp    (el logo, 28 KB)
│   ├── logo-servic-horizontal.webp
│   ├── favicon.ico                  (el logo chiquito de la pestaña)
│   ├── folleto-servic-pc.png        (el folleto A4)
│   ├── js/
│   │   ├── catalogo.js              (los 67 productos por defecto)
│   │   ├── datos.js                 (la capa de datos: panel + web)
│   │   ├── carrusel.js              (el carrusel de trabajos)
│   │   └── datos.json               (datos publicados, editable y subible)
│   └── productos/                   (67 fotos + CATALOGO.csv + CREDITS.txt)
├── _materiales/            (material del docente — NO se publica)
├── _respaldo-original/     (copia de cómo estaba antes)
├── PLAN-CATALOGO.md
├── GUIA-EXPLICACION.md     ← este archivo
├── PRESENTACION-CANVA.md   ← el guion de las diapositivas
└── PUBLICAR-EN-INTERNET.md ← cómo subir la página a internet
```

**Qué se hizo y por qué:** antes había tres copias de la página (la raíz, `SerVic-Sosa/build/` y
`html - txt/`) y los archivos tenían espacios y tildes en el nombre. Ahora hay una sola copia de
trabajo, con nombres simples, y todo lo que no se publica quedó en carpetas que arrancan con `_`.

---

## 2. El `<head>`: lo que el visitante no ve pero importa

Está al principio de cada archivo, entre `<head>` y `</head>`.

| Línea | Qué es | Para qué sirve |
|---|---|---|
| `<meta charset="UTF-8">` | Codificación de caracteres | Hace que las tildes (ó, á, í) y la ñ se vean bien. **Sin esto el texto sale con caracteres raros.** |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Viewport | Le dice al celular "usá el ancho real de la pantalla". **Sin esta línea la web se ve diminuta en el teléfono.** |
| `<meta name="description" content="...">` | Descripción | El texto que aparece en Google cuando alguien busca "servicio técnico Wanda". También la usan WhatsApp e Instagram al compartir el link. |
| `<meta property="og:title">` etc. | Open Graph | Son los "datos al compartir": cuando mandás el link por WhatsApp sale con el título, la descripción y **el logo de la web** en lugar de un link pelado. |
| `<link rel="icon" href="assets/favicon.ico">` | Favicon | El logo chiquito de la pestaña del navegador. |
| `<title>Servic PC - ...</title>` | Título de la pestaña | Lo que se ve arriba en la pestaña. Cada página tiene uno distinto para que Google no las confunda. |
| `<script src="https://kit.fontawesome.com/6c857664ba.js">` | Librería de iconos | Carga Font Awesome. Después los iconos se usan con `<i class="fas fa-tools"></i>`: `fas` = íconos sólidos, `fa-solid` = todavía más rellenos, `fab` = marcas (WhatsApp, Instagram). |

---

## 3. El CSS: los colores y el diseño

Todo el estilo está en una etiqueta `<style>` dentro del `<head>`.

### 3.1 Las variables de color (`:root`)

```css
:root{
  --negro:#141414;     /* el negro del círculo del logo */
  --rojo:#C1272D;      /* el rojo del logo */
  --dorado:#CD9F2C;    /* el amarillo (dorado) del logo */
  --verde:#3A9639;     /* el verde del tilde del logo */
  --fondo:#F4F5F7;
  --blanco:#FFFFFF;
  --borde:#E2E5EA;
  --texto:#1A1A1A;
  --texto-2:#5A5F6A;
}
```

**Qué es:** una "caja de constantes" de colores. En vez de escribir `#C1272D` fifty veces,
se escribe `var(--rojo)` y si mañana querés cambiar el rojo de toda la web, cambiás **un solo número**.

**Por qué esos colores:** se midieron con un programa los píxeles reales del logo
(`Logo-Servic - EditadoCirculo.png`) y se descubrió que el "amarillo" del logo en realidad es un
**dorado** (`#BE9627` a `#CD9F2C`) y que el rojo es un **rojo ladrillo** (`#AA201F` a `#CC2925`),
no el rojo vivo `#DB2E35` que se usaba antes. Con la paleta nueva, el logo y la web hablan el
mismo idioma de color.

### 3.2 Las clases que se usan

| Clase | Qué hace |
|---|---|
| `.boton`, `.boton-principal`, `.boton-secundario`, `.boton-whatsapp` | Los botones. El principal es rojo, el secundario es transparente con borde rojo, el de WhatsApp es verde (como el tilde del logo). |
| `.tarjeta-producto` | La tarjeta blanca de cada producto del catálogo. |
| `.tarjeta-precio` | La tarjeta de cada plan de servicio. |
| `.tarjeta-sistema` | La tarjeta de cada sistema para negocios. |
| `.tarjeta-resena` | La tarjeta de cada opinión de cliente. |
| `.precio-container` / `.catalogo-container` / `.precios-container` / `.rejilla-tarjetas` | Los contenedores que usan `display:flex` para armar las grillas de tarjetas. |
| `.filtros` y `.filtro` | La fila de botones para filtrar el catálogo. `.filtro.activo` es el que está seleccionado (negro con texto dorado). |
| `.modal` y `.modal.visible` | La ventana flotante de la foto ampliada. Por defecto `display:none` (oculta); al agregarle la clase `.visible` pasa a `display:flex` y se ve. |
| `.tema-oscuro` | La clase que agrega JavaScript al `<body>` para el modo oscuro. |

### 3.3 Lo que se usa de CSS y para qué

- `display:flex` → las tarjetas se acomodan en fila y se pasan a la línea siguiente cuando no entran.
- `gap` → la separación entre tarjetas (en vez de margins que se pisan entre sí).
- `border-radius` → las esquinas redondeadas.
- `border: 1px solid var(--borde)` → el borde de las tarjetas (el material de tablas pide ver bordes).
- `box-shadow` → la sombra que da profundidad.
- `transition` + `:hover` → el efecto suave cuando pasás el mouse por una tarjeta.
- `object-fit:contain` → hace que la foto entre entera dentro del recuadro sin deformarse.
- `clamp(34px, 7vw, 60px)` → el tamaño del título se adapta: 34 px en el celular, 60 px en una pantalla grande.
- `@media (max-width: 700px)` → **consulta de medios**: si la pantalla mide menos de 700 px de ancho, se aplican las reglas de adentro (cartas al 100 %, títulos más chicos, tablas con scroll).

---

## 4. El `<header>`, el `<nav>` y el `<footer>`

### 4.1 El logo que también es enlace

```html
<a href="index.html" title="Ir al inicio">
  <img src="assets/logo-servic-circular.webp" alt="Logo de Servic PC" width="190" height="190">
</a>
```

- `href="index.html"` → el atributo `href` dice a dónde lleva el enlace. **Este es el atributo que estaba roto.**
- `src="..."` → de dónde sale la imagen (la ruta del archivo).
- `alt="Logo de Servic PC"` → el texto alternativo: si la imagen no carga, o si el visitante usa un lector de pantalla, se lee ese texto. **Antes el `alt` estaba mal cerrado y el navegador se comía el `width`.**
- `width` y `height` → el espacio que ocupa la imagen. Sirve para que la página no "salte" mientras carga.

### 4.2 La barra de navegación

```html
<nav>
  <a href="index.html" class="activo"><i class="fa-solid fa-house"></i> Inicio</a> |
  <a href="Servicios.html"><i class="fas fa-tools"></i> Servicios</a> |
  ...
</nav>
```

- La clase `activo` marca en qué página estás (en `index.html` la tiene el enlace Inicio).
- El `|` entre enlaces es un separador de texto.
- El último enlace va a WhatsApp con `target="_blank"` para que se abra en otra pestaña.

### 4.3 El pie de página

Tiene la información de contacto (teléfono, WhatsApp, Instagram) y los enlaces a las páginas.
El `<i class="fas fa-desktop icono-footer"></i>` es un ícono con el color dorado.

---

## 5. El texto en movimiento (`<marquee>`)

```html
<marquee direction="left" scrollamount="5" scrolldelay="10" bgcolor="#CD9F2C" loop="infinite">
  ¡Bienvenido a Servic PC! — ...
</marquee>
```

Es un tema pedido por la materia, así que **se mantiene**. Sus atributos:

| Atributo | Qué hace |
|---|---|
| `direction="left"` | Hacia dónde se mueve el texto. |
| `scrollamount="5"` | Cuántos píxeles avanza en cada movimiento. |
| `scrolldelay="10"` | Cuántos milisegundos espera entre un movimiento y el siguiente. |
| `bgcolor="#CD9F2C"` | El color de fondo (el dorado del logo). |
| `loop="infinite"` | Que no termine nunca. |
| `behavior="alternate"` | (en el marquee de abajo) Va y vuelve, en vez de salir del otro lado. |
| `width="100%"` y `height="40"` | El tamaño de la franja. |

> Nota: `bgcolor` es un atributo viejo. Por eso además hay un `.marquee-wrapper` en CSS que pinta
> el mismo color, así se ve igual en cualquier navegador.

---

## 6. El JavaScript

### 6.1 El ejemplo de la materia: cambiar el color de fondo

Está al final de `index.html`:

```html
<button class="boton boton-demo" onclick="cambiarColor()">Cambiar a modo oscuro</button>
```

```js
function cambiarColor() {
  document.body.style.backgroundColor = "#0E1116";   /* modo oscuro */
  document.body.classList.add("tema-oscuro");
}
function volverColor() {
  document.body.style.backgroundColor = "#F4F5F7";   /* vuelve al color claro */
  document.body.classList.remove("tema-oscuro");
}
```

**Cómo funciona, paso a paso:**
1. El `onclick` es un **evento**: cuando hacés clic, el navegador llama a la función `cambiarColor`.
2. `document` es toda la página. `document.body` es el `<body>`, el bloque que envuelve todo el contenido visible.
3. `.style.backgroundColor` es la propiedad CSS del fondo. Al asignarle un color, el fondo cambia al instante.
4. `.classList.add("tema-oscuro")` agrega una clase al `<body>`. En el CSS hay reglas que empiezan con
   `body.tema-oscuro`, así que las tarjetas y los textos también se adaptan.

### 6.2 El catálogo que se dibita solo (`Productos.html`)

**La base de datos** (arriba del todo, en el `<script>`):

```js
const CATALOGO = [
  { archivo: "memoria-ram-ddr4.webp", nombre: "Memoria RAM DDR4 16GB 3200MHz",
    categoria: "Memoria RAM", precio: "$45.000", tipo: "referencia" },
  { archivo: "real-ram-notebook.webp", nombre: "Memoria RAM Notebook (tu foto)",
    categoria: "Memoria RAM", precio: "$215.641", tipo: "propia" },
  ... (67 productos en total)
];
```

Cada `{ ... }` es un **objeto**: un grupo de datos con nombre. Cada línea es un producto.

**Las funciones:**

| Función | Qué hace |
|---|---|
| `linkWhatsapp(nombre)` | Arma el link de WhatsApp con el pedido ya escrito: `https://wa.me/5493757587830?text=Hola Servic PC, quiero consultar por ...` (el `encodeURIComponent` convierte los espacios y símbolos para que el link no se corte). |
| `crearTarjeta(producto)` | Construye el HTML de **una** tarjeta (un bloque de texto con los datos del producto) y lo devuelve como texto. |
| `pintarCatalogo(filtro)` | Recorre el arreglo con un `for`, llama a `crearTarjeta()` por cada producto y mete todas las tarjetas dentro del `<div id="catalogo">` usando `innerHTML`. Al final actualiza el contador. |
| `crearFiltros()` | Arma los botones de categoría. Como recorre el arreglo, **si agregás un producto con una categoría nueva, aparece un filtro nuevo solo**. |
| `filtrar(categoria)` | Vuelve a pintar el catálogo, pero mostrando solo lo de esa categoría. Se llama desde el `onclick` de cada botón. |
| `abrirModal(archivo)` / `cerrarModal()` | Abren y cierran la ventana flotante con la foto grande. |
| `document.addEventListener("click", ...)` | Cierra la ventana si hacés clic fuera de la foto. |
| `document.addEventListener("keydown", ...)` | Cierra la ventana si apretás Escape. |

**El truquito de los datos y el HTML separados:** el HTML de la tarjeta está escrito en el JavaScript
como texto, con `"` al principio y al final y un `+` para pegarle los datos:

```js
'<p class="titulo-producto">' + producto.nombre + '</p>'
```

Es decir: "escribí esta parte fija, pegale acá el nombre del producto, y seguí con esta otra parte".

**Por qué se hizo así:** antes, agregar un producto era copiar y pegar 20 líneas de HTML, y con
67 productos el archivo era larguísimo y fácil de romper. Ahora es **una línea más en el arreglo**.

---

## 7. Las listas y la tabla

- `<ol>` con `<li>` = lista **ordenada** (numerada). Ejemplo: "¿Cómo funciona el servicio?".
- `<ul>` con `<li>` = lista **con viñetas**.
- `<dl>` con `<dt>` y `<dd>` = **lista de descripción**: el `<dt>` es el término (el día) y el `<dd>` su descripción (el horario).
- `<table>` con `<thead>`, `<tbody>`, `<tr>`, `<th>` y `<td>` = la tabla de calificaciones y la de comparación de sistemas.
  - `border-collapse: collapse` = los bordes se juntan en uno solo (si no, la tabla sale con doble línea).
  - `.tabla-scroll` = un div con `overflow-x:auto` para que en el celular la tabla se deslice con el dedo en vez de romper la página.

---

## 8. Los enlaces de WhatsApp e Instagram

```html
<a href="https://wa.me/5493757587830" target="_blank">
  <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
</a>
<a href="https://www.instagram.com/c_l_a_u_.2007" target="_blank">
  <i class="fab fa-instagram"></i> Ver en Instagram
</a>
```

- `wa.me/5493757587830` es el **formato de WhatsApp**: el prefijo `549` es Argentina (+54) con el 9 de celular.
- `target="_blank"` = abrir en una pestaña nueva (es lo que pide el material de la materia).
- Cada producto tiene un link propio con el nombre del producto ya escrito en el mensaje.

---

## 9. Las imágenes

- Todas están en `.webp`: mismo aspecto, hasta 10 veces menos peso que `.png`.
- `loading="lazy"` = la imagen se descarga **solo cuando se va a ver** (al hacer scroll). Así la página abre rápido.
- La carpeta `assets/productos/CREDITS.txt` dice el autor, la licencia y el enlace de cada foto
  (las 6 tuyas dicen "Foto propia del alumno"; las otras vienen de Wikimedia Commons con licencia libre).
- `assets/productos/CATALOGO.csv` es la lista de productos en formato de planilla: si abrís el Excel
  y cambiás un precio ahí, después lo volcás al `CATALOGO` de `Productos.html` (es el mismo dato en dos formatos).

---

## 10. El panel de administración (`panel.html`)

Es la parte "de servidor" de la página: **solo vos entrás** (usuario `admin`, contraseña `servicpc`).
Después de entrar, la barra superior queda fija con el logo, el nombre de la empresa, la
**campana de novedades**, un botón para ver el sitio y otro para salir.

### 10.1 La pantalla de seguridad

```js
function entrar() {
  var usuario = document.getElementById("campoUsuario").value.trim();
  var clave = document.getElementById("campoClave").value;
  var config = Tienda.config();
  if (usuario === config.usuario && hash(clave) === config.clave) {
    sessionStorage.setItem(CLAVES.sesion, JSON.stringify({ usuario: usuario, momento: Date.now() }));
    abrirPanel();
  } else {
    document.getElementById("errorLogin").classList.remove("oculto");
  }
  return false;
}
```

- `sessionStorage` = memoria del navegador que se borra al cerrar la pestaña. Por eso al recargar
  seguís dentro, pero si cerrás el navegador tenés que entrar de nuevo.
- La contraseña **no se guarda escrita**: se guarda su `hash()` (una "huella" de caracteres).
  Cambiás la clave en la pestaña *Datos y acceso*.
- **Ojo con esto:** el control de acceso de verdad (que nadie más pueda entrar) tiene que estar en un
  **servidor**. Esto sirve para el trabajo de la muestra; queda explicado en la pestaña de Datos.

### 10.2 La campana de novedades

```js
var hayMala = pendientes.some(function (r) { return r.estrellas <= 3; });
boton.classList.add(hayMala ? "mala" : "buena");
```

- Si hay reseñas **pendientes** de revisar, la campana muestra un número (la "insignia").
- La campana se pone **verde** (ícono de tilde) si las novedades son buenas (4 o 5 estrellas) y
  **roja** (ícono de exclamación) si hay alguna mala (3 estrellas o menos).
- Al hacer clic se abre el desplegable con las últimas reseñas y los botones **Aprobar** y **Rechazar**.

### 10.3 Las cuatro pestañas

| Pestaña | Qué podés hacer |
|---|---|
| **Productos** | Ver el catálogo en una tabla, **agregar** uno nuevo (con foto del equipo), **editar** nombre/precio/categoría/foto, **publicar u ocultar** y **borrar**. |
| **Reseñas** | Ver todas las reseñas, **aprobar** (se publican), **rechazar** (no se publican) y **borrar**. También cargar una a mano. |
| **Trabajos realizados** | Subir las fotos de los trabajos que van a pasar en el carrusel de la portada, con su título y su descripción. |
| **Mantenimiento** | Administrar los servicios de mantenimiento que se muestran en la portada como tarjetas con vista previa. Se puede poner la foto y, si querés, el video del trabajo. |
| **Datos y acceso** | Exportar/importar los datos, restablecer los originales y cambiar la contraseña. |

### 10.4 Cómo se guardan los datos (la parte importante)

| Lugar | Qué es | ¿Lo ven los demás? |
|---|---|---|
| `localStorage` | Memoria del navegador. El panel escribe ahí y la web lo lee. | Solo en **tu** navegador. |
| `assets/js/datos.json` | Archivo del servidor con los datos publicados. | **Sí**, todos los que entran a la web. |
| `assets/js/catalogo.js` | Los 67 productos por defecto (programados). | Sí, si no hay nada más. |

**El orden que gana**: `localStorage` > `datos.json` > `catalogo.js`.

**Para publicar los cambios**: en la pestaña *Datos y acceso* tocás **Exportar datos.json**, copiás
ese archivo en la carpeta `assets/js/` y lo subís al hosting. Con eso lo que hiciste en el panel
lo ven todos.

**Importante y honesto:** mientras los datos estén solo en `localStorage`, los cambios los ves vos.
Para que un cliente que mande una reseña desde **otra computadora** te llegue al panel, hace falta
un servidor (por ejemplo Python) o un formulario externo. Está anotado en la propia pestaña del panel.

### 10.5 Por qué "borrar" no borra de la lista

Cuando borrás un producto, una reseña o un trabajo, **no se sacan de la lista: se marcan**.

```js
/* Se marca como borrado en vez de sacarlo de la lista */
function marcarBorrado(lista, id) {
  lista.forEach(function (item) {
    if (item.id === id) { item.borrado = true; }
  });
  return lista;
}
```

**¿Por qué?** Porque al leer los datos se mezclan tres fuentes (los del panel + el `datos.json` +
los valores por defecto del código). Si un elemento se sacara de la lista, al volver a leer los
datos volvería a aparecer desde los valores por defecto: **lo borrado "resucitaba"**. Con la
marca `borrado: true` la tombstone viaja siempre con la lista y el elemento no vuelve nunca.

Al mostrar, se filtran con `quitarBorrados()`:

```js
function quitarBorrados(lista) {
  return lista.filter(function (item) { return !item.borrado; });
}
```

### 10.6 El cartelito de "guardado" y el aviso del navegador

Cada vez que guardás algo, al lado de la campana aparece un cartelito verde:

```
✓ Producto actualizado.
✓ Producto borrado del catálogo.
✓ Reseña aprobada: ya se ve en la web.
✓ Trabajo publicado en el carrusel.
```

Si el navegador **no deja guardar** (algunos navegadores lo bloquean cuando abrís el archivo con
doble clic), el panel lo detecta al entrar y te muestra arriba un cartelón rojo con la explicación
y cómo resolverlo.

**Cómo abrir el panel bien** (recomendado, así el guardado nunca falla):

| Forma | Cómo |
|---|---|
| **Live Server (VS Code)** | Botón derecho sobre `panel.html` → *Open with Live Server* |
| **Servidor local** | En una terminal, en la carpeta: `python -m http.server 8080` → `http://localhost:8080/panel.html` |
| **Doble clic** | Funciona, pero algunos navegadores bloquean el guardado |

### 10.7 La imagen que se achica antes de guardarse

```js
redimensionarImagen(archivo, 1000, 0.8).then(function (datos) {
  imagenTrabajoTemporal = datos;
});
```

Se dibuja la foto en un `<canvas>` del tamaño máximo pedido y se la vuelve a guardar como JPEG.
Si subieras la foto original (de 4 MB) el navegador se quedaría sin memoria; achicada pesa ~100 KB.

---

## 11. El carrusel de "Trabajos realizados" (portada)

Es la sección que está arriba de todo, abajo de la barra de navegación.

**El HTML** (la parte visible):

```html
<div class="carrusel-caja" id="carruselCaja">
  <button class="flecha" onclick="Carrusel.mover(-1)">&#10094;</button>
  <div class="carrusel-tarjeta">
    <img class="carrusel-foto" id="carruselImagen" src="" alt="">
    <div class="carrusel-texto">
      <h3 id="carruselTitulo"></h3>
      <p id="carruselTexto"></p>
      <p class="carrusel-contador" id="carruselContador"></p>
    </div>
  </div>
  <button class="flecha" onclick="Carrusel.mover(1)">&#10095;</button>
</div>
<div class="carrusel-puntos" id="carruselPuntos"></div>
```

**El JavaScript** (`assets/js/carrusel.js`):

| Función | Qué hace |
|---|---|
| `iniciar()` | Toma los trabajos (los del panel + los por defecto) y dibuja el primero. |
| `pintar()` | Cambia la foto, el título, el texto y el contador ("2 / 4"). |
| `pintarPuntos()` | Dibuja los puntitos de abajo y marca el de la tarjeta activa. |
| `irA(indice)` | Va a un trabajo puntual (se usa al hacer clic en un puntito). |
| `mover(paso)` | Adelante (`1`) o atrás (`-1`). |
| `arrancar()` / `detener()` | Arranca y frena el passage automático cada 5 segundos. |

**El pasaje automático** se frena cuando el mouse pasa por encima del carrusel
(`mouseenter` → `detener()`, `mouseleave` → `arrancar()`), así se puede mirar tranquilo.

En el celular el carrusel se acomoda en una columna (foto arriba, texto abajo) thanks a la regla
`@media (max-width: 700px)`.

---

## 12. Los servicios de mantenimiento con vista previa

En la portada, arriba de "Sistemas para negocios", hay una sección con las tarjetas de los
servicios de mantenimiento más pedidos. Cada tarjeta tiene la foto, el nombre, la descripción,
el precio y un **botón de play** que abre la vista previa.

**El HTML de una tarjeta** (se dibuja con JavaScript):

```html
<div class="foto-mantenimiento" onclick="abrirVistaPrevia('m1')">
  <img src="assets/productos/real-pasta-termica.webp" alt="Limpieza interna completa">
  <button class="boton-play"><i class="fas fa-play"></i></button>
</div>
<div class="cuerpo-mantenimiento">
  <h3>Limpieza interna completa</h3>
  <p>...</p>
  <p class="precio-mantenimiento">$15.000</p>
  <button class="boton boton-secundario" onclick="abrirVistaPrevia('m1')">Ver el trabajo</button>
</div>
```

**La vista previa** (`abrirVistaPrevia`):

- Si el servicio tiene **video**, muestra un `<video controls>`; si el archivo de video no está en
  el servidor, un evento `error` lo oculta y muestra la foto (por eso el código usa
  `addEventListener` en vez de un `onerror` escrito en el HTML).
- Abajo va el título, la descripción, el precio y un botón de **WhatsApp con el servicio ya escrito**.
- Se cierra con la X, con la tecla Escape o haciendo clic fuera.

**Los videos**: en el panel, pestaña *Mantenimiento*, escribís la ruta del video
(por ejemplo `assets/trabajos/limpieza.mp4`) y dejás el archivo en la carpeta `assets/trabajos/`.
Mientras no cargues videos, la vista previa muestra la foto: **la función es la misma**.

---

## 13. Las reseñas: las dos formas de mandarlas

El formulario para dejar una opinión está **en la portada (`index.html`) y también en
`Reseñas.html`**, y las dos páginas usan el mismo archivo `assets/js/resenas.js`.

| Botón | Qué hace |
|---|---|
| **Enviar mi opinión** | La guarda con estado `pendiente`. En el panel la ves en la campana y decidís si se publica. |
| **Mandarla por WhatsApp** | Abre el chat de WhatsApp con la opinión ya escrita (nombre, puntaje y texto). |

```js
var mensaje = "Hola Servic PC, quiero dejar una reseña (" + puntos + " estrellas)\n" +
              "Mi nombre es " + nombre + "\n" +
              "Mi opinión: " + texto;
window.open("https://wa.me/5493757587830?text=" + encodeURIComponent(mensaje), "_blank");
```

El de WhatsApp es el que **de verdad te llega** aunque el visitante esté en otra computadora.
El otro sirve para mostrar el flujo completo de "cliente escribe → vos revisás → se publica".

**En el panel NO se cargan reseñas**: las escriben los clientes. Desde el panel solamente se
puede **aprobar** (se publica), **rechazar** (no se publica) o **borrar**. Ese es el trabajo
del administrador: decidir qué se ve.

---

## 14. Las tres cosas que hay que explicar sí o sí en la muestra

1. **El `<marquee>`**: "es la etiqueta de texto en movimiento que vimos en la materia; el atributo
   `direction` dice para dónde va, `scrollamount` cuánto avanza y `scrolldelay` cada cuánto".
2. **El JavaScript del catálogo**: "guardé los productos en un arreglo de objetos y una función
   dibuja las tarjetas; antes los escribía a mano y el archivo era enorme".
3. **El link de WhatsApp**: "el botón arma el mensaje con el nombre del producto, así el cliente
   ya escribe lo que quiere".

Si te preguntan cómo decidiste los colores: "medí los píxeles del logo con un programa y usé esos
mismos valores en el CSS, así que el sitio y el logo se ven iguales".

Si te preguntan cómo hacés para que solo vos entres al panel: "pide usuario y contraseña, la clave
no está escrita en el código sino guardada como una huella, y la sesión se guarda en el
sessionStorage, que se borra al cerrar la pestaña. Para que sea seguro de verdad hace falta un
servidor, y eso es lo primero que quiero hacer".
