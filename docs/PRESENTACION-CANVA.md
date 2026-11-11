# Presentación de Canva — Servic PC

Los temas que pidió el docente (mínimo 5 diapositivas) están todos cubiertos abajo, en negrita.
Son **12 diapositivas**: te deja respirar y no te aburres en 5 minutos.

**Sugerencia de diseño en Canva:** fondo `#141414` (negro), títulos en `#CD9F2C` (dorado), texto en
blanco, y el logo arriba a la izquierda. Es la misma paleta de la web, así que la presentación y la
página se ven como un solo proyecto.

---

### Diapositiva 1 — Portada
**Título:** Servic PC — Servicio técnico informático
**Subtítulo:** Proyecto de Programación Web · 6to Año Técnico en Informática · Alumno: Claudio Sosa
**Visual:** el logo circular centrado sobre fondo negro.
**Decís:** "Les presento el proyecto de la página web de Servic PC, un taller de reparación de
computadoras en Wanda que también vende repuestos y desarrolla sistemas de información para
negocios."

---

### Diapositiva 2 — Objetivo del proyecto
**Título:** ¿Para qué hice esta página?
- Dar presencia en internet al taller: hoy los clientes dependen del teléfono.
- Mostrar servicios, precios y repuestos con stock real.
- Que el cliente pida con **un clic** (link de WhatsApp con el pedido ya escrito).
- Sumar el servicio nuevo: **sistemas de cobro y de turnos para pymes y consultorios**.
**Visual:** 4 íconos de Font Awesome con su nombre debajo.

---

### Diapositiva 3 — **Qué es HTML** (estructura de una página web)
**Título:** HTML: la estructura
- HTML = **HyperText Markup Language** (lenguaje de marcado).
- No "programa": **describe** la página. Es el esqueleto.
- Etiquetas: `<header>`, `<nav>`, `<section>`, `<footer>`.
- **Estructura de una página:** `<!DOCTYPE html>` → `<html lang="es">` → `<head>` (lo que no se ve:
  título, favicon, CSS) y `<body>` (lo que se ve).
**Visual:** captura de `index.html` con el head y el body marcados en colores.

---

### Diapositiva 4 — **Qué es CSS** (clases, colores, fuentes, bordes)
**Título:** CSS: la apariencia
- CSS = **Cascading Style Sheets**. Pone color, fuente, tamaño, bordes y espaciado.
- Se escribe dentro de `<style>` en el `<head>`.
- **Clases (class):** `class="tarjeta-producto"` — el selector `.tarjeta-producto` le da el estilo.
  Se pueden reutilizar en muchas etiquetas.
- Ejemplo de lo que usa mi página:
```css
.tarjeta-producto { border: 1px solid #E2E5EA; border-radius: 12px; }
h2 { color: #C1272D; border-bottom: 2px solid #CD9F2C; }
```
- **Cómo cambie la fuente y el color de un párrafo:** con `font-family` y `color`,
  y también en línea: `<p style="color:red; font-size:20px;">`.
**Visual:** antes y después de una tarjeta.

---

### Diapositiva 5 — **Qué es Href** (y los enlaces en general)
**Título:** Href: los enlaces
- `<a href="...">` es el hipervínculo. El atributo `href` dice **a dónde te lleva**.
- `href="Servicios.html"` → otra página de mi sitio.
- `href="https://wa.me/5493757587830?text=..."` → abre WhatsApp con el mensaje ya escrito.
- `href="#seccion"` → dentro de la misma página.
- `target="_blank"` → abre en otra pestaña (lo uso en los links de WhatsApp e Instagram).
- **Problema que tuve:** los botones del menú apuntaban a archivos que no existían
  (`ServicSosa-PC.html` y `Mi pagina web Servic PC.html`). Lo detecté revisando cada `href`
  y los cambié por los nombres reales: `index.html`, `Servicios.html`, `Productos.html`, `Reseñas.html`.
**Visual:** el código de un `<a>` con las partes señaladas.

---

### Diapositiva 6 — **Tablas y listas** (estructura)
**Título:** Tablas y listas
- **Lista con viñetas:** `<ul>` + `<li>` · **Lista numerada:** `<ol>` + `<li>` ·
  **Lista de descripción:** `<dl>` + `<dt>` (el término) + `<dd>` (la descripción).
  En mi página: los horarios son una `<dl>`, el "cómo funciona" es una `<ol>`.
