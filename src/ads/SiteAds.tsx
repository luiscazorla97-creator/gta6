import AdSlot from './AdSlot';
import type {Locale} from '../content';

export function AdBand({locale,position}:{locale:Locale;position:'top'|'bottom'}){
 return <div className={`site-ad-band site-ad-band-${position} shell`} data-ad-placement={position}><AdSlot unit="leaderboard" locale={locale} eager/><AdSlot unit="mobile" locale={locale} eager/></div>;
}
export function AdSideRails({locale}:{locale:Locale}){
 const label=locale==='es'?'Publicidad':locale==='en'?'Advertisement':'Publicité';
 return <>{(['left','right'] as const).map(side=><aside key={side} className={`site-ad-rail site-ad-rail-${side}`} data-ad-placement={side} aria-label={label}><AdSlot unit="sidebar" locale={locale} eager/></aside>)}</>;
}
