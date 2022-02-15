import * as fs from 'fs';
import path = require('path');

// build creds
const envFile = path.resolve(__dirname, '../../.env');
// Variables to look for & defaults
const env = {
  POSTGRES_PASSWORD: '',
  POSTGRES_USER: '',
  POSTGRES_DB: '',
  DB_HOST: '',
  ISSUER_BASE_URL: '',
  AUDIENCE: '',
  DOMAIN: '',
  CLIENT_ID: '',
  PORT: '3001',
};
let envObj = {};
try {
  const envData = fs.readFileSync(envFile, 'utf-8');
  // override file exists
  envObj = envData.split('\n').reduce((prev, curr) => {
    let [a, b] = curr.split('=');
    // @ts-expect-error
    prev[a] = b;
    return prev;
  }, {});
} catch (err: any) {
  // override file can't be read: attempt to use process env
  envObj = process.env;
}

Object.keys(env).forEach((key: any) => {
  // @ts-expect-error
  if (envObj[key] != undefined) { // use default value if not provided
    // @ts-expect-error
    env[key] = envObj[key];
  }
});

export default env;
