import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'express-async-errors';
const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';

app.use(express.json());
app.use(cookieParser());

function errorHandling(err, req, res, next) {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const msg = err.message || 'something went wrong, try again later';
  res.status(statusCode).json({ msg });
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/products', productRouter);
app.use(errorHandling);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGOOSE_URI);
  app.listen(port, () => console.log(`server running on PORT ${port}...`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
