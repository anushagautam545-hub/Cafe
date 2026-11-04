export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in Indian Rupees (₹)
  category: 'coffee' | 'pour-over' | 'seasonal' | 'bakery' | 'savory' | 'tea';
  roast?: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  origin?: string;
  tastingNotes: string[];
  allergens?: string[];
  calories?: number;
  popular?: boolean;
  seasonal?: boolean;
  temperatureOptions?: ('Hot' | 'Iced')[];
  milkOptionsAvailable?: boolean;
  rating: number;
  reviewCount: number;
  prepTimeMinutes: number;
  badge?: string;
  accentColor: string;
  imageUrl: string;
}

export interface SeatingNook {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  atmosphere: string[];
  bestFor: string;
  availableSlots: string[];
  icon: string;
  accentBg: string;
  imageUrl: string;
}

export interface Reservation {
  id: string;
  code: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  nookId: string;
  nookName: string;
  partySize: number;
  date: string;
  timeSlot: string;
  specialRequests?: string;
  createdAt: string;
  status: 'confirmed' | 'seated' | 'cancelled';
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  temperature?: 'Hot' | 'Iced';
  milk?: string;
  sweetness?: string;
  extraEspressoShots?: number;
  specialNotes?: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
  orderType: 'delivery' | 'pickup' | 'dine-in';
  address?: string;
  flatNo?: string;
  landmark?: string;
  city?: string;
  pincode?: string;
  tableNumber?: string;
  instructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  estimatedTime: string;
  paymentMethod: 'upi' | 'cod' | 'card_online' | 'counter_pay';
  status: 'received' | 'brewing' | 'out_for_delivery' | 'delivered';
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  favoriteItem: string;
  verifiedVisit: boolean;
}

