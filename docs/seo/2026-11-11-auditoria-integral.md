# Auditoría SEO integral de FansGTA

Auditoría del 11 de noviembre de 2026, realizada desde el entorno cloud sobre `main` de `luiscazorla97-creator/gta6`. Se revisan 191 temas, sus 573 versiones completas en español, inglés y francés y las 612 URLs canónicas del sitemap. Las correcciones conservan artículos, direcciones, idiomas, diseño, unidades publicitarias y programación.

El rastreo público actual no muestra un bloqueo técnico general de los artículos. Las 612 URLs responden HTTP 200; sus canónicas y traducciones son coherentes y los 573 artículos entregan sus párrafos en el HTML inicial. Esto demuestra indexabilidad pública, no que Google haya indexado las páginas. Sin acceso privado a Search Console no se puede confirmar el número actual de exclusiones ni atribuirles una causa individual.

## Problemas y correcciones

| Prioridad | Hallazgo comprobado | Alcance y actuación |
| --- | --- | --- |
| Media | Falta permiso para vistas grandes de imágenes | Se añade `max-image-preview:large` a las 612 páginas indexables. Comunidad vacía, 404 y builds de desarrollo conservan `noindex`. Es una mejora de presentación en Google; no explica las exclusiones históricas ni garantiza Discover. |
| Media | Una captura de Jason estaba descrita como teléfono o helicóptero | Se corrigen alt y pies afectados en 16 temas, 48 versiones, tras inspeccionar la imagen. Muestra una pistola junto a una aeronave. Se conservan imagen, contexto del pie, URL, artículo y fechas. |
| Baja | El extracto de la guía de tamaño explicaba cambios de URL | Se sustituyen los tres extractos por una respuesta útil sobre el máximo de almacenamiento y cómo interpretarlo. Se conserva el anuncio fechado del 3 de noviembre y no se simula una publicación nueva. |
| Media | Riesgo de regresiones editoriales | La comprobación estática existente incorpora controles de idiomas, duplicados exactos, fechas, fuentes, medios y descripciones erróneas conocidas. La similitud temática genera avisos para revisión; nunca fusiona ni excluye automáticamente. |
| Baja | Problemas antiguos del arnés de pruebas | Se corrigen atributos de importación JSON y la selección demasiado amplia de una tanda de diez artículos. No eran bloqueos SEO de la web publicada. |
| Pendiente | `www` y `pages.dev` responden 200 con copias | Declaran canonical al dominio principal. Conviene redirigir por servidor conservando ruta y parámetros. La conexión actual no expone la zona de Cloudflare; no se añade un Worker ni se cambian reglas de seguridad. |

Las 612 páginas reciben la mejora de previews. Las correcciones de medios afectan a 48 de esas versiones y la mejora de extractos a otras tres. No se encontró ningún artículo público que necesitara una reparación de canonical, noindex, HTML inicial o estado HTTP.

## Qué sabemos sobre las páginas sin indexar

Los datos históricos facilitados fueron 288 descubiertas sin indexar, 56 rastreadas sin indexar, seis excluidas por noindex, cuatro 404 y cuatro redirecciones: 358 entradas en esas filas. El encargo menciona aproximadamente 357. No se utiliza ninguna de esas cifras como recuento vigente.

La auditoría del 9 de noviembre corrigió una concentración de enlaces relacionados que dejaba 147 versiones sin enlaces entrantes desde otros artículos. La revisión actual confirma cero artículos huérfanos y un máximo de dos clics desde su portada lingüística. Aquella deficiencia era real, pero no se ha demostrado que explicara todas las exclusiones.

Las categorías «descubierta» y «rastreada sin indexar» requieren ejemplos concretos de inspección para conocer recuperación, última visita y canonical elegida. Un HTTP 200 y una etiqueta indexable no obligan a Google a incluir el contenido. Tampoco prueban por sí solos una penalización, un problema de calidad o un bloqueo de Cloudflare.

## Cobertura y rastreo

Se analizaron las 612 URLs del sitemap mediante HTTP y las 573 versiones de artículos mediante comparación de texto, metadatos e idiomas. Se añadieron 15 variantes o rutas técnicas y tres peticiones con identificador de Googlebot. Se comprobaron 328 destinos externos distintos. El identificador de Googlebot simulado sirve para comparar respuestas; no sustituye una solicitud de Googlebot verificada por IP.

