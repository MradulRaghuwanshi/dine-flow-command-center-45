
import { formatCurrency } from "@/utils/paymentUtils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  cart: CartItem[];
  totalPrice: number;
  selectedTable: number | null;
}

export default function OrderSummary({ cart, totalPrice, selectedTable }: OrderSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h3 className="font-medium mb-4">Order Summary</h3>
      <div className="space-y-2 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.quantity} × {item.name}</span>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Tax (included)</span>
          <span>{formatCurrency(totalPrice * 0.1)}</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span>Total</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      </div>
      <div className="mt-4 bg-blue-50 p-3 rounded text-sm text-blue-700">
        Your order will be served at Table {selectedTable}
      </div>
    </div>
  );
}
