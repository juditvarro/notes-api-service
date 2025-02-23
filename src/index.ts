import express from 'express';
import notes from './routes/notes.js';
import { connectDb } from './config/db.js';
import { httpLogger } from './middlewares/httpLogger.js';
import { errorHandler } from './middlewares/error.js';

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error(`Environment variable 'MONGO_URL' is not defined`);
}
await connectDb(mongoUrl);

const app = express();

app.use(express.json());
app.use(httpLogger);
app.use('/api/notes', notes);
app.use(errorHandler);

const port = process.env.PORT || 5555;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
