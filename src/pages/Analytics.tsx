
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Download, 
  TrendingUp,
  DollarSign,
  Utensils,
  Users,
  Clock,
  ArrowDown,
  ArrowUp,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
} from "recharts";

// Sample data for charts
const dailyRevenueData = [
  { name: "Mon", revenue: 1200 },
  { name: "Tue", revenue: 1400 },
  { name: "Wed", revenue: 1800 },
  { name: "Thu", revenue: 1600 },
  { name: "Fri", revenue: 2200 },
  { name: "Sat", revenue: 2800 },
  { name: "Sun", revenue: 2400 },
];

const categoryData = [
  { name: "Main Courses", value: 45 },
  { name: "Appetizers", value: 20 },
  { name: "Desserts", value: 15 },
  { name: "Beverages", value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const topSellingItems = [
  { name: "Margherita Pizza", orders: 42, revenue: 545.58 },
  { name: "Grilled Salmon", orders: 36, revenue: 683.64 },
  { name: "Caesar Salad", orders: 32, revenue: 287.68 },
  { name: "Spaghetti Carbonara", orders: 28, revenue: 419.72 },
  { name: "Chocolate Lava Cake", orders: 25, revenue: 249.75 },
];

const hourlyOrderData = [
  { hour: "9am", orders: 4 },
  { hour: "10am", orders: 6 },
  { hour: "11am", orders: 8 },
  { hour: "12pm", orders: 18 },
  { hour: "1pm", orders: 24 },
  { hour: "2pm", orders: 16 },
  { hour: "3pm", orders: 8 },
  { hour: "4pm", orders: 6 },
  { hour: "5pm", orders: 10 },
  { hour: "6pm", orders: 16 },
  { hour: "7pm", orders: 22 },
  { hour: "8pm", orders: 20 },
  { hour: "9pm", orders: 14 },
  { hour: "10pm", orders: 8 },
];

export default function Analytics() {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(12450)}</div>
            <p className="text-xs flex items-center mt-1 text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +18% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">246</div>
            <p className="text-xs flex items-center mt-1 text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +12% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(50.61)}</div>
            <p className="text-xs flex items-center mt-1 text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +4% from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">184</div>
            <p className="text-xs flex items-center mt-1 text-green-600">
              <ArrowUp className="h-3 w-3 mr-1" />
              +8% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="items">Popular Items</TabsTrigger>
        </TabsList>
        
        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Daily Revenue Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Daily Revenue</CardTitle>
                <CardDescription>Revenue trends over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="#1a365d" name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
                <CardDescription>Sales distribution across menu categories</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Orders by Hour */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Orders by Hour</CardTitle>
                <CardDescription>Hourly order distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyOrderData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#f6ad55" name="Orders" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Busiest Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Busiest Hours</CardTitle>
                <CardDescription>Peak hours with highest order volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hourlyOrderData
                    .sort((a, b) => b.orders - a.orders)
                    .slice(0, 5)
                    .map((hourData, index) => (
                      <div key={index} className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{hourData.hour}</div>
                        </div>
                        <div className="text-sm font-medium">{hourData.orders} orders</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Popular Items Tab */}
        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
              <CardDescription>Most popular menu items by order volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={topSellingItems}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 120, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#0088FE" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Item</CardTitle>
              <CardDescription>Top revenue-generating menu items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellingItems
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.orders} orders</div>
                      </div>
                      <div className="font-medium">{formatCurrency(item.revenue)}</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