El rastreo previo a los cambios encontró cero respuestas 403/404/500, redirecciones, canonical incorrectas, noindex o desafíos en las URLs canónicas. Los enlaces internos y fragmentos se comprueban en el conjunto del HTML generado. Las categorías contienen los enlaces de todos sus artículos desde el HTML inicial; no dependen de paginación JavaScript ni de scroll infinito.

En los enlaces externos no hubo 404/410 confirmado: 312 respuestas HEAD correctas y un HEAD 404 que devolvió GET 200. Quince casos siguen inconclusos por restricciones de servidor, método HEAD o transporte. Se conservan las fuentes y se registran esos límites; un 403 o un HEAD no admitido no se etiqueta como enlace roto.

## Robots y sitemap

El sitemap sigue en https://fansgta.com/sitemap.xml y se declara en https://fansgta.com/robots.txt. Contiene 612 URLs absolutas, únicas, canónicas e indexables, con alternates lingüísticos. Las fechas de artículos reflejan publicación y modificación reales; portada y categorías heredan la última modificación de su contenido. Una corrección menor de alt o extracto no cambia la fecha para aparentar novedad.

El XML mide 286.658 bytes. Con 612 URLs está lejos de los límites de 50.000 URLs y 50 MB sin comprimir; no hace falta introducir un índice y varios sitemaps para corregir un problema inexistente. La generación automática continúa incorporando artículos y enlaces en cada compilación.

No se crea un sitemap de noticias a partir de guías antiguas actualizadas. Google exige noticias recientes y fechas originales fiables; `updated` no convierte una publicación del 2 de noviembre en noticia del 10. El sitemap general sigue siendo válido. No se inventan horas de publicación ni se afirma aceptación en Google News.

Robots mantiene las exclusiones técnicas de `/admin` y `/cdn-cgi/`. No bloquea los artículos ni CSS, JavaScript o imágenes. Las tres secciones vacías de Comunidad siguen con `noindex` y fuera del sitemap.

## Canonical y los tres idiomas

Las 573 URLs tienen canonical propia, idioma HTML correcto y hreflang recíproco hacia sus versiones equivalentes, más `x-default`. No se canonicaliza inglés o francés hacia español. Títulos, extractos y estructuras de texto están completos en los tres idiomas.

No hay títulos, extractos o cuerpos completos duplicados exactos por idioma. Diecinueve temas conservan el mismo slug entre idiomas dentro de directorios diferentes; eso no es un fallo y no justifica perder sus URLs. Las comprobaciones automáticas no certifican por sí solas que toda traducción sea idiomáticamente perfecta: las mejoras de redacción deben revisarse por intención y por fuente.

## Arquitectura y enlaces internos

Los 191 temas de cada idioma se alcanzan desde su portada en uno o dos clics. Cada versión recibe al menos un enlace desde otro artículo; el rango observado es de uno a 25. Se conserva la selección de tres relacionados y su correspondencia entre HTML inicial e hidratación.

No se añaden categorías vacías, etiquetas masivas ni páginas nuevas por variaciones de palabras clave. Portadas, categorías, fuentes y referencias contextuales continúan siendo las rutas de descubrimiento. La prueba de regresión existente simula una nueva publicación y comprueba que todos los destinos siguen enlazados.

## Contenido y oportunidades de búsqueda

La revisión estructural cubre los 191 temas y 573 versiones. No hay artículos sin secciones, idiomas vacíos, fechas inválidas o futuras, ni medios editoriales sin procedencia registrada. No se usa un mínimo arbitrario de palabras como supuesto requisito de Google.

Hay 27 grupos de párrafos compartidos entre versiones, principalmente instrucciones legítimas de trucos y contexto de localizaciones. Veintiséis artículos antiguos tienen fuentes al final pero no junto a cada sección. Son candidatos de revisión editorial, no prueba de que Google los haya rechazado. Los avisos de similitud no autorizan fusiones, redirecciones o retirada de páginas sin evaluar intención, enlaces y tráfico.

Se obtuvieron 12 consultas actuales de Google Autocomplete, cuatro por idioma, con 111 sugerencias observadas. No son volúmenes ni un ranking de búsquedas. Las prioridades encontradas ya tienen páginas:

