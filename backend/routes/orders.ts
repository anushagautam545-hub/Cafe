import { Router, Request, Response } from 'express';
import { ordersStore, Order, OrderItem, CustomerDetails } from '../data/cafeStore.js';

export const ordersRouter = Router();

// POST /api/orders
ordersRouter.post('/', (req: Request, res: Response) => {
  const { customerDetails, items, paymentMethod, tip } = req.body;

  if (!customerDetails || !customerDetails.name || !customerDetails.phone) {
    return res.status(400).json({
      success: false,
      message: 'Full name and contact phone number are required.'
    });
  }

  if (customerDetails.orderType === 'delivery' && (!customerDetails.address || !customerDetails.pincode)) {
    return res.status(400).json({
      success: false,
      message: 'Delivery address and pincode are required for doorstep delivery.'
    });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Order requires at least one item.'
    });
  }

  const subtotal = items.reduce((sum: number, item: OrderItem) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // Standard 5% cafe GST
  const tax = Math.round(subtotal * 0.05);
  const tipAmount = Number(tip) || 0;
  const total = subtotal + tax + tipAmount;

  const orderNum = Math.floor(1000 + Math.random() * 9000);
  const estimatedTime = customerDetails.orderType === 'delivery'
    ? '25–30 mins'
    : customerDetails.orderType === 'dine-in'
    ? '8–12 mins'
    : '12–15 mins';

  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: `#SUN-${orderNum}`,
    customerDetails: customerDetails as CustomerDetails,
    items,
    subtotal,
    tax,
    tip: tipAmount,
    total,
    estimatedTime,
    paymentMethod: paymentMethod || 'upi',
    status: 'brewing',
    createdAt: new Date().toISOString()
  };

  ordersStore.unshift(newOrder);

  res.status(201).json({
    success: true,
    message: 'Order successfully placed at Sunshine Cafe!',
    order: newOrder
  });
});

// GET /api/orders/:id
ordersRouter.get('/:id', (req: Request, res: Response) => {
  const order = ordersStore.find(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, order });
});
