import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_token_secret: process.env.JWT_TOKEN_SECRET,
  jwt_token_expires_in: process.env.JWT_TOKEN_EXPIRES_IN,

  sslcz_store_id: process.env.SSLCOMMERZ_STORE_ID,
  sslcz_store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,

  sslcz_success_url: process.env.SSLCOMMERZ_SUCCESS_URL,
  sslcz_fail_url: process.env.SSLCOMMERZ_FAIL_URL,
  sslcz_cancel_url: process.env.SSLCOMMERZ_CANCEL_URL,
  sslcz_ipn_url: process.env.SSLCOMMERZ_IPN_URL,
};