- **Tabla:** `<table>` + `<thead>` + `<tbody>` + `<tr>` + `<th>` (encabezado) + `<td>` (dato).
  En mi página: la tabla de calificaciones y la de comparación de sistemas.
- **Bordes:** `table, th, td { border: 1px solid #E2E5EA; }` y `border-collapse: collapse`
  para que los bordes no queden dobles.
**Visual:** las dos tablas de la web.

---

### Diapositiva 7 — Texto en movimiento, imágenes e íconos
**Título:** Efectos y recursos
- **Texto en movimiento:** `<marquee>` con `direction`, `scrollamount`, `scrolldelay`, `bgcolor`,
  `loop` y `behavior`. Es el banner naranja/dorado que está arriba de todo en mi web.
- **Imágenes:** `<img src="assets/..." alt="...">`. El `alt` es el texto que se ve si la imagen no carga.
  Para las de fondo: `background-image: url("assets/fondo.jpg");` con `background-size: cover;`.
- **Librería de iconos:** **Font Awesome** (kit `6c857664ba.js`). Se usa con `<i>` y clases:
  `fas fa-tools`, `fas fa-star`, `fab fa-whatsapp`, `fab fa-instagram`. Es vectorial:
  se agranda sin pixelarse y se le puede cambiar el color con CSS.
**Visual:** captura de la barra de iconos de la web.

---

### Diapositiva 8 — **Qué es JavaScript**
**Título:** JavaScript: el comportamiento
- JavaScript es el **tercer lenguaje** de la web: HTML estructura, CSS decora, **JS hace funcionar**.
- Es un lenguaje **interpretado**: el navegador lo lee y lo ejecuta, sin compilar nada.
- Sirve para: reaccionar a clics, mostrar/ocultar cosas, validar formularios,
  dibujar contenido, trabajar con datos y hablar con un servidor.
- **En mi página:** el botón que cambia a modo oscuro, el catálogo que se dibuja solo,
  los filtros por categoría y la ventana modal de la foto.
**Visual:** las 4 funcionalidades con íconos.

---

### Diapositiva 9 — **Ejemplo de JavaScript** (el de la materia, tal cual)
**Título:** Un ejemplo simple
```html
<button onclick="cambiarColor()">Cambiar color</button>
<script>
function cambiarColor() {
  document.body.style.backgroundColor = "lightblue";
}
</script>
```
- `onclick` = **evento**: "cuando hagas clic, hacé esto".
- `document.body` = todo el bloque visible de la página.
- `.style.backgroundColor` = la propiedad CSS del fondo.
**Visual:** el código con las tres partes resaltadas + el antes y después.

---

### Diapositiva 10 — **¿Dónde vemos JavaScript en la vida real?**
**Título:** JavaScript en la vida real
- **Cada página web** que abre un formulario, un menú o un carrito: Instagram, MercadoLibre, YouTube.
- **Bancos y páginas de e-commerce:** el carrito que recalcula el total sin recargar la página.
- **Google Maps:** mover el mapa, buscar una dirección, calcular la ruta.
- **Célulares:** la app del banco, el GPS, los juegos, los smartwatch.
- **Cámaras de seguridad y alarmas de autos** que avisan por WhatsApp.
- **Plataformas de e-learning, formularios de inscripción y editores de foto.**
**Visual:** 6 íconos con el nombre debajo.

---

### Diapositiva 11 — **¿Cómo usaría JavaScript en mi proyecto?**
**Título:** JavaScript en Servic PC
1. **El catálogo automático**: los 67 productos están en un arreglo de objetos y una función
   (`pintarCatalogo`) dibuja las tarjetas. Agregar un producto = **una línea**.
2. **Los filtros por categoría**: el botones cambian qué productos se ven, sin recargar la página.
3. **La ventana modal**: al hacer clic en la foto se abre grande, con el precio y el botón de WhatsApp.
4. **El modo claro/oscuro**: `document.body.style.backgroundColor`, como el ejemplo de la materia.
5. **El carrusel de trabajos**: pasa solo cada 5 segundos, con flechas y puntitos.
6. **La vista previa del mantenimiento**: al tocar el play se abre el video (o la foto) del trabajo.
**Visual:** capturas de las funcionalidades de la web real.

