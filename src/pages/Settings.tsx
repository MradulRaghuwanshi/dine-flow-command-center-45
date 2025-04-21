
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { IndianRupee } from "lucide-react";
import PaymentProcessor from "@/components/payments/PaymentProcessor";
import { PaymentResult } from "@/utils/paymentUtils";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [orderAmount, setOrderAmount] = useState(499.99);
  const [orderId, setOrderId] = useState("ORD-123456");
  const { toast } = useToast();

  const handlePaymentComplete = (result: PaymentResult) => {
    // Here you would update your database with the payment status
    console.log("Payment processed:", result);
    
    // Update the order in the database (mock implementation)
    if (result.success) {
      toast({
        title: "Order Updated",
        description: `Order #${orderId} has been marked as paid`,
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Details</CardTitle>
                <CardDescription>Manage your restaurant information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input id="restaurant-name" defaultValue="DineFlow Restaurant" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-phone">Phone Number</Label>
                  <Input id="restaurant-phone" defaultValue="+91 9876543210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-email">Email</Label>
                  <Input id="restaurant-email" defaultValue="contact@dineflow.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-address">Address</Label>
                  <Input id="restaurant-address" defaultValue="123 Restaurant Street, Foodie City" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>Set your operating hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="font-medium">Day</Label>
                  </div>
                  <div>
                    <Label className="font-medium">Opening Time</Label>
                  </div>
                  <div>
                    <Label className="font-medium">Closing Time</Label>
                  </div>

                  <div>Monday</div>
                  <div>
                    <Input type="time" defaultValue="11:00" />
                  </div>
                  <div>
                    <Input type="time" defaultValue="22:00" />
                  </div>

                  <div>Tuesday</div>
                  <div>
                    <Input type="time" defaultValue="11:00" />
                  </div>
                  <div>
                    <Input type="time" defaultValue="22:00" />
                  </div>

                  {/* Remaining days would follow the same pattern */}
                </div>
                <Button>Update Hours</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Configure accepted payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="cash-payments">Cash Payments</Label>
                    <Badge>Default</Badge>
                  </div>
                  <Switch id="cash-payments" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="card-payments">Card Payments</Label>
                  <Switch id="card-payments" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="upi-payments">UPI Payments</Label>
                  <Switch id="upi-payments" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="online-banking">Online Banking</Label>
                  <Switch id="online-banking" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Processor</CardTitle>
                <CardDescription>Test the payment processing system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order-id">Order ID</Label>
                  <Input 
                    id="order-id" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="amount-slider">Amount (<IndianRupee className="inline h-3 w-3" />)</Label>
                    <span className="text-sm font-medium">
                      <IndianRupee className="inline h-3 w-3" />{orderAmount.toFixed(2)}
                    </span>
                  </div>
                  <Slider
                    id="amount-slider"
                    defaultValue={[orderAmount]}
                    min={10}
                    max={5000}
                    step={10}
                    onValueChange={(value) => setOrderAmount(value[0])}
                  />
                </div>
                
                <div className="pt-4">
                  <PaymentProcessor 
                    orderId={orderId}
                    orderAmount={orderAmount}
                    onPaymentComplete={handlePaymentComplete}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-order">New Order Notifications</Label>
                <Switch id="new-order" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="order-status">Order Status Updates</Label>
                <Switch id="order-status" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="payment-notification">Payment Notifications</Label>
                <Switch id="payment-notification" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="low-stock">Low Stock Alerts</Label>
                <Switch id="low-stock" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Light</Button>
                    <Button variant="outline" className="flex-1">Dark</Button>
                    <Button className="flex-1">System</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Small</Button>
                    <Button className="flex-1">Medium</Button>
                    <Button variant="outline" className="flex-1">Large</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
