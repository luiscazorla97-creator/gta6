import type {Article} from '../articles';
type Three=[string,string,string];
const original={label:'Selfridges · Instagram announcement, 5 November 2026',url:'https://www.instagram.com/reels/DfXFo35RCad/'};
const events={label:'Selfridges · Official events and experiences',url:'https://www.selfridges.com/GB/en/stores/events/'};
const coverage={label:'GTA BOOM · Selfridges report, 5 November 2026',url:'https://www.gtaboom.com/selfridges-is-opening-a-grand-theft-auto-vi-experience-in-london-on-november-9-47d2'};
const official={label:'Rockstar Games · GTA VI',url:'https://www.rockstargames.com/VI'};
const gallery={label:'GTA VI © Rockstar Games · Launch Gallery',url:'https://www.rockstargames.com/VI/launch-gallery'};
const media={label:'GTA VI © Rockstar Games · Media',url:'https://www.rockstargames.com/VI/media'};
const preload={label:'FansGTA · GTA VI preload',url:'https://fansgta.com/es/guias/precarga-gta-6-fecha-hora-consolas/'};
const miami={label:'FansGTA · GTA VI Miami campaign',url:'https://fansgta.com/es/noticias/gta-6-miami-publicidad-acuerdo-vice-city/'};
const intro:Three=[
 'Selfridges anunció el 5 de noviembre una experiencia relacionada con GTA 6 a partir del 9 de noviembre de 2026. La fecha aparece en la publicación de su cuenta oficial de Instagram. El aviso no confirma una demo jugable, una tienda concreta ni una lista de productos: estas son las diferencias entre el anuncio comprobado y los detalles que todavía faltan.',
 'Selfridges announced a GTA 6-themed experience on November 5, with a start date of November 9, 2026. The date appears in the retailer’s official Instagram post. The announcement does not confirm a playable demo, a particular branch or a product list. Here is what the original post establishes and what remains unspecified.',
 'Selfridges a annoncé le 5 novembre une expérience liée à GTA 6 à partir du 9 novembre 2026. Cette date figure dans la publication Instagram officielle de l’enseigne. L’annonce ne confirme ni démo jouable, ni magasin précis, ni liste de produits : voici ce que la publication permet d’établir et les détails encore inconnus.'
];
const bridge={key:'feature-launch-gallery-bridge',credit:gallery,alt:[
 'Vice City al anochecer, con un puente levadizo abierto y rascacielos iluminados en GTA VI',
 'Vice City at twilight, with an open drawbridge and illuminated towers in GTA VI',
 'Vice City au crépuscule, avec un pont levant ouvert et des immeubles illuminés dans GTA VI'
]as Three,caption:[
 'Captura oficial de Vice City usada como contexto del mundo de GTA VI. No es una fotografía de Selfridges ni una imagen de la experiencia anunciada.',
 'Official Vice City screenshot providing context for GTA VI’s world. This is not a photograph of Selfridges or a preview of its announced experience.',
 'Capture officielle de Vice City utilisée pour présenter l’univers GTA VI. Ce n’est ni une photo de Selfridges ni un aperçu de l’expérience annoncée.'
]as Three};
const duo={key:'feature-launch-gallery-duo',credit:gallery,alt:[
 'Jason y Lucía en una pista de baile con luces azules y violetas en GTA VI',
 'Jason and Lucia on a dance floor under blue and violet lights in GTA VI',
 'Jason et Lucia sur une piste de danse éclairée en bleu et violet dans GTA VI'
]as Three,caption:[
 'Imagen promocional auténtica de GTA VI. No confirma actividades, artistas invitados o contenido exclusivo en un evento de Selfridges.',
 'Authentic GTA VI promotional image. It does not confirm activities, guest performers or exclusive content at a Selfridges event.',
 'Image promotionnelle authentique de GTA VI. Elle ne confirme ni activités, ni artistes invités, ni contenu exclusif lors d’un événement Selfridges.'
]as Three};
const hero={key:'hero',credit:media,alt:[
 'Jason y Lucía junto a un coche y palmeras en el arte oficial de GTA VI',
 'Jason and Lucia beside a car and palm trees in official GTA VI artwork',
 'Jason et Lucia près d’une voiture et de palmiers dans une illustration officielle GTA VI'
]as Three,caption:[
 'Arte oficial del juego, con crédito a Rockstar. El calendario de lanzamiento del juego es independiente del inicio de la experiencia comercial.',
 'Official game artwork credited to Rockstar. The game’s release schedule is separate from the start of the retailer’s experience.',
 'Illustration officielle du jeu, créditée à Rockstar. Le calendrier de sortie du jeu reste distinct du début de l’expérience commerciale.'
]as Three};
export const selfridges20261105:Article={
 id:'gta6-selfridges-experience-20261105',category:'news',
 slug:['gta-6-selfridges-experiencia-9-noviembre-detalles','gta-6-selfridges-experience-november-9-details','gta-6-selfridges-experience-9-novembre-details'],
 title:['GTA 6 en Selfridges desde el 9 de noviembre: qué se anunció','GTA 6 at Selfridges from November 9: what was announced','GTA 6 chez Selfridges dès le 9 novembre : ce qui est annoncé'],
 excerpt:[
 'Selfridges anuncia una experiencia de GTA 6 desde el 9 de noviembre. Qué confirma su publicación, qué falta saber y por qué no equivale a una demo.',
 'Selfridges announces a GTA 6 experience from November 9. What its original post confirms, what remains unknown and why this is not a demo announcement.',
 'Selfridges annonce une expérience GTA 6 dès le 9 novembre. Ce que confirme sa publication, les détails manquants et la question d’une démo jouable.'
 ],
 tag:['ANUNCIO DE SELFRIDGES · DETALLES PENDIENTES','SELFRIDGES ANNOUNCEMENT · DETAILS PENDING','ANNONCE SELFRIDGES · DÉTAILS À PRÉCISER'],
 image:bridge.key,imageAlt:bridge.alt,imageCaption:bridge.caption,imageCredit:gallery,
 body:intro,published:'2026-11-05',updated:'2026-11-05',sources:[original,events,coverage,official,gallery,media],
 sections:[
  {heading:['La fuente original: el anuncio de Selfridges','The original source: Selfridges’ announcement','La source originale : l’annonce de Selfridges'],paragraphs:[intro,[
   'La leyenda pública de la cuenta theofficialselfridges, fechada el 5 de noviembre, invita a conocer el universo de Grand Theft Auto VI desde el día 9. También dirige a sus enlaces de planificación de visita y al programa Selfridges Unlocked. Comprobamos ese texto en los metadatos públicos del post; no afirmamos haber visto íntegramente el vídeo del reel.',
   'The public caption from theofficialselfridges, dated November 5, points to a Grand Theft Auto VI experience from the 9th. It also directs readers to visit-planning links and the Selfridges Unlocked programme. We checked that text in the post’s public metadata, rather than claiming to have watched the entire reel.',
   'La légende publique de theofficialselfridges, datée du 5 novembre, évoque l’univers de Grand Theft Auto VI à partir du 9. Elle renvoie aussi aux liens pour préparer une visite et au programme Selfridges Unlocked. Nous avons vérifié ce texte dans les métadonnées publiques du post, sans prétendre avoir visionné l’intégralité du reel.'
  ]],references:[original]},
  {heading:['¿En qué tienda y a qué hora será?','Which branch, and what time?','Dans quel magasin et à quelle heure ?'],paragraphs:[[
   'El texto original consultado no enumera sucursales, plantas ni horarios. Aunque la cobertura de GTA BOOM sitúa la experiencia en Oxford Street, no convertimos esa ubicación en un dato confirmado por la leyenda. Tampoco extrapolamos a todos los establecimientos una acción comercial concreta. Una noticia sobre un escaparate anterior no basta para demostrar dónde se celebrará lo nuevo.',
   'The original caption we checked does not list branches, floors or opening times. Although GTA BOOM’s coverage places the experience on Oxford Street, we do not treat that location as confirmed by the caption. Nor do we extend one promotion to every store. Coverage of an earlier window display cannot establish the venue for a new activity.',
   'La légende originale consultée ne précise ni magasins, ni étages, ni horaires. Si GTA BOOM situe l’expérience à Oxford Street, cette adresse n’est pas confirmée par la légende. Nous n’étendons pas non plus une opération à tous les magasins. Un article sur une ancienne vitrine ne suffit pas à établir le lieu d’une nouvelle activité.'
  ],[
   'Para preparar una visita, la referencia útil es una ficha de evento del propio comercio que indique dirección, horario y condiciones. El catálogo oficial de eventos permite consultar las ciudades por separado. La mención a Unlocked en el post no demuestra por sí sola que la entrada requiera membresía, una reserva o una compra.',
   'For planning a visit, look for the retailer’s own event listing with an address, time and conditions. Its official events directory separates the different cities. Mentioning Unlocked in the post does not by itself establish a membership, booking or purchase requirement for entry.',
   'Pour préparer une visite, cherchez une fiche de l’enseigne indiquant adresse, horaire et conditions. Son répertoire officiel distingue les différentes villes. La mention d’Unlocked dans le post ne prouve pas, à elle seule, qu’une adhésion, une réservation ou un achat sera nécessaire pour entrer.'
  ]],image:duo,references:[original,coverage,events]},
  {heading:['Qué está anunciado y qué sigue pendiente','What is announced and what remains unspecified','Ce qui est annoncé et ce qui reste à préciser'],paragraphs:[[
   'Conviene separar una experiencia comercial de una demostración del videojuego. Al revisar el anuncio el 5 de noviembre, este era el alcance de la información comprobada:',
   'A retail experience and a playable game demonstration are different announcements. When we checked the post on November 5, the verified information had the following limits:',
   'Une expérience commerciale et une démonstration jouable constituent deux annonces différentes. Lors de notre vérification du 5 novembre, les informations établies avaient les limites suivantes :'
  ]],table:{headers:[['Pregunta','Question','Question'],['Qué permite afirmar la fuente','What the source establishes','Ce que permet d’affirmer la source']],rows:[
   [['¿Cuándo empieza?','When does it begin?','Quand commence-t-elle ?'],['Desde el 9 de noviembre de 2026, según Selfridges.','From November 9, 2026, according to Selfridges.','À partir du 9 novembre 2026, selon Selfridges.']],
   [['¿Hay una demo de GTA VI?','Is there a GTA VI demo?','Y a-t-il une démo GTA VI ?'],['El post no anuncia una demo jugable.','The post does not announce a playable demo.','Le post n’annonce pas de démo jouable.']],
   [['¿Qué productos se venderán?','Which products will be sold?','Quels produits seront vendus ?'],['Sin lista, precios o existencias en la leyenda consultada.','No list, prices or stock information in the caption checked.','Aucune liste, aucun prix ou stock dans la légende consultée.']],
   [['¿Cuánto cuesta entrar?','Does entry cost anything?','L’entrée est-elle payante ?'],['No se establece una tarifa ni gratuidad.','Neither a fee nor free admission is established.','Aucun tarif ni accès gratuit n’est établi.']],
   [['¿Lo organiza Rockstar?','Is Rockstar organising it?','Rockstar l’organise-t-il ?'],['La publicación de la tienda no define el papel de Rockstar.','The retailer’s post does not define Rockstar’s role.','La publication du magasin ne définit pas le rôle de Rockstar.']]
  ]},references:[original]},
  {heading:['El 9 de noviembre no es la fecha para jugar GTA 6','November 9 is not GTA 6’s playable release date','Le 9 novembre n’est pas la date de sortie jouable de GTA 6'],paragraphs:[[
   'La fecha de la experiencia no modifica el calendario del juego. La web de Rockstar mantiene el estreno del 19 de noviembre de 2026 en PS5 y Xbox Series X|S y el inicio de la precarga digital el día 10. No hay en este post un acceso anticipado autorizado ni una nueva plataforma anunciada. Nuestra guía de precarga explica esas etapas por separado.',
   'The experience’s date does not change the game’s schedule. Rockstar’s website still lists November 19, 2026 for PS5 and Xbox Series X|S, with digital preloading beginning on the 10th. This post does not announce authorised early play or another platform. Our preload guide explains those separate stages.',
   'La date de l’expérience ne change pas le calendrier du jeu. Rockstar maintient la sortie au 19 novembre 2026 sur PS5 et Xbox Series X|S, avec le début du préchargement numérique le 10. Ce post n’annonce ni accès jouable anticipé ni nouvelle plateforme. Notre guide du préchargement distingue ces étapes.'
  ]],image:hero,references:[official,preload,original]},
  {heading:['Cómo seguir los detalles sin confundir campañas','How to follow details without mixing separate campaigns','Comment suivre les détails sans confondre les campagnes'],paragraphs:[[
   'El anuncio de Selfridges tiene interés por llevar el universo de GTA a un espacio comercial real. Es una acción diferente de la campaña de Miami que ya documentamos en FansGTA: sus presupuestos, permisos o ubicaciones no se pueden trasladar automáticamente a esta experiencia. Antes de desplazarte o comprar, comprobá los detalles que publique el establecimiento. Las imágenes de este artículo pertenecen al juego y no muestran una instalación de Selfridges.',
   'Selfridges’ announcement is interesting as another example of GTA reaching a real retail setting. It is separate from the Miami campaign already documented on FansGTA; that campaign’s budgets, permits and locations cannot be applied to this experience. Check the retailer’s published details before travelling or buying. The images in this article belong to the game and do not show a Selfridges installation.',
   'L’annonce de Selfridges illustre l’arrivée de l’univers GTA dans un espace commercial réel. Elle reste distincte de la campagne de Miami déjà documentée sur FansGTA : ses budgets, autorisations et lieux ne s’appliquent pas automatiquement à cette expérience. Vérifiez les détails publiés par l’établissement avant de vous déplacer ou d’acheter. Les images de cet article proviennent du jeu et ne montrent pas une installation Selfridges.'
  ]],references:[original,events,miami]}
 ]
};
