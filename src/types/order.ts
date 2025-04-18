
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
};

export type Order = {
  id: string;
  tableNumber: number;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  orderTime: string;
  paymentStatus: 'pending' | 'paid';
  customerName?: string;
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  served: 'Served',
  cancelled: 'Cancelled'
};