- Lanzamiento y horarios: revisar la guía actual y distinguir hora nativa, cloud y región.
- PC y plataformas: mantener separadas una versión nativa, rumores y Remote Play.
- Precarga, tamaño y duración: mejorar respuestas y enlaces entre las guías existentes, sin repetirlas.
- Crossplay: distinguir compatibilidad de plataforma de multijugador confirmado.

La siguiente priorización por demanda debe usar consultas reales de Search Console cuando estén disponibles. No se prometen posiciones entre los diez primeros ni tráfico viral.

## Discover, Google News y datos estructurados

Se mantienen `BlogPosting`, `BreadcrumbList` y las entidades editoriales existentes. Google admite `Article`, `NewsArticle` y `BlogPosting`; cambiar el tipo de todas las páginas a `NewsArticle` no repararía la indexación. Títulos, descripciones, fechas, idioma, imagen, fuente y entidad editorial deben coincidir con la página visible.

Se habilitan previews grandes para las imágenes existentes. De 54 portadas distintas, 39 tienen al menos 1.200 píxeles de ancho. Quince portadas históricas tienen 800 píxeles y aparecen en 32 temas; no se amplían artificialmente ni se sustituyen por imágenes inventadas. Una sustitución futura exige un original auténtico con procedencia y condiciones de uso comprobadas.

El sitio dispone de términos, contacto y correcciones, referencias y créditos. Debe continuar distinguiendo noticias, reportes de terceros, rumores y guías. Conviene ampliar la explicación del proceso asistido por IA sin inventar autores, experiencia de juego o revisión humana. No se añaden `VideoObject` con fechas o datos desconocidos para vídeos que no cumplan las condiciones.

## Rendimiento y publicidad

Se midieron 12 navegaciones públicas: portada y guía en los tres idiomas, en móvil y escritorio. El navegador usó respuestas reales, proxy y certificados del entorno, contextos nuevos y ralentización de CPU móvil de cuatro veces, sin simular ancho de banda móvil. Los SDK publicitarios no se eliminaron ni se simularon en estas mediciones.

El LCP móvil observado fue de 444 a 956 ms, FCP de 444 a 784 ms y CLS máximo de portada aproximadamente 0,000063; los artículos tuvieron CLS 0. No son una nueva puntuación Lighthouse, condiciones equivalentes a PageSpeed ni datos de campo. La API de PageSpeed respondió 429 por cuota agotada. No hay nuevos valores de CrUX, INP, CTR o tráfico que puedan afirmarse.

HTML y activos se entregan con Brotli; HTML, robots y sitemap revalidan, y JS/CSS con hash conservan caché larga e inmutable. No hay evidencia en esta ruta cloud de una respuesta inicial del servidor de 15 segundos. Siguen presentes imágenes responsive, AVIF de portada, cubierta prioritaria, lazy loading inferior y espacio reservado para anuncios.

Las tareas largas móviles observadas requieren una traza de atribución antes de tocar código o proveedores. El tamaño del catálogo de hidratación debe vigilarse al crecer. No se eliminan anuncios para elevar artificialmente un resultado. Adsterra respondió 200 en esta ejecución; ello no demuestra relleno de creatividades ni ingresos. Social Bar sigue único, el popunder está desactivado y GA4 no carga antes del consentimiento.

## Cloudflare, redirecciones y 404

Cloudflare Pages usa `npm run build:release`, sirve `dist` y obtiene contenido de GitHub. No se modifican credenciales, reglas de seguridad, DNS, suscripciones ni frecuencia editorial.

Raíz, HTTP, barra final e `index.html` normalizan hacia sus destinos. `www.fansgta.com` y `fansgta.pages.dev` conservan canonical al dominio principal pero todavía no redirigen por servidor. La lectura autorizada de zonas devuelve una lista vacía, por lo que no hay acceso efectivo a eventos de seguridad ni reglas de esa zona.

Los tres antiguos documentos publicitarios y la ruta técnica de protección de correo siguen siendo 404. No representan artículos perdidos y no tienen reemplazo editorial equivalente. No se crean redirecciones engañosas a la portada ni se restauran wrappers antiguos. Una ruta inventada también devuelve 404 real; la plantilla de error está excluida del sitemap.

## Archivos y pruebas

