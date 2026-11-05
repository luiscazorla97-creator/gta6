import type {Article} from '../articles';

type Three=[string,string,string];
const charter={label:'Charter / Spectrum · Gig Speed Lift announcement, 4 November 2026',url:'https://corporate.charter.com/newsroom/spectrum-giving-free-gig-speed-lift-thanksgiving-grand-theft-auto'};
const coverage={label:'Dexerto · Spectrum promotion report, 5 November 2026',url:'https://www.dexerto.com/gta/spectrum-offers-free-gta-6-internet-upgrade-to-download-massive-212gb-game-in-under-30-minutes-3425202/'};
const faq={label:'Rockstar Support · GTA VI Pre-Load FAQ, updated 3 November 2026',url:'https://support.rockstargames.com/articles/7nPqOA2uCbpEQHXx7KVrYd/grand-theft-auto-vi-pre-load-faq'};
const official={label:'Rockstar Games · GTA VI',url:'https://www.rockstargames.com/VI'};
const media={label:'GTA VI © Rockstar Games',url:'https://www.rockstargames.com/VI/media'};
const details={label:'Spectrum · Gig Speed Lift information',url:'https://www.spectrum.net/thank-you'};
const duration={label:'FansGTA · GTA VI download time',url:'https://fansgta.com/es/guias/gta-6-cuanto-tarda-descargar-212-gb/'};
const preload={label:'FansGTA · GTA VI preload schedule',url:'https://fansgta.com/es/guias/precarga-gta-6-fecha-hora-consolas/'};
const lead:Three=[
 'Spectrum anunció una mejora temporal y gratuita de velocidad para clientes elegibles de Estados Unidos alrededor del lanzamiento de GTA 6. Gig Speed Lift funciona del 9 al 30 de noviembre de 2026 y requiere activación en My Spectrum. La promoción puede reducir la espera de descarga; no incluye el juego ni permite jugar antes del estreno.',
 'Spectrum has announced a temporary free speed boost for eligible US customers around GTA 6’s launch. Gig Speed Lift runs November 9–30, 2026 and requires activation through My Spectrum. The promotion may shorten download waits; it does not include the game or grant playable access before release.',
 'Spectrum annonce une hausse temporaire et gratuite du débit pour ses clients admissibles aux États-Unis autour du lancement de GTA 6. Gig Speed Lift fonctionne du 9 au 30 novembre 2026, après activation dans My Spectrum. L’offre peut réduire l’attente du téléchargement ; elle ne comprend ni le jeu ni un accès jouable anticipé.'
];
const image=(key:string,alt:Three,caption:Three)=>({key,alt,caption,credit:media});
const cover=image('feature-launch-gallery-bridge',[
 'Puente levadizo abierto y edificios iluminados de Vice City al anochecer en una captura oficial de GTA VI',
 'An open drawbridge and illuminated Vice City buildings at twilight in an official GTA VI screenshot',
 'Pont levant ouvert et immeubles illuminés de Vice City au crépuscule dans une capture officielle GTA VI'
],[
 'Vice City en GTA VI, como contexto de la promoción de conexión. La imagen del juego no es una medición de velocidad ni una pantalla de Spectrum.',
 'Vice City in GTA VI, used as context for the broadband promotion. This game image is not a speed measurement or a Spectrum screen.',
 'Vice City dans GTA VI, pour illustrer le contexte de l’offre internet. Cette image du jeu n’est ni une mesure de débit ni un écran Spectrum.'
]);

