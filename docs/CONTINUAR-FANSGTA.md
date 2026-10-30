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

Al 30 de octubre de 2026 hay 69 temas, con 207 versiones localizadas. La tanda de diez temas añadió 30 versiones; la prueba cloud posterior incorpora una noticia sobre el calendario de Take-Two en los tres idiomas. Mantener el inventario actualizado después de nuevos lotes.

La serie manual de historias añadió 17 temas/51 versiones: trama y creación de GTA, London 1969/1961, GTA 2, III, Vice City, Advance, San Andreas, Liberty City Stories, Vice City Stories, IV, The Lost and Damned, Chinatown Wars, The Ballad of Gay Tony, V, Online y VI. Está en `src/batches/history*.ts`, categoría guías, con índice enlazado entre todas las entregas. VI se limita al proyecto y argumento anunciados, sin inventar el final. Las recopilaciones y remasterizaciones se explican dentro de cada original, sin duplicar campañas. Investigación, deduplicación y señales de consulta: `docs/editorial/2026-10-30-gta-history-research.json`. La programación diaria no cambia.

## Publicidad y diagnóstico móvil

El usuario confirmó que los anuncios se ven tras quitar el iframe adicional del publicador. Más tarde informó un aviso de indisponibilidad en Chrome para iPhone. Se reprodujo y corrigió un error de atribución: una excepción ajena al anuncio durante la carga podía marcarlo como fallido. Las pruebas locales no confirman por sí solas la entrega real en el teléfono.

El enlace https://fansgta.com/es/?ads-debug=1 activa un informe opcional al final de la página. Permite distinguir la unidad móvil de la de escritorio y los fallos de carga/ejecución. Los datos quedan en memoria de esa página; no se envían a un servidor. No inferir la causa móvil a partir de un 403 de este entorno ni pedir desactivar protecciones del navegador sin evidencia.

## Historial de Codex

Si se conserva el chat, abrirlo desde el historial permite seguir la misma conversación. Puede renombrarse y fijarse desde sus opciones para encontrarlo mejor. No se ha comprobado la causa del problema de historial informado por el usuario; tampoco se confirmó que la operación remota de renombrar/fijar se completara, porque la conexión con el historial se cerró. El repositorio permite continuar el proyecto aunque ese chat no esté disponible.

## Publicación programada

El 28 de octubre de 2026 se activó mediante Codex la tarea “Noticias diarias de FansGTA”, de frecuencia diaria con horario flexible y zona America/New_York. El usuario ajustó el encargo a un tema por día, con una versión completa en español, inglés y francés (tres versiones), hasta el 19 de noviembre de 2026 inclusive. Las publicaciones se comprueban y guardan en GitHub/Cloudflare con las mismas reglas editoriales. La tarea incluye fuentes, imágenes, deduplicación, pruebas y verificación de URLs; si falta material fiable o acceso debe informarlo sin fingir una publicación. No duplica temas ni modifica anuncios. La programación se gestiona con las herramientas de automatizaciones de Codex, no editando este documento. Una programación habilitada no acredita por sí sola una ejecución completada; consultar su resultado al revisar publicaciones futuras.

El pedido manual del 29 de octubre añade dos rumores contrastados (PC y multijugador en 2027), en los tres idiomas. El borrador de PC ya se publicó con fuentes y fecha revisadas. Ver docs/editorial/2026-10-29-rumours-research.md. La tarea diaria conserva su alcance.

La ejecución diaria del 29 de octubre añade un único tema: la fecha y formatos del Original Score de Justice y el sencillo Pusher, con tres versiones completas. Se distingue del artículo existente de The Album. Investigación: docs/editorial/2026-10-29-daily-justice-research.md.

El pedido manual posterior del 29 de octubre agrega tres guías de análisis (NPC, policía, rendimiento PS5 Pro), cada una en ES/EN/FR. Se conserva la programación diaria. Ver docs/editorial/2026-10-29-manual-three-research.md y el brief adjunto guardado.

Estado publicitario actualizado el 30 de octubre: Adsterra temporalmente desactivado por pedido del usuario. No reactivarlo sin nuevo pedido. Código de verificación de Google AdSense instalado; aprobación pendiente de comprobar en la cuenta del titular. Ver docs/adsense.md y docs/adsterra.md.

El pedido manual del 30 de octubre añade tres guías de GTA VI (clima, relación Jason/Lucia y robo de coches) y una guía completa de códigos de GTA V: cuatro temas, doce versiones. Investigación y deduplicación en docs/editorial/2026-10-30-manual-four-research.md. La portada conserva la escena existente con movimiento decorativo por capas, botón de pausa y respeto de movimiento reducido. Las capas editadas no son material de juego real ni imágenes para artículos. Google Analytics 4 G-JXHZ3W8WHP está instalado manualmente; la recepción de eventos debe comprobarla el titular en su cuenta. La programación diaria no cambia.

La ejecución diaria del 30 de octubre publica un único tema sobre los autobuses y trenes utilizables descritos por Edge, con seguimiento de PC Gamer del mismo día. Las tres versiones distinguen lo reportado de las tarifas, rutas y opciones de viaje rápido todavía sin documentar. Ver docs/editorial/2026-10-30-daily-transport-research.md. La tanda manual previa y la programación diaria no cambian.

El 30 de octubre, por un nuevo pedido del usuario, Analytics pasa a ser opcional: banner en ES/EN/FR con aceptar y rechazar, recuerdo de la elección durante 180 días y acceso desde el pie o Cookies para retirarla. No restaurar el script incondicional en index.html. Ver docs/analytics.md. AdSense y el estado pausado de Adsterra permanecen igual.

Estado publicitario más reciente del 30 de octubre: el usuario volvió a solicitar Adsterra mientras espera AdSense. Los cinco formatos están activos y se cargan automáticamente: arriba/abajo en todas las páginas, ambos laterales desde 1760 px y los espacios de artículo/nativo existentes. No hay un aviso propio para aceptar publicidad. Analytics mantiene su banner independiente. Popunder desactivado; AdSense conservado. La aprobación de AdSense todavía no está verificada y no hay monitor automático de esa cuenta; retirar Adsterra cuando se confirme la aprobación. Ver docs/adsterra.md.
