# Tarjetas de estudio — Redes Informáticas y Comunicación

Web interactiva de flashcards (IES N.º 6023 Loutaif · Caps. 1 y 2).

## Mazos
- **TP 1** — Introducción a las Redes (23 tarjetas)
- **TP 2** — Capa de Aplicación (21 tarjetas)
- **Repaso** — Teoría general (32 tarjetas)

## Cómo se usa
- Tocá la tarjeta (o **Espacio**) para girarla y ver la respuesta.
- **✓ Lo sé** (tecla `2`) / **↺ Repasar** (tecla `1`).
- **🔀 Mezclar** para autoevaluarte en orden aleatorio.
- **★ Pendientes** para estudiar solo las que faltan.
- Flechas ← → o deslizar en el celular para cambiar de tarjeta.
- El progreso se guarda en el navegador (localStorage).

## Instalar como app (PWA) y usar sin internet
La web es una **PWA**: se puede instalar en el celu/compu y funciona **offline**.
- **Android (Chrome):** entrá al sitio → menú ⋮ → *Instalar app* / *Agregar a pantalla de inicio*.
- **iPhone (Safari):** botón Compartir → *Agregar a inicio*.
- **PC (Chrome/Edge):** ícono de instalar ⊕ en la barra de direcciones.

Una vez instalada, abre a pantalla completa y guarda las tarjetas para estudiar sin conexión.
> Al cambiar el contenido (`data.js`), subí el número de versión `CACHE` en `sw.js` (ej. `redes-v2`) para que se refresque en los dispositivos.

## Probar en tu compu
Abrí `index.html` directamente en el navegador. ¡Listo!
> Nota: la instalación/offline solo funciona servido por **https** (Vercel), no abriendo el archivo local.

## Subir a Vercel
Es un sitio estático, no necesita build.

**Opción rápida (sin instalar nada):**
1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión.
2. "Add New… → Project" y arrastrá esta carpeta, o conectala desde GitHub.
3. Framework Preset: **Other**. Build command: vacío. Output dir: `./`
4. Deploy.

**Opción CLI:**
```bash
npm i -g vercel
vercel        # primera vez: seguí los pasos
vercel --prod # publicar
```

## Archivos
- `index.html` — página de inicio (selector de mazos)
- `study.html` — modo estudio interactivo (`?deck=tp1|tp2|repaso`)
- `data.js` — contenido de todas las tarjetas (editá acá para cambiar preguntas/respuestas)
- `vercel.json` — config de despliegue
- Los `Tarjetas-*.html` originales quedan como versión imprimible.
