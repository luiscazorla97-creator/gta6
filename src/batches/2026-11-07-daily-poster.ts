import type {Article} from '../articles';

const product={label:'MediaMarkt Germany — GTA VI PS5, article 3058717',url:'https://www.mediamarkt.de/de/product/_grand-theft-auto-vi-playstation-5-3058717.html'};
const campaign={label:'MediaMarkt Germany — Gaming & VR offers',url:'https://www.mediamarkt.de/de/campaign/angebote-gaming-vr'};
const report={label:'RockstarINTEL — Retailer poster report, November 6, 2026',url:'https://rockstarintel.com/gta-6-physical-edition-poster-revealed-by-retailer/'};
const originalPost={label:'MediaMarktSaturn — Instagram post linked by RockstarINTEL',url:'https://www.instagram.com/p/DfaAoEVjEbM/'};
const official={label:'Rockstar Games — Grand Theft Auto VI',url:'https://www.rockstargames.com/VI'};
const editions={label:'Rockstar Support — GTA VI platforms, editions and versions',url:'https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions'};
const media={label:'Rockstar Games — GTA VI Media',url:'https://www.rockstargames.com/VI/media'};
const gallery={label:'Rockstar Games — GTA VI Launch Gallery',url:'https://www.rockstargames.com/VI/launch-gallery'};
const map={label:'FansGTA — GTA VI map and poster announcement',url:'https://fansgta.com/es/guias/gta-6-mapa-leonida-poster-descarga-oficial/'};
const box={label:'FansGTA — GTA VI physical code-in-box edition',url:'https://fansgta.com/es/guias/gta-6-edicion-fisica-sin-disco-codigo/'};
const regions={label:'FansGTA — GTA VI code and account regions',url:'https://fansgta.com/es/guias/gta-6-codigos-region-cuenta-ps5-xbox/'};
const preload={label:'FansGTA — GTA VI preload schedule',url:'https://fansgta.com/es/guias/precarga-gta-6-fecha-hora-consolas/'};
const intro:[string,string,string]=[
 'MediaMarkt Alemania anuncia un póster junto a la reserva de GTA 6 para PS5. La ficha consultada el 7 de noviembre de 2026 incluye el póster en el nombre del producto y marca 79,99 euros, EUR, con IVA incluido y envío aparte. Es una oferta de esa tienda: no confirma que todas las cajas del juego incluyan el mismo material.',
 'MediaMarkt Germany advertises a poster with its GTA 6 PS5 preorder. Checked on November 7, 2026, the product title includes the poster and the listing shows €79.99, EUR, including VAT but excluding shipping. This is a retailer offer; it does not establish that every game box contains the same material.',
 'MediaMarkt Allemagne annonce un poster avec la précommande PS5 de GTA 6. Consultée le 7 novembre 2026, la fiche mentionne le poster dans son titre et affiche 79,99 euros, EUR, TVA comprise et livraison en supplément. Il s’agit d’une offre du vendeur, pas d’une confirmation du contenu de toutes les boîtes du jeu.'
];

