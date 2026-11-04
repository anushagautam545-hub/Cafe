import express, { Express, Request, Response } from 'express';
import { menuRouter } from './routes/menu.js';
import { reservationsRouter } from './routes/reservations.js';
import { ordersRouter } from './routes/orders.js';
import { reviewsRouter } from './routes/reviews.js';
import { baristaRouter } from './routes/barista.js';

export function createBackendApp(): Express {
  const app = express();

  app.use(express.json());

  // Mount API routers
  app.use('/api/menu', menuRouter);
  app.use('/api/reservations', reservationsRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/reviews', reviewsRouter);
  app.use('/api/barista', baristaRouter);

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', cafe: 'Sunshine', time: new Date().toISOString() });
  });

  return app;
}
