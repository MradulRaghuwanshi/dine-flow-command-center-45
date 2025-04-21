
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/paymentUtils";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  available: boolean;
}

interface MenuCategoryProps {
  category: {
    id: string;
    name: string;
  };
  items: MenuItem[];
  isExpanded: boolean;
  onToggle: (categoryId: string) => void;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuCategory({
  category,
  items,
  isExpanded,
  onToggle,
  onAddToCart
}: MenuCategoryProps) {
  return (
    <Card>
      <CardHeader 
        className="cursor-pointer py-4" 
        onClick={() => onToggle(category.id)}
      >
        <div className="flex justify-between items-center">
          <CardTitle>{category.name}</CardTitle>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col p-4 rounded-lg border bg-card"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge 
                        variant={item.available ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm line-clamp-2 text-muted-foreground">
                    {item.description}
                  </p>
                  <Button 
                    size="sm"
                    onClick={() => onAddToCart(item)}
                    disabled={!item.available}
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
