import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import {responsiveMedia} from './scripts/responsive-media';
export default defineConfig(async({isSsrBuild,command})=>{
 const {manifest,plugin}=await responsiveMedia();
 return{plugins:[react(),tailwindcss(),...(command==='build'&&!isSsrBuild?[plugin]:[]),{
  name:'fansgta-page-data',enforce:'pre' as const,
  resolveId(source:string,importer?:string){
   if(command==='build'&&!isSsrBuild&&importer&&path.resolve(path.dirname(importer),source)==path.resolve('src/articles'))return path.resolve('src/client-articles.ts');
  },
 }],define:{__MEDIA_VARIANTS__:JSON.stringify(manifest)}};
});
