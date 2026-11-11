# Servidor de reseñas GRATIS (Google Sheets + Apps Script)

Con esto, las reseñas que mandan los clientes **llegan a vos**, aunque estén en otra
computadora o en el celular. No tenés que pagar ni contratar ningún servidor.

La idea: una **planilla de Google** hace de base de datos y un **Google Apps Script**
(que es gratis) hace de servidor: recibe las reseñas y las escribe en la planilla.

```
Cliente (cualquier celular)
      │  POST
      ▼
Google Apps Script  ──►  Tu planilla de Google
      │                        │
      │  GET                   │  (tú revisás y aprobás)
      ▼                        ▼
La web muestra las       Panel de administración
reseñas aprobadas
```

---

## Paso 1 — Crear la planilla

1. Entrá a **https://docs.google.com/spreadsheets/u/0/create** (con tu cuenta de Gmail).
2. Ponele nombre: **Servic PC - Reseñas**.
3. Renombrá la hoja de abajo (que dice "Hoja 1" o "Sheet1") a **Reseñas**.
4. En la fila 1 de esa hoja escribí estos títulos, uno en cada columna:

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | id | fecha | nombre | estrellas | texto | estado |

5. Creá **otra hoja** abajo (clic en **+**) y renombrala **Config**.
6. En la celda **A1** de la hoja *Config* escribí tu **clave de administrador**
   (por ejemplo `servicpc2026`). Esa clave es la que te permite aprobar, rechazar y borrar
   desde el panel. No la pongas en ningún otro lado.

---

## Paso 2 — Crear el Apps Script

1. Entrá a **https://script.google.com** → **Nuevo proyecto**.
2. Borrá lo que está en el editor y **pegá el código** del archivo
   `assets/js/SERVIC-PC-RESENAS.gs` (de la carpeta del proyecto).
3. Guardá con el ícono de disket (o Ctrl+S). Le podés poner de nombre `ServicPC`.
4. Clic en **Implementar** → **Nueva implementación**:
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo (tu cuenta de Google)**
   - Quién tiene acceso: **Cualquier persona**
5. Clic en **Implementar**. Te va a pedir permiso: elegí tu cuenta, permití los permisos
   (es el aviso de "Google no ha verificado esta aplicación" → **Advanced → Go to
   ServicPC (unsafe)** → **Allow**).
6. Te muestra **la dirección de la web app**. Copiala: termina en `/exec`, y es algo así:

   ```
   https://script.google.com/macros/s/AKfycbXXXXXXXXXXXXXXXX/exec
   ```

   ⚠️ **Copiá la que termina en `/exec`**, no la que termina en `/dev`.

---

## Paso 3 — Conectar el panel

1. En el **panel de administración** → pestaña **Datos y acceso** → **Servidor de reseñas**.
2. Pegá la dirección del paso 2 en el primer campo.
3. Escribí tu clave de administrador (la misma de la planilla) en el segundo campo.
4. Clic en **Guardar y conectar**:
   - Se guarda la clave en **este navegador** (nunca va en el código público).
   - Se descarga un archivo **`datos.json`** que ya incluye la línea `"servidor": "..."`.
5. Copiá ese `datos.json` a la carpeta **`assets/js/`** de tu proyecto y del repo.

---

## Paso 4 — Subir el cambio

```bash
cd "Mi pagina web\SerVic-Sosa"
# copiar el datos.json nuevo a assets/js/
git add .
git commit -m "Conecto el servidor de resenas"
git push origin main
```

GitHub Pages recompila solo en 1-2 minutos.

---

## Paso 5 — Probar (importante)

| Prueba | Cómo | Qué tiene que pasar |
|---|---|---|
| 1 | En el celular (o en una ventana de incógnito, que es "otra computadora") dejá una opinión | En la **planilla** aparece una fila nueva con estado `pendiente` |
| 2 | En el panel (tu computadora) mirá la campana | Aparece 🟢 **verde** con el número 1 |
| 3 | Aprobá esa reseña en el panel | En la planilla, la columna `estado` pasa a `aprobada` |
| 4 | Recargá la página de reseñas | La opinión nueva aparece en la web |

Si en el paso 1 la fila **no** aparece en la planilla, revisá que la dirección termine en `/exec`
y que la hoja se llame exactamente `Reseñas`.

---

## Cómo queda el flujo completo

| Quién | Qué hace | Dónde |
|---|---|---|
| **Cliente** | Deja su opinión en la web (o por WhatsApp) | Formulario "Dejá tu opinión" |
| **Servidor** | La guarda con estado `pendiente` | Tu planilla de Google |
| **Vos** | La ves en la campana 🟢/🔴 y la **aprobás o rechazás** | Panel de administración |
| **Web** | Muestra solo las aprobadas | Página de reseñas |

---

## Seguridad (para explicarlo en la muestra)

- La **dirección del servidor** es pública: cualquiera que la sepa podría mandar reseñas
  (igual que con un formulario de Google Forms). Para un trabajo escolar está perfecto.
- Lo que **no** es público es la **clave de administrador**: sin ella nadie puede aprobar,
  rechazar ni borrar. Y la clave nunca está escrita en el código de la web, solo en tu
  navegador (el `localStorage`) y en tu planilla.
- Si en el futuro querés más seguridad, se puede agregar un campo trampa (honeypot)
  invisible que descarte los envíos automatizados.

---

## ¿Y si no quiero usar Google?

La web **sigue funcionando igual** si no configurás el servidor: las reseñas se guardan en el
navegador de quien las escribe (como antes) y el botón de **WhatsApp** sigue siendo la vía
directa para que te lleguen. El servidor de Google es la mejora, no un requisito.
