import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3005', 10),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    enabled: true,
  },
}));
