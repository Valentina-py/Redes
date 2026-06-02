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

## Probar en tu compu
Abrí `index.html` directamente en el navegador. ¡Listo!

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
