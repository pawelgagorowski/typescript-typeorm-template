// declare namespace Nodejs {
//   export interface ProcessEnv {
//     ACCESS_TOKEN_SECRET: string;
//   }
// }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
    }
  }
}

export {};