### Diapositiva 11 bis — Las reseñas de los clientes
**Título:** Cómo llegan las reseñas
- El cliente escribe su opinión **en la portada** (o en la página de reseñas) → queda **pendiente**.
- Me llega a mí a la **campana del panel**: 🟢 verde si es buena, 🔴 roja si es mala.
- Yo solo tengo que **aprobar o rechazar**: las aprobadas se publican en la web.
- También la pueden mandar por **WhatsApp**, que es el canal más directo.
**Visual:** el formulario de la web y la campana del panel.

---

### Diapositiva 12 — El panel de administración (lo que me diferencia)
**Título:** Mi panel de administración
- `panel.html`: una pantalla de acceso (usuario y contraseña) → **solo yo entro**.
- Arriba, la barra con el nombre de la empresa y **una campana de novedades**:
  - 🟢 **verde** = llegaron reseñas buenas (4 o 5 estrellas)
  - 🔴 **roja** = llegó una reseña mala → la tengo que contestar
  - el número = cuántas hay para revisar
- Cuatro pestañas: **Productos** (agregar / editar / publicar / borrar, con foto),
  **Reseñas** (aprobar o rechazar), **Trabajos realizados** (subir las fotos del carrusel)
  y **Datos** (exportar, importar, cambiar la clave).
- Cómo se guardan los datos: `localStorage` → archivo `datos.json` → catálogo por defecto.
- **Ojo, y lo digo yo:** el control de acceso de verdad tiene que estar en un servidor;
  esto es la versión que se puede mostrar en la muestra.
**Visual:** captura del panel con la campana abierta en verde y en rojo.

---

### Diapositiva 13 — Conclusión y trabajo futuro
**Título:** Lo que viene
- **Ya está:** 4 páginas, catálogo de 67 productos con filtros, contacto por WhatsApp e Instagram,
  sistemas para negocios, adapted al celular y con los colores del logo.
- **Lo que sigue:** carrito de compra, buscador de productos, panel de administración en Python
  con base de datos y galería de trabajos antes/después.
- **Cierre:** "La web ya está publicada y se puede pedir por WhatsApp desde el celular".
**Visual:** el folleto de Servic PC + los QR / contacto.

---

## Frases útiles si te preguntan

**¿Por qué no usaste Bootstrap ni jQuery?**
"Porque en la materia vimos CSS y JavaScript puro, y así el sitio pesa poco y no depende de
nadie. La única librería externa es Font Awesome, que es la que nos pasó el material de iconos."

**¿Por qué el catálogo no está escrito en el HTML?**
"Antes lo escribía a mano y con 67 productos el archivo era larguísimo y muy fácil de romper.
Lo cambié por un arreglo de objetos en JavaScript: ahora cada producto es una línea y las
tarjetas las dibuja una función."

**¿Cómo elegiste los colores?**
"Medí los píxeles reales del logo con un programa: el amarillo del logo es un dorado y el rojo es
un rojo ladrillo. Armé la paleta de la web con esos mismos valores y por eso el logo se ve parte
de la página."

**¿Qué le cambió a la empresa?**
"Los clientes ahora ven los precios y el stock sin llamar, y mandan el pedido por WhatsApp con
un clic. Y pudimos mostrar el servicio nuevo: los sistemas de cobro y de turnos para negocios."

**¿Cómo hacés para que solo vos puedas entrar al panel?**
"La página pide usuario y contraseña; la clave no está escrita en el código sino guardada como una
huella (hash) y la sesión se guarda en el sessionStorage, que se borra al cerrar la pestaña.
Igual te soy honesto: para que sea seguro de verdad, el control de acceso tiene que estar en un
servidor, y eso es lo primero que quiero hacer."

**¿Cómo guardás los datos?**
"Hay tres capas: lo que guardo en el navegador con localStorage, un archivo datos.json que subo al
servidor y el catálogo que viene por defecto en el código. Gana la primera que exista, y el panel
tiene un botón para exportar el datos.json y publicarlo."