export const spectrum20261105:Article={
 id:'gta6-spectrum-speed-lift-20261105',category:'news',
 slug:['gta-6-spectrum-mejora-velocidad-gratis-requisitos','gta-6-spectrum-free-speed-boost-eligibility','gta-6-spectrum-debit-gratuit-conditions'],
 title:['GTA 6: Spectrum ofrece más velocidad gratis a clientes elegibles','GTA 6: Spectrum offers a free speed boost to eligible customers','GTA 6 : Spectrum augmente gratuitement le débit de clients admissibles'],
 excerpt:[
  'Spectrum anuncia Gig Speed Lift para GTA 6 del 9 al 30 de noviembre. Quién puede activarlo en Estados Unidos y por qué no garantiza descargas en 30 minutos.',
  'Spectrum’s GTA 6 Gig Speed Lift runs November 9–30. Who can activate the US offer and why the under-30-minute download claim is not a speed guarantee.',
  'L’offre Spectrum pour GTA 6 dure du 9 au 30 novembre. Conditions aux États-Unis et limites de la promesse d’un téléchargement en moins de 30 minutes.'
 ],
 tag:['ESTADOS UNIDOS · PROMOCIÓN DE CONEXIÓN','UNITED STATES · BROADBAND PROMOTION','ÉTATS-UNIS · OFFRE INTERNET'],
 image:cover.key,imageAlt:cover.alt,imageCaption:cover.caption,imageCredit:media,
 body:lead,published:'2026-11-05',updated:'2026-11-05',
 sections:[
  {heading:['Qué anunció Spectrum y cuándo','What Spectrum announced and when','Ce que Spectrum a annoncé et à quelle date'],paragraphs:[lead,[
   'Charter publicó el anuncio original el 4 de noviembre; Dexerto lo retomó el día 5. El interés está en una oferta concreta para abonados, distinta de los horarios de precarga. Según el operador, los clientes que cumplan las condiciones pasan temporalmente a 1 Gig. Quienes ya tienen 1 Gig pueden recibir 2 Gig en determinadas zonas. La disponibilidad depende de cada cuenta, plan y equipo.',
   'Charter published the original announcement on November 4, with Dexerto covering it on November 5. This is a specific subscriber offer, separate from the game’s preload schedule. The provider says qualifying customers move temporarily to 1 Gig. Existing 1 Gig customers may receive 2 Gig in selected areas. Availability depends on the individual account, plan and equipment.',
   'Charter a publié l’annonce initiale le 4 novembre, reprise par Dexerto le 5. Il s’agit d’une offre précise pour les abonnés, distincte du calendrier de préchargement. Selon l’opérateur, les clients remplissant les conditions passent temporairement à 1 Gig. Les abonnés déjà à 1 Gig peuvent recevoir 2 Gig dans certaines zones. La disponibilité dépend du compte, du forfait et du matériel.'
  ]],references:[charter,coverage]},
  {heading:['Quién puede recibir la mejora gratuita','Who qualifies for the free boost','Qui peut bénéficier de la hausse gratuite'],paragraphs:[[
   'La promoción se dirige a clientes residenciales elegibles de Spectrum en Estados Unidos, con un plan admitido y equipo compatible. Sus condiciones mencionan que no debe haber obligaciones pendientes con Spectrum, además de restricciones y posibles cambios. No es una oferta mundial para cualquiera que reserve GTA 6. Antes de contar con el aumento, comprobá que figure en tu propia cuenta: FansGTA no verificó la elegibilidad de ningún abonado.',
   'The promotion targets eligible residential Spectrum customers in the United States with a qualifying plan and compatible equipment. Its conditions also require no outstanding obligation to Spectrum, and restrictions and changes may apply. It is not a worldwide benefit for everyone preordering GTA 6. Check that the offer appears on your own account before relying on it; FansGTA has not verified any subscriber’s eligibility.',
   'L’offre vise les clients résidentiels Spectrum admissibles aux États-Unis, avec un forfait éligible et un équipement compatible. Les conditions exigent également l’absence d’obligations en suspens envers Spectrum et prévoient des restrictions et modifications possibles. Ce n’est pas un avantage mondial pour chaque réservation de GTA 6. Vérifiez sa présence sur votre compte avant de compter dessus ; FansGTA n’a contrôlé l’éligibilité d’aucun abonné.'
  ]],references:[charter,details]},
  {heading:['Cómo activarlo y qué ocurre el 30 de noviembre','How activation works and what happens November 30','Activation et fin de l’offre le 30 novembre'],paragraphs:[[
   'El comunicado indica que se puede solicitar la mejora desde My Spectrum antes de que termine el 30 de noviembre. Abrí la aplicación oficial que ya usás para gestionar el servicio, buscá la oferta de Gig Speed Lift y revisá las condiciones que muestre tu cuenta. La subida comienza el día 9, aunque se solicite antes. Guardar o descargar GTA 6 no la activa por sí solo.',
   'The announcement says customers can opt in through My Spectrum before the offer ends November 30. Open the official app already used to manage the service, look for Gig Speed Lift and review the conditions shown for your account. The boost begins November 9 even if requested earlier. Saving or downloading GTA 6 does not activate the broadband offer by itself.',
   'Le communiqué indique une activation dans My Spectrum avant la fin de l’offre le 30 novembre. Ouvrez l’application officielle utilisée pour gérer votre service, cherchez Gig Speed Lift et consultez les conditions affichées pour votre compte. La hausse commence le 9, même si elle est demandée auparavant. Enregistrer ou télécharger GTA 6 n’active pas automatiquement cette offre internet.'
  ],[
   'Spectrum afirma que la velocidad volverá al nivel original al terminar la promoción, sin cambios en la factura ni una gestión adicional para finalizarla. Ese compromiso describe esta mejora temporal: no modifica los términos del plan habitual del usuario ni demuestra que una contratación nueva sea gratuita.',
   'Spectrum says the connection returns to its original speed tier when the promotion ends, without a bill change or another action to end the boost. That describes this temporary upgrade; it does not replace a customer’s regular service terms or make a new subscription free.',
   'Spectrum précise que le débit revient ensuite au niveau initial, sans changement de facture ni démarche supplémentaire pour terminer la hausse. Cela concerne cette amélioration temporaire : les conditions du forfait habituel restent pertinentes et un nouvel abonnement ne devient pas gratuit.'
  ]],references:[charter,details],image:image('feature-launch-gallery-duo',[
   'Jason y Lucía en una pista de baile con luces azules y violetas en GTA VI',
   'Jason and Lucia on a dance floor under blue and violet lights in GTA VI',
   'Jason et Lucia sur une piste de danse éclairée en bleu et violet dans GTA VI'
  ],[
   'Captura oficial de GTA VI usada como contexto. La activación del servicio se gestiona en la aplicación real de Spectrum, fuera del juego.',
   'Official GTA VI screenshot for context. Service activation takes place in Spectrum’s real app, outside the game.',
   'Capture officielle GTA VI pour le contexte. Le service s’active dans la véritable application Spectrum, en dehors du jeu.'
  ])},
  {heading:['¿GTA 6 se descargará realmente en menos de 30 minutos?','Will GTA 6 really download in under 30 minutes?','GTA 6 se téléchargera-t-il vraiment en moins de 30 minutes ?'],paragraphs:[[
   'Menos de 30 minutos es la afirmación comercial de Spectrum, no un resultado medido por FansGTA. Con el máximo anunciado por Rockstar de 212 GB y una transferencia constante de 1 Gbps, la división ideal da unos 28 minutos y 16 segundos. Es un cálculo propio en unidades decimales, sin tráfico adicional ni tiempo de instalación. 1 Gbps equivale teóricamente a 125 MB/s; confundir bits y bytes cambia el cálculo ocho veces.',
   'Under 30 minutes is Spectrum’s marketing claim, not a download measured by FansGTA. At Rockstar’s stated maximum of 212 GB and a constant 1 Gbps transfer, ideal arithmetic gives about 28 minutes 16 seconds. This is our decimal-unit calculation, excluding overhead and installation. One Gbps theoretically equals 125 MB/s; confusing bits with bytes changes the calculation by a factor of eight.',
   'Moins de 30 minutes est une affirmation commerciale de Spectrum, pas un téléchargement mesuré par FansGTA. Pour le maximum de 212 Go indiqué par Rockstar et un transfert constant à 1 Gbit/s, le calcul idéal donne environ 28 minutes et 16 secondes. Notre calcul utilise des unités décimales et exclut les surcharges et l’installation. Un Gbit/s équivaut théoriquement à 125 Mo/s : confondre bits et octets multiplie l’erreur par huit.'
  ],[
   'El Wi-Fi, el servidor de descarga, otros dispositivos y el rendimiento de la consola pueden alargar la espera. Una prueba de velocidad doméstica tampoco garantiza que PlayStation Network o Xbox entreguen todos los archivos a ese ritmo. Nuestra guía de duración permite comparar velocidades sin presentar una estimación como un tiempo asegurado.',
   'Wi-Fi, the download server, other devices and console performance can extend the wait. A home speed test also cannot guarantee that PlayStation Network or Xbox will deliver every file at that rate. Our download-time guide compares connection speeds without treating an estimate as a promised completion time.',
   'Le Wi-Fi, le serveur, les autres appareils et les performances de la console peuvent rallonger l’attente. Un test de débit domestique ne garantit pas davantage que PlayStation Network ou Xbox livrera tous les fichiers à cette vitesse. Notre guide compare les débits sans présenter une estimation comme un délai garanti.'
  ]],references:[charter,faq,duration]},
  {heading:['Precarga el 10, estreno el 19: descargar antes no permite jugar antes','Preload November 10, release November 19: faster files are not early access','Préchargement le 10, sortie le 19 : le débit n’avance pas l’accès'],paragraphs:[[
   'La FAQ oficial de Rockstar mantiene la precarga digital para el 10 de noviembre: medianoche local en PS5 y 00:00 GMT global en Xbox Series X|S. El estreno sigue fijado para el 19. La promoción de internet comienza un día antes de la precarga, pero no modifica esas fechas, no aporta una licencia de GTA 6 y no elimina los requisitos de almacenamiento de la consola.',
   'Rockstar’s official FAQ keeps digital preloading on November 10: midnight local time on PS5 and 00:00 GMT globally on Xbox Series X|S. Release remains November 19. The internet boost starts one day before preloading but changes none of those dates, provides no GTA 6 licence and removes none of the console’s storage requirements.',
   'La FAQ officielle de Rockstar maintient le préchargement numérique au 10 novembre : minuit heure locale sur PS5 et 00 h 00 GMT mondialement sur Xbox Series X|S. La sortie reste fixée au 19. La hausse de débit commence un jour avant le préchargement, mais ne modifie pas ces dates, ne fournit aucune licence GTA 6 et ne supprime pas les besoins de stockage.'
  ],[
   'Quien ya reúna las condiciones puede valorar la oferta desde su cuenta y dejar preparados los archivos cuando corresponda. Si solo buscás saber cuándo descargar o jugar en tu zona, la guía de precarga reúne esos horarios por separado. Así la mejora de conexión y el acceso al juego se comprueban con sus respectivas fuentes.',
   'Existing customers who qualify can evaluate the offer through their account and prepare the game files when available. If the question is when downloads or play open in a particular region, our preload guide covers that schedule separately. The connection offer and game access can then each be checked against the source responsible for them.',
   'Les clients remplissant déjà les conditions peuvent examiner l’offre dans leur compte et préparer les fichiers au moment prévu. Pour savoir quand télécharger ou jouer dans une région précise, notre guide de préchargement présente les horaires séparément. L’offre internet et l’accès au jeu se vérifient ainsi auprès de leurs sources respectives.'
  ]],references:[faq,official,preload],image:image('leonida-keys',[
   'Un avión sobre islas y un puente de Leonida Keys en una captura oficial de GTA VI',
   'An aircraft above islands and a Leonida Keys bridge in an official GTA VI screenshot',
   'Un avion au-dessus des îles et d’un pont de Leonida Keys dans une capture officielle GTA VI'
  ],[
   'Leonida Keys, imagen oficial del juego. Descargar los archivos anticipadamente no habilita el acceso jugable antes de la fecha de estreno.',
   'Leonida Keys in an official game image. Downloading the files in advance does not enable play before release.',
   'Leonida Keys dans une image officielle du jeu. Télécharger les fichiers à l’avance ne permet pas de jouer avant la sortie.'
  ])}
 ],sources:[charter,coverage,faq,official,media]
};
