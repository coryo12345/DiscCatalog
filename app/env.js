import fs from 'fs';
import path from 'path';

// build db creds
const envFile = path.resolve(__dirname, '../.env');
const env = {
  DOMAIN: '',
  CLIENT_ID: '',
  AUDIENCE: '',
};
let envObj
try {
  const envData = fs.readFileSync(envFile, 'utf-8');
  // override file exists
  envObj = envData.split('\n').reduce((prev, curr) => {
    const [a, b] = curr.split('=');
    prev[a] = b;
    return prev;
  }, {});
} catch (err) {
  // override file can't be read: assuming env variables are set
  envObj = process.env;
}

// record only what we expect
Object.keys(env).forEach(key => {
  env[key] = envObj[key];
});

module.exports = env;
