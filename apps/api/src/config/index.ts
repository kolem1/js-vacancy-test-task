import { z } from 'zod';

import { configUtil } from 'utils';

/**
 * Specify your environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
const schema = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  IS_DEV: z.preprocess(() => process.env.APP_ENV === 'development', z.boolean()),
  PORT: z.coerce.number().optional().default(3001),
  MONGO_URI: z.string(),
  MONGO_DB_NAME: z.string(),
  API_URL: z.string(),
  WEB_URL: z.string(),
  FIREBASE_CREDENTIALS: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  STRIPE_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  SENDGRID_API_KEY: z.string().optional(),
});

type Config = z.infer<typeof schema>;

const config = configUtil.validateConfig<Config>(schema);

export default config;
