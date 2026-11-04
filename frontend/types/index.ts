export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in Rupees (₹)
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

export interface CustomizationOptions {
  temperature?: 'Hot' | 'Iced';
  milk?: 'Whole Milk' | 'Oat Velvet' | 'Almond Cream' | 'Pistachio Milk' | 'Macadamia' | 'No Milk';
  sweetness?: 'Unsweetened' | 'Light (25%)' | 'Regular (50%)' | 'Extra Sweet' | 'Madagascar Vanilla' | 'Spiced Brown Sugar' | 'Wildflower Honey';
  extraShots?: number;
  specialNotes?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  customization?: CustomizationOptions;
  itemTotal: number;
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
  items: {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    temperature?: string;
    milk?: string;
    sweetness?: string;
  }[];
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
