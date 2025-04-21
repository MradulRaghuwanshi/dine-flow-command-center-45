
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Image, Edit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Offer } from "@/data/mockOffers";

type OffersManagementProps = {
  offers: Offer[];
  onOffersChange: (offers: Offer[]) => void;
};

export function OffersManagement({ offers, onOffersChange }: OffersManagementProps) {
  const [newOffer, setNewOffer] = useState<Partial<Offer>>({
    title: "",
    description: "",
    imageUrl: "",
    backgroundColor: "#f3f4f6"
  });

  const addOffer = () => {
    if (!newOffer.title || !newOffer.description) return;
    
    const offer: Offer = {
      id: `${Date.now()}`,
      title: newOffer.title || "",
      description: newOffer.description || "",
      imageUrl: newOffer.imageUrl || "",
      backgroundColor: newOffer.backgroundColor || "#f3f4f6"
    };
    
    onOffersChange([...offers, offer]);
    setNewOffer({
      title: "",
      description: "",
      imageUrl: "",
      backgroundColor: "#f3f4f6"
    });
  };

  const removeOffer = (id: string) => {
    onOffersChange(offers.filter(offer => offer.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Promotional Offers</CardTitle>
          <CardDescription>
            Manage offers displayed on the online menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {offers.map(offer => (
                <div
                  key={offer.id}
                  className="flex items-start justify-between p-4 border rounded-md"
                  style={{ backgroundColor: offer.backgroundColor + "40" }}
                >
                  <div className="flex items-start gap-3">
                    {offer.imageUrl ? (
                      <img 
                        src={offer.imageUrl} 
                        alt={offer.title} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center">
                        <Image className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{offer.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {offer.description}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500"
                    onClick={() => removeOffer(offer.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Add New Offer</CardTitle>
          <CardDescription>
            Create a promotional offer for your menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="offer-title">Offer Title</Label>
              <Input 
                id="offer-title" 
                placeholder="e.g. 20% OFF on All Desserts"
                value={newOffer.title}
                onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="offer-description">Description</Label>
              <Textarea 
                id="offer-description" 
                placeholder="Brief description of the offer"
                value={newOffer.description}
                onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="offer-image">Image URL</Label>
              <Input 
                id="offer-image" 
                placeholder="https://example.com/image.jpg"
                value={newOffer.imageUrl}
                onChange={(e) => setNewOffer({...newOffer, imageUrl: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="offer-color">Background Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="offer-color" 
                  type="color"
                  className="w-12 h-9 p-1"
                  value={newOffer.backgroundColor}
                  onChange={(e) => setNewOffer({...newOffer, backgroundColor: e.target.value})}
                />
                <Input 
                  value={newOffer.backgroundColor}
                  onChange={(e) => setNewOffer({...newOffer, backgroundColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={addOffer}>
            <Plus className="h-4 w-4 mr-2" />
            Add Offer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
