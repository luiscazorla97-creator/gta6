export function mediaPath(image:string){const names:Record<string,string>={city:'vice-city',palms:'lucia',drive:'jason'};return `/media/${names[image]??image}.webp`;}
export const mediaCredit='GTA VI © Rockstar Games · rockstargames.com/VI/media';
