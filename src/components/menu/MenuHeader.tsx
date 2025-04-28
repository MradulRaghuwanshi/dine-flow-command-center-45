
import { CartSheet } from "@/components/menu/CartSheet";

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type MenuHeaderProps = {
  cart: CartItemType[];
  totalItems: number;
  totalPrice: number;
  whatsAppNumber: string;
  setWhatsAppNumber: (number: string) => void;
  onAddToCart: (item: any) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onProceedToPay: () => void;
};

export function MenuHeader({
  cart,
  totalItems,
  totalPrice,
  whatsAppNumber,
  setWhatsAppNumber,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onProceedToPay
}: MenuHeaderProps) {
  return (
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
          <CartSheet 
            cart={cart}
            totalItems={totalItems}
            totalPrice={totalPrice}
            whatsAppNumber={whatsAppNumber}
            setWhatsAppNumber={setWhatsAppNumber}
            onAddToCart={onAddToCart}
            onRemoveFromCart={onRemoveFromCart}
            onClearCart={onClearCart}
            onProceedToPay={onProceedToPay}
          />
        </div>
      </div>
    </header>
  );
}
