
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CreditCard, Link, Save } from "lucide-react";

type PaymentSettingsProps = {
  paymentLinks: PaymentLink[];
  onPaymentLinksChange: (links: PaymentLink[]) => void;
};

export type PaymentLink = {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
};

export function PaymentSettings({ paymentLinks, onPaymentLinksChange }: PaymentSettingsProps) {
  const [newLink, setNewLink] = useState({
    name: "",
    url: ""
  });

  const togglePaymentLink = (id: string) => {
    onPaymentLinksChange(
      paymentLinks.map(link => 
        link.id === id ? { ...link, enabled: !link.enabled } : link
      )
    );
  };

  const addPaymentLink = () => {
    if (!newLink.name || !newLink.url) return;
    
    const link: PaymentLink = {
      id: `${Date.now()}`,
      name: newLink.name,
      url: newLink.url,
      enabled: true
    };
    
    onPaymentLinksChange([...paymentLinks, link]);
    setNewLink({ name: "", url: "" });
  };

  const removePaymentLink = (id: string) => {
    onPaymentLinksChange(paymentLinks.filter(link => link.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Configure the payment methods and links your restaurant accepts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentLinks.map(link => (
            <div
              key={link.id}
              className="flex items-center justify-between p-4 border rounded-md"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{link.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Link className="h-3 w-3 mr-1" />
                    {link.url}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={link.enabled}
                  onCheckedChange={() => togglePaymentLink(link.id)}
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removePaymentLink(link.id)}
                  className="text-red-500 h-8"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t mt-4">
            <h3 className="text-sm font-medium mb-3">Add Payment Link</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="payment-name">Payment Method Name</Label>
                <Input 
                  id="payment-name" 
                  placeholder="e.g. PayTM, Google Pay, etc."
                  value={newLink.name}
                  onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-url">Payment URL or UPI ID</Label>
                <Input 
                  id="payment-url" 
                  placeholder="https://payment.example.com/merchantid or yourupi@bank"
                  value={newLink.url}
                  onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                />
              </div>
              <Button onClick={addPaymentLink} className="w-full">
                Add Payment Link
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">
          Reset
        </Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
