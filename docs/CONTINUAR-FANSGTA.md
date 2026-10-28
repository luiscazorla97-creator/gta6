# Cómo continuar FansGTA

El proyecto no depende de que una conversación permanezca visible en Codex.

- Código y contenido: https://github.com/luiscazorla97-creator/gta6
- Web publicada: https://fansgta.com
- Rama de producción: `main`.
- Alojamiento: proyecto Cloudflare Pages `fansgta`.
- Copia de trabajo de este entorno: `/workspace/gta6`. En otro entorno hay que obtener el repositorio; esa ruta no es la copia de seguridad.

## Qué escribir en un chat nuevo

> Continuá mi proyecto FansGTA del repositorio luiscazorla97-creator/gta6. Leé AGENTS.md, docs/CONTINUAR-FANSGTA.md y docs/editorial/inventory.json antes de trabajar. Quiero [describir el pedido]. No modifiques BarberControl.

Para una nueva tanda editorial, se puede agregar:

> Investigá y publicá [cantidad] temas nuevos sobre GTA 6 en español, inglés y francés. Evitá duplicar lo que ya existe, comprobá las fuentes e imágenes y respetá las instrucciones editoriales del repositorio.

## Dónde está cada cosa

- `AGENTS.md`: instrucciones del proyecto, autorización de publicación y límites.
- `docs/editorial/inventory.json`: inventario de temas y sus tres direcciones; revisarlo antes de elegir nuevas consultas.
- `src/articles.ts` y `src/batches/`: artículos y lotes en los tres idiomas.
- `docs/editorial/`: selección de temas, señales de interés, fuentes comprobadas y límites de acceso.
- `public/media/credits.json`: procedencia de imágenes oficiales.
- `docs/adsterra.md`: integración publicitaria, pruebas y limitaciones.

Al 28 de octubre de 2026 hay 40 temas, con 120 versiones localizadas. La última tanda añade 10 temas y 30 versiones. Mantener el inventario actualizado después de nuevos lotes.

## Publicidad y diagnóstico móvil

El usuario confirmó que los anuncios se ven tras quitar el iframe adicional del publicador. Más tarde informó un aviso de indisponibilidad en Chrome para iPhone. Se reprodujo y corrigió un error de atribución: una excepción ajena al anuncio durante la carga podía marcarlo como fallido. Las pruebas locales no confirman por sí solas la entrega real en el teléfono.

El enlace https://fansgta.com/es/?ads-debug=1 activa un informe opcional al final de la página. Permite distinguir la unidad móvil de la de escritorio y los fallos de carga/ejecución. Los datos quedan en memoria de esa página; no se envían a un servidor. No inferir la causa móvil a partir de un 403 de este entorno ni pedir desactivar protecciones del navegador sin evidencia.

## Historial de Codex

Si se conserva el chat, abrirlo desde el historial permite seguir la misma conversación. Puede renombrarse y fijarse desde sus opciones para encontrarlo mejor. No se ha comprobado la causa del problema de historial informado por el usuario; tampoco se confirmó que la operación remota de renombrar/fijar se completara, porque la conexión con el historial se cerró. El repositorio permite continuar el proyecto aunque ese chat no esté disponible.
