
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Cash, QrCode, IndianRupee, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [showQRCode, setShowQRCode] = useState(false);
  
  useEffect(() => {
    // Load cart from localStorage instead of sessionStorage
    const savedCart = localStorage.getItem("dineflow-cart");
    const savedTable = localStorage.getItem("dineflow-table");
    
    if (!savedCart || !savedTable) {
      // If data is missing, redirect back to menu
      navigate('/online-menu');
      return;
    }
    
    setCart(JSON.parse(savedCart));
    setTableNumber(savedTable);
  }, [navigate]);
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = totalPrice * 0.05; // 5% tax
  const grandTotal = totalPrice + tax;
  
  // Generate a simple UPI payment link (in production, this would use a real payment gateway)
  const getUPILink = () => {
    const payeeVPA = "restaurant@upi"; // Replace with restaurant's UPI ID
    const payeeName = "DineFlow Restaurant";
    const amount = grandTotal.toFixed(2);
    const transactionNote = `Payment for order at table ${tableNumber}`;
    const upiLink = `upi://pay?pa=${payeeVPA}&pn=${encodeURIComponent(payeeName)}&am=${amount}&tn=${encodeURIComponent(transactionNote)}`;
    return upiLink;
  };
  
  // Generate QR code data
  const qrCodeData = getUPILink();
  
  const handlePayment = () => {
    if (paymentMethod === "upi") {
      window.open(getUPILink(), "_blank");
      return;
    }
    
    if (paymentMethod === "qr") {
      setShowQRCode(true);
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Send order to restaurant system
      const orderNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit order number
      
      toast.success(`Order #${orderNumber} placed successfully!`);
      
      // Clear cart data from localStorage after successful order
      setTimeout(() => {
        localStorage.removeItem('dineflow-cart');
        localStorage.removeItem('dineflow-table');
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
          <CardContent>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 gap-4"
            >
              <label 
                htmlFor="cash-option"
                className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer ${paymentMethod === "cash" ? "border-primary bg-primary/5" : ""}`}
              >
                <RadioGroupItem value="cash" id="cash-option" />
                <Cash className="h-5 w-5 text-muted-foreground" />
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
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Your order will be sent to your table #{tableNumber} once payment is confirmed.</p>
        </div>
      </div>
      
      {/* QR Code Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan this QR code to pay</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeData)}`}
                alt="Payment QR Code"
                className="w-48 h-48"
              />
            </div>
            <p className="text-center mb-4">
              Amount: <span className="font-bold">{formatCurrency(grandTotal)}</span>
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowQRCode(false);
                toast.success("Please complete the payment in your UPI app");
              }}
              className="w-full"
            >
              I've completed the payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
