
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OffersSlider } from "@/components/offers/OffersSlider";
import { mockOffers } from "@/data/mockOffers";
import { Input } from "@/components/ui/input";
import { Search, Phone } from "lucide-react";
import { mockCategories, mockMenuItems } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MenuCategory } from "@/components/menu/MenuCategory";
import { CartSheet } from "@/components/menu/CartSheet";
import { WhatsAppDialog } from "@/components/menu/WhatsAppDialog";
import { PageFooter } from "@/components/menu/PageFooter";

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
  const [offers] = useState(mockOffers);
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const savedNumber = localStorage.getItem("dineflow-whatsapp");
    if (savedNumber) {
      setWhatsAppNumber(savedNumber);
    }
  }, []);

  const filteredMenuItems = mockMenuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const proceedToPay = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    if (!whatsAppNumber.trim()) {
      setIsWhatsAppDialogOpen(true);
      return;
    }
    
    localStorage.setItem("dineflow-cart", JSON.stringify(cart));
    localStorage.setItem("dineflow-total", totalPrice.toString());
    localStorage.setItem("dineflow-whatsapp", whatsAppNumber);
    
    navigate("/online-menu/table-selection");
  };

  const handleWhatsAppSubmit = () => {
    if (!whatsAppNumber.trim()) {
      toast.error("Please enter your WhatsApp number");
      return;
    }
    
    localStorage.setItem("dineflow-whatsapp", whatsAppNumber);
    setIsWhatsAppDialogOpen(false);
    
    proceedToPay();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">DineFlow Restaurant</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {whatsAppNumber && (
              <Badge variant="outline" className="flex items-center gap-1 mr-2">
                <Phone className="h-3 w-3" />
                {whatsAppNumber}
              </Badge>
            )}
            <CartSheet 
              cart={cart}
              totalItems={totalItems}
              totalPrice={totalPrice}
              whatsAppNumber={whatsAppNumber}
              setWhatsAppNumber={setWhatsAppNumber}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              onProceedToPay={proceedToPay}
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
      
      <main className="container mx-auto px-4 py-6">
        <OffersSlider offers={offers} />
        
        <div className="grid gap-6">
          {mockCategories.map((category) => {
            const categoryItems = filteredMenuItems.filter(
              (item) => item.category === category.id && item.available
            );
            
            return (
              <MenuCategory
                key={category.id}
                id={category.id}
                name={category.name}
                items={categoryItems}
                isExpanded={expandedCategories.includes(category.id)}
                onToggle={toggleCategory}
                onAddToCart={addToCart}
              />
            );
          })}
        </div>
      </main>
      
      <PageFooter />
      
      <WhatsAppDialog 
        open={isWhatsAppDialogOpen}
        onOpenChange={setIsWhatsAppDialogOpen}
        whatsAppNumber={whatsAppNumber}
        setWhatsAppNumber={setWhatsAppNumber}
        onSubmit={handleWhatsAppSubmit}
      />
    </div>
  );
}
