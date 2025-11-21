import dotenv from 'dotenv';
import path from 'path';

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const ENV = {
  PORT: process.env.PORT || '4000',
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_change_me'
};

if (!ENV.MONGODB_URI) {
  console.warn('[WARN] MONGODB_URI is not set. Backend will fail to connect.');
}
