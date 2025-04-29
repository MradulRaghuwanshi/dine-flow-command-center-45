
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type MobileCheckoutButtonProps = {
  totalItems: number;
  totalPrice: number;
  onClick: () => void;
};

export function MobileCheckoutButton({ 
  totalItems, 
  totalPrice, 
  onClick 
}: MobileCheckoutButtonProps) {
  // Return null to hide the button completely
  return null;
}
