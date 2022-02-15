import { auth } from 'express-oauth2-jwt-bearer';
import env from '../env';

// TODO catch err
const checkJwt = auth({
  issuerBaseURL: env.ISSUER_BASE_URL,
  audience: env.AUDIENCE
});

export default checkJwt;