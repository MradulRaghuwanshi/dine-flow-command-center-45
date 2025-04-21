
import { ShoppingCart, PlusCircle, MinusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { formatCurrency } from "@/utils/paymentUtils";
import { useNavigate } from "react-router-dom";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

interface CartSheetProps {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export function CartSheet({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  totalItems,
  totalPrice
}: CartSheetProps) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    localStorage.setItem("dineflow-cart", JSON.stringify(cart));
    localStorage.setItem("dineflow-total", totalPrice.toString());
    navigate("/online-menu/table-selection");
  };

  return (
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
                        onClick={() => addToCart(item)}
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
  );
}