// Initial Menu Items with Real Aesthetic Food Photography & Prices in Rupees (₹)
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'cappuccino-valencia',
    name: 'Valencia Orange Cappuccino',
    tagline: 'Sun-dried orange peel infused microfoam over double espresso',
    description: 'Double shot of our signature estate espresso topped with silky steamed milk, kissed with organic candied orange zest and dusted with raw Venezuelan cocoa.',
    price: 240,
    category: 'seasonal',
    roast: 'Medium',
    origin: 'Chikmagalur & Yirgacheffe',
    tastingNotes: ['Candied Citrus', 'Velvety Cocoa', 'Warm Honey'],
    calories: 145,
    popular: true,
    seasonal: true,
    temperatureOptions: ['Hot', 'Iced'],
    milkOptionsAvailable: true,
    rating: 4.9,
    reviewCount: 142,
    prepTimeMinutes: 4,
    badge: 'Seasonal Favorite',
    accentColor: '#D97706',
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'smoked-vanilla-latte',
    name: 'Hearth-Smoked Vanilla Latte',
    tagline: 'House-smoked Madagascar bourbon vanilla with oat velvet',
    description: 'Slow-simmered Madagascar bourbon vanilla beans smoked with applewood shavings, combined with our dark espresso and silky steamed oat milk.',
    price: 260,
    category: 'coffee',
    roast: 'Medium-Dark',
    origin: 'Araku Valley & Guatemala',
    tastingNotes: ['Applewood Smoke', 'Brown Sugar', 'Bourbon Vanilla'],
    calories: 180,
    popular: true,
    temperatureOptions: ['Hot', 'Iced'],
    milkOptionsAvailable: true,
    rating: 4.95,
    reviewCount: 310,
    prepTimeMinutes: 4,
    badge: 'Signature Brew',
    accentColor: '#B45309',
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chemex-geisha',
    name: 'Panama Boquete Geisha Chemex',
    tagline: 'Rare micro-lot poured with hand-calibrated bloom',
    description: 'A transcendent pour-over experience. Delicate jasmine florals, bergamot tea notes, and sweet white peach finish. Brewed fresh table-side in a Japanese glass carafe.',
    price: 360,
    category: 'pour-over',
    roast: 'Light',
    origin: 'Boquete Highlands (1,850m)',
    tastingNotes: ['Jasmine Blossom', 'Bergamot', 'White Peach'],
    calories: 5,
    popular: true,
    temperatureOptions: ['Hot'],
    milkOptionsAvailable: false,
    rating: 5.0,
    reviewCount: 88,
    prepTimeMinutes: 7,
    badge: 'Award Winner',
    accentColor: '#C2410C',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'kyoto-cold-drip',
    name: '12-Hour Kyoto Slow Drip Cold Brew',
    tagline: 'Gravity-extracted cold brew over pure mountain water',
    description: 'Crafted drop-by-drop through an antique glass siphon tower over 12 hours. Supremely smooth with zero bitterness, layered with dark chocolate liqueur notes.',
    price: 260,
    category: 'coffee',
    roast: 'Medium',
    origin: 'Single Estate Coorg',
    tastingNotes: ['Dark Chocolate', 'Black Cherry', 'Cacao Nibs'],
    calories: 10,
    popular: true,
    temperatureOptions: ['Iced'],
    milkOptionsAvailable: true,
    rating: 4.88,
    reviewCount: 196,
    prepTimeMinutes: 2,
    badge: 'Limited Batch',
    accentColor: '#451A03',
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ceremonial-matcha-cloud',
    name: 'Ceremonial Uji Matcha Cloud',
    tagline: 'Stone-ground Kyoto matcha with house lavender cloud',
    description: 'First-harvest ceremonial grade matcha whisked with bamboo chasen, poured over creamy pistachio-oat milk and crowned with a delicate lavender foam.',
    price: 280,
    category: 'tea',
    origin: 'Uji, Kyoto, Japan',
    tastingNotes: ['Umami Grassiness', 'Spring Flora', 'Sweet Lavender'],
    calories: 160,
    popular: true,
    temperatureOptions: ['Hot', 'Iced'],
    milkOptionsAvailable: true,
    rating: 4.92,
    reviewCount: 224,
    prepTimeMinutes: 5,
    badge: 'Staff Pick',
    accentColor: '#15803D',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cortado-terracotta',
    name: 'Classic Terracotta Cortado',
    tagline: 'Equal parts velvety microfoam and rich double ristretto',
    description: 'Served in a handcrafted terracotta tumbler. The purist’s harmony of dense, sweet espresso cut with an equal volume of warm, silk-textured whole milk.',
    price: 190,
    category: 'coffee',
    roast: 'Medium-Dark',
    origin: 'Shevaroys Estate',
    tastingNotes: ['Toasted Hazelnut', 'Molasses', 'Creamy Nougat'],
    calories: 85,
    temperatureOptions: ['Hot'],
    milkOptionsAvailable: true,
    rating: 4.85,
    reviewCount: 167,
    prepTimeMinutes: 3,
    accentColor: '#78350F',
    imageUrl: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cardamom-rose-flatwhite',
    name: 'Spiced Cardamom & Rose Flat White',
    tagline: 'Cracked green cardamom pods and organic rose water steam',
    description: 'Warm comfort in a cup. A double ristretto steeped with crushed Idukki cardamom, poured with glossy microfoam and a whisper of organic Damascus rose mist.',
    price: 250,
    category: 'seasonal',
    roast: 'Medium',
    origin: 'Wayanad, Kerala',
    tastingNotes: ['Green Cardamom', 'Rose Water', 'Cinnamon Bark'],
    calories: 150,
    seasonal: true,
    temperatureOptions: ['Hot', 'Iced'],
    milkOptionsAvailable: true,
    rating: 4.91,
    reviewCount: 112,
    prepTimeMinutes: 4,
    badge: 'Sunshine Special',
    accentColor: '#BE185D',
    imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'almond-croissant-brûlée',
    name: 'Brûléed Almond Frangipane Croissant',
    tagline: 'Double-baked French sourdough laminated with pure churned butter',
    description: 'Flaky, buttery layers filled with rich roasted almond cream, topped with toasted sliced almonds and caramelized raw turbinado sugar for a delicate crackle.',
    price: 210,
    category: 'bakery',
    allergens: ['Dairy', 'Gluten', 'Tree Nuts (Almonds)'],
    tastingNotes: ['Toasted Almond', 'Flaky Normandy Butter', 'Caramelized Turbinado'],
    calories: 380,
    popular: true,
    rating: 4.98,
    reviewCount: 420,
    prepTimeMinutes: 2,
    badge: 'Baked Fresh at Dawn',
    accentColor: '#92400E',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pain-au-chocolat-hazelnut',
    name: 'Valrhona Dark Chocolate Babka Knot',
    tagline: 'Twisted brioche woven with 70% dark chocolate & sea salt',
    description: 'Fluffy golden brioche dough rolled with slow-melted Valrhona Guanaja chocolate, roasted Piedmont hazelnuts, and crunchy Maldon sea salt flakes.',
    price: 220,
    category: 'bakery',
    allergens: ['Dairy', 'Gluten', 'Tree Nuts (Hazelnuts)'],
    tastingNotes: ['70% Dark Chocolate', 'Roasted Hazelnut', 'Maldon Flake'],
    calories: 340,
    popular: true,
    rating: 4.9,
    reviewCount: 280,
    prepTimeMinutes: 2,
    accentColor: '#3E2723',
    imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cardamom-morning-bun',
    name: 'Swedish Kardemummabulle (Cardamom Knot)',
    tagline: 'Braided sourdough knot perfumed with freshly ground cardamom',
    description: 'Traditional Scandinavian morning bun folded with golden butter, brown sugar, and freshly crushed green cardamom seed pearls, baked to a caramelized bronze.',
    price: 180,
    category: 'bakery',
    allergens: ['Dairy', 'Gluten'],
    tastingNotes: ['Green Cardamom', 'Brown Butter', 'Caramelized Sugar'],
    calories: 290,
    rating: 4.87,
    reviewCount: 150,
    prepTimeMinutes: 2,
    badge: 'Baker’s Pick',
    accentColor: '#A16207',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'avocado-poached-egg-tartine',
    name: 'Whipped Ricotta & Heirloom Tartine',
    tagline: 'Charred seeded country sourdough with hot honey drizzle',
    description: 'Thick toasted artisanal levain sourdough topped with lemon-whipped sheep’s milk ricotta, sliced avocado, shaved radishes, soft-poached pasture-raised farm egg, and spicy thyme wildflower honey.',
    price: 320,
    category: 'savory',
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    tastingNotes: ['Whipped Sheep Ricotta', 'Spicy Wildflower Honey', 'Seeded Sourdough'],
    calories: 460,
    popular: true,
    rating: 4.94,
    reviewCount: 230,
    prepTimeMinutes: 10,
    badge: 'Brunch Favorite',
    accentColor: '#4D7C0F',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'wild-mushroom-toast',
    name: 'Forest Mushroom & Truffle Toast',
    tagline: 'Pan-seared chanterelles, thyme butter, and melted gruyère',
    description: 'Foraged chanterelles and king oyster mushrooms sauteed in brown butter and fresh thyme, layered over aged Swiss Gruyère on toasted sourdough with micro greens.',
    price: 340,
    category: 'savory',
    allergens: ['Dairy', 'Gluten'],
    tastingNotes: ['Pan-Seared Chanterelles', 'Aged Gruyère', 'Fresh Thyme Butter'],
    calories: 490,
    rating: 4.89,
    reviewCount: 175,
    prepTimeMinutes: 11,
    accentColor: '#3F6212',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80'
  }
];

