// imports
import * as express from 'express';
import userRoute from './routes/user';
import discRoute from './routes/disc';
import storeRoute from './routes/store';
import { auth } from 'express-oauth2-jwt-bearer';
import env from './env';

// todo coalesce from master file or env
import 'dotenv/config'; // todo remove dep on dotenv
const checkJwt = auth({
  issuerBaseURL: env.ISSUER_BASE_URL,
  audience: env.AUDIENCE
});

const app = express();
const PORT = parseInt(env.PORT);

app.use(express.json());

// use express router
app.use('/api/user', userRoute);
app.use('/api/disc', discRoute);
app.use('/api/store', storeRoute);

// TODO remove
app.get('/api/test', checkJwt, (req, res) => {
  res.json({ msg: 'Validated!' });
});

app.listen(PORT, () => console.log(`API Listening on port ${PORT}`));
