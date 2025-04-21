
// Payment types
export type PaymentMethod = 'cash' | 'card' | 'upi';

export type PaymentResult = {
  success: boolean;
  message: string;
  transactionId?: string;
  amount: number;
};

// Function to format currency in Indian Rupees (₹)
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toFixed(2)}`;
};

// Simulate payment processing
export const processPayment = async (
  amount: number,
  method: PaymentMethod
): Promise<PaymentResult> => {
  // This would be an actual API call in a real application
  // Simulating network request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly succeed 90% of the time
      const success = Math.random() < 0.9;
      
      if (success) {
        resolve({
          success: true,
          message: `Payment of ${formatCurrency(amount)} via ${method.toUpperCase()} was successful.`,
          transactionId: `TXN${Date.now()}`,
          amount
        });
      } else {
        resolve({
          success: false,
          message: `Payment failed. Please try again.`,
          amount
        });
      }
    }, 1500);
  });
};
