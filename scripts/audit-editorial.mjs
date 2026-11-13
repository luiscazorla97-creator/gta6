import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let catalogue;
try{catalogue=await import(path.join(root,'.ssr/entry-server.js'));}
catch(error){console.error('Build the release before running the editorial audit: npm run build:release');process.exit(1);}
const {articles,mediaPath}=catalogue;
const credits=JSON.parse(fs.readFileSync(path.join(root,'public/media/credits.json'),'utf8'));
const errors=[],warnings=[],locales=['es','en','fr'];
const normalize=value=>value.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
function check(condition,id,field,detail){if(!condition)errors.push({id,field,detail});}
function three(value,id,field){
 const valid=Array.isArray(value)&&value.length===3&&value.every(item=>typeof item==='string'&&item.trim());
 check(valid,id,field,'Expected complete Spanish, English and French text.');return valid;
}
function validURL(value){try{return ['https:','http:'].includes(new URL(value).protocol);}catch{return false;}}
function date(value){return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;}
const seenIDs=new Set(),fields=new Map(),paths=new Set(),sets=[];
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York'}).format(new Date());
let figures=0;
function image(key,alt,caption,id,field){
 const local=mediaPath(key),creditKey=path.basename(local,'.webp');
 check(fs.existsSync(path.join(root,'public',local)),id,field+'.file','Missing local editorial image.');
 check(Boolean(credits[creditKey]),id,field+'.credit','Missing registered media provenance.');
 if(alt)three(alt,id,field+'.alt');
 if(caption)three(caption,id,field+'.caption');
 if(key==='feature-phone'&&alt)check(!alt.some(value=>/teléfono|phone|téléphone|helicóptero|helicopter|hélicoptère/i.test(value)),id,field+'.alt','Jason_Duval_08 shows a pistol beside an aircraft, not a phone or helicopter.');
 figures++;
}
for(const article of articles){
 const id=article.id;
 check(typeof id==='string'&&id.length>0&&!seenIDs.has(id),id,'id','Missing or duplicate article ID.');seenIDs.add(id);
 for(const field of ['title','slug','excerpt','body','tag'])three(article[field],id,field);
 for(const [li,locale] of locales.entries()){
  const url=catalogue.articlePath(locale,article);
  check(!paths.has(url),id,'path.'+locale,'Duplicate localized article URL.');paths.add(url);
  for(const field of ['title','excerpt','body']){
   const value=article[field]?.[li];if(typeof value!=='string')continue;
   const key=locale+':'+field+':'+normalize(value);
   check(!fields.has(key),id,field+'.'+locale,'Exact duplicate of '+fields.get(key));fields.set(key,id);
  }
 }
 check(date(article.published),id,'published','Invalid publication date.');check(date(article.updated),id,'updated','Invalid modification date.');
 check(article.updated>=article.published,id,'updated','Modification precedes original publication.');
 check(article.published<=today&&article.updated<=today,id,'dates','Public article dates must not be in the future.');
 check(Array.isArray(article.sections)&&article.sections.length>0,id,'sections','Article has no sections.');
 const en=[];
 for(const [i,section]of article.sections.entries()){
  const base='sections.'+i;three(section.heading,id,base+'.heading');
  check(Array.isArray(section.paragraphs)&&section.paragraphs.length>0,id,base+'.paragraphs','Section has no prose.');
  for(const [j,paragraph]of section.paragraphs.entries()){three(paragraph,id,base+'.paragraphs.'+j);if(typeof paragraph[1]==='string')en.push(paragraph[1]);}
  if(section.paragraphHeadings!==undefined){
   check(Array.isArray(section.paragraphHeadings),id,base+'.paragraphHeadings','Subheadings must be an array.');
   const positions=new Set();
   for(const [j,item]of(Array.isArray(section.paragraphHeadings)?section.paragraphHeadings:[]).entries()){
    const location=base+'.paragraphHeadings.'+j;
    check(Number.isInteger(item.beforeParagraph)&&item.beforeParagraph>=0&&item.beforeParagraph<section.paragraphs.length,id,location,'Subheading must precede an existing paragraph.');
    check(!positions.has(item.beforeParagraph),id,location,'Two subheadings cannot target the same paragraph.');positions.add(item.beforeParagraph);
    three(item.heading,id,location+'.heading');
   }
  }
  if(section.table){
   check(section.table.headers.length>0,id,base+'.table','Missing table headers.');
   for(const [j,header]of section.table.headers.entries())three(header,id,base+'.table.headers.'+j);
   for(const [j,row]of section.table.rows.entries()){
    check(row.length===section.table.headers.length,id,base+'.table.rows.'+j,'Table row/header width mismatch.');
    for(const [k,cell]of row.entries())three(cell,id,base+'.table.rows.'+j+'.'+k);
   }
  }
  for(const [j,group]of(section.codeGroups??[]).entries()){
   three(group.heading,id,base+'.codeGroups.'+j+'.heading');
   for(const [k,row]of group.rows.entries()){three(row.effect,id,base+'.codeGroups.'+j+'.rows.'+k+'.effect');check(typeof row.code==='string'&&row.code.trim(),id,base+'.codeGroups.'+j+'.rows.'+k+'.code','Missing cheat input.');}
  }
  if(section.image)image(section.image.key,section.image.alt,section.image.caption,id,base+'.image');
  for(const ref of section.references??[])check(validURL(ref.url),id,base+'.references','Invalid source URL.');
 }
 image(article.image,article.imageAlt,article.imageCaption,id,'image');
 check(Array.isArray(article.sources)&&article.sources.length>0,id,'sources','Missing source list.');
 for(const source of article.sources)check(validURL(source.url)&&typeof source.label==='string'&&source.label.trim(),id,'sources','Invalid or unlabelled source URL.');
 if(!article.sections.some(section=>section.references?.length))warnings.push({id,type:'source_placement',detail:'Sources exist at article end; consider adjacent citations during a verified substantive update.'});
 const words=normalize(en.join(' ')).split(' ');sets.push(new Set(words.slice(0,-4).map((_,index)=>words.slice(index,index+5).join(' '))));
}
for(let i=0;i<articles.length;i++)for(let j=i+1;j<articles.length;j++){
 const a=sets[i],b=sets[j];if(!a.size||!b.size)continue;
 let common=0;for(const value of(a.size<b.size?a:b))if((a.size<b.size?b:a).has(value))common++;
 const similarity=common/(a.size+b.size-common);
 if(similarity>=.35)warnings.push({ids:[articles[i].id,articles[j].id],type:'similar_prose_review',jaccard:Number(similarity.toFixed(3)),detail:'Review search intent manually. Shared safety instructions or related game mechanics can be legitimate; never merge, redirect or exclude automatically.'});
}
const result={topics:articles.length,versions:paths.size,media_uses:figures,errors,warnings,limits:['Similarity is a review signal, not proof of duplication or a Google indexation diagnosis.','The audit checks local catalogue integrity, not source truth, search volume or Google indexing.']};
if(process.argv.includes('--json'))console.log(JSON.stringify(result,null,2));
else{console.log(`Editorial audit: ${articles.length} topics, ${paths.size} language URLs, ${figures} media uses; ${errors.length} errors and ${warnings.length} review notices.`);for(const error of errors)console.error(JSON.stringify(error));}
if(errors.length)process.exitCode=1;
