
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

type WhatsAppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  whatsAppNumber: string;
  setWhatsAppNumber: (number: string) => void;
  onSubmit: () => void;
};

export function WhatsAppDialog({
  open,
  onOpenChange,
  whatsAppNumber,
  setWhatsAppNumber,
  onSubmit
}: WhatsAppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Your WhatsApp Number</DialogTitle>
          <DialogDescription>
            We need your WhatsApp number to send you the bill and order confirmation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Label htmlFor="dialog-whatsapp" className="text-left">WhatsApp Number</Label>
          <Input
            id="dialog-whatsapp"
            placeholder="e.g. +91 98765 43210"
            value={whatsAppNumber}
            onChange={(e) => setWhatsAppNumber(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} className="flex items-center gap-2">
            Continue to Table Selection
            <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
