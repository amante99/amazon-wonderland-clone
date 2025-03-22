export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  tags: string[];
  bestSeller?: boolean;
  stock: number;
  freeShipping?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
  },
  {
    id: "books",
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    featured: true,
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "grocery",
    name: "Grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium noise-cancelling wireless headphones. Perfect for work, travel, or relaxation.",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviewCount: 1256,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["headphones", "wireless", "audio"],
    bestSeller: true,
    stock: 42,
    freeShipping: true,
  },
  {
    id: "p2",
    name: "Professional Camera Kit",
    description: "Capture stunning photos and videos with this professional-grade camera kit. Includes multiple lenses and accessories.",
    price: 1299.99,
    rating: 4.9,
    reviewCount: 438,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["camera", "photography", "professional"],
    stock: 15,
  },
  {
    id: "p3",
    name: "Slim Fit Cotton T-Shirt",
    description: "Ultra-soft, breathable cotton t-shirt with a modern slim fit. Available in multiple colors.",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviewCount: 2103,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "clothing",
    tags: ["t-shirt", "cotton", "casual"],
    bestSeller: true,
    stock: 230,
    freeShipping: true,
  },
  {
    id: "p4",
    name: "Smart Home Assistant",
    description: "Control your home with voice commands. This smart assistant connects to your devices for seamless automation.",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 3542,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["smart home", "assistant", "automation"],
    bestSeller: true,
    stock: 78,
    freeShipping: true,
  },
  {
    id: "p5",
    name: "Premium Chef's Knife",
    description: "Precision-crafted chef's knife for professional and home kitchens. Made with high-carbon stainless steel.",
    price: 79.99,
    rating: 4.9,
    reviewCount: 876,
    image: "https://images.unsplash.com/photo-1593618999876-f94c0b20ae25?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    tags: ["kitchen", "cooking", "chef"],
    stock: 54,
  },
  {
    id: "p6",
    name: "Bestselling Novel Collection",
    description: "A collection of five bestselling novels from acclaimed authors. Perfect gift for book lovers.",
    price: 49.99,
    originalPrice: 65.99,
    rating: 4.6,
    reviewCount: 421,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "books",
    tags: ["books", "novel", "reading"],
    stock: 120,
    freeShipping: true,
  },
  {
    id: "p7",
    name: "Ergonomic Office Chair",
    description: "Premium ergonomic chair designed for comfort during long work hours. Adjustable height and lumbar support.",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviewCount: 932,
    image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    tags: ["furniture", "office", "chair"],
    stock: 28,
  },
  {
    id: "p8",
    name: "Wireless Charging Station",
    description: "3-in-1 wireless charging station for your smartphone, smartwatch, and earbuds. Sleek, modern design.",
    price: 39.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviewCount: 1078,
    image: "https://images.unsplash.com/photo-1583863640393-97f176a03197?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["charger", "wireless", "smartphone"],
    bestSeller: true,
    stock: 63,
    freeShipping: true,
  },
  {
    id: "p9",
    name: "Ultra HD Smart TV",
    description: "Experience stunning visuals with this 55-inch Ultra HD smart TV. Integrated with all popular streaming services.",
    price: 699.99,
    originalPrice: 899.99,
    rating: 4.8,
    reviewCount: 745,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["tv", "smart tv", "entertainment"],
    stock: 17,
  },
  {
    id: "p10",
    name: "Premium Coffee Maker",
    description: "Programmable coffee maker with built-in grinder. Makes the perfect cup of coffee every time.",
    price: 129.99,
    rating: 4.6,
    reviewCount: 1238,
    image: "https://images.unsplash.com/photo-1570287196161-36f2e3d33f9b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    tags: ["coffee", "kitchen", "appliance"],
    stock: 41,
    freeShipping: true,
  },
  {
    id: "p11",
    name: "Fitness Smartwatch",
    description: "Track your health and fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, and more.",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 2035,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["smartwatch", "fitness", "wearable"],
    bestSeller: true,
    stock: 89,
    freeShipping: true,
  },
  {
    id: "p12",
    name: "Leather Weekender Bag",
    description: "Handcrafted genuine leather weekender bag. Perfect for short trips and stylish travel.",
    price: 179.99,
    rating: 4.8,
    reviewCount: 672,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "clothing",
    tags: ["bag", "leather", "travel"],
    stock: 23,
  },
];

export const electronicsProducts: Product[] = [
  {
    id: "e1",
    name: "Smart LED TV - 55 inch",
    description: "4K Ultra HD Smart LED TV with voice control and multiple streaming apps",
    price: 699.99,
    originalPrice: 899.99,
    rating: 4.6,
    reviewCount: 873,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["tv", "smart home", "entertainment"],
    stock: 25,
    freeShipping: true,
  },
  {
    id: "e2",
    name: "Laptop Pro X",
    description: "Ultra-thin laptop with powerful processor, 16GB RAM and 512GB SSD",
    price: 1299.99,
    rating: 4.8,
    reviewCount: 654,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["laptop", "computer", "work"],
    bestSeller: true,
    stock: 18,
  },
  {
    id: "e3",
    name: "Wireless Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable RGB lighting and programmable buttons",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 427,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "electronics",
    tags: ["gaming", "mouse", "computer accessories"],
    stock: 42,
  }
];

