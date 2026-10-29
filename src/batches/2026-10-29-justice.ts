import type { Article } from '../articles';

const music={label:'Rockstar Games — The Music of Grand Theft Auto VI',url:'https://www.rockstargames.com/VI/music'};
const announcement={label:'Rockstar Games — Original Score by Justice, 29 October 2026',url:'https://www.rockstargames.com/newswire/article/39ak8a12395591/grand-theft-auto-vi-original-score-by-justice'};
const single={label:'Justice / Gesaffelstein — Pusher, official listening links',url:'https://justice.lnk.to/pusher'};
const album={label:'Justice — GTA VI Original Score, official music-service links',url:'https://justice.lnk.to/gtaoriginalscoredigital'};
const media={label:'Rockstar Games — official GTA VI media downloads',url:'https://www.rockstargames.com/VI/media'};
const collection={label:'FansGTA — GTA VI: The Album, 34 temas / tracks / titres',url:'https://fansgta.com/es/noticias/gta-6-album-34-tracks/'};
const radio={label:'FansGTA — Radio de GTA VI',url:'https://fansgta.com/es/noticias/gta-6-radio-music/'};
const release={label:'FansGTA — Fecha de lanzamiento de GTA VI',url:'https://fansgta.com/es/noticias/gta-6-19-november-2026/'};

