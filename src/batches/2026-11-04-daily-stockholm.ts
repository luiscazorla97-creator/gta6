import type {Article} from '../articles';

const reportIntro:[string,string,string]=[
  'Un rumor sobre publicidad de GTA 6 en Estocolmo parte de una foto publicada en r/GTA6 el 4 de noviembre de 2026. El usuario aDiDasMeatBall atribuye la imagen a la capital sueca. Es un reporte de un aficionado, sin confirmación de Rockstar ni verificación independiente de la ubicación por FansGTA.',
  'An unconfirmed GTA 6 advertising report places a giant billboard in Stockholm. Reddit user aDiDasMeatBall posted the photograph on r/GTA6 on November 4, 2026. This remains a fan report: Rockstar has not confirmed this installation, and FansGTA has not independently verified its location.',
  'Une rumeur concernant la publicité GTA 6 à Stockholm repose sur une photo publiée sur r/GTA6 le 4 novembre 2026 par aDiDasMeatBall. L’auteur la situe dans la capitale suédoise. Ce témoignage de fan n’est pas confirmé par Rockstar ; FansGTA n’a pas vérifié le lieu de manière indépendante.'
 ];

const post={label:'Reddit — aDiDasMeatBall, GTA 6 Promotion in Stockholm (4 November 2026)',url:'https://www.reddit.com/r/GTA6/comments/1xnmto5/gta_6_promotion_in_stockholm/'};
const location={label:'Reddit — aDiDasMeatBall, Skanstull / Ringvägen 100',url:'https://www.reddit.com/r/GTA6/comments/1xnmto5/gta_6_promotion_in_stockholm/19s4r4o8hi6zp/'};
const official={label:'Rockstar Games — Grand Theft Auto VI',url:'https://www.rockstargames.com/VI'};
const media={label:'GTA VI © Rockstar Games — Media',url:'https://www.rockstargames.com/VI/media'};
const miami={label:'FansGTA — GTA 6 y la publicidad de Miami',url:'https://fansgta.com/es/noticias/gta-6-miami-publicidad-acuerdo-vice-city/'};
const launch={label:'FansGTA — Fecha y hora de lanzamiento de GTA 6',url:'https://fansgta.com/es/noticias/gta-6-19-november-2026/'};

