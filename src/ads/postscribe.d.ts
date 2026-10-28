declare module 'postscribe' {
 type Token = { tagName?: string; src?: string; attrs?: Record<string, string> };
 type Options = {
  releaseAsync?: boolean;
  beforeWriteToken?: (token: Token) => Token;
  done?: () => void;
  error?: (error: unknown) => void;
 };
 export default function postscribe(element: HTMLElement, html: string, options: Options): unknown;
}
