import { readdir,readFile,stat } from 'node:fs/promises';
import { join,dirname } from 'node:path';
const files=[];
async function walk(path){for(const entry of await readdir(path,{withFileTypes:true})){const full=join(path,entry.name);if(entry.isDirectory())await walk(full);else if(entry.name.endsWith('.html'))files.push(full);}}
await walk('dist');const problems=[];let links=0,schemas=0;
for(const file of files){const html=await readFile(file,'utf8');if(file.includes('/ads/')){if(!html.includes('noindex,nofollow'))problems.push(`${file}: ad document is indexable`);continue;}
 const headings=[...html.matchAll(/<h1[\s>]/g)];if(headings.length!==1)problems.push(`${file}: expected one H1, found ${headings.length}`);
 for(const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{const data=JSON.parse(block[1]);if(!data['@type'])throw Error('missing type');schemas++;}catch{problems.push(`${file}: invalid structured data`);}}
 for(const [,href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)){
  if(/^(https?:|mailto:|tel:)/.test(href))continue;
  links++;const [pathname,fragment]=href.split('#');let target=pathname?pathname.startsWith('/')?join('dist',pathname):join(dirname(file),pathname):file;
  try{if((await stat(target)).isDirectory())target=join(target,'index.html');await stat(target);if(fragment){const content=target===file?html:await readFile(target,'utf8');if(!content.includes(`id="${fragment}"`))problems.push(`${file}: missing anchor ${href}`);}}catch{problems.push(`${file}: broken internal link ${href}`);}
 }
}
if(problems.length)throw Error(problems.join('\n'));
console.log(`Verified ${files.length} HTML files, ${links} internal links and ${schemas} structured-data blocks.`);
