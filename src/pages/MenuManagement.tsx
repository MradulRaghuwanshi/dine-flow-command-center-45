import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChefHat, 
  Edit, 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Trash2,
  MessageSquareDashed,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Globe,
} from "lucide-react";
import { mockCategories, mockMenuItems } from "@/data/mockData";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
};

type Category = {
  id: string;
  name: string;
};

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [menuItemBeingEdited, setMenuItemBeingEdited] = useState<MenuItem | null>(null);
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    const matchesAvailability = availabilityFilter === "all" || 
      (availabilityFilter === "available" && item.available) ||
      (availabilityFilter === "unavailable" && !item.available);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const toggleItemAvailability = (id: string) => {
    setMenuItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const editMenuItem = (item: MenuItem) => {
    setMenuItemBeingEdited(item);
  };

  const saveMenuItemChanges = (updatedItem: MenuItem) => {
    setMenuItems(prevItems => 
      prevItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setMenuItemBeingEdited(null);
  };

  const addCategory = () => {
    if (newCategory.trim() !== "") {
      const newCategoryId = `cat${categories.length + 1}`;
      setCategories([...categories, { id: newCategoryId, name: newCategory.trim() }]);
      setNewCategory("");
      setIsAddCategoryOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <a href="/online-menu" target="_blank" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              View Online Menu
            </a>
          </Button>
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input 
                    id="category-name" 
                    placeholder="e.g. Appetizers, Desserts"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>
                <Button onClick={addCategory} className="w-full">
                  Add Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddMenuItemOpen} onOpenChange={setIsAddMenuItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <ChefHat className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-name">Item Name</Label>
                    <Input id="item-name" placeholder="Dish name" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="item-description">Description</Label>
                    <Textarea 
                      id="item-description" 
                      placeholder="Describe the dish" 
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="item-price">Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="item-price" type="number" step="0.01" className="pl-9" placeholder="0.00" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="item-category">Category</Label>
                    <Select>
                      <SelectTrigger id="item-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="item-image">Image URL</Label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="item-image" className="pl-9" placeholder="Image URL" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="item-available" defaultChecked />
                    <Label htmlFor="item-available">Available</Label>
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsAddMenuItemOpen(false)}>
                  Cancel
                </Button>
                <Button>Add Item</Button>
              </CardFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="items" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Filter Menu Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search menu items..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="available">Available Only</SelectItem>
                    <SelectItem value="unavailable">Unavailable Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map(item => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge
                        variant={item.available ? "default" : "secondary"}
                        className="opacity-90"
                      >
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span className="text-lg">{item.name}</span>
                      <span className="text-lg font-bold">{formatCurrency(item.price)}</span>
                    </CardTitle>
                    <Badge variant="outline" className="mt-1 w-fit">
                      {categories.find(c => c.id === item.category)?.name || "Uncategorized"}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description || "No description available"}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => editMenuItem(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500"
                        onClick={() => deleteMenuItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleItemAvailability(item.id)}
                      className={item.available ? "text-red-500" : "text-green-500"}
                    >
                      {item.available ? (
                        <>
                          <ToggleLeft className="h-4 w-4 mr-2" />
                          Mark Unavailable
                        </>
                      ) : (
                        <>
                          <ToggleRight className="h-4 w-4 mr-2" />
                          Mark Available
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <MessageSquareDashed className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No menu items found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Categories Management</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[50vh]">
                <div className="space-y-2">
                  {categories.map(category => (
                    <div 
                      key={category.id}
                      className="p-3 border rounded-md flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {menuItems.filter(item => item.category === category.id).length} items
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {menuItemBeingEdited && (
        <Dialog 
          open={!!menuItemBeingEdited} 
          onOpenChange={(open) => !open && setMenuItemBeingEdited(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-item-name">Item Name</Label>
                  <Input 
                    id="edit-item-name" 
                    value={menuItemBeingEdited.name}
                    onChange={(e) => setMenuItemBeingEdited({...menuItemBeingEdited, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-item-description">Description</Label>
                  <Textarea 
                    id="edit-item-description" 
                    value={menuItemBeingEdited.description}
                    onChange={(e) => setMenuItemBeingEdited({...menuItemBeingEdited, description: e.target.value})}
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-item-price">Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="edit-item-price" 
                      type="number" 
                      step="0.01" 
                      className="pl-9" 
                      value={menuItemBeingEdited.price}
                      onChange={(e) => setMenuItemBeingEdited({...menuItemBeingEdited, price: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-item-category">Category</Label>
                  <Select 
                    value={menuItemBeingEdited.category}
                    onValueChange={(value) => setMenuItemBeingEdited({...menuItemBeingEdited, category: value})}
                  >
                    <SelectTrigger id="edit-item-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-item-image">Image URL</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="edit-item-image" 
                      className="pl-9" 
                      value={menuItemBeingEdited.image}
                      onChange={(e) => setMenuItemBeingEdited({...menuItemBeingEdited, image: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="edit-item-available" 
                    checked={menuItemBeingEdited.available}
                    onCheckedChange={(checked) => setMenuItemBeingEdited({...menuItemBeingEdited, available: checked})}
                  />
                  <Label htmlFor="edit-item-available">Available</Label>
                </div>
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setMenuItemBeingEdited(null)}>
                Cancel
              </Button>
              <Button onClick={() => saveMenuItemChanges(menuItemBeingEdited)}>
                Save Changes
              </Button>
            </CardFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
