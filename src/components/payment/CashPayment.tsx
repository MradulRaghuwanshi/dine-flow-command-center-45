
import { Button } from "@/components/ui/button";

interface CashPaymentProps {
  onConfirm: () => void;
}

export default function CashPayment({ onConfirm }: CashPaymentProps) {
  return (
    <div className="mt-4 p-6 bg-white rounded-lg border">
      <h3 className="font-medium mb-2">Pay with Cash</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Please confirm your order. You can pay cash at the restaurant.
      </p>
      <Button 
        className="w-full"
        onClick={onConfirm}
      >
        Confirm Order
      </Button>
    </div>
  );
}
