import type { Article } from '../articles';

const announcement={label:'Take-Two Interactive — Q2 FY2027 reporting announcement, 13 October 2026',url:'https://www.take2games.com/ir/news/take-two-interactive-software-inc-report-second-quarter-fiscal-8'};
const calendar={label:'Take-Two Interactive — official quarterly earnings and events calendar',url:'https://www.take2games.com/ir/quarterly-earnings'};
const official={label:'Rockstar Games — Grand Theft Auto VI',url:'https://www.rockstargames.com/VI'};
const media={label:'Rockstar Games — official GTA VI media downloads',url:'https://www.rockstargames.com/VI/media'};
const release={label:'FansGTA — Fecha oficial de lanzamiento de GTA VI',url:'https://fansgta.com/es/noticias/gta-6-19-november-2026/'};
const platforms={label:'FansGTA — Plataformas oficiales de GTA VI',url:'https://fansgta.com/es/noticias/gta-6-ps5-xbox/'};

const introduction:[string,string,string]=[
 'Take-Two tiene previsto presentar sus resultados el 9 de noviembre de 2026, antes del lanzamiento de GTA VI previsto para el día 19. La convocatoria se anunció el 13 de octubre y seguía en su calendario oficial al comprobarlo el 28 de octubre. Es una cita financiera de la matriz de Rockstar; no promete novedades del juego.',
 'Take-Two plans to report its results on November 9, 2026, ahead of GTA VI’s scheduled November 19 launch. The event was announced on October 13 and remained on the official calendar when checked on October 28. This is a financial event for Rockstar’s parent company; it does not promise game announcements.',
 'Take-Two prévoit de publier ses résultats le 9 novembre 2026, avant la sortie de GTA VI annoncée pour le 19. Le rendez-vous, annoncé le 13 octobre, figurait toujours au calendrier officiel lors de notre vérification du 28 octobre. Cette présentation financière de la maison mère de Rockstar ne promet aucune annonce sur le jeu.',
];

