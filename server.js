import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'express-async-errors';
const app = express();
import mongoose from 'mongoose';

// routers
import authRouter from './routes/authRouter.js';

app.use(express.json());

function errorHandling(err, req, res, next) {
  res.status(500).json({ msg: err.message });
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/auth', authRouter);
app.use(errorHandling);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGOOSE_URI);
  app.listen(port, () => console.log(`server running on PORT ${port}...`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
