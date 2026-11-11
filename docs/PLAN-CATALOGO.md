# Plan de rediseño - Servic Sosa

> **ESTADO: APLICADO.** Este documento fue el plan de trabajo; ya se puso en práctica.
> Lo que quedó hecho: paleta tomada del logo, carpetas ordenadas, catálogo de 67 imágenes,
> enlaces corregidos, `<h1>`, `alt`, viewport, favicon, botones de WhatsApp e Instagram,
> catálogo con filtros y ventana modal, sección de sistemas para negocios, folleto e informe.
> La explicación línea por línea está en **GUIA-EXPLICACION.md** y el guion de las
> diapositivas en **PRESENTACION-CANVA.md**.
>
> El documento original (sin modificar) decía: "No modifica las páginas todavía: es la guía
> para cuando se apruebe la fase de código".

---

## 1. Paleta: derivada de los píxeles reales del logo

Se midieron los colores del logo (`assets/Logo-Servic - EditadoCirculo.png`) con un script:

| Elemento del logo | Color medido | Uso en la web |
|---|---|---|
| Círculo / fondo del logo | `#141414` (negro) | Fondo del header, nav y footer |
| "Servic" + círculo rojo | `#AA201F` → `#CC2925` | Botones, ofertas, acentos, enlaces |
| "Sosa" + círculo amarillo | `#BE9627` → `#CD9F2C` (dorado) | Badges, precios destacados, bordes y subrayados |
| Check verde | `#3A9639` | Etiqueta "Stock disponible" |
| (variante azul "Servic PC") | `#0F3B86` | Azul de apoyo si se usa el logo azul |

### Paleta final propuesta

```css
--negro:      #141414;   /* fondo del header, nav y footer (sale del logo) */
--rojo:       #C1272D;   /* acento principal (rojo del logo) */
--dorado:     #CD9F2C;   /* acento secundario (dorado del logo) */
--verde:      #3A9639;   /* check / stock */
--fondo:      #F4F5F7;   /* gris muy claro de fondo */
--blanco:     #FFFFFF;   /* tarjetas */
--borde:      #E2E5EA;   /* bordes de tarjeta */
--texto:      #1A1A1A;   /* texto principal */
--texto-2:    #5A5F6A;   /* texto secundario */
```

Contraste verificado: blanco sobre `#141414` = 18:1 · blanco sobre `#C1272D` = 5,8:1 ·
negro sobre `#CD9F2C` = 61:1 · `#1A1A1A` sobre `#F4F5F7` = 15:1. Todos cumplen WCAG AA.

**El logo pasa a ser lo único con color en un header negro**: el círculo negro del logo se
funde con el fondo y quedan flotando la llave, los engranajes, el rojo y el dorado. Eso es
justo "hacer que resalte el logo" sin inventar una paleta nueva.

### Tipografía
`Arial, sans-serif` se mantiene (es la del código original y la que el docente explicó).
El título baja de `70px` a `clamp(34px, 7vw, 64px)` para que no reviente en celular.

---

## 2. Estructura de carpetas definitiva

```
Mi pagina web/
├── index.html                 ← Inicio
├── Servicios.html
├── Productos.html
├── Reseñas.html
├── assets/
│   ├── logo-servic-circular.webp     (28 KB, reemplaza al PNG de 302 KB)
│   ├── logo-servic-horizontal.webp
│   └── productos/                    ← 58 imágenes del catálogo
│       ├── real-*.webp                (6 fotos propias del alumno)
│       ├── *.webp                     (52 imágenes de referencia, Commons)
│       ├── CATALOGO.csv / .txt        (manifiesto: nombre, categoría, precio)
│       └── CREDITS.txt                (licencias y autores de cada imagen)
├── _materiales/                ← material del docente (NO se publica)
├── _respaldo-original/         ← html-txt-copia (estado previo, por las dudas)
├── SerVic-Sosa/                ← repo Git (decisión pendiente: ¿A, B o C?)
└── Informe del Proyecto de Página Web.docx
```

Regla de publicación: al subir al hosting se suben **solo** las 4 páginas + `assets/`.
Las carpetas que empiezan con `_` y el `.docx` no se suben.

---

## 3. Las tarjetas del catálogo (cómo van a quedar)

Cada producto es una tarjeta `.tarjeta-producto` (ya existe esa clase en `Productos.html`)
con una imagen, un badge, el nombre, el precio y **dos botones**:

