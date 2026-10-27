# Publicar fansgta.com en Cloudflare Pages

La autorización del usuario para publicar ya está dada. No hay que comprar otro dominio ni tocar BarberControl.

## Ruta rápida: subir el paquete de producción

1. Abrir Cloudflare y entrar en **Workers & Pages**. Elegir crear una aplicación de **Pages**, con carga directa de archivos (los nombres del menú pueden variar).
2. Usar `fansgta` como nombre del proyecto y subir el contenido de `fansgta-production.zip`. El ZIP contiene `index.html`, carpetas `es`, `en`, `fr`, assets, sitemap y reglas en su raíz; no incluye código fuente ni credenciales.
3. Desplegar y comprobar la dirección `pages.dev` que proporcione Cloudflare.
4. En los dominios personalizados del proyecto, añadir `fansgta.com`. Usar el asistente de Cloudflare para crear el registro correcto y comprobar que el certificado quede activo.
5. Añadir también `www.fansgta.com` y comprobar su certificado. Verificar después su redirección al dominio principal.

La carga directa y la integración Git son modalidades distintas de Pages. Para despliegues automáticos conviene usar desde el principio la siguiente ruta.

## Ruta recomendada: conectar GitHub

1. Crear un proyecto Pages con integración Git y elegir `luiscazorla97-creator/gta6`, rama `main`.
2. Comando de compilación: `npm run build:release`.
3. Directorio de salida: `dist`. Directorio raíz del repositorio: raíz. Node: 22 o 24.
4. Desplegar, comprobar la URL proporcionada y configurar ambos dominios con el asistente como arriba.
5. A partir de esa conexión, los nuevos commits en `main` generarán despliegues.

## Conexión desde este entorno

Se guardaron requisitos en los ajustes del entorno para `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`. El token se introduce de forma segura allí, nunca en el chat, el repositorio o un archivo público. Limitar sus permisos a la cuenta y a Cloudflare Pages que se vayan a usar. Los permisos DNS adicionales solo son necesarios si se modificará DNS mediante API; el asistente de dominios de Pages evita hacerlo manualmente.

También se guardaron los dominios de red necesarios para Rockstar, Cloudflare, la API de GitHub, YouTube y fansgta.com. Guardar estos requisitos no los aplica al proceso actual: revisar y guardar los cambios en los ajustes y publicar el entorno. Después, comprobar las operaciones afectadas antes de afirmar que están conectadas.

## Comprobaciones posteriores al despliegue

- `https://fansgta.com/` lleva a `/es/`.
- `https://www.fansgta.com/` termina en el dominio principal, con HTTPS válido.
- Un artículo de cada idioma se abre directamente y tras recargar.
- El código fuente HTML contiene el artículo, canonical, hreflang y JSON-LD correctos.
- Las páginas editoriales de producción llevan `index,follow`; las secciones vacías y el 404 llevan `noindex`.
- Una ruta inexistente responde HTTP 404 y muestra la página de error; esto requiere comprobar el hosting real.
- `/sitemap.xml` y `/robots.txt` responden correctamente.
- Crear o verificar la propiedad de dominio en Search Console y enviar `https://fansgta.com/sitemap.xml`.

Estas comprobaciones de producción todavía no se han ejecutado. Tampoco se verificó la fecha de lanzamiento ni se activaron ingresos, suscripciones o publicaciones diarias.
