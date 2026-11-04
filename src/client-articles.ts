// Only the current report needs its full body for hydration. Listings, search,
// saved articles and language navigation retain the complete article catalogue.
import {clientPageData} from './page-data';
export type {Article} from './articles';
const data=clientPageData();
if(!data)throw new Error('Missing statically rendered FansGTA page data');
export const articles=data.articles;
