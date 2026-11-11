# Publicar la página en internet — Servic PC

Guía paso a paso, hecha con el material de la materia (*HOSTING*, *SERVIDOR*, *Web Hosting*) y
con lo que ya tenés armado.

---

## 1. ¿Qué es hosting? (lo del material)

> *Hosting is a service that provides the physical technology and digital space needed for a website
> to be viewed on the internet. In technical terms, a Server (a powerful computer) stores your files
> and "serves" them to a user's browser.*

O sea: **tu carpeta de archivos hoy está en tu computadora y nadie más la puede ver.**
El hosting es una computadora (el **servidor**) que guarda tus archivos y se los manda a cualquiera
que entre a la dirección de tu página.

**El modelo cliente-servidor** (del material *SERVIDOR.pdf*):

```
Tu navegador  --(pide la página por HTTP)-->  Servidor
   cliente  <--(te devuelve el HTML, CSS, JS)--  servidor
```

| Concepto | Qué es | En tu proyecto |
|---|---|---|
| **Uptime** | Cuánto tiempo el servidor está prendido | Buscá 99,9% o más |
| **Bandwidth** | Cuánto tráfico puede circular | Tus 5,8 MB se descargan una vez por visitante |
| **SSL** | El candado del navegador (https) | Obligatorio para que el panel no muestre "no seguro" |
| **DNS** | La agenda de teléfonos de internet | Convierte `servicpc.com.ar` en la IP del servidor |
| **FTP** | El protocolo para subir archivos | Es lo que usa FileZilla |

**Tu proyecto es un sitio estático**: no tiene base de datos ni PHP, solo HTML, CSS, JS e imágenes.
Eso tiene una ventaja enorme: **funciona en cualquier hosting, incluso en los gratuitos.**

---

## 2. Elegir dónde publicarlo

| Opción | Precio | Ideal para | Dificultad |
|---|---|---|---|
| **A) GitHub Pages** | Gratis | Si ya usás Git (tenés el repo `SerVic-Sosa`) | Fácil |
| **B) Netlify / Vercel** | Gratis | Subir la carpeta arrastrándola | Muy fácil |
| **C) Hosting tradicional** (DonDomain, Hostinger, Argentina…) | ARS/mes | Si querés tu propio dominio `.com.ar` | Media (FileZilla) |
| **D) Python + Flask** | Gratis (en tu compu o en un VPS) | Para que el panel guarde datos de verdad | Media |

> Para la **muestra anual**, la opción **B (Netlify)** es la más rápida: entrás, arrastrás la carpeta
> y en 30 segundos tenés una dirección pública tipo `servic-pc.netlify.app`.

---

## 3. Qué SÍ y qué NO subir

El repo `SerVic-Sosa` ya quedó armado con esta estructura:

```
SerVic-Sosa/
├── index.html · Servicios.html · Productos.html · Reseñas.html
├── panel.html
├── assets/          (logo, favicon, folleto, js/ y las 67 fotos)
├── docs/            (la guía, el guion de la presentación y el informe)
└── .gitattributes · .gitignore · .vscode/
```

**Si armás una carpeta aparte para subir a otro hosting**, subí esto:

```
SUBIR                                    NO SUBIR
─────────────────────────────────        ────────────────────────────────
index.html                              _materiales/      (material del docente)
Servicios.html                          _respaldo-original/ (copias viejas)
Productos.html                          .vscode/          (config del editor)
Reseñas.html                            SerVic-Sosa/      (repo git duplicado)
panel.html                              *.docx            (el informe viejo)
assets/  (todo)                        la carpeta _materiales/
```

**El panel**: `panel.html` pide clave, así que está protegido por contraseña, pero la URL es
pública. Si preferís que nadie lo vea, **no lo subas** y manejá los cambios desde tu computadora
(exportando el `datos.json` y subiéndolo). Es la opción más segura para una muestra.

---

## 4. Opción A: GitHub Pages (con tu repo)

Ya tenés el repo `SerVic-Sosa` con remoto en GitHub y **el sitio ya está subido** (commit
`18780f1`, 92 archivos). Para que se vea online faltan dos clics, **pero como tu repo es
privado, GitHub Pages no funciona en el plan gratis**: hay dos caminos.

### Camino 1 — Publicar con Netlify y dejar el repo privado (recomendado)

Es la opción más simple y **no tenés que hacer público nada**:

1. Entrá a **netlify.com** y creá una cuenta con tu mail.
2. Arrastrás la carpeta del proyecto (la que tiene los 4 HTML, el panel y `assets/`).
3. Netlify te da una dirección pública tipo `servic-pc-1234.netlify.app` al instante.
4. Cada vez que cambies algo, volvés a arrastrar la carpeta (o exportás el `datos.json`
   del panel y lo subís).

**Ventaja:** el repo sigue privado, sirve de backup, y nadie más que vos ve el código.

### Camino 2 — Hacer el repo público y activar GitHub Pages

1. En GitHub, entrá a tu repo → **Settings** → **General** → abajo, en *Danger Zone*:
   **Change visibility → Change repository visibility → Public** → confirmar con la clave.
2. Entrá a **Settings → Pages**:
   - **Source**: *Deploy from a branch*
   - **Branch**: `main` · **Folder**: `/(root)`
   - Guardar y esperar 1-2 minutos.
3. Tu página queda en **`https://dioclau829-sudo.github.io/SerVic-Sosa/`**.

