
import { Order } from "@/types/order";

// Function to generate KOT (Kitchen Order Ticket)
export const generateKOT = (order: Order) => {
  // Create KOT content
  const kotContent = `
    KITCHEN ORDER TICKET
    ------------------
    Order #: ${order.orderNumber}
    Table #: ${order.tableNumber}
    Date: ${new Date(order.orderTime).toLocaleString()}
    ------------------
    ITEMS:
    ${order.items.map(item => `${item.quantity}x ${item.name}${item.notes ? ` - ${item.notes}` : ''}`).join('\n    ')}
    ------------------
  `;
  
  // Create a printable div
  const printWindow = window.open('', 'PRINT', 'height=600,width=800');
  
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Kitchen Order Ticket</title>
          <style>
            body { font-family: monospace; white-space: pre; line-height: 1.5; }
            @media print {
              body { margin: 0; padding: 10px; }
            }
          </style>
        </head>
        <body>
          ${kotContent}
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              window.print();
              window.setTimeout(function() { window.close(); }, 500);
            });
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  } else {
    console.error('Could not open print window');
  }
};

// Function to send bill via WhatsApp
export const sendBillToWhatsApp = (order: Order, customerNumber: string, restaurantNumber: string) => {
  if (!customerNumber) {
    console.error('Customer WhatsApp number is required');
    return false;
  }
  
  // Format the customer number (remove spaces, add country code if needed)
  let formattedCustomerNumber = customerNumber.replace(/\s+/g, '');
  if (!formattedCustomerNumber.startsWith('+')) {
    formattedCustomerNumber = '+' + formattedCustomerNumber;
  }
  
  // Create the bill message
  const billMessage = `
*BILL DETAILS from DineFlow Restaurant*
Order #: ${order.orderNumber}
Table #: ${order.tableNumber}
Date: ${new Date(order.orderTime).toLocaleString()}

*ITEMS:*
${order.items.map(item => `${item.quantity}x ${item.name}: $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

*TOTAL: $${order.totalAmount.toFixed(2)}*

Thank you for dining with us!
`;

  // Encode the message for WhatsApp
  const encodedMessage = encodeURIComponent(billMessage);
  
  // Create WhatsApp URL with restaurant number as sender
  const whatsappURL = `https://wa.me/${formattedCustomerNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp in new window
  window.open(whatsappURL, '_blank');
  
  return true;
};
