
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type MobileCheckoutButtonProps = {
  totalItems: number;
  totalPrice: number;
  onClick: () => void;
};

export function MobileCheckoutButton({ 
  totalItems, 
  totalPrice, 
  onClick 
}: MobileCheckoutButtonProps) {
  if (totalItems === 0) return null;
  
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:hidden">
      <Button 
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-6"
        onClick={onClick}
      >
        Proceed to Table Selection ({totalItems} items • ₹{totalPrice.toFixed(2)})
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
