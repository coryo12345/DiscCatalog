// imports
import * as express from 'express';
import userRoute from './routes/user';
import discRoute from './routes/disc';
import storeRoute from './routes/store';

const app = express();
const PORT = process.env.port ? process.env.port : 3001;

app.use(express.json());

// use express router
app.use('/api/user', userRoute);
app.use('/api/disc', discRoute);
app.use('/api/store', storeRoute);

app.listen(PORT, () => console.log(`API Listening on port ${PORT}`));
