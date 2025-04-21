
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentMethodSelector from "@/components/payment/PaymentMethodSelector";
import UpiPayment from "@/components/payment/UpiPayment";
import CashPayment from "@/components/payment/CashPayment";
import PaymentSuccess from "@/components/payment/PaymentSuccess";

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
    toast.info("Redirecting to UPI payment...");
    
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
    
    setTimeout(() => {
      localStorage.removeItem("dineflow-cart");
      localStorage.removeItem("dineflow-total");
      localStorage.removeItem("dineflow-table");
      
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
            <PaymentSuccess selectedTable={selectedTable} />
          ) : (
            <>
              <OrderSummary 
                cart={cart}
                totalPrice={totalPrice}
                selectedTable={selectedTable}
              />
              
              <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
              
              <PaymentMethodSelector 
                paymentMethod={paymentMethod}
                onSelect={selectPaymentMethod}
              />
              
              {paymentMethod === "upi" && (
                <UpiPayment
                  totalPrice={totalPrice}
                  onPay={handleUpiPayment}
                  qrCodeUrl={mockQrCodeUrl}
                />
              )}
              
              {paymentMethod === "cash" && (
                <CashPayment onConfirm={handleCashPayment} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
