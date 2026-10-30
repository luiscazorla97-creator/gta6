import type {Article} from '../articles';
export type Three=[string,string,string];
type Ref={label:string;url:string};
export const historyGames=[
 ['gta1','GTA 1','gta-1','gta','Grand_Theft_Auto_(video_game)','1997'],
 ['london69','GTA: London 1969','gta-london-1969','gtalondon','Grand_Theft_Auto:_London_1969','1999'],
 ['london61','GTA: London 1961','gta-london-1961','gtalondon','Grand_Theft_Auto:_London_1969','1999'],
 ['gta2','GTA 2','gta-2','gta2','Grand_Theft_Auto_2','1999'],
 ['gta3','GTA III','gta-3','grandtheftauto3','Grand_Theft_Auto_III','2001'],
 ['vicecity','GTA: Vice City','gta-vice-city','vicecity','Grand_Theft_Auto:_Vice_City','2002'],
 ['advance','GTA Advance','gta-advance','grandtheftauto-gba','Grand_Theft_Auto_Advance','2004'],
 ['sanandreas','GTA: San Andreas','gta-san-andreas','sanandreas','Grand_Theft_Auto:_San_Andreas','2004'],
 ['lcs','GTA: Liberty City Stories','gta-liberty-city-stories','libertycitystories','Grand_Theft_Auto:_Liberty_City_Stories','2005'],
 ['vcs','GTA: Vice City Stories','gta-vice-city-stories','vicecitystories','Grand_Theft_Auto:_Vice_City_Stories','2006'],
 ['gta4','GTA IV','gta-4','iv','Grand_Theft_Auto_IV','2008'],
 ['tlad','GTA IV: The Lost and Damned','gta-4-the-lost-and-damned','thelostanddamned','Grand_Theft_Auto_IV:_The_Lost_and_Damned','2009'],
 ['cw','GTA: Chinatown Wars','gta-chinatown-wars','chinatownwars','Grand_Theft_Auto:_Chinatown_Wars','2009'],
 ['tbogt','GTA: The Ballad of Gay Tony','gta-the-ballad-of-gay-tony','theballadofgaytony','Grand_Theft_Auto:_The_Ballad_of_Gay_Tony','2009'],
 ['gta5','GTA V','gta-5','gta-v','Grand_Theft_Auto_V','2013'],
 ['online','GTA Online','gta-online','gta-online','Grand_Theft_Auto_Online','2013'],
 ['gta6','GTA VI','gta-6','hero','Grand_Theft_Auto_VI','2026 · anunciado / announced / annoncé'],
] as const;
export function s(heading:Three,...paragraphs:Three[]):Article['sections'][number]{return {heading,paragraphs};}
export function history(key:string,excerpt:Three,sections:Article['sections'],extraSources:Ref[]=[]):Article{
 const index=historyGames.findIndex(g=>g[0]===key);if(index<0)throw Error('Unknown history game');
 const [,game,slug,asset,wiki,release]=historyGames[index];
 const sourcePage=key==='gta6'?'https://www.rockstargames.com/VI':key==='gta5'?'https://www.rockstargames.com/gta-v':key==='online'?'https://www.rockstargames.com/gta-online':key==='tlad'||key==='tbogt'?'https://www.rockstargames.com/games/episodesfromlibertycity':`https://www.rockstargames.com/games/${asset==='iv'?'IV':asset}`;
 const official={label:`Rockstar Games — ${key==='london61'?'London: base London 1969':game}`,url:sourcePage};
 const corroboration={label:`Wikipedia — ${key==='london61'?'London 1969 / London 1961':game} (historia / history / histoire)`,url:`https://en.wikipedia.org/wiki/${wiki}`};
 const contextual:Ref[]=key==='london69'||key==='london61'?[{label:'GTABase — London 1969 / 1961: developer and releases',url:'https://www.gtabase.com/games/grand-theft-auto-london-1969-1961'}]:[];
 const internal:Ref[]=key==='gta5'?[{label:'FansGTA — GTA V: trucos',url:'https://fansgta.com/es/trucos/gta-5-todos-trucos-codigos/'}]:key==='gta6'?[{label:'FansGTA — Jason',url:'https://fansgta.com/es/personajes/jason-duval-profile/'},{label:'FansGTA — Lucia',url:'https://fansgta.com/es/personajes/lucia-caminos-profile/'}]:[];
 const citedSections=sections.map((section,i)=>({...section,references:[...(section.references??[official,corroboration]),...(i===0?extraSources:[]),...(i===sections.length-1?[...contextual,...internal]:[])]}));
 const image=key==='gta6'?'hero':`history-${asset}`;
 const imageCaption:Three=key==='london61'?['Arte oficial de London 1969, expansión base necesaria para London 1961; no es una portada propia de 1961.','Official London 1969 artwork, the expansion required by London 1961; this is not a separate 1961 cover.','Visuel officiel de London 1969, extension nécessaire à London 1961 ; il ne s’agit pas d’une jaquette distincte de 1961.']:key==='advance'?['Logotipo promocional de GTA Advance publicado en el catálogo oficial; no es una captura de juego.','GTA Advance promotional logo from the official catalogue; not a gameplay screenshot.','Logo promotionnel de GTA Advance issu du catalogue officiel ; ce n’est pas une capture de jeu.']:key==='gta6'?['Imagen promocional oficial de GTA VI; ilustra el proyecto anunciado, no un desenlace conocido.','Official GTA VI promotional artwork, illustrating the announced project rather than a known ending.','Visuel promotionnel officiel de GTA VI, illustrant le projet annoncé et non une fin connue.']:[`Arte promocional de ${game} conservado en el catálogo oficial de Rockstar.`,`Promotional artwork for ${game} preserved in Rockstar’s official catalogue.`,`Visuel promotionnel de ${game} conservé dans le catalogue officiel de Rockstar.`];
 return {id:`history-${key}-20261030`,category:'guides',slug:[`historia-${slug}-trama-creacion`,`${slug}-story-development-history`,`histoire-${slug}-scenario-creation`],image,imageAlt:key==='london61'?['London 1969: arte oficial del producto base requerido por London 1961','London 1969: official artwork for the base expansion required by London 1961','London 1969 : visuel officiel de l’extension nécessaire à London 1961']:[`${game}: ${key==='advance'?'logotipo':'arte'} oficial de Rockstar Games`,`${game}: official Rockstar Games ${key==='advance'?'logo':'artwork'}`,`${game} : ${key==='advance'?'logo':'visuel'} officiel de Rockstar Games`],imageCaption,imageCredit:{label:`${key==='london61'?'GTA: London 1969':game} © Rockstar Games`,url:sourcePage},history:{order:index,game,release,spoilers:key!=='gta6'},tag:['HISTORIA · TRAMA Y CREACIÓN','HISTORY · STORY & DEVELOPMENT','HISTOIRE · SCÉNARIO ET CRÉATION'],title:key==='gta6'?['Historia de GTA 6: creación y trama anunciada hasta ahora','GTA 6 history: development and the story announced so far','Histoire de GTA 6 : création et scénario annoncé à ce jour']:[`Historia de ${game}: trama, personajes y creación`,`${game} history: story, characters and development`,`Histoire de ${game} : scénario, personnages et création`],excerpt,body:sections[0].paragraphs[0],sections:citedSections,sources:[official,corroboration,...contextual,...extraSources],published:'2026-10-30',updated:'2026-10-30'};
}
