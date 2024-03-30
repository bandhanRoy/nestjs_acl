declare namespace Express {
  export interface Request {
    user?: UserTokenPayload;
  }
}
export type UserTokenPayload = { id: string; role: string; username: string };
