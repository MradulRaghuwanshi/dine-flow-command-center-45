
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OffersSlider } from "@/components/offers/OffersSlider";
import { PageFooter } from "@/components/menu/PageFooter";
import { WhatsAppDialog } from "@/components/menu/WhatsAppDialog";
import { MenuHeader } from "@/components/menu/MenuHeader";
import { MenuSearch } from "@/components/menu/MenuSearch";
import { MobileCheckoutButton } from "@/components/menu/MobileCheckoutButton";
import { MenuCategories } from "@/components/menu/MenuCategories";
import { useCart } from "@/hooks/useCart";
import { mockCategories, mockMenuItems } from "@/data/mockData";
import { mockOffers } from "@/data/mockOffers";

export default function OnlineMenu() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["cat1"]);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [isWhatsAppDialogOpen, setIsWhatsAppDialogOpen] = useState(false);
  
  const { cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
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

  const showWhatsAppDialog = () => {
    if (totalItems === 0) return;
    
    if (!whatsAppNumber) {
      setIsWhatsAppDialogOpen(true);
    } else {
      proceedToPay();
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <MenuHeader 
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
      
      <main className="container mx-auto flex-1 px-4 py-6">
        {/* Offers slider */}
        <OffersSlider offers={mockOffers} />
        
        {/* Search bar */}
        <MenuSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Menu categories */}
        <MenuCategories 
          categories={filteredCategories}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          onAddToCart={addToCart}
        />

        {/* Mobile proceed button */}
        <MobileCheckoutButton 
          totalItems={totalItems} 
          totalPrice={totalPrice} 
          onClick={showWhatsAppDialog} 
        />
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
