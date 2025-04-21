
import { QrCode, Banknote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type PaymentMethod = "upi" | "cash" | null;

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  onSelect: (method: "upi" | "cash") => void;
}

export default function PaymentMethodSelector({ paymentMethod, onSelect }: PaymentMethodSelectorProps) {
  return (
    <div className="grid gap-4">
      <Card 
        className={`
          cursor-pointer transition-all
          ${paymentMethod === "upi" ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}
        `}
        onClick={() => onSelect("upi")}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
            <QrCode className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium">Pay with UPI</h3>
            <p className="text-sm text-muted-foreground">
              Scan QR code or use UPI app
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className={`
          cursor-pointer transition-all
          ${paymentMethod === "cash" ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}
        `}
        onClick={() => onSelect("cash")}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
            <Banknote className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium">Pay with Cash</h3>
            <p className="text-sm text-muted-foreground">
              Pay at the restaurant
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
