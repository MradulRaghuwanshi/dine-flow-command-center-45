
import { Order, OrderItem } from "@/types/order";

// Mock order items
const mockOrderItems: OrderItem[] = [
  {
    id: "item1",
    name: "Margherita Pizza",
    quantity: 1,
    price: 12.99,
  },
  {
    id: "item2",
    name: "Caesar Salad",
    quantity: 1,
    price: 8.99,
  },
  {
    id: "item3",
    name: "Grilled Salmon",
    quantity: 1,
    price: 18.99,
    notes: "Medium rare, no dill sauce",
  },
  {
    id: "item4",
    name: "Spaghetti Carbonara",
    quantity: 2,
    price: 14.99,
  },
  {
    id: "item5",
    name: "Chicken Wings",
    quantity: 1,
    price: 10.99,
    notes: "Extra spicy",
  },
  {
    id: "item6",
    name: "Cheesecake",
    quantity: 1,
    price: 7.99,
  },
  {
    id: "item7",
    name: "Iced Tea",
    quantity: 3,
    price: 3.99,
  },
  {
    id: "item8",
    name: "Beef Burger",
    quantity: 2,
    price: 13.99,
    notes: "No onions, extra cheese",
  },
];

// Generate random order time in the last 24 hours
const getRandomOrderTime = () => {
  const now = new Date();
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  now.setHours(now.getHours() - hours);
  now.setMinutes(now.getMinutes() - minutes);
  return now.toISOString();
};

// Helper to create a random subset of items
const getRandomItems = (): OrderItem[] => {
  const shuffled = [...mockOrderItems].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.max(1, Math.floor(Math.random() * 4)));
};

// Generate mock orders
export const mockOrders: Order[] = [
  {
    id: "order1",
    orderNumber: "1001",
    tableNumber: 5,
    status: "served",
    orderTime: getRandomOrderTime(),
    items: [mockOrderItems[0], mockOrderItems[1]],
    totalAmount: 21.98,
    paymentStatus: "paid",
  },
  {
    id: "order2",
    orderNumber: "1002",
    tableNumber: 8,
    status: "preparing",
    orderTime: getRandomOrderTime(),
    items: [mockOrderItems[2], mockOrderItems[6]],
    totalAmount: 30.96,
    paymentStatus: "pending",
  },
  {
    id: "order3",
    orderNumber: "1003",
    tableNumber: 12,
    status: "pending",
    orderTime: getRandomOrderTime(),
    items: [mockOrderItems[3], mockOrderItems[5]],
    totalAmount: 37.97,
    paymentStatus: "pending",
  },
  {
    id: "order4",
    orderNumber: "1004",
    tableNumber: 3,
    status: "ready",
    orderTime: getRandomOrderTime(),
    items: [mockOrderItems[4], mockOrderItems[6]],
    totalAmount: 22.96,
    paymentStatus: "paid",
  },
  {
    id: "order5",
    orderNumber: "1005",
    tableNumber: 7,
    status: "cancelled",
    orderTime: getRandomOrderTime(),
    items: [mockOrderItems[7]],
    totalAmount: 27.98,
    paymentStatus: "pending",
  },
  {
    id: "order6",
    orderNumber: "1006",
    tableNumber: 9,
    status: "pending",
    orderTime: getRandomOrderTime(),
    items: [mockOrderItems[0], mockOrderItems[4], mockOrderItems[6]],
    totalAmount: 35.96,
    paymentStatus: "pending",
  },
  {
    id: "order7",
    orderNumber: "1007",
    tableNumber: 2,
    status: "preparing",
    orderTime: getRandomOrderTime(),
    items: [mockOrderItems[2], mockOrderItems[5]],
    totalAmount: 26.98,
    paymentStatus: "paid",
  },
  {
    id: "order8",
    orderNumber: "1008",
    tableNumber: 6,
    status: "ready",
    orderTime: getRandomOrderTime(),
    items: getRandomItems(),
    totalAmount: 42.50,
    paymentStatus: "paid",
    customerName: "John Smith",
  },
];

// Mock menu categories
export const mockCategories = [
  { id: "cat1", name: "Appetizers" },
  { id: "cat2", name: "Main Courses" },
  { id: "cat3", name: "Desserts" },
  { id: "cat4", name: "Beverages" },
  { id: "cat5", name: "Specials" },
];

// Mock menu items
export const mockMenuItems = [
  {
    id: "menu1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and basil",
    price: 12.99,
    category: "cat2",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "menu2",
    name: "Caesar Salad",
    description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 8.99,
    category: "cat1",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "menu3",
    name: "Grilled Salmon",
    description: "Fresh salmon fillet with lemon butter sauce and vegetables",
    price: 18.99,
    category: "cat2",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "menu4",
    name: "Spaghetti Carbonara",
    description: "Pasta with creamy egg sauce, pancetta, and parmesan",
    price: 14.99,
    category: "cat2",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "menu5",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: 9.99,
    category: "cat3",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&h=300&fit=crop",
    available: true,
  },
  {
    id: "menu6",
    name: "Mojito",
    description: "Refreshing cocktail with rum, mint, lime, and soda",
    price: 7.99,
    category: "cat4",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&h=300&fit=crop",
    available: true,
  },
];
