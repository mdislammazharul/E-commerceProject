import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouters } from './app/modules/products/product.route';
import { OrderRouters } from './app/modules/orders/order.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', ProductRouters);
app.use('/api', OrderRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
