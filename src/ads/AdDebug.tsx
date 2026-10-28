import { useEffect, useRef, useState } from 'react';
import { getAdDiagnostics } from './diagnostics';
import type { AdDiagnosticSnapshot } from './diagnostics';

const labels:Record<AdDiagnosticSnapshot['status'],string>={
 'not-requested':'Todavía no solicitado',
 loading:'Cargando etiqueta',
 'script-loaded':'Script descargado',
 'load-error':'Error al cargar el script',
 'runtime-error':'Error al ejecutar el script',
 'writer-error':'Error al insertar contenido',
 'runtime-warning':'Aviso de ejecución',
 'resource-warning':'Aviso de un recurso',
 'csp-warning':'Aviso de la política de seguridad',
};

export default function AdDebug(){
 const [visible,setVisible]=useState(false);
 const [snapshots,setSnapshots]=useState<AdDiagnosticSnapshot[]>([]);
 const reportField=useRef<HTMLTextAreaElement>(null);
 useEffect(()=>{
  if(new URLSearchParams(window.location.search).get('ads-debug')!=='1')return;
  const update=()=>setSnapshots(getAdDiagnostics());
  window.addEventListener('fansgta:ads-diagnostic',update);
  update();setVisible(true);
  return ()=>window.removeEventListener('fansgta:ads-diagnostic',update);
 },[]);
 if(!visible)return null;
 const report=['Diagnóstico de publicidad — FansGTA',
  'Script descargado no confirma que se haya mostrado un anuncio real.',
  ...snapshots.flatMap(snapshot=>[
   '',`${snapshot.unit} · unidad ${snapshot.id} · ${labels[snapshot.status]}`,
   ...snapshot.events.map(event=>`${event.time} · ${labels[event.kind]}${event.message?' · '+event.message:''}${event.source?' · '+event.source:''}`),
  ]),
 ].join('\n');
 return <aside aria-label="Diagnóstico de publicidad" style={{margin:'24px auto',padding:16,width:'min(960px, calc(100% - 32px))',boxSizing:'border-box',border:'1px solid #6e4769',borderRadius:8,background:'#141220',color:'#f4f4f8',fontSize:13,lineHeight:1.6}}>
  <h2 style={{fontSize:18,margin:'0 0 8px'}}>Diagnóstico de publicidad</h2>
  <p style={{margin:'0 0 10px'}}>Este informe se activa solo con <code>?ads-debug=1</code>. Permanece en esta página y no se envía a ningún servidor. Las direcciones se muestran sin parámetros ni fragmentos.</p>
  <p style={{margin:'0 0 10px'}}>Que el script se haya descargado no confirma que aparezca un anuncio real. Un aviso tampoco demuestra por sí solo un bloqueo del navegador.</p>
  <ul style={{paddingLeft:20,margin:'0 0 12px'}}>{snapshots.map(snapshot=><li key={snapshot.unit}><strong>{snapshot.unit}</strong> · unidad {snapshot.id}: {labels[snapshot.status]}</li>)}</ul>
  <label htmlFor="fansgta-ad-diagnostic-report" style={{display:'block',marginBottom:6}}>Informe para seleccionar y copiar</label>
  <textarea id="fansgta-ad-diagnostic-report" ref={reportField} readOnly value={report} rows={12} spellCheck={false} style={{display:'block',width:'100%',maxWidth:'100%',boxSizing:'border-box',padding:10,border:'1px solid #6e4769',borderRadius:4,background:'#080a12',color:'#f4f4f8',fontSize:12,lineHeight:1.5,resize:'vertical'}}/>
  <button type="button" onClick={()=>{reportField.current?.focus();reportField.current?.select();}} style={{marginTop:10,padding:'8px 12px',border:'1px solid #a46b98',borderRadius:4,background:'#251a2c',color:'#fff'}}>Seleccionar informe</button>
 </aside>;
}
