declare module 'express' {
  export interface Request {
    user?: UserTokenPayload;
  }
}
export type UserTokenPayload = { id: string; role: string; username: string };
