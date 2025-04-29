
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/paymentUtils";
import { toast } from "sonner";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeData: string;
  grandTotal: number;
}

export default function QRCodeDialog({ 
  open, 
  onOpenChange,
  qrCodeData,
  grandTotal
}: QRCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onOpenChange(false);
              toast.success("Please complete the payment in your UPI app");
            }}
            className="w-full"
          >
            I've completed the payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
