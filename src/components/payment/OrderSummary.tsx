
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/payment";
import { calculateTotals, formatCurrency } from "@/utils/paymentUtils";
import { IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OrderSummaryProps {
  items: CartItem[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const { totalPrice, tax, grandTotal } = calculateTotals(items);
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.quantity}x {item.name}</span>
            <span>
              <span className="inline-flex items-center gap-1">
                <IndianRupee className="h-3 w-3" />
                {item.price.toFixed(2)}
              </span>
            </span>
          </div>
        ))}
        
        <Separator />
        
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
