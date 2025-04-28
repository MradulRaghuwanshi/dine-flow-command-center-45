import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OffersSlider } from "@/components/offers/OffersSlider";
import { MenuCategory } from "@/components/menu/MenuCategory";
import { CartSheet } from "@/components/menu/CartSheet";
import { WhatsAppDialog } from "@/components/menu/WhatsAppDialog";
import { PageFooter } from "@/components/menu/PageFooter";
import { mockCategories, mockMenuItems } from "@/data/mockData";
import { mockOffers } from "@/data/mockOffers";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";

type MenuItemType = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  available: boolean;
  image: string;
};

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function OnlineMenu() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["cat1"]);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  const [cartShown, setCartShown] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addToCart = (item: MenuItemType) => {
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
  };

  const proceedToPay = () => {
    if (whatsAppNumber.trim()) {
      // Store cart and user info in sessionStorage
      sessionStorage.setItem('cart', JSON.stringify(cart));
      sessionStorage.setItem('whatsAppNumber', whatsAppNumber);
      
      // Navigate to table selection
      navigate('/online-menu/table-selection');
    } else {
      // Open WhatsApp dialog if number not provided
      setIsWhatsAppDialogOpen(true);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Filter menu items based on search
  const filteredCategories = mockCategories.map(category => {
    const items = mockMenuItems
      .filter(item => item.category === category.id)
      .filter(item => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search)
        );
      });
    
    return {
      ...category,
      items
    };
  });

  const showWhatsAppDialog = () => {
    if (totalItems === 0) return;
    
    if (!whatsAppNumber) {
      setIsWhatsAppDialogOpen(true);
    } else {
      proceedToPay();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://api.iconify.design/fluent-emoji:fork-and-knife-with-plate.svg"
              alt="DineFlow"
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold">DineFlow Restaurant</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {totalItems > 0 && (
              <Button size="sm" onClick={showWhatsAppDialog} className="hidden sm:flex items-center gap-2">
                Proceed to Table Selection
                <ArrowRight className="h-4 w-4" />
              </Button>
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
      </header>
      
      <main className="container mx-auto flex-1 px-4 py-6">
        {/* Offers slider */}
        <OffersSlider offers={mockOffers} />
        
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search menu items..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Menu categories */}
        <div className="space-y-6 mb-6">
          {filteredCategories.map(category => (
            <MenuCategory
              key={category.id}
              id={category.id}
              name={category.name}
              items={category.items}
              isExpanded={expandedCategories.includes(category.id)}
              onToggle={toggleCategory}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Mobile proceed button */}
        {totalItems > 0 && (
          <div className="fixed bottom-4 left-4 right-4 sm:hidden">
            <Button className="w-full flex items-center justify-center gap-2" onClick={showWhatsAppDialog}>
              Proceed to Table Selection ({totalItems} items • ₹{totalPrice.toFixed(2)})
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
      
      <WhatsAppDialog
        open={isWhatsAppDialogOpen}
        onOpenChange={setIsWhatsAppDialogOpen}
        whatsAppNumber={whatsAppNumber}
        setWhatsAppNumber={setWhatsAppNumber}
        onSubmit={proceedToPay}
      />
      
      <PageFooter />
    </div>
  );
}