```html
<div class="tarjeta-producto">
  <div>
    <div class="contenedor-img">
      <img src="assets/productos/real-ram-notebook.webp" alt="Memoria RAM Notebook DDR4" class="img-tarjeta">
    </div>
    <div class="etiqueta-oferta">Stock disponible</div>
    <p class="titulo-producto">Memoria RAM Notebook DDR4 16GB 3200MHz</p>
  </div>
  <div>
    <p class="precio-producto">$215.641</p>
    <p class="envio-gratis">Consultá por WhatsApp</p>
    <a class="boton-consultar" href="https://wa.me/5493757587830?text=Hola%20Servic%20Sosa%2C%20quiero%20consultar%20por%20Memoria%20RAM%20Notebook%20DDR4%2016GB" target="_blank">
      <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
    </a>
    <a class="boton-consultar boton-instagram" href="https://www.instagram.com/servicsosa" target="_blank">
      <i class="fab fa-instagram"></i> Ver en Instagram
    </a>
  </div>
</div>
```

Detalles importantes:
- `target="_blank"` es un requisito del material del docente (página 23 de *Intro programación web*).
- El enlace de WhatsApp ya lleva el **mensaje precargado con el nombre del producto**: el
  cliente escribe y el pedido le llega listo al negocio. Eso es el "link que me redirija".
- El `alt` describe el producto (requisito del material: *atributo `alt`*).
- La imagen usa `loading="lazy"` para que la página no cargue 58 fotos de golpe.

### Filtros por categoría (una sola clase CSS, sin framework)

```html
<div class="filtros">
  <button class="filtro activo" onclick="filtrar('todos')">Todos</button>
  <button class="filtro" onclick="filtrar('Memoria RAM')">Memoria RAM</button>
  ...
</div>
```

```js
function filtrar(categoria) {
  document.querySelectorAll('.tarjeta-producto').forEach(function (t) {
    t.style.display = (categoria === 'todos' || t.dataset.categoria === categoria) ? 'flex' : 'none';
  });
}
```

Esto es JavaScript del nivel que pidió el docente (eventos + manipulating el DOM), se explica
en 30 segundos en la muestra y no usa ninguna librería.

---

## 4. Correcciones de dirección (a aplicar en la fase de código)

| Archivo | Línea | Ahora | Después |
|---|---|---|---|
| `index.html` | 124 | `href="ServicSosa-PC.html"` | `href="index.html"` |
| `Servicios.html` | 199 | `href="Mi pagina web Servic PC.html"` | `href="index.html"` |
| `Productos.html` | 195 | `href="Mi pagina web Servic PC.html"` | `href="index.html"` |
| `Reseñas.html` | 183 | `href="Mi pagina web Servic PC.html"` | `href="index.html"` |
| las 4 | - | `assets/Logo-servic - editadocirculo.png` | `assets/logo-servic-circular.webp` |
| las 4 | - | logo sin enlace | `<a href="index.html">` alrededor del `<img>` |
| footer | - | enlaces a Google/YouTube/GitHub | WhatsApp + Instagram + ubicación |

Además: `<h10>` → `<h1>`, `alt` cerrado bien, `<meta viewport>`, favicon,
`<meta name="description">`, `<strong><p>` corregido, `<center>` fuera,
regla `header` duplicada en `Servicios.html` borrada.

---

## 5. Lo que NO se toca

- Las 4 páginas separadas y el CSS embebido en cada `<head>` (son los temas del docente).
- Los `<marquee>` (tema "Texto en movimiento") y los botones con `onclick`
  (tema "JavaScript": `document.body.style.backgroundColor`).
- El kit de Font Awesome `6c857664ba.js` (el mismo del material *ICONOS.pdf*).
- El contenido comercial: precios, planes, horarios y reseñas.
- La estructura de secciones de cada página.

---

## 6. Orden de implementación cuando se apruebe

1. Respaldo: `_respaldo-original/` con el estado actual (ya está hecho).
2. `index.html` → `Servicios.html` → `Productos.html` → `Reseñas.html`: enlaces, logo,
   `h1`, `alt`, viewport, paleta, botón de WhatsApp.
3. `Productos.html`: catálogo nuevo con las tarjetas y los filtros.
4. Verificación en el navegador (escritorio + celular) y captura de pantalla para el informe.
5. Explicación línea por línea + guion de la presentación de Canva + informe actualizado.
