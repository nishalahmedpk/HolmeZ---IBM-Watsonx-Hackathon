import { useState } from "react";
import { User, Package, Hash, Calendar, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://sales-analysis-api-soa1.onrender.com";

export default function Index() {
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    quantity: "",
    mobileNumber: "",
    tentativeDeliveryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData.customer,
          product: formData.product,
          quantity: parseInt(formData.quantity),
          mobileNumber: formData.mobileNumber,
          tentativeDeliveryDate: formData.tentativeDeliveryDate || undefined,

        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "Order created successfully",
        });
        setFormData({ customer: "", product: "", quantity: "", mobileNumber: "", tentativeDeliveryDate: "" });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create order",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isValid = formData.customer && formData.product && Number(formData.quantity) > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl">
        <div className="glass-card p-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Create New Order</h1>
          <p className="text-muted-foreground mb-8">Fill in the details to place a new order</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customer" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Customer Name *
              </Label>
              <Input
                id="customer"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Enter customer or company name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="product" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Product Name *
              </Label>
              <Input
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Quantity *
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile Number
              </Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tentativeDeliveryDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tentative Delivery Date
              </Label>
              <Input
                id="tentativeDeliveryDate"
                name="tentativeDeliveryDate"
                type="date"
                value={formData.tentativeDeliveryDate}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" disabled={!isValid || loading} className="w-full gap-2" size="lg">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Order...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Request Quota
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
