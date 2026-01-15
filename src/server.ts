import express from 'express';
import cors from 'cors';
import router from './routes/routes';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

