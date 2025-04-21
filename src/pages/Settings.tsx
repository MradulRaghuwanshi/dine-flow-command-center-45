import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Clock, 
  CreditCard, 
  Edit, 
  Mail, 
  MapPin, 
  Phone, 
  Plus, 
  Save, 
  Trash2, 
  User2, 
  Users
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OffersManagement } from "@/components/settings/OffersManagement";
import { PaymentSettings, PaymentLink } from "@/components/settings/PaymentSettings";
import { mockOffers, Offer } from "@/data/mockOffers";

export default function Settings() {
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "Bistro Bella",
    description: "Fine dining restaurant specializing in modern fusion cuisine in a relaxed atmosphere.",
    email: "info@bistrobella.com",
    phone: "(555) 123-4567",
    address: "123 Culinary Street, Foodville, FC 98765",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=200&h=200&fit=crop",
    workingHours: {
      monday: { open: "11:00", close: "22:00", closed: false },
      tuesday: { open: "11:00", close: "22:00", closed: false },
      wednesday: { open: "11:00", close: "22:00", closed: false },
      thursday: { open: "11:00", close: "22:00", closed: false },
      friday: { open: "11:00", close: "23:00", closed: false },
      saturday: { open: "10:00", close: "23:00", closed: false },
      sunday: { open: "10:00", close: "21:00", closed: false },
    }
  });

  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([
    { id: "1", name: "Cash", url: "", enabled: true },
    { id: "2", name: "Credit Card", url: "", enabled: true },
    { id: "3", name: "UPI", url: "upi://pay?pa=example@bank&pn=BistroRestaurant", enabled: true },
    { id: "4", name: "PayTM", url: "https://paytm.com/merchantid", enabled: false },
  ]);

  const [offers, setOffers] = useState<Offer[]>(mockOffers);

  const [users, setUsers] = useState([
    { id: "1", name: "John Smith", email: "john@bistrobella.com", role: "Admin", lastActive: "2 hours ago" },
    { id: "2", name: "Sarah Johnson", email: "sarah@bistrobella.com", role: "Manager", lastActive: "1 day ago" },
    { id: "3", name: "Mike Chen", email: "mike@bistrobella.com", role: "Waiter", lastActive: "5 hours ago" },
    { id: "4", name: "Lisa Wong", email: "lisa@bistrobella.com", role: "Cashier", lastActive: "Just now" },
  ]);

  const [tables, setTables] = useState([
    { id: "1", number: 1, capacity: 2, section: "Main" },
    { id: "2", number: 2, capacity: 2, section: "Main" },
    { id: "3", number: 3, capacity: 4, section: "Main" },
    { id: "4", number: 4, capacity: 4, section: "Main" },
    { id: "5", number: 5, capacity: 6, section: "Main" },
    { id: "6", number: 6, capacity: 8, section: "Main" },
    { id: "7", number: 7, capacity: 2, section: "Outdoor" },
    { id: "8", number: 8, capacity: 4, section: "Outdoor" },
    { id: "9", number: 9, capacity: 6, section: "Private" },
  ]);

  const [newTable, setNewTable] = useState({
    number: "",
    capacity: "",
    section: ""
  });

  const addTable = () => {
    if (newTable.number && newTable.capacity && newTable.section) {
      const newTableId = `${Date.now()}`;
      setTables([
        ...tables,
        {
          id: newTableId,
          number: parseInt(newTable.number),
          capacity: parseInt(newTable.capacity),
          section: newTable.section
        }
      ]);
      setNewTable({ number: "", capacity: "", section: "" });
    }
  };

  const removeTable = (id: string) => {
    setTables(tables.filter(table => table.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="restaurant" className="space-y-4">
        <TabsList>
          <TabsTrigger value="restaurant">Restaurant Profile</TabsTrigger>
          <TabsTrigger value="hours">Working Hours</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="users">User Access</TabsTrigger>
        </TabsList>
        
        {/* Restaurant Profile Tab */}
        <TabsContent value="restaurant">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
              <CardDescription>
                Update your restaurant details shown to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-md overflow-hidden relative">
                  <img 
                    src={restaurantDetails.logo}
                    alt="Restaurant Logo"
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-1 right-1 w-8 h-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-medium">Restaurant Logo</h3>
                  <p className="text-xs text-muted-foreground">
                    Upload a square image for best results
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="restaurant-name" 
                      className="pl-9" 
                      placeholder="Restaurant name"
                      value={restaurantDetails.name}
                      onChange={(e) => 
                        setRestaurantDetails({...restaurantDetails, name: e.target.value})
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-description">Description</Label>
                  <Textarea 
                    id="restaurant-description" 
                    placeholder="Tell customers about your restaurant"
                    value={restaurantDetails.description}
                    onChange={(e) => 
                      setRestaurantDetails({...restaurantDetails, description: e.target.value})
                    }
                    className="min-h-[100px] resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="restaurant-email" 
                      type="email" 
                      className="pl-9" 
                      placeholder="Email address"
                      value={restaurantDetails.email}
                      onChange={(e) => 
                        setRestaurantDetails({...restaurantDetails, email: e.target.value})
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="restaurant-phone" 
                      className="pl-9" 
                      placeholder="Phone number"
                      value={restaurantDetails.phone}
                      onChange={(e) => 
                        setRestaurantDetails({...restaurantDetails, phone: e.target.value})
                      }
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="restaurant-address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="restaurant-address" 
                      className="pl-9" 
                      placeholder="Restaurant address"
                      value={restaurantDetails.address}
                      onChange={(e) => 
                        setRestaurantDetails({...restaurantDetails, address: e.target.value})
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Working Hours Tab */}
        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>
                Set your restaurant's opening and closing times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(restaurantDetails.workingHours).map(([day, hours]) => (
                  <div key={day} className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-3 font-medium capitalize">
                      {day}
                    </div>
                    <div className="col-span-8 grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor={`${day}-open`} className="text-xs text-muted-foreground">
                          Opening Time
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id={`${day}-open`} 
                            type="time"
                            className="pl-9"
                            value={hours.open}
                            onChange={(e) => 
                              setRestaurantDetails({
                                ...restaurantDetails,
                                workingHours: {
                                  ...restaurantDetails.workingHours,
                                  [day]: {
                                    ...hours,
                                    open: e.target.value
                                  }
                                }
                              })
                            }
                            disabled={hours.closed}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`${day}-close`} className="text-xs text-muted-foreground">
                          Closing Time
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id={`${day}-close`} 
                            type="time"
                            className="pl-9"
                            value={hours.close}
                            onChange={(e) => 
                              setRestaurantDetails({
                                ...restaurantDetails,
                                workingHours: {
                                  ...restaurantDetails.workingHours,
                                  [day]: {
                                    ...hours,
                                    close: e.target.value
                                  }
                                }
                              })
                            }
                            disabled={hours.closed}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`${day}-closed`}
                          checked={hours.closed}
                          onCheckedChange={(checked) => 
                            setRestaurantDetails({
                              ...restaurantDetails,
                              workingHours: {
                                ...restaurantDetails.workingHours,
                                [day]: {
                                  ...hours,
                                  closed: checked
                                }
                              }
                            })
                          }
                        />
                        <Label htmlFor={`${day}-closed`} className="text-xs whitespace-nowrap">
                          Closed
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Hours
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Tables Tab */}
        <TabsContent value="tables">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Table Management</CardTitle>
                <CardDescription>
                  Manage restaurant tables and sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-2">
                    {tables.map(table => (
                      <div
                        key={table.id}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                            {table.number}
                          </div>
                          <div>
                            <p className="text-sm font-medium">Table {table.number}</p>
                            <p className="text-xs text-muted-foreground">
                              {table.capacity} {table.capacity === 1 ? 'seat' : 'seats'} • {table.section} section
                            </p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-red-500"
                          onClick={() => removeTable(table.id)}
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
                <CardTitle>Add New Table</CardTitle>
                <CardDescription>
                  Create a new table for your restaurant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="table-number">Table Number</Label>
                    <Input 
                      id="table-number" 
                      type="number" 
                      placeholder="e.g. 10"
                      value={newTable.number}
                      onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="table-capacity">Capacity (Seats)</Label>
                    <Input 
                      id="table-capacity" 
                      type="number" 
                      placeholder="e.g. 4"
                      value={newTable.capacity}
                      onChange={(e) => setNewTable({...newTable, capacity: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="table-section">Section</Label>
                    <Input 
                      id="table-section" 
                      placeholder="e.g. Main, Outdoor"
                      value={newTable.section}
                      onChange={(e) => setNewTable({...newTable, section: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={addTable}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Table
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Payment Methods Tab */}
        <TabsContent value="payment">
          <PaymentSettings 
            paymentLinks={paymentLinks} 
            onPaymentLinksChange={setPaymentLinks} 
          />
        </TabsContent>
        
        {/* Offers Tab */}
        <TabsContent value="offers">
          <OffersManagement 
            offers={offers}
            onOffersChange={setOffers}
          />
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Access Control</CardTitle>
              <CardDescription>
                Manage staff accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{user.role}</p>
                        <p className="text-xs text-muted-foreground">Active {user.lastActive}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Invite New User
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
