import type {Article} from '../articles';
export {section as s,image,edge,ign,official,media,internal} from './2026-10-29-deep-shared';
export function make30(a:Omit<Article,'published'|'updated'|'body'>):Article{return {...a,published:'2026-10-30',updated:'2026-10-30',body:a.sections[0].paragraphs[0]};}
