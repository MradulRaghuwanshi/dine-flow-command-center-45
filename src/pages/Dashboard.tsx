
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Clipboard, 
  DollarSign, 
  Users,
  ArrowUpRight,
  Clock,
  CreditCard
} from "lucide-react";
import { OrdersGrid } from "@/components/orders/OrdersGrid";
import { useState } from "react";
import { Order } from "@/types/order";
import { mockOrders } from "@/data/mockData";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  
  // Stats data
  const stats = [
    {
      title: "Total Orders",
      value: "42",
      icon: <Clipboard className="h-4 w-4 text-muted-foreground" />,
      change: "+12% from last week",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: "₹2,345",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      change: "+18% from last week",
      changeType: "positive" as const,
    },
    {
      title: "Customers",
      value: "96",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: "+6% from last week",
      changeType: "positive" as const,
    },
    {
      title: "Avg. Order Value",
      value: "₹56",
      icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
      change: "+2% from last week",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button size="sm">
            <CreditCard className="h-4 w-4 mr-2" />
            Process Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center mt-1 ${
                stat.changeType === "positive" 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}>
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <OrdersGrid orders={orders} onOrdersChange={setOrders} />
      </div>
    </div>
  );
}
