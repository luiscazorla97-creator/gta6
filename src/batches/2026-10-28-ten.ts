import { purchaseDetails20261028 } from './2026-10-28-purchase-details';
import { playerGuides20261028 } from './2026-10-28-player-guides';
import { collectorStorage20261028 } from './2026-10-28-collector-storage';
import { comparison20261028 } from './2026-10-28-comparison';
import { preload20261028 } from './2026-10-28-preload';
import type { Article } from '../articles';

const media={label:'Rockstar Games — official GTA VI media: download and share',url:'https://www.rockstargames.com/VI/media'};
export const tenArticles20261028:Article[]=[
 ...collectorStorage20261028,
 ...preload20261028,
 ...purchaseDetails20261028,
 ...playerGuides20261028,
 ...comparison20261028,
].map(article=>({...article,sources:article.sources.some(source=>source.url===media.url)?article.sources:[...article.sources,media]}));
