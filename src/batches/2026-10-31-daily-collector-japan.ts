import type {Article} from '../articles';

type Three=[string,string,string];
const shop={label:'e-Capcom · Japan product C00009901 · checked October 31, 2026, 21:17 UTC',url:'https://www.e-capcom.com/shop/g/gC00009901/'};
const release={label:'Capcom announcement reproduced by Famitsu · October 29, 2026',url:'https://www.famitsu.com/article/202610/92485'};
const physical={label:'FansGTA · GTA VI physical edition and download code',url:'https://fansgta.com/es/guias/gta-6-edicion-fisica-sin-disco-codigo/'};

// Update the equivalent existing topic: retain its id, original publication,
// category and all three localized URLs rather than create a second box article.
export function updateCollectorJapan20261031(article:Article):Article{
 if(article.id!=='collector-box-no-game-2026-10-28')return article;
 const body:Three=[
  'La Collector’s Box de GTA 6 tiene ficha japonesa en e-Capcom por 99.980 yenes japoneses (JPY), impuestos incluidos, pero mostraba falta de disponibilidad al comprobarla el 31 de octubre de 2026 a las 21:17 UTC. El juego se vende aparte. Las reservas se anunciaron para el 30 de octubre a las 12:00, hora de Japón; esa apertura no significa que hoy siga habiendo unidades.',
  'GTA 6’s Collector’s Box has a Japanese e-Capcom listing priced at ¥99,980 Japanese yen (JPY), including tax, but it showed no availability when checked on October 31, 2026 at 21:17 UTC. The game is sold separately. Preorders were announced to open on October 30 at noon Japan time; that opening does not establish stock availability today.',
  'Le coffret collector GTA 6 est référencé au Japon chez e-Capcom à 99 980 yens japonais (JPY), taxes comprises, mais la fiche indiquait une indisponibilité lors de la vérification du 31 octobre 2026 à 21 h 17 UTC. Le jeu est vendu séparément. Les précommandes étaient annoncées pour le 30 octobre à midi, heure japonaise ; leur ouverture ne garantit pas un stock actuel.',
 ];
 const original=article.sections.map(section=>({...section,paragraphs:section.paragraphs.map(p=>p.map(text=>text
  .replace('Comprobado el 28 de octubre de 2026','Comprobado el 31 de octubre de 2026')
  .replace('Checked on October 28, 2026','Checked on October 31, 2026')
  .replace('Vérification du 28 octobre 2026','Vérification du 31 octobre 2026')
  .replace('No publicamos aquí una cifra monetaria sin un mercado inequívoco ni convertimos automáticamente precios para lectores de otro país.','El precio japonés de esta actualización identifica el mercado, la moneda y la fecha de comprobación; no es una tarifa para otros países ni una conversión automática.')
  .replace('We do not quote a monetary figure here without an unambiguous market or automatically convert prices for readers in another country.','The Japanese price in this update identifies the market, currency and check date; it is not a price for other countries or an automatic currency conversion.')
  .replace('Aucun montant n’est cité ici sans marché clairement identifié, ni converti automatiquement pour un autre pays.','Le prix japonais de cette mise à jour précise le marché, la devise et la date de vérification ; il ne vaut pas pour les autres pays et ne constitue pas une conversion automatique.')
 )as Three)}));
 return {...article,
  updated:'2026-10-31',
  title:[
   'Collector’s Box de GTA 6: Japón, 99.980 yenes y juego aparte',
   'GTA 6 Collector’s Box: Japan’s ¥99,980 listing and stock check',
   'Coffret collector GTA 6 : Japon, 99 980 yens et jeu séparé',
  ],
  excerpt:[
   'Collector’s Box de GTA 6 en Japón: 99.980 JPY, impuestos incluidos, sin disponibilidad al comprobar el 31 de octubre. El juego se vende aparte.',
   'GTA 6 Collector’s Box in Japan: ¥99,980 JPY including tax; unavailable when checked October 31. The game is sold separately. Contents and dates.',
   'Coffret GTA 6 au Japon : 99 980 JPY, taxes comprises ; indisponible lors de la vérification du 31 octobre. Jeu vendu séparément. Contenu et dates.',
  ],
  tag:['ACTUALIZACIÓN · COLECCIONISMO EN JAPÓN','UPDATE · COLLECTIBLES IN JAPAN','MISE À JOUR · COLLECTION AU JAPON'],
  body,
  imageAlt:[
   'Vice City en una captura oficial de GTA VI, contexto de la colección física',
   'Vice City in an official GTA VI screenshot, setting context for the physical collection',
   'Vice City dans une capture officielle GTA VI, contexte du coffret physique',
  ],
  imageCredit:{label:'GTA VI © Rockstar Games · official media',url:'https://www.rockstargames.com/VI/media'},
  sources:[shop,release,...article.sources],
  sections:[
   {heading:['Japón: anuncio del 29 y apertura del 30 de octubre','Japan: October 29 announcement, October 30 preorder opening','Japon : annonce le 29, ouverture le 30 octobre'],references:[release,shop],paragraphs:[[
    'El comunicado de Capcom reproducido por Famitsu el 29 de octubre de 2026 anunció reservas limitadas en e-Capcom desde las 12:00 del 30 de octubre, hora japonesa (JST, UTC+9). La colección se llama Grand Theft Auto VI: The Goodtime State – Vice City Collection. Se trata de su comercialización en Japón, no de una edición nueva que sustituya el juego. Conservamos la fecha del anuncio y la de la apertura para no presentarlas como un estreno del 31 de octubre.',
    'Capcom’s announcement, reproduced by Famitsu on October 29, 2026, scheduled limited e-Capcom preorders from noon on October 30 in Japan (JST, UTC+9). The product is Grand Theft Auto VI: The Goodtime State – Vice City Collection. This concerns Japanese retail availability, not a new edition replacing the game. The announcement and preorder dates remain explicit rather than being presented as an October 31 launch.',
    'Le communiqué de Capcom reproduit par Famitsu le 29 octobre 2026 annonçait des précommandes limitées sur e-Capcom à partir du 30 octobre à midi au Japon (JST, UTC+9). Le produit s’appelle Grand Theft Auto VI: The Goodtime State – Vice City Collection. Il s’agit de sa commercialisation japonaise, pas d’une nouvelle édition remplaçant le jeu. L’annonce et l’ouverture conservent leurs dates réelles, sans devenir un lancement du 31 octobre.',
   ]]},
   {heading:['Precio y disponibilidad comprobados: Japón, JPY, 31 de octubre','Price and availability snapshot: Japan, JPY, October 31','Prix et disponibilité vérifiés : Japon, JPY, 31 octobre'],references:[shop],paragraphs:[[
    'La ficha C00009901 mostraba 99.980 JPY con impuestos incluidos y el indicador «在庫：×» a las 21:17 UTC del 31 de octubre de 2026. Lo describimos como falta de disponibilidad en esa comprobación, no como unidades reservables ni como agotamiento permanente. No hemos realizado un pedido ni comprobado el proceso de pago. El precio corresponde a Japón; no lo convertimos a euros o dólares ni inferimos gastos de importación, elegibilidad de envío o condiciones para otro país.',
    'Product C00009901 displayed ¥99,980 JPY including tax and the stock indicator “在庫：×” at 21:17 UTC on October 31, 2026. This is an unavailable snapshot, not a claim that units can be reserved or that stock is permanently exhausted. No order or checkout was performed. The price applies to Japan; it is not converted into euros or dollars, and no import charges, shipping eligibility or terms for another country are inferred.',
    'La fiche C00009901 affichait 99 980 JPY, taxes comprises, et l’indicateur de stock « 在庫：× » le 31 octobre 2026 à 21 h 17 UTC. Il s’agit d’une indisponibilité constatée, pas d’unités actuellement réservables ni d’un épuisement définitif. Aucune commande ni validation de paiement n’a été effectuée. Le prix concerne le Japon ; nous ne le convertissons pas et ne déduisons ni frais d’importation, ni éligibilité de livraison, ni conditions pour un autre pays.',
   ]]},
   {heading:['Entrega de la colección y licencia del juego son cosas distintas','Collection delivery and the game licence are separate','Livraison du coffret et licence du jeu sont distinctes'],references:[shop,physical],paragraphs:[[
    'e-Capcom indica el 19 de noviembre de 2026 como inicio de entrega del producto y advierte que GTA VI se vende por separado. Eso no garantiza la llegada de un paquete concreto ese día y tampoco concede acceso anticipado al juego. Antes de decidir, revisa la disponibilidad actual y las condiciones del artículo; una noticia de apertura de reservas puede seguir circulando cuando la tienda ya no acepta pedidos. La explicación de los once objetos y las diferencias con Standard y Ultimate se conservan a continuación.',
    'e-Capcom lists November 19, 2026 as the product’s delivery start and states that GTA VI is sold separately. That does not guarantee a particular parcel will arrive that day or provide early game access. Check current stock and product-specific terms before deciding: preorder-opening news can circulate after orders become unavailable. The eleven-item contents guide and the differences from Standard and Ultimate remain below.',
    'e-Capcom indique le 19 novembre 2026 comme début de livraison du produit et précise que GTA VI est vendu séparément. Cela ne garantit ni l’arrivée d’un colis précis ce jour-là ni un accès anticipé au jeu. Vérifiez le stock et les conditions propres au produit : une annonce de précommandes peut circuler après leur indisponibilité. Le détail des onze objets et les différences avec Standard et Ultimate sont conservés ci-dessous.',
   ]]},
   ...original,
  ],
 };
}