export const SEATING_NOOKS: SeatingNook[] = [
  {
    id: 'nook-fireplace',
    name: 'The Fireside Hearth',
    tagline: 'Crackling warmth & plush leather armchairs',
    description: 'Centered around our authentic stone fireplace. Features deep vintage leather chairs, warm wool throws, and soft amber lamplight. Ideal for long conversations or solitary reading.',
    capacity: '2–4 Guests',
    atmosphere: ['Warm Hearth', 'Low Ambient Noise', 'Wool Blankets', 'Board Games'],
    bestFor: 'Intimate talks, rainy afternoons & quiet book reading',
    availableSlots: ['08:30 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'],
    icon: 'Flame',
    accentBg: '#FEF3C7',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nook-sunlit-window',
    name: 'Sunlit Window Bay',
    tagline: 'Golden morning light & streetscape views',
    description: 'Surrounded by large arched oak windows overlooking the cobblestone courtyard. Sun-drenched oak benches with linen cushions and hanging pothos vines.',
    capacity: '1–2 Guests',
    atmosphere: ['Natural Sunlight', 'Courtyard View', 'Lush Plants', 'Morning Sun'],
    bestFor: 'Morning journaling, coffee dates & people watching',
    availableSlots: ['08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM'],
    icon: 'Sun',
    accentBg: '#FFFBEB',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nook-library-corner',
    name: 'The Library Alcove',
    tagline: 'Antique oak bookshelves & private writing desks',
    description: 'Tucked quietly behind floor-to-ceiling mahogany shelves stocked with curated art, poetry, and philosophy books. Equipped with silent brass reading lamps and laptop power ports.',
    capacity: '1–3 Guests',
    atmosphere: ['Quiet Zone', 'Power Sockets', 'Brass Desk Lamps', 'Curated Books'],
    bestFor: 'Deep focus work, creative writing & study sessions',
    availableSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'],
    icon: 'BookOpen',
    accentBg: '#F3E8FF',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'nook-garden-veranda',
    name: 'Secret Garden Veranda',
    tagline: 'Covered glass terrace amidst jasmine & olive trees',
    description: 'A heated four-season glass terrace surrounded by fragrant potted jasmine, olive trees, and hanging terra-cotta lanterns. Fresh breeze with cozy overhead radiant heaters.',
    capacity: '2–6 Guests',
    atmosphere: ['Botanical Scents', 'Glass Ceiling', 'Radiant Heaters', 'Open-Air Feel'],
    bestFor: 'Brunch gatherings, weekend catch-ups & celebration coffees',
    availableSlots: ['09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM'],
    icon: 'Flower2',
    accentBg: '#ECFDF5',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Sharma',
    city: 'Bangalore / Resident',
    rating: 5,
    date: 'Yesterday',
    comment: 'Sunshine is my morning sanctuary. Sitting by the sunlit window with their Hearth-Smoked Vanilla Latte and a warm almond croissant is the highlight of my week. The baristas know their beans with true craftsmanship.',
    favoriteItem: 'Hearth-Smoked Vanilla Latte',
    verifiedVisit: true
  },
  {
    id: 'rev-2',
    author: 'Kabir Mehta',
    city: 'Architect & Writer',
    rating: 5,
    date: '3 days ago',
    comment: 'The acoustic atmosphere is brilliant. Gentle melodies, warm morning sunlight, and zero chaotic noise. The Panama Boquete Geisha Chemex had delicate jasmine and peach notes that were pure poetry.',
    favoriteItem: 'Panama Boquete Geisha Chemex',
    verifiedVisit: true
  },
  {
    id: 'rev-3',
    author: 'Rhea & Dev',
    city: 'Weekend Brunchers',
    rating: 5,
    date: 'Last weekend',
    comment: 'We reserved the Secret Garden Veranda for our Sunday brunch. The whipped ricotta sourdough tartine with hot honey is unbelievable. Sunshine is easily the best aesthetic cafe experience in town.',
    favoriteItem: 'Whipped Ricotta & Heirloom Tartine',
    verifiedVisit: true
  }
];

export const reservationsStore: Reservation[] = [
  {
    id: 'res-sample-1',
    code: 'SUN-8821',
    guestName: 'Ananya Roy',
    guestEmail: 'ananya@example.com',
    guestPhone: '+91 98765 43210',
    nookId: 'nook-sunlit-window',
    nookName: 'Sunlit Window Bay',
    partySize: 2,
    date: 'Today',
    timeSlot: '11:00 AM',
    specialRequests: 'Celebrating a creative milestone',
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  }
];

export const ordersStore: Order[] = [];
