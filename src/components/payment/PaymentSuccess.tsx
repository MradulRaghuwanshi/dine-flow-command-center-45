
import { Check } from "lucide-react";

interface PaymentSuccessProps {
  selectedTable: number | null;
}

export default function PaymentSuccess({ selectedTable }: PaymentSuccessProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
      <div className="mb-4 flex justify-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">
        Your order has been confirmed for Table {selectedTable}.
      </p>
      <p className="text-sm text-muted-foreground">
        You will be redirected back to the menu shortly...
      </p>
    </div>
  );
}
