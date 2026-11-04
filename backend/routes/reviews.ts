import { Router, Request, Response } from 'express';
import { REVIEWS, Review } from '../data/cafeStore.js';

export const reviewsRouter = Router();

// GET /api/reviews
reviewsRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    reviews: REVIEWS
  });
});

// POST /api/reviews
reviewsRouter.post('/', (req: Request, res: Response) => {
  const { author, city, rating, comment, favoriteItem } = req.body;

  if (!author || !comment || !rating) {
    return res.status(400).json({
      success: false,
      message: 'Author, rating, and review text are required.'
    });
  }

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    author,
    city: city || 'Coffee Lover',
    rating: Math.min(5, Math.max(1, Number(rating))),
    date: 'Just now',
    comment,
    favoriteItem: favoriteItem || 'Signature Brew',
    verifiedVisit: true
  };

  REVIEWS.unshift(newReview);

  res.status(201).json({
    success: true,
    message: 'Thank you for sharing your experience!',
    review: newReview
  });
});
