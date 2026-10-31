import type {Article} from './articles';
import type {Locale} from './content';
import {articlePath} from './routes';
export default function CheatSeries({locale,current,entries}:{locale:Locale;current:Article;entries:Article[]}){
 if(!current.cheats&&current.id!=='gta-saga-cheats-newest-oldest-20261030')return null;
 const title={es:'Trucos de cada GTA: del más nuevo al más antiguo',en:'GTA cheat guides: newest to oldest',fr:'Codes de chaque GTA : du plus récent au plus ancien'}[locale];
 return <details className="history-series cheat-series"><summary>{title}</summary><ol>{entries.filter(a=>a.cheats).sort((a,b)=>a.cheats!.order-b.cheats!.order).map(a=><li key={a.id}><a href={articlePath(locale,a)} aria-current={a.id===current.id?'page':undefined}>{a.cheats!.game}</a></li>)}</ol></details>;
}