export const cloudTestCalendar20261028:Article[]=[{
 id:'take-two-november-9-calendar-2026-10-28',category:'news',
 slug:['take-two-resultados-9-noviembre-gta-6','take-two-november-9-earnings-gta-6','take-two-resultats-9-novembre-gta-6'],
 image:'trailer',
 imageCaption:[
  'Imagen promocional oficial del tráiler de GTA VI. Ilustra el juego; no es una imagen de la conferencia ni un anuncio de Take-Two sobre su contenido.',
  'Official GTA VI trailer promotional image. It illustrates the game; it does not depict the conference call or announce its agenda.',
  'Visuel promotionnel officiel de la bande-annonce de GTA VI. Il illustre le jeu, sans représenter la conférence ni annoncer son programme.',
 ],
 tag:['ACTUALIDAD · CALENDARIO OFICIAL','NEWS · OFFICIAL CALENDAR','ACTUALITÉS · CALENDRIER OFFICIEL'],
 title:[
  'Take-Two presenta resultados el 9 de noviembre: la cita antes de GTA 6',
  'Take-Two reports on November 9: the scheduled event before GTA 6',
  'Take-Two publie ses résultats le 9 novembre, avant la sortie de GTA 6',
 ],
 excerpt:[
  'La convocatoria del 13 de octubre sigue en el calendario oficial. Fecha, hora y enlace para seguir los resultados, sin prometer anuncios de GTA VI.',
  'The October 13 announcement remains on the official calendar. Check the date, time and webcast source, without assuming a GTA VI reveal.',
  'Le rendez-vous annoncé le 13 octobre reste au calendrier officiel. Date, heure et source de la diffusion, sans promesse de révélation sur GTA VI.',
 ],
 body:introduction,
 published:'2026-10-28',updated:'2026-10-28',
 sources:[announcement,calendar,official,media],
 sections:[
  {heading:['Una convocatoria anunciada el 13 de octubre','An event announced on October 13','Un rendez-vous annoncé le 13 octobre'],references:[announcement,calendar,official],paragraphs:[introduction]},
  {heading:['Qué resultados presentará Take-Two','Which results Take-Two will report','Quels résultats seront présentés'],references:[announcement],paragraphs:[[
   'La publicación corresponde al segundo trimestre del ejercicio fiscal 2027, cerrado el 30 de septiembre de 2026. Ese nombre contable puede resultar confuso: no significa que la conferencia sea en 2027. La fecha del periodo y la fecha del informe responden a preguntas distintas. Para leer después un titular sobre cifras o previsiones, conviene identificar primero a qué trimestre se refiere y cuándo se publicó.',
   'The release covers the second quarter of fiscal year 2027, which ended on September 30, 2026. That accounting label can be confusing: it does not mean the conference happens in 2027. The reporting period and the publication date answer different questions. When reading a later headline about figures or forecasts, first identify the quarter it describes and when the information was published.',
   'La publication concerne le deuxième trimestre de l’exercice fiscal 2027, clos le 30 septembre 2026. Cette appellation comptable peut prêter à confusion : la conférence n’a pas lieu en 2027. La période couverte et la date de publication sont deux repères différents. Pour comprendre ensuite un titre sur des chiffres ou des prévisions, vérifiez d’abord le trimestre concerné et la date de la source.',
  ]]},
  {heading:['Hora y acceso a la retransmisión oficial','Time and access to the official webcast','Heure et accès à la diffusion officielle'],references:[announcement,calendar],paragraphs:[[
   'Los resultados se esperan tras el cierre del mercado del lunes 9 de noviembre. La conferencia está programada para las 4:30 p. m., hora del este de Estados Unidos, según el comunicado. Take-Two ofrecerá una retransmisión en directo solo para escuchar y una repetición desde su web de inversores. Para añadirla a tu agenda, utiliza el calendario oficial y comprueba la zona horaria que muestra tu aplicación antes de guardar el recordatorio.',
   'Results are scheduled after the market closes on Monday, November 9. The announcement gives the conference time as 4:30 p.m. Eastern Time. Take-Two will provide a live, listen-only webcast and a replay through its investor website. To add the event to your schedule, use the official calendar and check the time zone displayed by your calendar application before saving a reminder. A webcast time is separate from any game unlock time.',
   'Les résultats sont prévus après la clôture des marchés le lundi 9 novembre. Le communiqué fixe la conférence à 16 h 30, heure de l’Est des États-Unis. Take-Two proposera une diffusion en direct réservée à l’écoute et une rediffusion sur son site investisseurs. Pour enregistrer le rendez-vous, utilisez le calendrier officiel et contrôlez le fuseau horaire affiché par votre application avant de valider le rappel.',
  ]]},
  {heading:['Por qué encaja en el calendario de GTA VI','How it fits into the GTA VI calendar','Sa place dans le calendrier de GTA VI'],references:[official,release,platforms],paragraphs:[[
   'La web de Rockstar mantiene el 19 de noviembre de 2026 como fecha de GTA VI para PS5 y Xbox Series X|S. Por tanto, la presentación de Take-Two queda diez días antes de ese lanzamiento previsto. Esa cercanía explica su interés como referencia de seguimiento. Nuestros artículos sobre fecha y plataformas reúnen la información del juego; esta noticia añade la próxima cita corporativa para quien quiera consultar directamente las fuentes de la compañía.',
   'Rockstar’s website continues to list November 19, 2026 for GTA VI on PS5 and Xbox Series X|S. Take-Two’s event therefore falls ten days before that scheduled launch. This proximity makes it a useful date for readers following the company. Our release-date and platform articles cover the game itself; this report adds the next corporate reporting event for readers who want to follow the company’s original sources.',
   'Le site de Rockstar affiche toujours le 19 novembre 2026 pour GTA VI sur PS5 et Xbox Series X|S. La présentation de Take-Two se situe donc dix jours avant cette sortie prévue. Cette proximité en fait un repère utile pour suivre l’entreprise. Nos articles sur la date et les plateformes regroupent les informations du jeu ; cette actualité ajoute le prochain rendez-vous financier pour consulter les sources de la société.',
  ]]},
  {heading:['Lo que la convocatoria permite esperar','What the announcement lets readers expect','Ce que la convocation permet d’attendre'],references:[announcement,calendar],paragraphs:[[
   'La finalidad anunciada es comentar los resultados. La convocatoria no promete un tráiler, detalles de GTA Online, una versión de PC ni una nueva confirmación del lanzamiento. Si aparece información sobre GTA VI, habrá que revisar sus palabras y su contexto cuando exista. Hasta entonces, la fecha de la llamada no constituye una cuenta atrás para una revelación. Una captura del calendario tampoco permite anticipar lo que dirán los participantes.',
   'The stated purpose is to discuss results. The notice does not promise a trailer, GTA Online details, a PC version or a fresh launch confirmation. If GTA VI information emerges, its wording and context can be assessed once it exists. Until then, the call date does not establish a countdown to a reveal. A screenshot of an event calendar cannot tell readers what participants will say.',
   'L’objectif annoncé est de commenter les résultats. La convocation ne promet ni bande-annonce, ni détails sur GTA Online, ni version PC, ni nouvelle confirmation de sortie. Si des informations sur GTA VI apparaissent, il faudra en examiner les termes et le contexte. En attendant, cette date ne lance aucun compte à rebours vers une révélation. Une capture du calendrier ne permet pas de prévoir les déclarations des participants.',
  ]]},
  {heading:['Preguntas frecuentes sobre la conferencia','FAQ about the conference call','Questions fréquentes sur la conférence'],references:[announcement,calendar,official],paragraphs:[[
   '¿Se ha anunciado hoy? No: el comunicado es del 13 de octubre; esta comprobación es del 28. ¿Dónde se podrá escuchar? En la retransmisión enlazada desde la web de inversores de Take-Two, que también anuncia una repetición. ¿Cambiará la fecha de GTA VI? La convocatoria no lo dice. Para comprobar cualquier cambio, consulta una comunicación explícita de Rockstar o Take-Two, no una predicción sobre la conferencia.',
   'Was the event announced today? No: the notice is dated October 13; this check is dated October 28. Where can you listen? Follow the webcast linked from Take-Two’s investor website, which also promises a replay. Will GTA VI’s date change? The event notice does not say that. Check any change against an explicit Rockstar or Take-Two statement, rather than a prediction about the call.',
   'Le rendez-vous a-t-il été annoncé aujourd’hui ? Non : le communiqué date du 13 octobre, notre vérification du 28. Où l’écouter ? Suivez la diffusion liée depuis le site investisseurs de Take-Two, qui prévoit aussi une rediffusion. La date de GTA VI va-t-elle changer ? La convocation ne l’indique pas. Un changement doit être vérifié dans une communication explicite de Rockstar ou Take-Two, pas dans une prédiction sur la conférence.',
  ]]},
 ],
}];
