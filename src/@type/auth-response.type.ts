export interface AuthResponse {
    statusCode?: number;
    message: string;
    data: {
      _id: string;
      username: string;
      email: string;
      access_token: string;
      refresh_token: string;
    };
    dateTime: string;
  }