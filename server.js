import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';

// routers
import authRouter from './routes/authRouter.js';

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGOOSE_URI);
  app.listen(port, () => console.log(`server running on PORT ${port}...`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
