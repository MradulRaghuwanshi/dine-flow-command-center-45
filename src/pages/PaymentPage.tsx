
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { CartItem, PaymentMethodType } from "@/types/payment";
import { calculateTotals, getUPILink } from "@/utils/paymentUtils";
import OrderSummary from "@/components/payment/OrderSummary";
import PaymentMethods from "@/components/payment/PaymentMethods";
import QRCodeDialog from "@/components/payment/QRCodeDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cash");
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLeaveAlert, setShowLeaveAlert] = useState(false);
  const [intendedDestination, setIntendedDestination] = useState<string>("");
  
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
  
  const { grandTotal } = calculateTotals(cart);
  
  // Generate UPI payment link
  const qrCodeData = getUPILink(grandTotal, tableNumber);
  
  // Safe navigation function to show confirmation dialog if payment is not completed
  const safeNavigate = (destination: string) => {
    if (!isSuccess && !isProcessing) {
      setIntendedDestination(destination);
      setShowLeaveAlert(true);
    } else {
      navigate(destination);
    }
  };
  
  const handlePayment = () => {
    if (paymentMethod === "upi") {
      window.open(getUPILink(grandTotal, tableNumber), "_blank");
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
  
  // Effect to capture browser back/refresh navigation events
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSuccess && !isProcessing) {
        // Standard way to show a confirmation dialog when closing/refreshing the page
        e.preventDefault();
        e.returnValue = ""; // This is required for the confirmation dialog to appear in most browsers
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSuccess, isProcessing]);
  
  if (cart.length === 0) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-md mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => safeNavigate('/online-menu/table-selection')}
            disabled={isProcessing}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Complete Your Order</h1>
          <p className="text-muted-foreground">Table #{tableNumber}</p>
        </div>
        
        <OrderSummary items={cart} />
        
        <PaymentMethods
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          handlePayment={handlePayment}
          grandTotal={grandTotal}
          isProcessing={isProcessing}
          isSuccess={isSuccess}
        />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Your order will be sent to your table #{tableNumber} once payment is confirmed.</p>
        </div>
      </div>
      
      <QRCodeDialog
        open={showQRCode}
        onOpenChange={setShowQRCode}
        qrCodeData={qrCodeData}
        grandTotal={grandTotal}
      />
      
      {/* Confirmation Alert Dialog */}
      <AlertDialog open={showLeaveAlert} onOpenChange={setShowLeaveAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave payment page?</AlertDialogTitle>
            <AlertDialogDescription>
              Your payment is not complete. Are you sure you want to leave this page? Your order will not be processed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay on page</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate(intendedDestination)}>
              Leave anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
