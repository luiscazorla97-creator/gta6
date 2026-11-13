import {useId,useState} from 'react';
import {Share2} from 'lucide-react';
import type {Locale} from './content';

const text={
 es:{action:'Compartir artículo',shared:'Artículo compartido.',copied:'Enlace copiado.',manual:'No se pudo compartir ni copiar automáticamente. Copiá este enlace:'},
 en:{action:'Share article',shared:'Article shared.',copied:'Link copied.',manual:'Automatic sharing and copying are unavailable. Copy this link:'},
 fr:{action:'Partager l’article',shared:'Article partagé.',copied:'Lien copié.',manual:'Le partage et la copie automatiques sont indisponibles. Copiez ce lien :'},
};
type Result='idle'|'shared'|'copied'|'manual';

export default function ArticleShare({locale,title,canonical}:{locale:Locale;title:string;canonical:string}){
 const t=text[locale],statusId=useId();
 const [result,setResult]=useState<Result>('idle'),[busy,setBusy]=useState(false);
 async function share(){
  if(busy)return;
  setBusy(true);setResult('idle');
  try{
   if(typeof navigator.share==='function'){
    try{
     await navigator.share({title,url:canonical});
     setResult('shared');return;
    }catch(error){
     if(error&&typeof error==='object'&&'name'in error&&error.name==='AbortError')return;
    }
   }
   if(typeof navigator.clipboard?.writeText==='function'){
    try{
     await navigator.clipboard.writeText(canonical);
     setResult('copied');return;
    }catch{/* A denied clipboard operation falls back to a visible link. */}
   }
   setResult('manual');
  }finally{setBusy(false);}
 }
 return <div className="article-inline-links">
  <button type="button" className="button secondary" onClick={share} disabled={busy} aria-describedby={statusId}><Share2 size={16} aria-hidden="true"/>{t.action}</button>
  <p id={statusId} role="status" aria-live="polite" aria-atomic="true">{result==='idle'?'':result==='manual'?<>{t.manual} <span className="contact-link">{canonical}</span></>:t[result]}</p>
 </div>;
}
