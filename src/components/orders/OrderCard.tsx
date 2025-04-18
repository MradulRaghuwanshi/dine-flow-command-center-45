
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Order, OrderStatus, orderStatusLabels } from "@/types/order";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Coffee, 
  CreditCard, 
  Printer, 
  XCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  preparing: <Coffee className="h-4 w-4" />,
  ready: <CheckCircle2 className="h-4 w-4" />,
  served: <CheckCircle2 className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />
};

type OrderCardProps = {
  order: Order;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onCancelOrder: (orderId: string) => void;
};

export function OrderCard({ order, onStatusChange, onCancelOrder }: OrderCardProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
    pending: 'preparing',
    preparing: 'ready',
    ready: 'served'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-4 bg-gray-50 border-b flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium flex items-center gap-1",
              order.status === 'pending' && "border-status-pending text-status-pending",
              order.status === 'preparing' && "border-status-preparing text-status-preparing",
              order.status === 'ready' && "border-status-ready text-status-ready",
              order.status === 'served' && "border-status-served text-status-served",
              order.status === 'cancelled' && "border-status-cancelled text-status-cancelled"
            )}
          >
            {statusIcons[order.status]}
            {orderStatusLabels[order.status]}
          </Badge>
          <span className="font-semibold">#{order.orderNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <span>Table {order.tableNumber}</span>
          </Badge>
          <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'outline'} className="flex items-center gap-1">
            <CreditCard className="h-3 w-3" />
            {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between mb-2">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDateTime(order.orderTime)}
          </div>
          <div className="font-semibold">
            {formatCurrency(order.totalAmount)}
          </div>
        </div>
        <div className="text-sm">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-sm text-muted-foreground text-center mt-1">
              +{order.items.length - 2} more items
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex flex-wrap gap-2">
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex justify-between">
                <span>Order #{order.orderNumber}</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-medium flex items-center gap-1",
                    `border-status-${order.status} text-status-${order.status}`
                  )}
                >
                  {statusIcons[order.status]}
                  {orderStatusLabels[order.status]}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-muted-foreground">Table</p>
                  <p className="font-medium">{order.tableNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Order Time</p>
                  <p className="font-medium">{formatDateTime(order.orderTime)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment</p>
                  <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'outline'} className="mt-1">
                    {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
              
              <p className="font-medium mb-2">Order Items</p>
              <ScrollArea className="h-48 rounded-md border p-2">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex justify-between py-2">
                      <div>
                        <p className="font-medium">{item.quantity}x {item.name}</p>
                        {item.notes && <p className="text-xs text-muted-foreground">{item.notes}</p>}
                      </div>
                      <p>{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                    {index < order.items.length - 1 && <Separator />}
                  </div>
                ))}
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Update status button - show if there's a next status */}
        {nextStatus[order.status] && (
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onStatusChange(order.id, nextStatus[order.status] as OrderStatus)}
          >
            {`Mark as ${orderStatusLabels[nextStatus[order.status] as OrderStatus]}`}
          </Button>
        )}
        
        {/* Cancel button - show if not already cancelled or served */}
        {order.status !== 'cancelled' && order.status !== 'served' && (
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex-1"
            onClick={() => onCancelOrder(order.id)}
          >
            Cancel Order
          </Button>
        )}
        
        {/* Print button */}
        <Button variant="outline" size="sm" className="flex-1">
          <Printer className="h-4 w-4 mr-1" />
          Print Bill
        </Button>
      </CardFooter>
    </Card>
  );
}
