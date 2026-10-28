import { useEffect } from 'react';
import { popunder } from './config';
// No frequency is simulated locally. Provider frequency must be verified first.
// eligible defaults to false; deployment configuration cannot silently enable site-wide loading.
export default function AdsterraPopunder({eligible=false}:{eligible?:boolean}){useEffect(()=>{if(!popunder.enabled||!popunder.frequencyVerifiedByProvider||!eligible)return;const id='fansgta-adsterra-popunder';if(document.getElementById(id))return;const script=document.createElement('script');script.id=id;script.dataset.cfasync='false';script.src=popunder.src;script.async=true;document.body.appendChild(script);return()=>{script.remove();};},[eligible]);return null;}
