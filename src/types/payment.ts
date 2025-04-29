
export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type PaymentMethodType = "cash" | "qr" | "upi" | "card";
