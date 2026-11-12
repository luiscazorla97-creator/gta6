import {readFile} from 'node:fs/promises';
import {test,expect} from '@playwright/test';
import {copy} from '../.ssr/entry-server.js';

// This is a regression of generated release output. The production301 normally
// hides the fallback file; a legal page must never overwrite its body or head.
test('root fallback remains the complete Spanish homepage after legal pages render',async()=>{
 const [root,home]=await Promise.all([readFile('dist/index.html','utf8'),readFile('dist/es/index.html','utf8')]);
 expect(root).toBe(home);
 const head=root.split('</head>')[0];
 expect(head).toContain('rel="canonical" href="https://fansgta.com/es/"');
 expect(head).toContain('property="og:url" content="https://fansgta.com/es/"');
 const h1=[...root.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(match=>match[1].replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
 expect(h1).toEqual([copy.es.hero.join(' ')]);
 expect(root).not.toContain('<h1>Contacto y correcciones</h1>');
 const schemas=[...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>JSON.parse(match[1]));
 expect(schemas.some(schema=>schema['@type']==='WebSite'&&schema.url==='https://fansgta.com')).toBe(true);
 expect(schemas.some(schema=>schema['@type']==='ContactPage')).toBe(false);
});
