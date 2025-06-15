import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      id: string;
      // добавьте другие необходимые поля пользователя
    };
  }
} 