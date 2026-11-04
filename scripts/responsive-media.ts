import {createHash} from 'node:crypto';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import type {Plugin} from 'vite';

export async function responsiveMedia(){
 const directory=path.resolve('public/media');
 const cache=path.resolve('node_modules/.cache/fansgta-responsive-media');
 const files=await Promise.all((await readdir(directory)).filter(n=>n.endsWith('.webp')).map(async name=>{
  const bytes=await readFile(path.join(directory,name));
  const metadata=await sharp(bytes).metadata();
  const width=metadata.width!;
  const crop=name==='hero-motion-helicopter.webp'?await sharp(bytes).trim({background:'#00000000',threshold:0}).webp({lossless:true}).toBuffer({resolveWithObject:true}):undefined;
  const trim=crop?{left:-crop.info.trimOffsetLeft!,top:-crop.info.trimOffsetTop!,width:crop.info.width,height:crop.info.height}:undefined;
  const avif=['vice-city.webp','hero-motion-background.webp'].includes(name);
  // At <=480px the existing 620px-tall, centred cover hides these side columns.
  // Keep the original vertical resolution and every pixel visible in that crop.
  const phoneWidth=avif?Math.min(width,Math.ceil(metadata.height!*480/620)+3):undefined;
  return{name,key:name.slice(0,-5),bytes,width,widths:crop?[]:[480,800,1200].filter(w=>w<width),version:createHash('sha256').update(bytes).update('webp84-avif55-phone620x480-effort4-v2').digest('hex').slice(0,12),avif,phoneWidth,height:metadata.height!,trim,trimBytes:crop?.data};
 }));
 const manifest=Object.fromEntries(files.map(f=>[f.key,{version:f.version,widths:f.widths,width:f.width,avif:f.avif,phone:!!f.phoneWidth,...(f.trim?{trim:f.trim}:{})}]));
 const plugin:Plugin={name:'fansgta-responsive-media',async generateBundle(){
  await mkdir(cache,{recursive:true});
  for(const f of files)if(f.trimBytes)this.emitFile({type:'asset',fileName:`responsive/${f.version}/${f.key}-trimmed.webp`,source:f.trimBytes});
  for(const f of files)if(f.phoneWidth)for(const format of ['avif','webp'] as const){
   const name=`${f.key}-phone.${format}`,file=path.join(cache,`${f.version}-${name}`);
   let bytes:Buffer;
   try{bytes=await readFile(file);}catch{
    const image=sharp(f.bytes).extract({left:Math.floor((f.width-f.phoneWidth)/2),top:0,width:f.phoneWidth,height:f.height});
    bytes=await(format==='avif'?image.avif({quality:55,effort:4}):image.webp({quality:84,effort:4})).toBuffer();await writeFile(file,bytes);
   }
   this.emitFile({type:'asset',fileName:`responsive/${f.version}/${name}`,source:bytes});
  }
  const jobs=files.flatMap(f=>[
   ...f.widths.map(width=>({file:f,width,format:'webp' as const})),
   ...(f.avif?[...f.widths,f.width].map(width=>({file:f,width,format:'avif' as const})):[]),
  ]);
  let cursor=0;
  await Promise.all([0,1].map(async()=>{
   while(cursor<jobs.length){
    const {file,width,format}=jobs[cursor++];
    const name=`${file.key}-${width}.${format}`;
    const cached=path.join(cache,`${file.version}-${name}`);
    let bytes:Buffer;
    try{bytes=await readFile(cached);}catch{
     const image=sharp(file.bytes).resize({width,withoutEnlargement:true});
     bytes=await(format==='avif'?image.avif({quality:55,effort:4}):image.webp({quality:84,effort:4})).toBuffer();
     await writeFile(cached,bytes);
    }
    this.emitFile({type:'asset',fileName:`responsive/${file.version}/${name}`,source:bytes});
   }
  }));
 }};
 return{manifest,plugin};
}
