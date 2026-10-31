// Public unit identifiers, not credentials. Edit through the protected Git repository,
// then build/deploy; no public administrative endpoint exists.
export const adUnits = {
 rectangle: {id:'31958938',key:'cf50f394892c74101f4ddcb1687fd6d8',width:300,height:250,enabled:true,placement:'inline'},
 sidebar: {id:'31958939',key:'bda767ca1714356b89730236ba25d4cd',width:160,height:300,enabled:true,placement:'sidebar'},
 mobile: {id:'31958940',key:'dbf84eee9139b77715547797e3baa939',width:320,height:50,enabled:true,placement:'mobile'},
 leaderboard: {id:'31958941',key:'76e914df6023257984f6fc04bbf3313e',width:728,height:90,enabled:true,placement:'desktop'},
 native: {id:'31958937',key:'cbd880f526c21f808d22e8b7905e4e68',width:0,height:360,enabled:true,placement:'native'},
} as const;
export type AdUnitName=keyof typeof adUnits;
// The single publisher script lives in index.html, before </head>.
// Its frequency and window behaviour belong to the provider and browser.
export const popunder = {id:'31958936',src:'https://abscloud.org/1/411b396510ae8d6a491f3f094ff61658',enabled:true,providerFrequencyVerified:false};
