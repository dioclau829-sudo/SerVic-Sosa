# Proyecto: Página web de Servic PC

Proyecto de Programación Web · 6to Año Técnico en Informática · Alumno: **Claudio Sosa**
Wanda, Misiones · 2026

---

## 📁 Cómo está organizada la carpeta

```
Mi pagina web/
│
├── index.html · Servicios.html · Productos.html · Reseñas.html · panel.html
│   └─ LA PÁGINA (acá es donde trabajás: abrís y editás estos archivos)
│
├── assets/                      Imágenes, íconos, fotos del catálogo, JS
│
├── docs/                        Las guías en texto (leelas, están para estudiar)
│   ├── GUIA-EXPLICACION.md      ← qué hace cada parte del código
│   ├── PRESENTACION-CANVA.md    ← las diapositivas para la muestra
│   ├── PUBLICAR-EN-INTERNET.md  ← cómo se publica la web
│   ├── SERVIDOR-RESENAS.md      ← cómo funciona el servidor de reseñas
│   └── PLAN-CATALOGO.md         ← el plan de diseño del catálogo
│
├── 00-IMPRIMIR/                 Lo que llevás a la muestra (imprimir)
├── 01-MATERIALES/               El material que pasó el docente (NO se publica)
├── 02-RESGUARDO/                Estado anterior del proyecto (NO se publica)
├── 03-HERRAMIENTAS/             Scripts y pruebas (NO se publica)
├── 04-SITIO-PUBLICA/            La carpeta EXACTA para subir al hosting
├── SerVic-Sosa/                 El repositorio de GitHub (copia publicada + historial)
└── Informe del Proyecto de Página Web - version final.docx
```

---

## 🔗 Las direcciones

| | |
|---|---|
| **La web** | https://dioclau829-sudo.github.io/SerVic-Sosa/ |
| **El panel** (vos, como administrador) | https://dioclau829-sudo.github.io/SerVic-Sosa/panel.html |
| **Panel:** usuario `admin` · clave `servicpc` | (cambiála en *Datos y acceso*) |
| **La planilla** (caen las reseñas) | https://docs.google.com/spreadsheets/d/1fDOBrYP742-t55zRb8CQgnAL8mrNCnJP7imbD8ukiRc/edit |
| **El servidor** (para verificar) | https://script.google.com/macros/s/AKfycbyLfxVKVXswl6Cp78qVzoK019itjeATPIkjphUJpoC1IWnV01gFibDJpQJMYtRfVwgACA/exec?accion=listar |

---

## 🛠️ Los 3 comandos que vas a necesitar

Todos están en `03-HERRAMIENTAS/scripts/`. Abrí PowerShell en esta carpeta y:

**1. Subir los cambios al repo (y que se publiquen):**
```powershell
.\03-HERRAMIENTAS\scripts\sincronizar-repo.ps1
```

**2. Preparar la carpeta para subir a otro hosting (Netlify, FTP):**
```powershell
.\03-HERRAMIENTAS\scripts\preparar-publicacion.ps1
```

**3. Levantar la página en tu compu para probar (localhost:8080):**
```powershell
python -m http.server 8080
```
→ después abrís `http://localhost:8080/index.html` y `http://localhost:8080/panel.html`

> ⚠️ Para que el panel **guarde** los cambios, abrilo siempre por `localhost` (o desde la web
> publicada), **nunca con doble clic**: algunos navegadores bloquean el guardado en `file://`.

---

## 📄 Los 3 papeles para la muestra

| Archivo | Dónde | Qué es |
|---|---|---|
| `00-IMPRIMIR/FOLLETO-MUESTRA.pdf` | 2 hojas A4 **apaisadas** | El tríptico: se imprime a doble cara (borde corto) y se dobla en tres |
| `00-IMPRIMIR/GUIA-DE-MUESTRA.pdf` | 1 hoja A4 vertical | Tu chuleta: guion, demo en vivo y preguntas |
| `Informe del Proyecto de Página Web - version final.docx` | — | El informe con las 7 secciones que pidió el docente |

En `00-IMPRIMIR/DIRECCIONES.txt` tenés todos los links y las claves.

---

## 🧭 Las 3 copias del sitio (y cuál usar)

| Carpeta | Para qué | Cuándo la toco |
|---|---|---|
| **la raíz** (`index.html`, etc.) | **Tu lugar de trabajo.** Abrís y editás acá | Cada vez que programás |
| `SerVic-Sosa/` | **El repo de git.** Copia publicada + historial de cambios | La actualizás con `sincronizar-repo.ps1` |
| `04-SITIO-PUBLICA/` | **La carpeta para subir a un hosting** (arrastrar a Netlify o subir por FTP) | La actualizás con `preparar-publicacion.ps1` |

Los dos scripts mantienen las tres copias siempre iguales, así que nunca se te desincronizan.

---

## 📚 ¿Por dónde empiezo a estudiar?

1. `docs/GUIA-EXPLICACION.md` — qué hace cada parte del código (con ejemplos)
2. `docs/PRESENTACION-CANVA.md` — las diapositivas y las respuestas a las preguntas
3. `docs/PUBLICAR-EN-INTERNET.md` — cómo se sube a internet
4. `docs/SERVIDOR-RESENAS.md` — cómo funcionan las reseñas y la planilla

---

## ⚠️ Lo que NO se publica

`01-MATERIALES/`, `02-RESGUARDO/`, `03-HERRAMIENTAS/` y `04-SITIO-PUBLICA/` son de trabajo:
no se suben al hosting ni al repo (ya están ignorados en el `.gitignore`).

Si en algún momento querés "empezar de cero" o comparar con cómo estaba antes,
todo el estado original está en `02-RESGUARDO/`.
