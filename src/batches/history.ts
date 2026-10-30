import {earlyHistories} from './history-early';
import {threeDHistories} from './history-3d';
import {portableHistories} from './history-portable';
import {hdHistories} from './history-hd';
import {modernHistories} from './history-modern';
export const historyArticles=[...earlyHistories,...threeDHistories,...portableHistories,...hdHistories,...modernHistories].sort((a,b)=>a.history!.order-b.history!.order);
