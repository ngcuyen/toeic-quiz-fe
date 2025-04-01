export type TokenDecoded = {
    _id: string;
    email: string;
    username: string;
    role: string;
    token_type: string;
    iat: number;
    exp: number;
  }