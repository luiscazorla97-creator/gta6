import type {Article} from './articles';
import type {Locale} from './content';
import {articlePath} from './routes';

const labels={
 es:{title:'Historias de toda la saga GTA',spoilers:'Aviso: este artículo revela sucesos importantes de la historia del juego.',unreleased:'GTA VI todavía no se ha publicado a la fecha de este artículo. Solo analizamos información anunciada; no conocemos su final.'},
 en:{title:'Explore the history of every GTA',spoilers:'Spoiler warning: this article reveals important events in the game’s story.',unreleased:'GTA VI has not been released as of this article’s date. We discuss announced information only; its ending is unknown.'},
 fr:{title:'L’histoire de chaque GTA',spoilers:'Attention : cet article révèle des événements importants de l’histoire du jeu.',unreleased:'GTA VI n’est pas encore sorti à la date de cet article. Seules les informations annoncées sont analysées ; sa fin reste inconnue.'},
};

export default function HistorySeries({locale,current,entries}:{locale:Locale;current:Article;entries:Article[]}){
 if(!current.history)return null;
 const text=labels[locale];
 const series=entries.filter(a=>a.history).sort((a,b)=>a.history!.order-b.history!.order);
 return <>
  <p className="history-notice">{current.history.spoilers?text.spoilers:text.unreleased}</p>
  <details className="history-series">
   <summary>{text.title}</summary>
   <ol>{series.map(a=><li key={a.id}><a href={articlePath(locale,a)} aria-current={a.id===current.id?'page':undefined}>{a.history!.game}</a></li>)}</ol>
  </details>
 </>;
}
