import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Search, 
  PlusCircle, 
  MinusCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { mockCategories, mockMenuItems } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import PromotionSlider from "@/components/menu/PromotionSlider";
import { formatCurrency } from "@/utils/paymentUtils";

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
  const [offersList, setOffersList] = useState([
    {
      id: "promo1",
      title: "50% Off on All Appetizers",
      description: "Valid on weekdays from 3 PM to 6 PM",
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000",
      linkUrl: "/online-menu#appetizers",
    },
    // Add more offers here or get from localStorage/mock for now
  ]);
  const navigate = useNavigate();

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
        // Increment quantity if item already in cart
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        // Add new item to cart
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
        // Decrement quantity if more than 1
        return prevCart.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        // Remove item from cart
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

  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // Store cart in localStorage for use in checkout process
    localStorage.setItem("dineflow-cart", JSON.stringify(cart));
    localStorage.setItem("dineflow-total", totalPrice.toString());
    
    // Navigate to table selection page
    navigate("/online-menu/table-selection");
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-white px-1.5 py-0.5 rounded-full text-xs">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <ScrollArea className="flex-1 mt-4 pr-4 h-[calc(100vh-12rem)]">
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(item.price)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <MinusCircle className="h-4 w-4" />
                              </Button>
                              <span className="w-5 text-center">{item.quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => addToCart(mockMenuItems.find(menuItem => menuItem.id === item.id)!)}
                              >
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    
                    <div className="mt-4 space-y-4">
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">{formatCurrency(totalPrice)}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={clearCart}
                        >
                          Clear
                        </Button>
                        <SheetClose asChild>
                          <Button 
                            className="flex-1"
                            onClick={handleCheckout}
                          >
                            Checkout
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
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
        {/* Promotion Slider */}
        <PromotionSlider promotions={offersList} />
        
        <div className="grid gap-6">
          {mockCategories.map((category) => {
            const categoryItems = filteredMenuItems.filter(
              (item) => item.category === category.id && item.available
            );
            
            if (categoryItems.length === 0) return null;
            
            const isExpanded = expandedCategories.includes(category.id);
            
            return (
              <Card key={category.id}>
                <CardHeader 
                  className="cursor-pointer py-4" 
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex justify-between items-center">
                    <CardTitle>{category.name}</CardTitle>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col p-4 rounded-lg border bg-card"
                        >
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(item.price)}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge 
                                  variant={item.available ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {item.available ? "Available" : "Unavailable"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-sm line-clamp-2 text-muted-foreground">
                              {item.description}
                            </p>
                            <Button 
                              size="sm"
                              onClick={() => addToCart(item)}
                              disabled={!item.available}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
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
