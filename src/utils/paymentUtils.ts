
/**
 * Format currency in Indian Rupee format
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

/**
 * Generate a simple UPI payment link
 */
export const getUPILink = (amount: number, tableNumber: string): string => {
  const payeeVPA = "restaurant@upi"; // Replace with restaurant's UPI ID
  const payeeName = "DineFlow Restaurant";
  const formattedAmount = amount.toFixed(2);
  const transactionNote = `Payment for order at table ${tableNumber}`;
  
  return `upi://pay?pa=${payeeVPA}&pn=${encodeURIComponent(payeeName)}&am=${formattedAmount}&tn=${encodeURIComponent(transactionNote)}`;
};

/**
 * Calculate total price, tax, and grand total
 */
export const calculateTotals = (items: { price: number; quantity: number }[]) => {
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = totalPrice * 0.05; // 5% tax
  const grandTotal = totalPrice + tax;
  
  return { totalPrice, tax, grandTotal };
};
