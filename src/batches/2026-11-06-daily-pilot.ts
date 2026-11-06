import type {Article} from '../articles';

const track={label:'Flightradar24 — historical flight, November 5, 2026',url:'https://www.flightradar24.com/data/aircraft/n1810r#42723777'};
const post={label:'Flightradar24 — GTA VI flight-path drawing, November 6',url:'https://x.com/flightradar24/status/2118519341645709701'};
const profile={label:'Flightradar24 — Benjamin McDaniel / Pilot Picasso, October 15',url:'https://www.flightradar24.com/blog/flight-tracking-news/just-for-fun/the-intricate-sky-art-of-benjamin-mcdaniel-and-n1810r/'};
const outerspace={label:'Outer Space — GTA VI GPS drawing, November 6',url:'https://www.outerspace.com.br/piloto-voa-por-oito-horas-e-desenha-arte-de-gta-vi-pelo-gps-de-aviao/'};
const beebom={label:'Beebom — GTA VI flight tribute, November 6',url:'https://beebom.com/gta-6-pilot-fan-creates-sky-tribute-ahead-of-launch/'};
const official={label:'Rockstar Games — Grand Theft Auto VI',url:'https://www.rockstargames.com/VI'};
const media={label:'Rockstar Games — GTA VI Media',url:'https://www.rockstargames.com/VI/media'};
const flightGuide={label:'FansGTA — GTA VI: parachutes and helicopters',url:'https://fansgta.com/es/guias/gta-6-paracaidas-helicopteros-vuelo/'};
const gallery={label:'FansGTA — GTA VI launch gallery',url:'https://fansgta.com/es/noticias/gta-6-39-imagenes-galeria-lanzamiento-rockstar/'};
const release={label:'FansGTA — GTA VI release schedule',url:'https://fansgta.com/es/noticias/gta-6-19-november-2026/'};
const intro:[string,string,string]=[
 'Un piloto ha convertido su recorrido real en un dibujo de GTA 6: Benjamin McDaniel, conocido como Pilot Picasso, trazó el nombre del juego y varias figuras con una avioneta sobre Arkansas. El registro de Flightradar24 fecha el vuelo el 5 de noviembre y le atribuye 8 horas y 8 minutos. La imagen difundida el día 6 se ve en el mapa de seguimiento; no es un mural de humo ni un anuncio de Rockstar.',
 'A pilot has turned a real flight path into GTA 6 artwork. Benjamin McDaniel, known as Pilot Picasso, traced the game’s name and several figures with a light aircraft over Arkansas. Flightradar24 dates the flight to November 5 and records a duration of eight hours and eight minutes. The picture shared on November 6 appears on a tracking map; it is neither smoke writing nor a Rockstar announcement.',
 'Un pilote a transformé son véritable trajet en dessin de GTA 6. Benjamin McDaniel, alias Pilot Picasso, a tracé le nom du jeu et plusieurs silhouettes avec un avion léger au-dessus de l’Arkansas. Flightradar24 date le vol du 5 novembre et indique une durée de huit heures et huit minutes. L’image diffusée le 6 apparaît sur une carte de suivi : ce n’est ni un dessin de fumée ni une annonce de Rockstar.'
];

