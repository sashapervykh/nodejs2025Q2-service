import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../.env') });

function getEnvVariables() {
  const port = process.env.PORT || 4000;
  return { port };
}

export const config = getEnvVariables();
