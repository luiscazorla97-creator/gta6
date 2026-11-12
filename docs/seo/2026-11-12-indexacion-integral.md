# Auditoría de indexación de FansGTA — 12 de noviembre de 2026

La comprobación no encontró un bloqueo técnico general de los artículos. Las **288 URLs concretas** del archivo aportado de Search Console existen en el inventario, responden HTTP 200, permiten indexación y declaran su propia canonical. Esto acredita su disponibilidad pública; no demuestra que Google las haya rastreado o incorporado a su índice.

**Estado de entrega:** correcciones publicadas y verificadas en producción. Commit `3694a281d11c79bf50ddc616b9c5c9b5d13e5dcf`; Cloudflare `23cf97e2-6d7a-4c14-b86e-98e0d15aa156`, con despliegue y canónico coincidentes. La comprobación final cubre las 651 canónicas actuales y sus 612 versiones de artículos. El rastreo inicial de 648 páginas que se cita abajo se mantiene identificado como línea de partida.

## Search Console: qué se pudo comprobar

El informe facilitado indica 157 páginas indexadas y 359 excluidas: 288 descubiertas sin indexar, 57 rastreadas sin indexar, seis con noindex, cuatro 404 y cuatro redirecciones. La exportación recibida identifica únicamente las 288 descubiertas; no contiene las URLs de los otros motivos.

| Comprobación de las 288 URLs exportadas | Resultado |
| --- | ---: |
| URLs únicas y coincidentes con el catálogo | 288 |
| Respuestas HTTP 200, sin incidencia pública detectada | 288 |
| Estado de validación «Pendiente» | 288 |
| Filas con estado de error | 0 |
| Español / inglés / francés | 100 / 99 / 89 |
| Guías / trucos / otras categorías | 187 / 50 / 51 |

El campo «Último rastreo» contiene `1969-12-31` en todas las filas. Es un valor de ausencia de fecha, coherente con el «N/D» de la interfaz, y no un rastreo real de 1969 ni una fecha producida por FansGTA. «Pendiente» tampoco significa que la validación haya terminado correctamente.

El archivo privado no se incorpora al repositorio. Se conservan aquí solo resultados agregados y su SHA-256: `c4909e531e953f0ae64f00a986ffa21019f2ecca0b95859e51c8d06d922e73cf`.

## Hallazgos y correcciones

| Hallazgo comprobado | Cambio aplicado y alcance |
| --- | --- |
| El generador sobrescribía el archivo raíz con Contacto al procesar las páginas legales españolas. | Se limita la copia raíz a la portada y se exige igualdad completa con `/es/` en el verificador y en una regresión específica. La redirección 301 de `/` ocultaba el fallo en producción; no se atribuyen a él las exclusiones de Google. |
| Compra y precarga conservaban instrucciones anteriores a la disponibilidad actual, incluida una frase que no daba por verificada la precarga Xbox. | Se revisan compra y precarga con fuentes oficiales vigentes, distinguiendo descarga y acceso jugable. Los precios estadounidenses en USD conservan expresamente su comprobación del 28 de octubre; no se anuncian como precios recién verificados. |
| La guía general de preparación no orientaba con suficiente precisión hacia los procedimientos existentes. | Se convierte en una lista útil de cuenta, compra, almacenamiento, partidas, descarga y ajustes, enlazando las guías especializadas. Conserva su URL y publicación original. |
| Faltaban referencias contextuales hacia las nuevas guías de configuración. | Se añaden enlaces pertinentes desde funciones PS5, accesibilidad, móvil y Xbox App. Junto con las tres revisiones anteriores, son siete artículos existentes actualizados en ES/EN/FR. |
| La selección inicial de guías y algunos relacionados podían orientar mejor al lector. | La portada conserva sus tarjetas y muestra compra y precarga; el archivo presenta 13 prioridades editoriales y después las demás guías por fecha. Conserva sus 111 guías. Se ajustan dos asociaciones de relacionados. Siete de los temas prioritarios corresponden a 21 URLs de la exportación, siete por idioma. Esta selección no controla la prioridad de rastreo de Google. |

No se cambian URLs ni canonical para aparentar contenido nuevo. El sitemap y las categorías continúan incorporando automáticamente las publicaciones. La noticia diaria adicional sobre el directo de lanzamiento de YouTube es **un tema nuevo con tres versiones**, sustentado en el anuncio del 12 de noviembre; no constituye una técnica para forzar indexación. No cambia la frecuencia ni la fecha final autorizada de la tarea diaria.

## Rastreo, HTML, idiomas y datos estructurados

El rastreo público inicial cubrió las 648 canónicas entonces publicadas: todas respondieron 200. Las doce páginas legales presentan únicamente transformaciones verificadas de Cloudflare para proteger el correo y su recurso de medición; no se confundieron esas diferencias con contenido antiguo o pérdida de texto.

