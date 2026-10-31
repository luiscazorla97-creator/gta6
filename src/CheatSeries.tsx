import type {Article} from './articles';
import type {Locale} from './content';
import {articlePath} from './routes';
export default function CheatSeries({locale,current,entries}:{locale:Locale;current:Article;entries:Article[]}){
 const index=current.id==='gta-saga-cheats-newest-oldest-20261030';
 if(!current.cheats&&!index)return null;
 const title={es:'Trucos de cada GTA: del más nuevo al más antiguo',en:'GTA cheat guides: newest to oldest',fr:'Codes de chaque GTA : du plus récent au plus ancien'}[locale];
 const guides=entries.filter(a=>a.cheats).sort((a,b)=>a.cheats!.order-b.cheats!.order);
 const list=<ol>{guides.map(a=><li key={a.id}><a href={articlePath(locale,a)} aria-current={a.id===current.id?'page':undefined}>{a.cheats!.game}</a>{index&&<span className="cheat-index-description">{a.cheats!.order===0?{es:'Rumores y códigos todavía sin verificar',en:'Rumours and codes still unverified',fr:'Rumeurs et codes encore non vérifiés'}[locale]:a.cheats!.order===1?{es:'Códigos del modo Historia no disponibles',en:'Story Mode codes unavailable',fr:'Codes du mode Histoire indisponibles'}[locale]:{es:'Abrir el artículo con todos sus trucos',en:'Open the article with all its cheats',fr:'Ouvrir l’article avec tous ses codes'}[locale]}</span>}</li>)}</ol>;
 if(index)return <nav className="history-series cheat-series cheat-game-index" aria-labelledby="cheat-game-index-title"><h2 id="cheat-game-index-title">{title}</h2>{list}</nav>;
 return <details className="history-series cheat-series"><summary>{title}</summary>{list}</details>;
}
