import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, IndianRupee } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function PaymentPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>("");
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  
  useEffect(() => {
    // Load data from session storage
    const storedCart = sessionStorage.getItem('cart');
    const storedTable = sessionStorage.getItem('tableNumber');
    const storedWhatsApp = sessionStorage.getItem('whatsAppNumber');
    
    if (!storedCart || !storedTable) {
      // If data is missing, redirect back to menu
      navigate('/online-menu');
      return;
    }
    
    setCart(JSON.parse(storedCart));
    setTableNumber(storedTable);
    
    if (storedWhatsApp) {
      setWhatsAppNumber(storedWhatsApp);
    }
  }, [navigate]);
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = totalPrice * 0.05; // 5% tax
  const grandTotal = totalPrice + tax;
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Send order to restaurant system
      const orderNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit order number
      
      toast.success(`Order #${orderNumber} placed successfully!`);
      
      // Clear cart data from session storage after successful order
      setTimeout(() => {
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('tableNumber');
        navigate('/online-menu');
      }, 3000);
    }, 2000);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };
  
  if (cart.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-md mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/online-menu/table-selection')}
            disabled={isProcessing || isSuccess}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Complete Your Order</h1>
          <p className="text-muted-foreground">Table #{tableNumber}</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
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
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Select your preferred payment method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={paymentMethod === "cash" ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => setPaymentMethod("cash")}
              >
                <IndianRupee className="h-6 w-6" />
                <span>Cash on Delivery</span>
              </Button>
              
              <Button
                variant={paymentMethod === "card" ? "default" : "outline"}
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => setPaymentMethod("card")}
              >
                <CreditCard className="h-6 w-6" />
                <span>Card Payment</span>
              </Button>
            </div>
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
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Your order will be sent to your table #{tableNumber} once payment is confirmed.</p>
        </div>
      </div>
    </div>
  );
}
