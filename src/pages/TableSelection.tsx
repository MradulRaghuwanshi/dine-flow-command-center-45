
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

// Mock tables data
const mockTables = [
  { id: 1, name: "Table 1", seats: 2, available: true },
  { id: 2, name: "Table 2", seats: 2, available: true },
  { id: 3, name: "Table 3", seats: 4, available: true },
  { id: 4, name: "Table 4", seats: 4, available: false },
  { id: 5, name: "Table 5", seats: 6, available: true },
  { id: 6, name: "Table 6", seats: 6, available: true },
  { id: 7, name: "Table 7", seats: 8, available: true },
  { id: 8, name: "Table 8", seats: 8, available: false },
  { id: 9, name: "Table 9", seats: 4, available: true },
  { id: 10, name: "Table 10", seats: 2, available: true },
  { id: 11, name: "Table 11", seats: 4, available: true },
  { id: 12, name: "Table 12", seats: 6, available: false },
];

export default function TableSelection() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("dineflow-cart");
    const savedTotal = localStorage.getItem("dineflow-total");
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    if (savedTotal) {
      setTotalPrice(parseFloat(savedTotal));
    }
  }, []);

  // Handle table selection
  const handleTableSelect = (tableId: number) => {
    setSelectedTable(tableId);
  };

  // Handle proceed to payment
  const handleProceed = () => {
    if (selectedTable === null) {
      toast.error("Please select a table");
      return;
    }
    
    // Save selected table to localStorage
    localStorage.setItem("dineflow-table", selectedTable.toString());
    
    // Navigate to payment page
    navigate("/online-menu/payment");
  };

  // Handle back to menu
  const handleBackToMenu = () => {
    navigate("/online-menu");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBackToMenu}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Select a Table</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Select a table for your order</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mockTables.map((table) => (
                <Card 
                  key={table.id} 
                  className={`
                    cursor-pointer transition-all
                    ${!table.available ? 'opacity-50 pointer-events-none' : ''}
                    ${selectedTable === table.id ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''}
                  `}
                  onClick={() => table.available && handleTableSelect(table.id)}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="relative w-20 h-20 flex items-center justify-center border-2 border-gray-300 rounded-md my-2">
                      <span className="text-xl font-bold">{table.id}</span>
                      {selectedTable === table.id && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium">{table.name}</h3>
                    <p className="text-sm text-muted-foreground">{table.seats} seats</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity} × {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold pt-4 border-t">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleBackToMenu}
              >
                Back to Menu
              </Button>
              <Button 
                className="flex-1"
                onClick={handleProceed}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
