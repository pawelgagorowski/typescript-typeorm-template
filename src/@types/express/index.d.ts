// import JwtUserDecoded from '@server/types';

declare module 'http' {
  interface IncomingHttpHeaders {
    'refresh-token'?: string;
  }
}

declare namespace Express {
  export interface Request {
    user: {
      userId: number;
    };
  }
}
