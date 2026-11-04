import { Router, Request, Response } from 'express';
import { MENU_ITEMS } from '../data/cafeStore.js';

export const menuRouter = Router();

// GET /api/menu
menuRouter.get('/', (req: Request, res: Response) => {
  const { category, search, dietary } = req.query;

  let results = [...MENU_ITEMS];

  if (category && category !== 'all') {
    results = results.filter(item => item.category === category);
  }

  if (search && typeof search === 'string') {
    const term = search.toLowerCase().trim();
    results = results.filter(
      item =>
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.tastingNotes.some(n => n.toLowerCase().includes(term))
    );
  }

  if (dietary && typeof dietary === 'string') {
    if (dietary === 'gluten-free') {
      results = results.filter(item => !item.allergens?.includes('Gluten'));
    } else if (dietary === 'dairy-free') {
      results = results.filter(item => !item.allergens?.includes('Dairy'));
    }
  }

  res.json({
    success: true,
    count: results.length,
    items: results
  });
});

// GET /api/menu/:id
menuRouter.get('/:id', (req: Request, res: Response) => {
  const item = MENU_ITEMS.find(i => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Menu item not found' });
  }
  res.json({ success: true, item });
});

// GET /api/categories
menuRouter.get('/meta/categories', (_req: Request, res: Response) => {
  const categories = [
    { id: 'all', name: 'Full Menu', description: 'Explore all roasts, brews & kitchen creations' },
    { id: 'coffee', name: 'Espresso & Handcraft', description: 'Signature double shots, smoked syrups & microfoam' },
    { id: 'pour-over', name: 'Slow Pour-Over', description: 'Single-origin micro-lots bloomed to order' },
    { id: 'seasonal', name: 'Autumn & Winter Specials', description: 'Warm spices, citrus oils & cozy creations' },
    { id: 'bakery', name: 'Artisan Viennoiserie', description: 'Laminated French pastries baked fresh every dawn' },
    { id: 'savory', name: 'Kitchen & Tartines', description: 'Heirloom sourdough toast, whipped ricotta & poached eggs' },
    { id: 'tea', name: 'Botanicals & Matcha', description: 'Ceremonial Uji matcha, loose-leaf and herbal infusions' }
  ];
  res.json({ success: true, categories });
});
