
import { PaymentMethodType } from "@/types/payment";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BadgeDollarSign, CreditCard, IndianRupee, QrCode } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/paymentUtils";

interface PaymentMethodsProps {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  handlePayment: () => void;
  grandTotal: number;
  isProcessing: boolean;
  isSuccess: boolean;
}

export default function PaymentMethods({
  paymentMethod,
  setPaymentMethod,
  handlePayment,
  grandTotal,
  isProcessing,
  isSuccess
}: PaymentMethodsProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Select your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={(value) => setPaymentMethod(value as PaymentMethodType)}
          className="grid grid-cols-1 gap-4"
        >
          <label 
            htmlFor="cash-option"
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "cash" ? "border-primary bg-primary/5" : ""}`}
          >
            <RadioGroupItem value="cash" id="cash-option" />
            <BadgeDollarSign className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium">Cash on Delivery</div>
              <div className="text-sm text-muted-foreground">Pay when your food arrives</div>
            </div>
          </label>
          
          <label 
            htmlFor="qr-option"
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "qr" ? "border-primary bg-primary/5" : ""}`}
          >
            <RadioGroupItem value="qr" id="qr-option" />
            <QrCode className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium">Scan QR Code</div>
              <div className="text-sm text-muted-foreground">Pay using any UPI app</div>
            </div>
          </label>
          
          <label 
            htmlFor="upi-option"
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "upi" ? "border-primary bg-primary/5" : ""}`}
          >
            <RadioGroupItem value="upi" id="upi-option" />
            <IndianRupee className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium">UPI Direct</div>
              <div className="text-sm text-muted-foreground">Open your UPI app directly</div>
            </div>
          </label>
          
          <label 
            htmlFor="card-option"
            className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "card" ? "border-primary bg-primary/5" : ""}`}
          >
            <RadioGroupItem value="card" id="card-option" />
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium">Card Payment</div>
              <div className="text-sm text-muted-foreground">Pay with credit or debit card</div>
            </div>
          </label>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handlePayment}
          disabled={isProcessing || isSuccess}
        >
          {isProcessing ? (
            "Processing payment..."
          ) : isSuccess ? (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Order Complete!
            </span>
          ) : (
            `Pay ${formatCurrency(grandTotal)}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
