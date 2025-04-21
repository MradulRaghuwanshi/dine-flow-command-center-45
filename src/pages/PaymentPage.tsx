
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, QrCode, CreditCard, Banknote, Check, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/paymentUtils";

// Mock QR code image
const mockQrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://payment.example.com/12345";

export default function PaymentPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cash" | null>(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const navigate = useNavigate();

  // Load data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("dineflow-cart");
    const savedTotal = localStorage.getItem("dineflow-total");
    const savedTable = localStorage.getItem("dineflow-table");
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      // Redirect back to menu if cart is not available
      navigate("/online-menu");
    }
    
    if (savedTotal) {
      setTotalPrice(parseFloat(savedTotal));
    }
    
    if (savedTable) {
      setSelectedTable(parseInt(savedTable));
    }
  }, [navigate]);

  // Handle payment method selection
  const selectPaymentMethod = (method: "upi" | "cash") => {
    setPaymentMethod(method);
  };

  // Handle UPI payment redirect
  const handleUpiPayment = () => {
    // Simulate a payment redirect
    toast.info("Redirecting to UPI payment...");
    
    // In a real app, we would redirect to an actual payment gateway
    setTimeout(() => {
      simulatePaymentSuccess();
    }, 2000);
  };

  // Handle cash payment
  const handleCashPayment = () => {
    toast.success("Cash payment selected. Your order is confirmed!");
    simulatePaymentSuccess();
  };

  // Simulate payment success
  const simulatePaymentSuccess = () => {
    setIsPaymentComplete(true);
    
    // Clear localStorage cart data after successful payment
    setTimeout(() => {
      localStorage.removeItem("dineflow-cart");
      localStorage.removeItem("dineflow-total");
      localStorage.removeItem("dineflow-table");
      
      // Return to menu after 3 seconds
      setTimeout(() => {
        navigate("/online-menu");
      }, 3000);
    }, 1000);
  };

  // Handle back to table selection
  const handleBack = () => {
    navigate("/online-menu/table-selection");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack} disabled={isPaymentComplete}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Payment</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-md mx-auto">
          {isPaymentComplete ? (
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
          ) : (
            <>
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
              
              <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
              
              <div className="grid gap-4">
                <Card 
                  className={`
                    cursor-pointer transition-all
                    ${paymentMethod === "upi" ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}
                  `}
                  onClick={() => selectPaymentMethod("upi")}
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
                  onClick={() => selectPaymentMethod("cash")}
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
                
                {paymentMethod === "upi" && (
                  <div className="mt-4 p-6 bg-white rounded-lg border flex flex-col items-center">
                    <h3 className="font-medium mb-4">Scan QR Code to Pay</h3>
                    <div className="mb-4">
                      <img 
                        src={mockQrCodeUrl} 
                        alt="Payment QR Code" 
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    <p className="text-sm text-center text-muted-foreground mb-4">
                      Scan the QR code using any UPI app to complete payment
                    </p>
                    <Button 
                      className="w-full"
                      onClick={handleUpiPayment}
                    >
                      <IndianRupee className="h-4 w-4 mr-2" />
                      Pay {formatCurrency(totalPrice)}
                    </Button>
                  </div>
                )}
                
                {paymentMethod === "cash" && (
                  <div className="mt-4 p-6 bg-white rounded-lg border">
                    <h3 className="font-medium mb-2">Pay with Cash</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please confirm your order. You can pay cash at the restaurant.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={handleCashPayment}
                    >
                      Confirm Order
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
