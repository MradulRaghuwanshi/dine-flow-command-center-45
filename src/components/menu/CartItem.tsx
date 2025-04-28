
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from "lucide-react";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartItem({ id, name, price, quantity, image, onAdd, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-md overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">
          ₹{price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onRemove(id)}
        >
          <MinusCircle className="h-4 w-4" />
        </Button>
        <span className="w-5 text-center">{quantity}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onAdd(id)}
        >
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
