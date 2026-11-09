import type {Article} from './articles';

type RelatedArticle=Pick<Article,'id'|'slug'|'category'>;
const relationships:Record<string,string[]>={
 'jason-duval-profile':['lucia-caminos-profile','brian-heder','cal-hampton'],
 'lucia-caminos-profile':['jason-duval-profile','gta-6-liberty-city-theory','gta-6-conspiracy-theory'],
 'cal-hampton':['jason-duval-profile','brian-heder','gta-6-cal-hampton-mysteries'],
 'boobie-ike':['drequan-priest','real-dimez','gta-6-radio-music'],
 'drequan-priest':['boobie-ike','real-dimez','gta-6-radio-music'],
 'real-dimez':['drequan-priest','boobie-ike','gta-6-album-34-tracks'],
 'brian-heder':['jason-duval-profile','cal-hampton','gta-6-leonida-locations'],
 'raul-bautista':['jason-duval-profile','lucia-caminos-profile','spoilers'],
 'history-online-20261030':['history-gta5-20261030','gta-online-omaggio-twitch-drops-20261031'],
};
const stopWords=new Set(['gta','6','the','and','for','with','how','what','your','from','does','its','guide','explained','confirmed','rumour','status','details','official']);
const synonyms:Record<string,string>={licences:'licence',licenses:'licence',license:'licence',games:'game',maps:'map',vehicles:'vehicle',weapons:'weapon',characters:'character',controllers:'controller'};
const indexes=new WeakMap<readonly RelatedArticle[],{tokens:Map<string,Set<string>>;weights:Map<string,number>}>();
function indexFor(entries:readonly RelatedArticle[]){
 let index=indexes.get(entries);
 if(!index){
  // English slugs are shared in every page payload, unlike translated listing
  // text. This keeps SSR and hydration identical in all three languages.
  const tokens=new Map(entries.map(a=>[a.id,new Set(a.slug[1].split('-').map(w=>synonyms[w]??w).filter(w=>w&&!stopWords.has(w)))]));
  const frequency=new Map<string,number>();
  for(const words of tokens.values())for(const word of words)frequency.set(word,(frequency.get(word)??0)+1);
  const weights=new Map([...frequency].map(([word,count])=>[word,Math.log(1+entries.length/count)]));
  index={tokens,weights};indexes.set(entries,index);
 }
 return index;
}

export function relatedArticles<T extends RelatedArticle>(entries:readonly T[],current:T):T[]{
 const {tokens,weights}=indexFor(entries),own=tokens.get(current.id)??new Set<string>();
 const preferred=relationships[current.id]??[];
 const norm=(words:Set<string>)=>Math.sqrt([...words].reduce((sum,w)=>sum+(weights.get(w)??0)**2,0));
 const ownNorm=norm(own);
 const score=(a:T)=>{
  const words=tokens.get(a.id)!;
  const overlap=[...own].reduce((sum,w)=>sum+(words.has(w)?(weights.get(w)??0)**2:0),0);
  return (preferred.includes(a.id)?10:0)+(a.category===current.category?0.15:0)+overlap/(ownNorm*norm(words)||1);
 };
 const ranked=entries.filter(a=>a.id!==current.id).map(a=>({article:a,score:score(a)})).sort((a,b)=>b.score-a.score||a.article.id.localeCompare(b.article.id));
 const chosen=ranked.slice(0,2).map(a=>a.article);
 // A next article in the same section makes browsing the complete archive
 // possible from article pages, even when a topic has no close keyword match.
 // The cycle guarantees an incoming article link for every multi-item section.
 const siblings=entries.filter(a=>a.category===current.category);
 const next=siblings.length>1?siblings[(siblings.findIndex(a=>a.id===current.id)+1)%siblings.length]:undefined;
 const third=next&&!chosen.some(a=>a.id===next.id)?next:ranked.find(a=>!chosen.includes(a.article))?.article;
 return third?[...chosen,third]:chosen;
}
