
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { CartItem } from "@/components/menu/CartItem";
import { Badge } from "@/components/ui/badge";
import { mockMenuItems } from "@/data/mockData";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartSheetProps = {
  cart: CartItemType[];
  totalItems: number;
  totalPrice: number;
  whatsAppNumber: string;
  setWhatsAppNumber: (number: string) => void;
  onAddToCart: (item: any) => void;  // Changed from (itemId: string) to accept an item object
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onProceedToPay: () => void;
};

export function CartSheet({
  cart,
  totalItems,
  totalPrice,
  whatsAppNumber,
  setWhatsAppNumber,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onProceedToPay
}: CartSheetProps) {
  const handleAddToCart = (itemId: string) => {
    const item = mockMenuItems.find(item => item.id === itemId);
    if (item) {
      onAddToCart(item);  // Now passing the full item object instead of just the ID
    }
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
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    image={item.image}
                    onAdd={handleAddToCart}
                    onRemove={onRemoveFromCart}
                  />
                ))}
              </div>
            </ScrollArea>
            
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Your WhatsApp Number</Label>
                <div className="flex gap-2">
                  <Input
                    id="whatsapp-number"
                    placeholder="e.g. +1 202 555 0170"
                    value={whatsAppNumber}
                    onChange={(e) => setWhatsAppNumber(e.target.value)}
                  />
                </div>
                {whatsAppNumber.trim() && (
                  <Button 
                    className="w-full mt-2 flex items-center justify-center gap-2"
                    onClick={onProceedToPay}
                  >
                    Proceed to Table Selection
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={onClearCart}
                >
                  Clear
                </Button>
                <SheetClose asChild>
                  <Button 
                    className="flex-1"
                    onClick={onProceedToPay}
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
