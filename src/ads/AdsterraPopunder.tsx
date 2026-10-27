import { useEffect } from 'react';
import { popunder } from './config';
import { useAds } from './AdManager';
// No frequency is simulated locally. Provider frequency must be verified first.
// eligible defaults to false; deployment configuration cannot silently enable site-wide loading.
export default function AdsterraPopunder({eligible=false}:{eligible?:boolean}){const {choice}=useAds();useEffect(()=>{if(!popunder.enabled||!popunder.frequencyVerifiedByProvider||!eligible||choice!=='accepted')return;const id='fansgta-adsterra-popunder';if(document.getElementById(id))return;const script=document.createElement('script');script.id=id;script.dataset.cfasync='false';script.src=popunder.src;script.async=true;document.body.appendChild(script);return()=>{script.remove();};},[choice,eligible]);return null;}
