import { Router, Request, Response } from 'express';
import { SEATING_NOOKS, reservationsStore, Reservation } from '../data/cafeStore.js';

export const reservationsRouter = Router();

// GET /api/reservations/nooks
reservationsRouter.get('/nooks', (_req: Request, res: Response) => {
  res.json({
    success: true,
    nooks: SEATING_NOOKS
  });
});

// GET /api/reservations
reservationsRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    reservations: reservationsStore
  });
});

// POST /api/reservations
reservationsRouter.post('/', (req: Request, res: Response) => {
  const { guestName, guestEmail, guestPhone, nookId, partySize, date, timeSlot, specialRequests } = req.body;

  if (!guestName || !guestEmail || !nookId || !date || !timeSlot) {
    return res.status(400).json({
      success: false,
      message: 'Please provide guest name, email, nook selection, date, and preferred time slot.'
    });
  }

  const selectedNook = SEATING_NOOKS.find(n => n.id === nookId);
  const nookName = selectedNook ? selectedNook.name : 'Main Cafe Seating';

  // Generate friendly reservation code
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const code = `LO-${randomNum}`;

  const newReservation: Reservation = {
    id: `res-${Date.now()}`,
    code,
    guestName,
    guestEmail,
    guestPhone: guestPhone || '',
    nookId,
    nookName,
    partySize: Number(partySize) || 2,
    date,
    timeSlot,
    specialRequests: specialRequests || '',
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  };

  reservationsStore.unshift(newReservation);

  res.status(201).json({
    success: true,
    message: `Table reserved at ${nookName} for ${date} at ${timeSlot}!`,
    reservation: newReservation
  });
});

// GET /api/reservations/:code
reservationsRouter.get('/:code', (req: Request, res: Response) => {
  const reservation = reservationsStore.find(r => r.code.toUpperCase() === req.params.code.toUpperCase());
  if (!reservation) {
    return res.status(404).json({ success: false, message: 'Reservation not found' });
  }
  res.json({ success: true, reservation });
});
