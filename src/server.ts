import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