> Con el repo público quedan visibles el código, las fotos y el informe (que están en `docs/`).
> Si preferís que no se vea nada de eso, usá el Camino 1.

### Actualizar el repo cuando cambias algo

```bash
cd "Mi pagina web\SerVic-Sosa"
git add .
git commit -m "Actualizacion de la pagina"
git push origin main
```

> ⚠️ **Ojo con las mayúsculas**: GitHub Pages corre en Linux y distingue mayúsculas de minúsculas.
> Por eso los archivos se llaman `logo-servic-circular.webp` (todo minúsculas) y no
> `Logo-Servic - EditadoCirculo.png`. Si subís un archivo con otro nombre, la imagen no aparece.

> 💡 **El panel y el repo**: si el repo queda público, `panel.html` también queda accesible por
> `tudominio.github.io/SerVic-Sosa/panel.html`. Pide clave, pero la URL es pública.
> Si preferís que nadie lo vea, no lo subas: sacá `panel.html` de la carpeta que subís
> y manejá los cambios desde tu computadora exportando el `datos.json`.

---

## 5. Opción B: Netlify (la más rápida para la muestra)

1. Entrás a **netlify.com** y creás una cuenta (podés usar el mismo mail).
2. Arrastrás la carpeta del proyecto (o la que armaste en el punto 3).
3. Te da una dirección tipo `servic-pc-1234.netlify.app` al instante.
4. Para actualizarla después: volvés a arrastrar la carpeta, o conectás el repo de GitHub
   (Netlify recompila solo en cada `push`).

---

## 6. Opción C: Hosting tradicional con tu propio dominio

1. Comprás un dominio (`.com.ar` o `.com`) en un proveedor argentino.
2. Contratás un plan de hosting con **FTP** y **certificado SSL**.
3. Entrás al **panel de control** (cPanel) y usás **FileZilla**:
   - Protocolo: **FTP**
   - Host: el que te da el hosting (ej: `ftp.tudominio.com.ar`)
   - Usuario y contraseña: los del hosting
   - Puerto: 21
4. Subís los archivos a la carpeta **`public_html`**.
5. En cPanel activás **AutoSSL** (o usás Let's Encrypt) para que aparezca el candado.
6. Configurás el **DNS** del dominio apuntando a la IP del hosting.
7. La página queda en `https://tudominio.com.ar`.

---

## 7. Opción D: el panel con datos de verdad (Python + Flask)

Esta es la opción para que **las reseñas y los productos los gestione un servidor**, y no el
navegador de cada visitante. Es el "trabajo futuro" del informe.

La idea (resumen; el código completo te lo puedo dejar armado):

```
Servidor (Python/Flask)
   ├── /            -> sirve index.html, Productos.html, ...
   ├── /api/productos   -> GET devuelve el JSON   |  POST guarda uno nuevo
   ├── /api/resenas     -> GET devuelve las reseñas | POST guarda una nueva
   └── /panel.html      -> el panel, con la clave de administrador
```

Ventajas: los datos están en un archivo `datos.json` **del servidor** (no en el navegador del
visitante), las reseñas de cualquier computadora llegan al panel, y el panel guarda con contraseña
real en el servidor.

---

## 8. Checklist antes de subir (probá todo con el público que no conoce la página)

- [ ] Probaste **las 4 páginas** y el panel en el navegador: que no haya errores en la consola (F12).
- [ ] Los **5 botones** del menú funcionan (Inicio, Servicios, Productos, Reseñas, Contacto).
- [ ] El **logo** se ve (si no, es el tema de las mayúsculas).
- [ ] Los **67 productos** se ven y los **11 filtros** filtran bien.
- [ ] La **ventana modal** abre al hacer clic en una foto.
- [ ] El **carrusel** pasa solo y las flechas funcionan.
- [ ] Las **tarjetas de mantenimiento** abren la vista previa.
- [ ] El **formulario de opinión** avisa que se envió.
- [ ] En el **celular** se ve bien ( probá con el botón "ver en móvil" del navegador ).
- [ ] El **panel** entra con `admin` / `servicpc` y cambia la contraseña.
- [ ] La **campana** se pone verde o roja según la reseña.
- [ ] El **favicon** aparece en la pestaña.
- [ ] No subiste `_materiales/`, `_respaldo-original/` ni el `.docx`.

---

## 9. Después de publicar

| Quiero... | Dónde se cambia |
|---|---|
| Cambiar un precio | Panel → Productos → Editar → Exportar datos.json → subirlo |
| Publicar un trabajo nuevo | Panel → Trabajos realizados → Exportar → subir el `datos.json` |
| Aprobar una reseña | Panel → campana → Aprobar → Exportar → subir el `datos.json` |
| Cambiar el teléfono o el Instagram | Buscá `5493757587830` y `c_l_a_u_.2007` en los HTML y reemplazá |

> **Atajo**: en el Bloc de notas (o en VS Code) usá *Ctrl+H* para reemplazar un texto en todos los
> archivos a la vez.

---

## 10. Para la muestra: cómo mostrar que la web está online

1. Mostrás la **dirección** en el navegador (o la proyectás).
2. En el celular, abrís el **QR** de la página (muchos hostings lo generan solos) y mostrás que
   la página funciona de verdad.
3. Abrís el **panel** desde la barra de direcciones y mostrás la campana con las reseñas.
4. Explicás el **ciclo completo**: el cliente deja su opinión → llega al panel → vos la aprobás →
   aparece en la web.
