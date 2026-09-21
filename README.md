# Flores amarillas 💛

Una pequeña experiencia interactiva para regalar flores amarillas el 21 de
septiembre. React + Vite + Tailwind CSS + Framer Motion.

## Empezar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Para producción:

```bash
npm run build
```

Genera `dist/`, listo para desplegar en Netlify o Vercel (build command
`npm run build`, publish directory `dist`).

## Personalizar

Todo lo editable vive fuera de los componentes:

- **`src/data/config.js`** — remitente, mensaje principal, carta final
  y canción.
- **`src/data/messages.js`** — los mensajes que se descubren al tocar
  cada flor en la sección "Pequeñas razones", incluido el easter egg.

## Agregar contenido propio

- **Música**: coloca un archivo de audio en `src/assets/music/`. Se
  detecta automáticamente; sin archivo, la app funciona igual pero sin
  reproductor.

## Estructura

```text
src/
├── assets/       # música e iconos
├── components/   # piezas reutilizables (flor, pétalos, tarjetas, reproductor…)
├── sections/     # cada momento de la experiencia, en orden de scroll
├── data/         # config.js, messages.js — edita aquí
└── hooks/        # utilidades (audio, prefers-reduced-motion)
```