export const dailyStockholm20261104:Article={
 id:'gta6-stockholm-billboard-20261104',category:'news',
 slug:['rumor-gta-6-anuncio-gigante-estocolmo','rumour-gta-6-stockholm-billboard-photo','rumeur-gta-6-publicite-geante-stockholm'],
 title:['Rumor: un anuncio gigante de GTA 6 aparece en Estocolmo','Rumour: giant GTA 6 billboard reported in Stockholm','Rumeur : une publicité géante GTA 6 signalée à Stockholm'],
 excerpt:['Una foto publicada el 4 de noviembre sitúa publicidad de GTA 6 en Estocolmo. Qué muestra, dónde la ubica su autor y qué sigue sin confirmar Rockstar.','A November 4 photo report places a giant GTA 6 billboard in Stockholm. What it shows, the location claimed by its author and what remains unconfirmed.','Une photo publiée le 4 novembre situe une publicité GTA 6 à Stockholm. Ce qu’elle montre, le lieu indiqué par son auteur et les limites du témoignage.'],
 tag:['RUMOR · PUBLICIDAD SIN CONFIRMAR','RUMOUR · UNCONFIRMED ADVERTISING','RUMEUR · PUBLICITÉ NON CONFIRMÉE'],
 image:'hero',
 imageAlt:['Jason y Lucía junto a un coche, entre palmeras, en el arte oficial de GTA VI','Jason and Lucia beside a car and palm trees in official GTA VI artwork','Jason et Lucia près d’une voiture et de palmiers dans une illustration officielle GTA VI'],
 imageCaption:['Arte promocional oficial de GTA VI como contexto. No es una fotografía del anuncio atribuido a Estocolmo; la publicación original está enlazada en el texto.','Official GTA VI promotional artwork for context. This is not a photograph of the reported Stockholm billboard; the original post is linked in the text.','Illustration promotionnelle officielle GTA VI, utilisée pour le contexte. Ce n’est pas une photo de la publicité signalée à Stockholm ; la publication originale est liée dans le texte.'],
 imageCredit:media,published:'2026-11-04',updated:'2026-11-04',
 body:reportIntro,
 sections:[
  {heading:['Qué muestra la foto del anuncio de GTA 6','What the GTA 6 billboard photo shows','Ce que montre la photo de la publicité GTA 6'],paragraphs:[reportIntro,[
   'La imagen enlazada muestra una pieza de gran formato sobre la fachada de un edificio: Jason y Lucía, palmeras y la identidad visual de Grand Theft Auto VI. Se aprecia desde la calle, con coches delante. Esa observación permite describir el material visible, pero no atribuirle un presupuesto, unas dimensiones exactas o una fecha de instalación.',
   'The linked image shows a large display on a building facade, featuring Jason, Lucia, palm trees and Grand Theft Auto VI branding. Cars are visible in the street below. That supports a description of the visible material, rather than a claim about its budget, exact dimensions or installation date.',
   'L’image liée montre une publicité de grand format sur une façade, avec Jason, Lucia, des palmiers et l’identité visuelle de Grand Theft Auto VI. Des voitures apparaissent dans la rue. On peut décrire ces éléments visibles sans leur attribuer un budget, des dimensions précises ou une date d’installation.'
  ]],references:[post]},
  {heading:['Dónde lo sitúa el autor: Skanstull, Ringvägen 100','The author’s location claim: Skanstull, Ringvägen 100','Le lieu indiqué par l’auteur : Skanstull, Ringvägen 100'],paragraphs:[[
   'En un comentario del mismo hilo, el autor señala el exterior de la estación de Skanstull, en Ringvägen 100. Esa dirección debe leerse como su indicación, no como una localización comprobada sobre el terreno por esta web. El 4 de noviembre es la fecha de la publicación: no demuestra que el cartel se colocara ese día ni cuánto tiempo permanecerá allí.',
   'In a comment on the same thread, the author places it outside Skanstull station at Ringvägen 100. That is the poster’s account, rather than an address checked on site by FansGTA. November 4 dates the post; it does not establish when the display went up or how long it will remain there.',
   'Dans un commentaire du même fil, l’auteur indique les abords de la station Skanstull, à Ringvägen 100. Il s’agit de son indication, et non d’une adresse contrôlée sur place par FansGTA. Le 4 novembre date la publication : cela ne prouve ni le jour de pose ni la durée d’affichage.'
  ]],references:[location]},
  {heading:['Qué está documentado y qué sigue sin confirmar','What is documented and what remains unconfirmed','Ce qui est documenté et ce qui reste à confirmer'],paragraphs:[[
   'Una foto compartida en una comunidad y un comunicado del editor son fuentes distintas. Para evaluar este reporte conviene separar la existencia de la publicación, lo que se ve en la imagen y las afirmaciones que todavía necesitarían otra prueba.',
   'A community photograph and a publisher announcement carry different evidence. Evaluating this report means separating the existence of the post, the content visible in the image and claims that would still need further support.',
   'Une photo communautaire et un communiqué de l’éditeur n’apportent pas les mêmes preuves. Il faut distinguer l’existence de la publication, les éléments visibles dans l’image et les affirmations qui demanderaient encore une autre source.'
  ]],table:{headers:[['Punto','Point','Point'],['Estado de la comprobación','Verification status','État de la vérification']],rows:[
   [['Publicación del 4 de noviembre','November 4 publication','Publication du 4 novembre'],['Comprobada en el hilo y sus metadatos públicos de Reddit.','Checked against the thread and its public Reddit metadata.','Vérifiée dans le fil et ses métadonnées publiques Reddit.']],
   [['Dirección en Estocolmo','Stockholm address','Adresse à Stockholm'],['Atribuida al autor; sin geolocalización independiente.','Attributed to the author; no independent geolocation.','Attribuée à l’auteur ; sans géolocalisation indépendante.']],
   [['Contrato y calendario del cartel','Billboard contract and schedule','Contrat et calendrier d’affichage'],['No verificados con Rockstar o el operador del espacio.','Not verified with Rockstar or the advertising-space operator.','Non vérifiés auprès de Rockstar ou de l’exploitant publicitaire.']],
   [['Nuevo tráiler o funciones jugables','New trailer or gameplay features','Nouvelle bande-annonce ou fonctionnalités'],['La foto no demuestra ninguno de esos anuncios.','The photo establishes neither of those announcements.','La photo ne démontre aucune de ces annonces.']]
  ]},references:[post,location]},
  {heading:['Cómo encaja con la campaña de GTA VI','How this fits the GTA VI campaign','Comment situer ce signalement dans la campagne GTA VI'],paragraphs:[[
   'El atractivo de estas imágenes está en ver el mundo visual de GTA fuera de una pantalla, ocupando espacios cotidianos. Es una lectura de su impacto visual, no una medición de popularidad o ventas. El caso de Miami tiene su propia cobertura en FansGTA, basada en documentación del condado. Esa documentación no confirma por extensión un contrato sueco ni permite sumar ambas campañas.',
   'Part of the appeal is seeing GTA’s visual world leave the screen and occupy everyday surroundings. That is an observation about the image’s appeal, rather than a popularity or sales measurement. FansGTA covers Miami’s campaign separately using county documentation. Those records do not also verify a Swedish contract or allow the two campaigns to be combined.',
   'L’intérêt visuel vient notamment du passage de l’univers GTA de l’écran à un lieu du quotidien. C’est une lecture de l’image, pas une mesure de popularité ou de ventes. FansGTA traite séparément la campagne de Miami à partir de documents du comté. Ces documents ne confirment pas, par extension, un contrat suédois et ne permettent pas de fusionner les deux opérations.'
  ]],references:[miami]},
  {heading:['¿Cambia algo para el lanzamiento o el mapa de GTA 6?','Does this change GTA 6’s release or map?','Cela change-t-il la sortie ou la carte de GTA 6 ?'],paragraphs:[[
   'No hay en esta foto un anuncio de otra ciudad jugable ni de una nueva plataforma. Un lugar que aloja publicidad no se convierte por ello en parte del mapa. La referencia para el lanzamiento sigue siendo la web de Rockstar, que al comprobarla el 4 de noviembre mantiene el 19 de noviembre de 2026 para PS5 y Xbox Series X|S. Nuestra noticia sobre los horarios reúne ese tema sin mezclarlo con el avistamiento del cartel.',
   'This photograph does not announce another playable city or a new platform. Hosting an advertisement does not make a location part of the game map. Rockstar’s website remains the release reference: checked on November 4, it lists November 19, 2026 for PS5 and Xbox Series X|S. Our release-time report covers that subject separately from this billboard sighting.',
   'Cette photo n’annonce ni une autre ville jouable ni une nouvelle plateforme. Accueillir une publicité ne fait pas entrer un lieu dans la carte du jeu. Le site de Rockstar reste la référence pour la sortie : consulté le 4 novembre, il indique le 19 novembre 2026 sur PS5 et Xbox Series X|S. Notre article sur les horaires traite ce sujet séparément du signalement publicitaire.'
  ],[
   'Para ver la fotografía, abrí el hilo original enlazado. La portada de este artículo es arte oficial del juego usado como contexto, no una imagen de la calle sueca. No hemos republicado la fotografía del usuario sin una autorización de reutilización.',
   'Use the original thread linked here to view the photograph. This article’s cover is official game artwork used for context, rather than a photograph of the Swedish street. We have not republished the user’s photograph without reuse permission.',
   'Pour consulter la photographie, ouvrez le fil original lié ici. La couverture de cet article est une illustration officielle du jeu utilisée pour le contexte, pas une photo de la rue suédoise. Nous n’avons pas republié la photographie du fan sans autorisation de réutilisation.'
  ]],references:[official,launch,post]}
 ],sources:[post,location,official,media]
};