export const dailyPilot20261106:Article={
 id:'gta6-pilot-flight-art-20261106',category:'news',
 slug:['gta-6-piloto-dibujo-trayectoria-vuelo-ocho-horas','gta-6-pilot-flight-path-art-eight-hours','gta-6-pilote-dessin-trajectoire-vol-huit-heures'],
 title:['GTA 6: un piloto dibuja el logo con un vuelo de ocho horas','GTA 6: a pilot draws the logo with an eight-hour flight','GTA 6 : un pilote dessine le logo avec huit heures de vol'],
 excerpt:[
  'Pilot Picasso dibuja GTA 6 con una trayectoria de vuelo de 8 horas y 8 minutos. Qué muestra el mapa, cuándo ocurrió y dónde ver las publicaciones originales.',
  'Pilot Picasso draws GTA 6 with an eight-hour, eight-minute flight path. What the tracking map shows, when it happened and where to see the original posts.',
  'Pilot Picasso dessine GTA 6 avec un trajet de huit heures et huit minutes. Ce que montre la carte, la date du vol et les publications originales à consulter.'
 ],
 tag:['COMUNIDAD · ARTE AÉREO','COMMUNITY · FLIGHT-PATH ART','COMMUNAUTÉ · DESSIN AÉRIEN'],
 image:'hero',
 imageAlt:['Jason y Lucía junto a un coche bajo palmeras en el arte oficial de GTA VI','Jason and Lucia beside a car beneath palm trees in official GTA VI artwork','Jason et Lucia près d’une voiture sous des palmiers dans l’illustration officielle GTA VI'],
 imageCaption:[
  'Arte oficial de GTA VI para ilustrar el juego que inspira el homenaje. El dibujo del vuelo puede verse en la publicación original enlazada en el artículo.',
  'Official GTA VI artwork illustrates the game behind the tribute. The flight-path drawing can be viewed in the original post linked in this article.',
  'Illustration officielle de GTA VI, le jeu auquel le dessin rend hommage. Le tracé du vol est visible dans la publication originale liée dans cet article.'
 ],
 imageCredit:media,body:intro,published:'2026-11-06',updated:'2026-11-06',
 sections:[
  {heading:['Qué ocurrió y cuánto duró el vuelo de GTA 6','What happened and how long the GTA 6 flight lasted','Ce qui s’est passé et la durée du vol GTA 6'],paragraphs:[intro,[
   'El historial público muestra una salida y una llegada en Bentonville para ese vuelo. Outer Space publicó su cobertura el 6 de noviembre y enlazó tanto el registro como el mensaje de Flightradar24. Son dos fechas distintas: el 5 corresponde a la jornada del recorrido y el 6 a las publicaciones que lo están difundiendo.',
   'The public history lists both departure and arrival at Bentonville for this flight. Outer Space published its report on November 6, linking the record and Flightradar24’s post. These dates describe different things: November 5 is the flight date, while November 6 is the date of the posts spreading the drawing.',
   'L’historique public indique un départ et une arrivée à Bentonville pour ce vol. Outer Space a publié son article le 6 novembre avec les liens vers le relevé et le message de Flightradar24. Il faut distinguer les dates : le 5 est la journée du trajet, le 6 celle des publications qui font circuler le dessin.'
  ]],references:[track,post,outerspace]},
  {heading:['Qué aparece en el dibujo y por qué se ve en un mapa','What the drawing shows and why it appears on a map','Ce que représente le dessin et pourquoi il apparaît sur une carte'],paragraphs:[[
   'La imagen compartida por Flightradar24 permite reconocer las letras de Grand Theft Auto VI, una palmera, un helicóptero, una mujer con una pistola, un coche y un caimán. El recorrido une los contornos en una misma composición: las curvas de la ruta forman tanto las letras como los pequeños detalles de las figuras.',
   'The image shared by Flightradar24 shows the Grand Theft Auto VI lettering, a palm tree, a helicopter, a woman holding a pistol, a car and an alligator. The route connects their outlines into one composition, with turns forming both the lettering and the smaller details of the figures.',
   'L’image partagée par Flightradar24 montre les lettres de Grand Theft Auto VI, un palmier, un hélicoptère, une femme tenant un pistolet, une voiture et un alligator. Le trajet relie ces contours dans une même composition : ses virages dessinent les lettres comme les petits détails des silhouettes.'
  ],[
   'El resultado se obtiene al representar la trayectoria registrada sobre el mapa. Una persona mirando el cielo no vería simultáneamente todas esas líneas como en la captura del rastreador. La noticia trata de arte realizado con un recorrido aéreo real, no de una escena grabada dentro de GTA VI ni de una nueva función del juego.',
   'The result becomes visible when the recorded route is plotted on the map. Someone looking up would not see all those lines at once as they appear in the tracker screenshot. This is artwork made with a real aircraft’s route, rather than footage captured inside GTA VI or evidence of a new game feature.',
   'Le résultat apparaît lorsque la trajectoire enregistrée est représentée sur la carte. Une personne regardant le ciel ne verrait pas toutes ces lignes simultanément comme sur la capture du suivi. Il s’agit d’un dessin réalisé avec le trajet d’un véritable avion, pas d’une séquence de GTA VI ni de la preuve d’une nouvelle fonctionnalité.'
  ]],references:[post,beebom]},
  {heading:['Quién es Pilot Picasso y qué avión utiliza','Who Pilot Picasso is and which aircraft he uses','Qui est Pilot Picasso et quel avion utilise-t-il ?'],paragraphs:[[
   'Flightradar24 ya presentó a Benjamin McDaniel en un perfil actualizado el 15 de octubre de 2026. Allí lo identifica como Pilot Picasso y describe su Cessna R182 Skylane RG de 1978. El artículo recoge trabajos anteriores, como una interpretación de la Mona Lisa mediante una trayectoria de vuelo. Ese perfil explica la técnica y la identidad del artista; no es el anuncio del nuevo dibujo de GTA 6.',
   'Flightradar24 introduced Benjamin McDaniel in a profile updated on October 15, 2026. It identifies him as Pilot Picasso and describes his 1978 Cessna R182 Skylane RG. The profile includes earlier works, such as a flight-path interpretation of the Mona Lisa. It establishes the artist’s identity and approach; it is not the announcement of the new GTA 6 drawing.',
   'Flightradar24 a présenté Benjamin McDaniel dans un portrait mis à jour le 15 octobre 2026. Le site l’identifie comme Pilot Picasso et décrit son Cessna R182 Skylane RG de 1978. Il présente notamment une interprétation de la Joconde réalisée avec une trajectoire aérienne. Ce portrait explique son identité et sa démarche ; il n’annonce pas le nouveau dessin GTA 6.'
  ]],references:[profile]},
  {heading:['Dónde ver la trayectoria original de GTA 6','Where to see the original GTA 6 flight-path artwork','Où voir le tracé original du dessin GTA 6'],paragraphs:[[
   'La publicación de Flightradar24 en X es la referencia directa para observar la composición completa. El historial enlazado permite contrastar la fecha y la duración del recorrido. La disponibilidad de una reproducción histórica puede depender del servicio; no es necesario contratar una suscripción para leer este resumen ni presentamos el seguimiento en directo como prueba de aquel vuelo.',
   'Flightradar24’s X post is the direct reference for viewing the complete composition. The linked history provides the date and duration of the flight. Historical playback availability may depend on the service; no subscription is needed to read this summary, and a live tracking position is not evidence of that past flight.',
   'La publication de Flightradar24 sur X permet de voir directement la composition complète. L’historique lié donne la date et la durée du trajet. La disponibilité d’une relecture historique dépend du service ; aucun abonnement n’est nécessaire pour lire ce résumé, et une position de suivi en direct ne prouve pas ce vol passé.'
  ],[
   'Para comparar este homenaje con el material del propio juego, nuestra guía de paracaídas y helicópteros reúne las escenas aéreas publicadas. La captura de Leonida Keys que acompaña esta sección procede de Rockstar: muestra un hidroavión del mundo de GTA VI, no la avioneta de McDaniel sobre Arkansas.',
   'To compare the tribute with imagery from the game itself, our parachutes and helicopters guide examines published aerial scenes. The Leonida Keys screenshot accompanying this section comes from Rockstar: it shows a seaplane in GTA VI’s world, not McDaniel’s aircraft over Arkansas.',
   'Pour comparer cet hommage aux images du jeu, notre guide des parachutes et hélicoptères examine les scènes aériennes publiées. La capture de Leonida Keys accompagnant cette section provient de Rockstar : elle montre un hydravion dans GTA VI, pas l’avion de McDaniel au-dessus de l’Arkansas.'
  ]],image:{key:'leonida-keys',alt:['Un hidroavión sobrevuela las islas, el agua azul y un puente de Leonida Keys en GTA VI','A seaplane flies above islands, blue water and a bridge in GTA VI’s Leonida Keys','Un hydravion survole les îles, l’eau bleue et un pont de Leonida Keys dans GTA VI'],caption:[
   'Captura oficial de Leonida Keys en GTA VI, utilizada como contexto del vuelo en el juego. No representa el recorrido real de Pilot Picasso.',
   'Official GTA VI screenshot of Leonida Keys, providing context for flight in the game. It does not depict Pilot Picasso’s real route.',
   'Capture officielle de Leonida Keys dans GTA VI, pour le contexte du vol dans le jeu. Elle ne représente pas le véritable trajet de Pilot Picasso.'
  ],credit:media},references:[post,track,flightGuide]},
  {heading:['¿Es una campaña oficial de Rockstar para el lanzamiento?','Is this an official Rockstar launch campaign?','S’agit-il d’une campagne officielle de Rockstar pour la sortie ?'],paragraphs:[[
   'Las fuentes enlazadas atribuyen el dibujo a Pilot Picasso. No hemos verificado un encargo, patrocinio o acuerdo publicitario de Rockstar, por lo que no lo anunciamos como una campaña oficial. La actualidad está en esta creación y su difusión, no en un cambio del calendario o en nuevas mecánicas confirmadas.',
   'The linked sources credit the drawing to Pilot Picasso. We have not verified a Rockstar commission, sponsorship or advertising agreement, so we do not describe it as an official campaign. The news is the artwork and its circulation, rather than a schedule change or newly confirmed mechanics.',
   'Les sources liées attribuent le dessin à Pilot Picasso. Nous n’avons vérifié aucune commande, aucun parrainage ni accord publicitaire de Rockstar : nous ne le présentons donc pas comme une campagne officielle. L’actualité concerne cette création et sa diffusion, pas un changement de calendrier ou de nouvelles mécaniques confirmées.'
  ],[
   'Consultada el 6 de noviembre, la web oficial mantiene GTA VI para el 19 de noviembre de 2026 en PS5 y Xbox Series X|S, con la precarga digital desde el 10. Para seguir esas novedades por separado, enlazamos el calendario de lanzamiento y la galería oficial de imágenes, sin convertir una obra de un piloto en un anuncio del estudio.',
   'Checked on November 6, the official website still lists GTA VI for November 19, 2026 on PS5 and Xbox Series X|S, with digital preloading from November 10. Our release schedule and official screenshot gallery cover those updates separately, without treating a pilot’s artwork as a studio announcement.',
   'Consulté le 6 novembre, le site officiel maintient GTA VI au 19 novembre 2026 sur PS5 et Xbox Series X|S, avec le préchargement numérique dès le 10. Notre calendrier de sortie et notre présentation de la galerie officielle suivent ces informations séparément, sans transformer le dessin d’un pilote en annonce du studio.'
  ]],references:[post,outerspace,official,release,gallery]}
 ],
 sources:[post,track,profile,outerspace,beebom,official,media]
};
