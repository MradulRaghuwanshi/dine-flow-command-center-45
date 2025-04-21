
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { formatCurrency } from "@/utils/paymentUtils";

interface UpiPaymentProps {
  totalPrice: number;
  onPay: () => void;
  qrCodeUrl: string;
}

export default function UpiPayment({ totalPrice, onPay, qrCodeUrl }: UpiPaymentProps) {
  return (
    <div className="mt-4 p-6 bg-white rounded-lg border flex flex-col items-center">
      <h3 className="font-medium mb-4">Scan QR Code to Pay</h3>
      <div className="mb-4">
        <img 
          src={qrCodeUrl} 
          alt="Payment QR Code" 
          className="w-48 h-48 object-contain"
        />
      </div>
      <p className="text-sm text-center text-muted-foreground mb-4">
        Scan the QR code using any UPI app to complete payment
      </p>
      <Button 
        className="w-full"
        onClick={onPay}
      >
        <IndianRupee className="h-4 w-4 mr-2" />
        Pay {formatCurrency(totalPrice)}
      </Button>
    </div>
  );
}
