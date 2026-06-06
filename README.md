# Estudio Redes · Plataforma interactiva

Web de estudio de **Redes Informáticas y Comunicación** (IES N.º 6023 "Dr. Alfredo Loutaif" · 2do año). SPA estática, sin build, lista para Vercel. Misma arquitectura que *Estudio Matemática*.

## Qué incluye
- **4 unidades de teoría**: Introducción a las Redes · Capa de Aplicación · Modelo de Capas y Encapsulamiento · Seguridad en Redes.
- **4 herramientas interactivas**: calculadora de subredes (IP/CIDR), retardos y throughput, protocolos por capa (juego) y conversor binario ↔ decimal.
- **Laboratorios de Cisco Packet Tracer**: Lab 1 (red hogareña) y Lab 2 (HTTP, FTP, SMTP/POP3, DNS, TFTP), paso a paso y con marca de "hecha".
- **Flashcards**: mazos TP 1, TP 2 y Repaso (76 tarjetas).
- **Autoevaluación**: quiz por unidad + quiz general.
- **Buscador**, progreso en `localStorage`, modo claro/oscuro y **PWA** (instalable y offline).

## Estructura
```
index.html              shell de la SPA (sidebar + router)
css/styles.css          estilos (acento teal)
js/data.js              unidades de teoría + quiz por unidad
js/decks.js             mazos de flashcards (TP1, TP2, Repaso)
js/practice.js          ejercicios con solución revelable
js/labs.js              laboratorios de Packet Tracer
js/tools.js             las 4 herramientas interactivas
js/app.js               router, navegación, progreso, búsqueda, tema
manifest.webmanifest · sw.js · icon-*.png   → PWA
Tarjetas-*.html         versiones imprimibles (independientes)
```

## Probar en tu compu
Abrí `index.html` en el navegador, o levantá un servidor local:
```bash
python -m http.server 5173
```
> La instalación PWA / offline solo funciona servido por **https** (Vercel), no abriendo el archivo local.

## Editar el contenido
- Teoría y quiz → `js/data.js`
- Flashcards → `js/decks.js`
- Ejercicios → `js/practice.js`
- Laboratorios → `js/labs.js`

> Al cambiar contenido, subí la versión `CACHE` en `sw.js` (`redes-v4` → `redes-v5`) para refrescar los dispositivos ya instalados.

## Subir a Vercel
Es estático, sin build. Conectá el repo o arrastrá la carpeta en [vercel.com](https://vercel.com) → **Add New → Project → Deploy** (Framework: *Other*). El `vercel.json` ya está listo.
