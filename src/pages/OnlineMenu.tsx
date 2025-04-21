
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockCategories, mockMenuItems } from "@/data/mockData";
import { toast } from "sonner";
import PromotionSlider from "@/components/menu/PromotionSlider";
import { CartSheet } from "@/components/menu/CartSheet";
import { MenuCategory } from "@/components/menu/MenuCategory";

// Types for cart items
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function OnlineMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(mockCategories.map(c => c.id));
  const [offersList] = useState([
    {
      id: "promo1",
      title: "50% Off on All Appetizers",
      description: "Valid on weekdays from 3 PM to 6 PM",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
      linkUrl: "/online-menu#appetizers",
    },
  ]);

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Filter menu items based on search term
  const filteredMenuItems = mockMenuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add item to cart
  const addToCart = (item: typeof mockMenuItems[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prevCart, { 
          id: item.id, 
          name: item.name, 
          price: item.price, 
          quantity: 1,
          image: item.image
        }];
      }
    });
    
    toast.success(`Added ${item.name} to cart`);
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== itemId);
      }
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">DineFlow Restaurant</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <CartSheet
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              totalItems={totalItems}
              totalPrice={totalPrice}
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search menu..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-1">
        <PromotionSlider promotions={offersList} />
        
        <div className="grid gap-6">
          {mockCategories.map((category) => {
            const categoryItems = filteredMenuItems.filter(
              (item) => item.category === category.id && item.available
            );
            
            if (categoryItems.length === 0) return null;
            
            return (
              <MenuCategory
                key={category.id}
                category={category}
                items={categoryItems}
                isExpanded={expandedCategories.includes(category.id)}
                onToggle={toggleCategory}
                onAddToCart={addToCart}
              />
            );
          })}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">DineFlow Restaurant</h3>
              <p className="text-gray-300">
                Serving quality food since 2020
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <address className="not-italic text-gray-300">
                <p>123 Restaurant Street</p>
                <p>Foodie City, FC 12345</p>
                <p className="mt-2">Phone: (123) 456-7890</p>
                <p>Email: info@dineflow.com</p>
              </address>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Hours</h3>
              <p className="text-gray-300">
                Monday - Friday: 11am - 10pm<br />
                Saturday - Sunday: 10am - 11pm
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 DineFlow Restaurant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