Los cambios funcionales se concentran en el generador de HTML, el verificador SEO, un corrector de descripciones de medios y tres extractos localizados. El control editorial se incorpora a la comprobación estática existente. Los demás cambios de pruebas adaptan las expectativas de robots, imports JSON y selección de tandas; el inventario y las URLs se conservan.

La primera ejecución de 436 pruebas dejó 380 aprobadas, 14 omisiones previstas y 42 fallos de fixtures históricos. Tras corregirlos, la repetición de los siete archivos afectados aprobó 68 de 70; los dos casos restantes se resolvieron corrigiendo el parser de atributos HTML y aprobaron en una última repetición. Quedan 422 escenarios activos validados y 14 omisiones, sin fallos pendientes. No se afirma que la primera ejecución aprobara completa.

El registro JSON de esta auditoría contiene el listado de archivos, controles, resultados y evidencia pública. La validación final diferencia los resultados de desarrollo de los efectivamente comprobados en fansgta.com. No se considera un push como prueba de publicación.

## Acciones en Search Console

1. Revisar el informe actual y exportar ejemplos de cada motivo, sin asumir que persisten los recuentos antiguos.
2. Inspeccionar una muestra estable de URLs de cada idioma y motivo: recuperación, HTML renderizado, último rastreo, canonical declarada y elegida.
3. Confirmar el sitemap existente y su última lectura. No eliminarlo ni crear otro solo para aparentar actividad.
4. Revisar Estadísticas de rastreo y disponibilidad del host. Contrastar cualquier fallo con solicitudes verificadas de Googlebot en Cloudflare cuando exista acceso a la zona.
5. Solicitar indexación de ejemplos corregidos y relevantes, sin envíos masivos ni garantía de inclusión. Iniciar validación solo en incidencias realmente resueltas.
6. Comparar periodos equivalentes de 28 días, con los mismos filtros de idioma, país, dispositivo y tipo de búsqueda. Monitorizar impresiones, clics, CTR y posición, además de cobertura e inspección de la muestra.

No hay conexión efectiva a Search Console ni Analytics en esta ejecución. Se localizaron integraciones posibles sin instalar ni activar ninguna. La aprobación de AdSense y las métricas privadas no se presuponen.

## Plan de 90 días

| Periodo | Trabajo priorizado | Comprobación |
| --- | --- | --- |
| Días 1 a 30, 11 de noviembre a 10 de diciembre | Verificar las correcciones, obtener ejemplos actuales de exclusión, revisar URLs potencialmente solapadas y conservar sitemap, idiomas y descubrimiento. Configurar redirecciones de hosts cuando exista acceso autorizado a la zona. | Errores públicos, inspección de una muestra estable y cobertura por idioma. |
| Días 31 a 60, 11 de diciembre a 9 de enero | Mejorar artículos existentes con consultas e impresiones reales; reforzar respuestas iniciales y citas próximas, fuentes actuales y enlaces útiles. Atribuir cuellos de botella móviles antes de modificar recursos. | Cohortes equivalentes de impresiones, clics, CTR, posición, cobertura y CWV de campo. |
| Días 61 a 90, 10 de enero a 8 de febrero | Evaluar lo que cambió, separar variación de demanda tras el lanzamiento de efectos técnicos y profundizar en páginas útiles. Considerar consolidaciones solo con datos de intención, enlaces y tráfico. | Resultados por idioma/dispositivo, motivos persistentes de exclusión y calidad de páginas de entrada. |

El plan no crea una programación nueva ni amplía la publicación diaria: la autorización existente termina el 19 de noviembre de 2026 inclusive en America/New_York. Las revisiones posteriores son recomendaciones de seguimiento, no tareas programadas ni promesas de crecimiento.

## Referencias y evidencia

- [Cómo entiende Google los estados de indexación](https://support.google.com/webmasters/answer/7440203).
- [Requisitos de Discover](https://developers.google.com/search/docs/appearance/google-discover).
- [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) y [sitemaps de noticias](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap).
- [Article](https://developers.google.com/search/docs/appearance/structured-data/article), [idiomas](https://developers.google.com/search/docs/specialty/international/localized-versions) y [contenido con IA](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content).
- Datos detallados y registro de publicación: `2026-11-11-auditoria-integral.json` y `2026-11-11-publicacion.json`, en esta carpeta.
