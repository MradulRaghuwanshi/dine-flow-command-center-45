
import { useState } from "react";
import { Order, OrderStatus } from "@/types/order";
import { OrderCard } from "./OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type OrdersGridProps = {
  orders: Order[];
  onOrdersChange: (updatedOrders: Order[]) => void;
};

export function OrdersGrid({ orders, onOrdersChange }: OrdersGridProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toast } = useToast();

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    onOrdersChange(updatedOrders);
    
    toast({
      title: "Order status updated",
      description: `Order #${orders.find(o => o.id === orderId)?.orderNumber} is now ${newStatus}`,
    });
  };

  const handleCancelOrder = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' as OrderStatus } : order
    );
    
    onOrdersChange(updatedOrders);
    
    toast({
      variant: "destructive",
      title: "Order cancelled",
      description: `Order #${orders.find(o => o.id === orderId)?.orderNumber} has been cancelled`,
    });
  };

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="served">Served</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
              onCancelOrder={handleCancelOrder}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No orders found in this category
          </div>
        )}
      </div>
    </div>
  );
}