export const clothingProducts: Product[] = [
  {
    id: "c1",
    name: "Men's Classic Suit",
    description: "Tailored fit suit in charcoal gray, perfect for professional occasions",
    price: 299.99,
    rating: 4.7,
    reviewCount: 382,
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "clothing",
    tags: ["men", "formal", "suit"],
    stock: 31,
  },
  {
    id: "c2",
    name: "Women's Summer Dress",
    description: "Light and flowy summer dress with floral pattern",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 287,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "clothing",
    tags: ["women", "summer", "dress"],
    bestSeller: true,
    stock: 47,
    freeShipping: true,
  },
  {
    id: "c3",
    name: "Casual Denim Jacket",
    description: "Classic denim jacket with comfortable fit, great for layering",
    price: 89.99,
    rating: 4.6,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "clothing",
    tags: ["denim", "jacket", "casual"],
    stock: 38,
  }
];

export const homeProducts: Product[] = [
  {
    id: "h1",
    name: "Luxury Bedding Set",
    description: "Premium 100% Egyptian cotton bedding set with duvet cover and pillowcases",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 456,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    tags: ["bedding", "bedroom", "luxury"],
    bestSeller: true,
    stock: 22,
    freeShipping: true,
  },
  {
    id: "h2",
    name: "Smart Home Thermostat",
    description: "Programmable smart thermostat with energy-saving features and app control",
    price: 129.99,
    rating: 4.7,
    reviewCount: 328,
    image: "https://images.unsplash.com/photo-1567935850829-e52d7bfe37ce?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    tags: ["smart home", "energy", "thermostat"],
    stock: 19,
  },
  {
    id: "h3",
    name: "Modern Coffee Table",
    description: "Minimalist design coffee table with tempered glass top and wooden legs",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.6,
    reviewCount: 187,
    image: "https://images.unsplash.com/photo-1567016376408-0226e4d0b046?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "home",
    tags: ["furniture", "living room", "modern"],
    stock: 12,
  }
];

export const booksProducts: Product[] = [
  {
    id: "b1",
    name: "The Midnight Library",
    description: "Between life and death there is a library, and within that library, the shelves go on forever.",
    price: 16.99,
    rating: 4.8,
    reviewCount: 723,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "books",
    tags: ["fiction", "bestseller", "novel"],
    bestSeller: true,
    stock: 45,
    freeShipping: true,
  },
  {
    id: "b2",
    name: "The Art of Cooking",
    description: "Comprehensive cookbook with easy-to-follow recipes and cooking techniques",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "books",
    tags: ["cookbook", "food", "recipes"],
    stock: 28,
  },
  {
    id: "b3",
    name: "World History Encyclopedia",
    description: "Illustrated guide to world history from ancient civilizations to modern times",
    price: 49.99,
    rating: 4.9,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "books",
    tags: ["history", "education", "reference"],
    stock: 17,
  }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};

export const getFeaturedCategories = (): Category[] => {
  return categories.filter(category => category.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getRecommendedProducts = (): Product[] => {
  return [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(8, products.length));
};

export const getAllCategoryProducts = (categoryId: string): Product[] => {
  switch(categoryId) {
    case "electronics":
      return electronicsProducts;
    case "clothing":
      return clothingProducts;
    case "home":
      return homeProducts;
    case "books":
      return booksProducts;
    default:
      return products.filter(product => product.category === categoryId);
  }
};

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'credit_card' | 'paypal' | 'bank_transfer';
    lastFour?: string;
  };
}

export const sampleOrders: Order[] = [
  {
    id: "ORD-2023-001",
    date: "2023-10-15",
    status: "delivered",
    total: 348.97,
    items: [
      {
        product: products[0], // Premium Wireless Headphones
        quantity: 1,
        price: 249.99
      },
      {
        product: products[2], // Slim Fit Cotton T-Shirt
        quantity: 2,
        price: 19.99
      },
      {
        product: products[7], // Wireless Charging Station
        quantity: 1,
        price: 39.99
      }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Austin",
      state: "Texas",
      zipCode: "78701",
      country: "United States"
    },
    paymentMethod: {
      type: "credit_card",
      lastFour: "4242"
    }
  },
  {
    id: "ORD-2023-002",
    date: "2023-11-02",
    status: "shipped",
    total: 229.98,
    items: [
      {
        product: products[10], // Fitness Smartwatch
        quantity: 1,
        price: 199.99
      },
      {
        product: products[5], // Bestselling Novel Collection
        quantity: 1,
        price: 29.99
      }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Austin",
      state: "Texas",
      zipCode: "78701",
      country: "United States"
    },
    paymentMethod: {
      type: "paypal"
    }
  },
  {
    id: "ORD-2023-003",
    date: "2023-12-10",
    status: "processing",
    total: 129.99,
    items: [
      {
        product: products[9], // Premium Coffee Maker
        quantity: 1,
        price: 129.99
      }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Austin",
      state: "Texas",
      zipCode: "78701",
      country: "United States"
    },
    paymentMethod: {
      type: "credit_card",
      lastFour: "1234"
    }
  }
];

export const getUserOrders = (): Order[] => {
  return sampleOrders;
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