const opening:[string,string,string]=[
 'Rockstar ha anunciado este 29 de octubre que GTA VI: Original Score by Justice llegará el 11 de diciembre de 2026. La página oficial detalla 30 pistas y bonus digitales, con edición en streaming, CD y vinilo. El sencillo Pusher, con Gesaffelstein, ya figura entre los avances para escuchar. Este lanzamiento musical tiene su propio calendario, separado del juego y de GTA VI: The Album.',
 'Rockstar announced on October 29 that GTA VI: Original Score by Justice is coming on December 11, 2026. The official page lists 30 tracks and digital bonuses, with streaming, CD and vinyl editions. Pusher, featuring Gesaffelstein, is already listed among the singles available to hear. This music release has its own schedule, separate from the game and GTA VI: The Album.',
 'Rockstar a annoncé ce 29 octobre la sortie de GTA VI: Original Score by Justice pour le 11 décembre 2026. La page officielle présente 30 titres et des bonus numériques, en streaming, CD et vinyle. Pusher, avec Gesaffelstein, figure déjà parmi les singles à écouter. Cette sortie musicale suit son propre calendrier, distinct de celui du jeu et de GTA VI: The Album.',
];
export const justice20261029:Article[]=[{
 id:'gta6-justice-score-december-11-2026-10-29',category:'news',
 slug:['gta-6-justice-musica-original-11-diciembre-pusher','gta-6-justice-original-score-december-11-pusher','gta-6-justice-musique-originale-11-decembre-pusher'],
 title:['GTA 6: la música original de Justice llega el 11 de diciembre','GTA 6: Justice’s original score arrives on December 11','GTA 6 : la musique originale de Justice sort le 11 décembre'],
 excerpt:['Rockstar anuncia GTA VI: Original Score by Justice para el 11 de diciembre: 30 pistas, formatos y el avance Pusher con Gesaffelstein.','Rockstar announces GTA VI: Original Score by Justice for December 11: 30 tracks, release formats and the Pusher single with Gesaffelstein.','Rockstar annonce GTA VI: Original Score by Justice le 11 décembre : 30 titres, les formats et le single Pusher avec Gesaffelstein.'],
 image:'music',
 imageCaption:['Arte promocional oficial de GTA VI utilizado para ilustrar la noticia musical. No es una fotografía de Justice ni la portada de la edición física.','Official GTA VI promotional artwork illustrating the music news. This is not a photograph of Justice or the physical release’s cover.','Visuel promotionnel officiel de GTA VI illustrant cette actualité musicale. Ce n’est ni une photo de Justice ni la pochette de l’édition physique.'],
 tag:['MÚSICA · ANUNCIO OFICIAL','MUSIC · OFFICIAL ANNOUNCEMENT','MUSIQUE · ANNONCE OFFICIELLE'],
 body:opening,published:'2026-10-29',updated:'2026-10-29',sources:[announcement,music,single,album,media],
 sections:[
  {heading:['Qué ha anunciado Rockstar hoy','What Rockstar announced today','Ce que Rockstar annonce aujourd’hui'],paragraphs:[opening],references:[announcement,music]},
  {heading:['Streaming, doble CD y triple vinilo','Streaming, double CD and triple vinyl','Streaming, double CD et triple vinyle'],references:[music,album],paragraphs:[[
   'La tienda enlazada desde Rockstar distingue un doble CD y un triple vinilo transparente de edición limitada. Para la escucha digital, el enlace oficial permite elegir servicio musical. La ficha habla de 30 pistas, además de bonus digitales incluidos en los formatos: no confundas esa cifra con las 34 canciones del otro álbum. Antes de elegir una edición, revisa la descripción concreta y las condiciones del destino oficial.',
   'Rockstar’s shop links distinguish a double CD and a limited triple crystal-clear vinyl edition. For digital listening, the official link lets you choose a music service. The listing describes 30 tracks plus digital bonuses included across formats: do not confuse that count with the other album’s 34 songs. Before choosing an edition, read the specific listing and the official destination’s terms.',
   'Les liens de boutique Rockstar distinguent un double CD et un triple vinyle transparent en édition limitée. Pour l’écoute numérique, le lien officiel permet de choisir un service musical. La fiche présente 30 titres, ainsi que des bonus numériques inclus dans les formats : ne confondez pas ce nombre avec les 34 morceaux de l’autre album. Avant de choisir une édition, lisez sa description et ses conditions officielles.',
  ]]},
  {heading:['Dónde escuchar Pusher con Gesaffelstein','Where to hear Pusher with Gesaffelstein','Où écouter Pusher avec Gesaffelstein'],references:[music,single],paragraphs:[[
   'El apartado de sencillos incluye Pusher, acreditado a Justice con Gesaffelstein, junto a Flower in a Hurricane. Para escucharlo, sigue el enlace oficial de Pusher y selecciona tu plataforma. La disponibilidad completa y las opciones de reproducción dependen del servicio elegido. Escuchar un sencillo es un avance musical: no da acceso al juego ni permite deducir en qué misión sonará cada composición.',
   'The singles section includes Pusher, credited to Justice with Gesaffelstein, alongside Flower in a Hurricane. Follow Pusher’s official link and select your platform to listen. Full availability and playback options depend on the selected service. Hearing a single is a music preview: it does not provide game access or establish which mission uses a particular composition.',
   'La section des singles comprend Pusher, crédité à Justice avec Gesaffelstein, aux côtés de Flower in a Hurricane. Suivez le lien officiel de Pusher puis choisissez votre plateforme pour l’écouter. La disponibilité complète et les options de lecture dépendent du service choisi. Écouter un single constitue un aperçu musical, sans donner accès au jeu ni identifier les missions associées aux compositions.',
  ]]},
  {heading:['Original Score no es The Album ni la radio','Original Score is separate from The Album and radio','Original Score, The Album et radio sont distincts'],references:[music,collection,radio],paragraphs:[[
   'Justice firma la música adaptativa de la historia de Jason y Lucia. Rockstar la presenta en un bloque distinto de GTA VI: The Album y de las emisoras. Nuestra noticia del álbum recoge sus 34 temas y su fecha del 19 de noviembre; esta actualización editorial cubre el lanzamiento de la partitura original. Ninguna de esas cifras representa por sí sola toda la música que se escuchará jugando.',
   'Justice composed the adaptive music for Jason and Lucia’s story. Rockstar presents it separately from GTA VI: The Album and the radio stations. Our album report covers its 34 tracks and November 19 date; this news report covers the original score’s release. Neither count by itself represents all the music players will hear in the game.',
   'Justice signe la musique adaptative de l’histoire de Jason et Lucia. Rockstar la présente séparément de GTA VI: The Album et des stations de radio. Notre article sur cet album reprend ses 34 titres et sa date du 19 novembre ; cette actualité concerne la sortie de la musique originale. Aucun de ces nombres ne représente à lui seul toute la musique entendue en jouant.',
  ]]},
  {heading:['Preguntas frecuentes: fechas y contenido','FAQ: dates and content','Questions fréquentes : dates et contenu'],references:[music,release,album],paragraphs:[[
   '¿El 11 de diciembre cambia el estreno del juego? No: es la fecha del disco de música original. ¿Está ya disponible el álbum completo? La página anuncia su llegada en diciembre y ofrece sencillos como adelanto. ¿Es una lista completa de radio? No; consulta las emisoras por separado. Para seguir el calendario del videojuego, usa nuestra noticia de lanzamiento y comprueba la comunicación oficial correspondiente.',
   'Does December 11 change the game’s launch? No: this is the original-score album’s date. Is the complete album already available? The page announces its December arrival and offers singles as previews. Is this a complete radio playlist? No; check the stations separately. To follow the game’s schedule, use our release-date report and check the relevant official announcement.',
   'Le 11 décembre modifie-t-il la sortie du jeu ? Non : c’est la date de l’album de musique originale. L’album complet est-il déjà disponible ? La page annonce son arrivée en décembre et propose des singles en avant-goût. S’agit-il de toute la programmation radio ? Non, consultez les stations séparément. Pour le calendrier du jeu, utilisez notre article sur sa sortie et vérifiez l’annonce officielle correspondante.',
  ]]},
 ],
}];