export const dailyPoster20261107:Article={
 id:'gta6-mediamarkt-poster-offer-20261107',category:'news',
 slug:['gta-6-poster-mediamarkt-reserva-alemania','gta-6-mediamarkt-poster-preorder-germany','gta-6-poster-mediamarkt-precommande-allemagne'],
 title:['GTA 6: MediaMarkt ofrece un póster con la reserva en Alemania','GTA 6: MediaMarkt lists a poster with German preorders','GTA 6 : MediaMarkt propose un poster en précommande en Allemagne'],
 excerpt:[
  'MediaMarkt Alemania lista GTA 6 para PS5 con póster por 79,99 euros. Qué ofrece la reserva y por qué no confirma el contenido de todas las cajas.',
  'MediaMarkt Germany lists GTA 6 for PS5 with a poster at €79.99. What the preorder offers and why it does not establish the contents of every game box.',
  'MediaMarkt Allemagne liste GTA 6 sur PS5 avec un poster à 79,99 euros. L’offre vérifiée et ce qu’elle ne confirme pas pour toutes les boîtes du jeu.'
 ],
 tag:['RESERVAS · OFERTA DE TIENDA','PREORDERS · RETAILER OFFER','PRÉCOMMANDES · OFFRE DU VENDEUR'],
 image:'hero',
 imageAlt:['Jason y Lucía junto a un coche y palmeras en la ilustración oficial de GTA VI','Jason and Lucia beside a car and palm trees in official GTA VI artwork','Jason et Lucia près d’une voiture et de palmiers dans l’illustration officielle GTA VI'],
 imageCaption:[
  'Arte oficial de GTA VI que ilustra el juego. Esta imagen no es una fotografía del póster ofrecido por MediaMarkt ni del contenido de una caja.',
  'Official GTA VI artwork illustrating the game. This is not a photograph of MediaMarkt’s offered poster or the contents of a game box.',
  'Illustration officielle de GTA VI pour présenter le jeu. Ce n’est pas une photographie du poster proposé par MediaMarkt ni du contenu d’une boîte.'
 ],
 imageCredit:media,body:intro,published:'2026-11-07',updated:'2026-11-07',
 sections:[
  {heading:['Qué incluye la ficha de MediaMarkt para GTA 6','What MediaMarkt’s GTA 6 listing includes','Ce que mentionne la fiche GTA 6 de MediaMarkt'],paragraphs:[intro,[
   'La referencia comprobada es el artículo 3058717 de la web alemana, para PlayStation 5. El título utiliza la indicación alemana «inkl. Poster», es decir, incluye póster. La página de ofertas de Gaming y VR también muestra ese producto. El precio corresponde al conjunto anunciado del juego con póster, no a la venta individual del papel.',
   'The checked reference is article 3058717 on the German website, for PlayStation 5. Its title uses the German wording “inkl. Poster”, meaning poster included. The Gaming & VR offers page also displays that product. The price refers to the advertised game-and-poster package, not a standalone sale of the paper item.',
   'La référence vérifiée est l’article 3058717 du site allemand, pour PlayStation 5. Son titre utilise la mention allemande « inkl. Poster », soit poster inclus. La page des offres Gaming et VR présente également ce produit. Le prix concerne l’ensemble jeu et poster annoncé, pas une vente du poster seul.'
  ]],references:[product,campaign]},
  {heading:['Qué se ha publicado sobre el diseño del póster','What has been reported about the poster design','Les informations publiées sur le dessin du poster'],paragraphs:[[
   'RockstarINTEL publicó su reporte el 6 de noviembre y describió fotografías difundidas por MediaMarkt: una cara con el arte de portada y otra con una ilustración acompañada del nombre de Vice City. Enlazamos la publicación original señalada por el medio. La descripción visual procede de ese reporte; la comprobación directa que sustenta esta noticia es la oferta visible de la tienda.',
   'RockstarINTEL published its report on November 6 and described photographs shared by MediaMarkt: cover artwork on one side and an illustration accompanied by the Vice City name on the other. We link the original post identified by the outlet. That visual description comes from the report; our direct verification supporting this story is the retailer’s visible offer.',
   'Dans son article du 6 novembre, RockstarINTEL décrit des photos diffusées par MediaMarkt : l’illustration de couverture sur une face, une autre illustration accompagnée du nom Vice City sur l’autre. Nous lions la publication originale indiquée par le média. Cette description visuelle provient de son article ; notre vérification directe porte sur l’offre visible du vendeur.'
  ],[
   'Ni el nombre de la ficha ni esa descripción permiten establecer que el póster esté dentro de todas las cajas, que se entregue de la misma manera en cada comercio o que exista una promoción mundial. Tampoco presentamos como verificada la licencia del diseño mostrado en redes. Para esas conclusiones harían falta condiciones explícitas del fabricante o del vendedor correspondiente.',
   'Neither the product title nor that description establishes that the poster is inside every box, supplied identically by every shop or part of a worldwide promotion. We also do not present the licence of the design shown on social media as verified. Those conclusions require explicit terms from the manufacturer or the relevant retailer.',
   'Ni le titre de la fiche ni cette description ne prouvent la présence du poster dans toutes les boîtes, une remise identique dans chaque magasin ou une promotion mondiale. Nous ne présentons pas non plus comme vérifiée la licence du visuel montré sur les réseaux. Ces conclusions exigent des conditions explicites du fabricant ou du vendeur concerné.'
  ]],references:[report,originalPost,product]},
  {heading:['Póster de tienda, mapa de Leonida y edición física son cosas distintas','Retailer poster, Leonida map and physical edition are different things','Poster du vendeur, carte de Leonida et édition physique : des éléments distincts'],paragraphs:[[
   'La palabra póster no acredita un mapa. La ficha de MediaMarkt comprobada anuncia ese extra, pero no establece por sí sola que contenga la cartografía de Leonida. Nuestra guía del mapa recoge por separado el anuncio de Rockstar del 3 de noviembre y las condiciones del material imprimible y del producto físico previsto para Rockstar Store.',
   'A poster is not automatically a map. The checked MediaMarkt listing advertises that extra but does not by itself establish that it contains a Leonida map. Our map guide separately covers Rockstar’s November 3 announcement and the terms for printable material and the physical product planned for Rockstar Store.',
   'Un poster ne constitue pas automatiquement une carte. La fiche MediaMarkt vérifiée annonce cet ajout, sans établir à elle seule la présence de la cartographie de Leonida. Notre guide de la carte traite séparément l’annonce Rockstar du 3 novembre et les conditions du contenu imprimable et du produit physique prévu sur Rockstar Store.'
  ]],table:{headers:[['Referencia','Reference','Référence'],['Qué comprobar','What to check','À vérifier']],rows:[
   [['Oferta de MediaMarkt Alemania','MediaMarkt Germany offer','Offre MediaMarkt Allemagne'],['Plataforma, póster y condiciones de esa ficha','Platform, poster and the terms of that listing','Plateforme, poster et conditions de cette fiche']],
   [['Mapa y material de Rockstar','Rockstar map and printable material','Carte et contenu imprimable Rockstar'],['El anuncio específico, su fecha y su distribución','The specific announcement, date and distribution','L’annonce précise, sa date et sa distribution']],
   [['Caja del juego','Game box','Boîte du jeu'],['Código, región y contenido descrito para tu compra','Code, region and contents specified for your purchase','Code, région et contenu indiqué pour votre achat']]
  ]},image:{key:'feature-launch-gallery-bridge',alt:['Puente levadizo y edificios iluminados de Vice City al anochecer en GTA VI','A drawbridge and illuminated Vice City buildings at dusk in GTA VI','Pont levant et immeubles éclairés de Vice City au crépuscule dans GTA VI'],caption:[
   'Captura oficial de Vice City, como contexto del juego. No muestra el póster promocional, un mapa de Leonida ni una caja abierta.',
   'Official Vice City screenshot providing game context. It does not show the promotional poster, a Leonida map or an opened game box.',
   'Capture officielle de Vice City pour le contexte du jeu. Elle ne montre ni le poster promotionnel, ni une carte de Leonida, ni une boîte ouverte.'
  ],credit:gallery},references:[product,map,box]},
  {heading:['Cómo revisar la reserva sin asumir una oferta para otros países','How to check the preorder without assuming an international offer','Vérifier la précommande sans supposer une offre internationale'],paragraphs:[[
   'Antes de pagar, revisa país de la tienda, plataforma, vendedor y detalle del extra. Los 79,99 EUR son el precio observado en Alemania el 7 de noviembre de 2026, con IVA y envío aparte; no una tarifa confirmada para España, Francia o América. La recogida requiere elegir un establecimiento y las condiciones de entrega dependen de la compra concreta.',
   'Before paying, check the store country, platform, seller and bonus description. The €79.99 EUR figure is the price observed in Germany on November 7, 2026, including VAT but excluding shipping; it is not a confirmed price for Spain, France or the Americas. Collection requires selecting a store, and delivery terms depend on the individual order.',
   'Avant de payer, vérifiez pays du site, plateforme, vendeur et description du supplément. Les 79,99 EUR sont le prix observé en Allemagne le 7 novembre 2026, TVA comprise et livraison en supplément, pas un tarif confirmé pour l’Espagne, la France ou les Amériques. Le retrait nécessite de choisir un magasin et la livraison dépend de la commande précise.'
  ],[
   'Si el póster es lo que decide tu compra, confirma que siga indicado en la ficha y en la confirmación del pedido. Para una caja con código, comprueba además la compatibilidad regional de la cuenta. Un extra anunciado en otro comercio o en una captura antigua no sustituye las condiciones de tu vendedor.',
   'If the poster determines your choice, check that it remains specified in the listing and order confirmation. For a code-in-box copy, also check the account’s regional compatibility. A bonus advertised by another shop or in an old screenshot cannot replace your seller’s terms.',
   'Si le poster motive votre choix, vérifiez qu’il figure encore dans la fiche et la confirmation de commande. Pour une boîte avec code, vérifiez aussi la compatibilité régionale du compte. Un supplément annoncé ailleurs ou dans une ancienne capture ne remplace pas les conditions de votre vendeur.'
  ]],references:[product,regions]},
  {heading:['El póster no adelanta el estreno de GTA 6','The poster does not bring GTA 6’s release forward','Le poster n’avance pas la sortie de GTA 6'],paragraphs:[[
   'Rockstar mantiene GTA VI para el 19 de noviembre de 2026 en PS5 y Xbox Series X|S. Su soporte indica que la versión física contiene un código para descargar el juego. Recibir una caja o un póster antes no concede acceso anticipado: el calendario de compra, entrega, precarga y juego debe comprobarse por separado.',
   'Rockstar still lists GTA VI for November 19, 2026 on PS5 and Xbox Series X|S. Its support page states that the physical version contains a code to download the game. Receiving a box or poster earlier does not grant early playable access: purchase, delivery, preload and play schedules must be checked separately.',
   'Rockstar maintient GTA VI au 19 novembre 2026 sur PS5 et Xbox Series X|S. Son assistance précise que la version physique contient un code de téléchargement. Recevoir une boîte ou un poster plus tôt ne donne pas accès au jeu en avance : achat, livraison, préchargement et accès jouable ont des calendriers distincts.'
  ]],references:[official,editions,preload]}
 ],sources:[product,campaign,report,originalPost,official,editions,media,gallery]
};
