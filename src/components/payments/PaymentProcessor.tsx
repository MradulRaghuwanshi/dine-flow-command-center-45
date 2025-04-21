
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, AlertCircle, CreditCard, IndianRupee, Banknote } from "lucide-react";
import { processPayment, PaymentMethod, formatCurrency, PaymentResult } from "@/utils/paymentUtils";

type PaymentProcessorProps = {
  orderId: string;
  orderAmount: number;
  onPaymentComplete: (result: PaymentResult) => void;
};

export default function PaymentProcessor({ 
  orderId, 
  orderAmount, 
  onPaymentComplete 
}: PaymentProcessorProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setResult(null);
    
    try {
      // Process the payment
      const paymentResult = await processPayment(orderAmount, paymentMethod);
      
      // Update state with result
      setResult(paymentResult);
      
      // Call the callback
      onPaymentComplete(paymentResult);
      
      // Show toast notification
      if (paymentResult.success) {
        toast({
          title: "Payment Successful",
          description: paymentResult.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Payment Failed",
          description: paymentResult.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      const errorResult: PaymentResult = {
        success: false,
        message: "An unexpected error occurred. Please try again.",
        amount: orderAmount
      };
      
      setResult(errorResult);
      onPaymentComplete(errorResult);
      
      toast({
        title: "Error",
        description: "An unexpected error occurred during payment processing.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Get the appropriate icon for the payment method
  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'cash':
        return <Banknote className="h-5 w-5" />;
      case 'card':
        return <CreditCard className="h-5 w-5" />;
      case 'upi':
        return <IndianRupee className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Process Payment
        </CardTitle>
        <CardDescription>
          Process payment for Order #{orderId}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Amount
            </label>
            <div className="text-2xl font-bold flex items-center">
              <IndianRupee className="h-5 w-5 mr-1" />
              {orderAmount.toFixed(2)}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">
              Payment Method
            </label>
            <Select
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
              disabled={isProcessing}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4" />
                    Cash
                  </div>
                </SelectItem>
                <SelectItem value="card">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Card
                  </div>
                </SelectItem>
                <SelectItem value="upi">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    UPI
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {result && (
            <div className={`p-4 rounded-md ${
              result.success 
                ? "bg-green-50 border border-green-200 text-green-800" 
                : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-1 ${
                  result.success ? "bg-green-100" : "bg-red-100"
                }`}>
                  {result.success ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">
                    {result.success ? "Payment Successful" : "Payment Failed"}
                  </h4>
                  <p className="text-sm">{result.message}</p>
                  {result.success && result.transactionId && (
                    <p className="text-sm mt-1">Transaction ID: {result.transactionId}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <Button 
            className="w-full flex items-center gap-2"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Processing...
              </>
            ) : (
              <>
                {getPaymentIcon()}
                Process {formatCurrency(orderAmount)} Payment
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