La auditoría local inicial comprobó 609 artículos, 4.458 párrafos, 2.454 celdas y 3.276 filas de trucos en el HTML inicial. No encontró artículos vacíos, duplicados exactos completos, canonical incorrectas ni discrepancias de hreflang. Cada artículo tenía enlaces desde su categoría y desde otro artículo, a uno o dos clics de su portada lingüística. El grafo contenía 14.640 conexiones distintas entre documentos y ningún destino interno o fragmento roto.

La compilación final valida 612 versiones de artículos y 651 canónicas, con hreflang recíproco, HTML inicial y sitemap coherentes. Las fechas originales se conservan; las modificaciones significativas usan su fecha real. `BlogPosting` es un tipo admitido para artículos: cambiar todas las páginas a `NewsArticle` no repararía la selección de Google. No se inventan horas de publicación ni se añade un sitemap de noticias con guías antiguas.

Robots declara [el sitemap existente](https://fansgta.com/sitemap.xml) y excluye `/admin` y `/cdn-cgi/`, sin bloquear artículos, imágenes, CSS o JavaScript. Las categorías contienen sus enlaces en HTML, sin depender de paginación JavaScript. No se crean cientos de páginas nuevas ni se divide innecesariamente un sitemap pequeño.

Las únicas exclusiones noindex generadas actualmente son las tres Comunidades vacías y el documento 404, fuera del sitemap. Esto no identifica automáticamente las seis URLs históricas del informe. Los antiguos documentos `/ads/native.html`, `/ads/mobile.html`, `/ads/rectangle.html` y la ruta técnica de protección de correo no representan artículos eliminados; no se restauran ni se redirigen a una portada sin relación.

## Cloudflare y límites de la evidencia

La API confirma GitHub `main`, `npm run build:release` y salida `dist`. Las muestras con identificadores declarados de navegador, Googlebot y Bingbot devolvieron 200 y contenido equivalente. Esas peticiones no proceden de IPs verificadas de Googlebot. La conexión no expone la zona para consultar sus eventos de seguridad; por ello no puede certificarse el tratamiento de todos los rastreadores reales.

Las variantes `www` y `pages.dev` requieren conservar la revisión de redirección de servidor: una canonical o una redirección del cliente no equivalen a un 301 del servidor. No se cambian reglas de seguridad, DNS, servicios, caché o publicidad para obtener una puntuación artificial.

## Pruebas y preservación

- `npm run build:release` y `node scripts/verify-static.mjs` aprobados: 656 documentos HTML, 29.384 enlaces internos y 1.286 bloques estructurados; 204 temas, 612 versiones y 651 canónicas. El control editorial registra cero errores y 43 avisos de revisión; los avisos no acreditan rechazos de Google.
- 56 casos locales distintos aprobados. Tras ampliar las prioridades con la exportación se repitieron los 22 casos afectados, todos aprobados; no se cuentan como 22 casos distintos adicionales.
- Navegador en ES/EN/FR, móvil y escritorio: texto inicial e hidratado, enlaces, idiomas, medios y controles relevantes. Los sustitutos de prueba de los SDK publicitarios y del póster externo no prueban entrega real de anuncios, disponibilidad del vídeo ni rendimiento de campo.
- Conservadas las 609 URLs anteriores y todas sus fechas de publicación, categorías e imágenes. De 203 temas anteriores, 196 permanecen idénticos y siete reciben las revisiones previstas. Los 18 archivos protegidos conservan sus hashes y el CSS es idéntico. Anuncios, consentimiento de Analytics y programación permanecen intactos.

Los cambios técnicos se concentran en `scripts/static-pages.mjs`, `scripts/verify-seo.mjs` y su regresión; el enlazado en `src/guide-order.ts`, `src/related-articles.ts`, `src/App.tsx` y `src/Interior.tsx`; las revisiones editoriales usan las tandas existentes y los dos nuevos archivos de datos del 12 de noviembre. Los controles nuevos verifican estas modificaciones sin rebajar los requisitos anteriores.

## Próximas acciones en Search Console

1. Tras comprobar el despliegue nuevo, inspeccionar una muestra estable por idioma: compra, precarga y una guía exportada. Revisar última recuperación, HTML y canonical elegida por Google, además de la declarada.
2. Confirmar la última lectura de `https://fansgta.com/sitemap.xml` y revisar disponibilidad del host en Estadísticas de rastreo. No eliminar y reenviar sitemaps para simular actividad.
3. Exportar ejemplos de las 57 rastreadas, seis noindex, cuatro 404 y cuatro redirecciones. Las 288 descubiertas ya fueron contrastadas; falta la identificación de los otros grupos.
4. Solicitar indexación de unos pocos ejemplos útiles y corregidos; iniciar validación solo de incidencias realmente resueltas. No realizar envíos masivos ni prometer inclusión o posiciones.
5. Comparar las mismas cohortes, idiomas y periodos. Una respuesta 200 no revela por qué Google aplaza un rastreo o decide no indexar; faltan inspección privada, canonical elegida y datos de rastreo para atribuir esa causa.

Ejemplos públicos para la muestra: [compra en español](https://fansgta.com/es/guias/donde-comprar-reservar-descargar-gta-6/), [precarga en inglés](https://fansgta.com/en/guides/gta-6-preload-date-time-consoles/) y [lenguas y subtítulos en francés](https://fansgta.com/fr/guides/gta-6-langues-doublage-sous-titres/). Son ejemplos de comprobación, no afirmaciones de indexación.


## Artículos existentes revisados

Las siguientes versiones conservan sus URLs y publicación original. Los cambios se limitan a texto justificado o referencias contextuales, según el registro.

| Tema | Español | Inglés | Francés |
| --- | --- | --- | --- |
| Xbox App | [Abrir](https://fansgta.com/es/guias/gta-6-descargar-xbox-app-movil-consola/) | [Abrir](https://fansgta.com/en/guides/gta-6-xbox-app-phone-remote-install-console/) | [Abrir](https://fansgta.com/fr/guides/gta-6-installer-xbox-app-mobile-console/) |
| Accesibilidad | [Abrir](https://fansgta.com/es/guias/gta-6-accesibilidad-subtitulos-controles-ps5-xbox/) | [Abrir](https://fansgta.com/en/guides/gta-6-accessibility-subtitles-controls-ps5-xbox/) | [Abrir](https://fansgta.com/fr/guides/gta-6-accessibilite-sous-titres-commandes-ps5-xbox/) |
| Móvil | [Abrir](https://fansgta.com/es/guias/gta-6-android-iphone-apk-remote-play/) | [Abrir](https://fansgta.com/en/guides/gta-6-android-iphone-apk-remote-play/) | [Abrir](https://fansgta.com/fr/guides/gta-6-android-iphone-apk-lecture-distance/) |
| Precarga | [Abrir](https://fansgta.com/es/guias/precarga-gta-6-fecha-hora-consolas/) | [Abrir](https://fansgta.com/en/guides/gta-6-preload-date-time-consoles/) | [Abrir](https://fansgta.com/fr/guides/prechargement-gta-6-date-heure-consoles/) |
| Funciones de PS5 | [Abrir](https://fansgta.com/es/noticias/gta-6-ps5-dualsense-audio-3d-funciones/) | [Abrir](https://fansgta.com/en/news/gta-6-ps5-dualsense-3d-audio-features/) | [Abrir](https://fansgta.com/fr/actualites/gta-6-ps5-dualsense-audio-3d-fonctionnalites/) |
| Compra y descarga | [Abrir](https://fansgta.com/es/guias/donde-comprar-reservar-descargar-gta-6/) | [Abrir](https://fansgta.com/en/guides/where-to-buy-preorder-download-gta-6/) | [Abrir](https://fansgta.com/fr/guides/ou-acheter-precommander-telecharger-gta-6/) |
| Preparación | [Abrir](https://fansgta.com/es/guias/preparar-consola-cuenta-lanzamiento/) | [Abrir](https://fansgta.com/en/guides/prepare-console-account-launch/) | [Abrir](https://fansgta.com/fr/guides/preparer-console-compte-sortie/) |


## Comprobación pública final

Verificación terminada 2026-11-12T22:41:55.642736+00:00: 651 URLs HTTP 200, incluidas de nuevo las 288 exportadas, con contenido inicial, canonical y hreflang correctos. Las 612 versiones de artículos coinciden con el release después de las transformaciones estrictamente identificadas de Cloudflare. Los 301 recursos públicos no HTML comprobados coinciden en bytes, incluidos sitemap, robots, ads.txt, CSS y medios. El HTML bruto transformado por Cloudflare no se declara idéntico.

En producción aprobaron 34 casos de navegador móvil y escritorio. El primer intento dejó 32 aprobados, un fallo y un caso sin ejecutar por cerrar antes de tiempo una ruta del verificador; se corrigió únicamente el cierre y se repitieron los 34 casos. Se conservan los límites de sustitución de SDK y póster ya descritos. Evidencia en [el registro de publicación](2026-11-12-indexacion-publicacion.json) y [el listado de URLs públicas](2026-11-12-urls-publicas.csv). El CSV documenta disponibilidad pública del sitio, no el estado privado de indexación de cada URL. La inclusión en Google sigue sin poder comprobarse desde este ejecutor.
