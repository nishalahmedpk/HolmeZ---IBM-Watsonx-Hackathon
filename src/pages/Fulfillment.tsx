import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Send, DollarSign, Package, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import NoData from "@/components/NoData";

const API_URL = "https://sales-analysis-api-soa1.onrender.com";

interface PendingOrder {
    id: number;
    customer: string;
    product: string;
    quantity: number;
    requested_date: string;
    mobile_number: string;
    INVOICE_GENERATED: boolean;
}

export default function Fulfillment() {
    const [orders, setOrders] = useState<PendingOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [processingId, setProcessingId] = useState<number | null>(null);
    const [amounts, setAmounts] = useState<{ [key: number]: string }>({});
    const { toast } = useToast();

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const fetchPendingOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/fulfillment/pending`);
            const data = await response.json();
            if (data.success) {
                setOrders(data.data);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Error fetching pending orders:", error);
            toast({
                title: "Error",
                description: "Failed to load pending orders",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAmountChange = (id: number, value: string) => {
        setAmounts(prev => ({ ...prev, [id]: value }));
    };

    const handleProcessInvoice = async (orderId: number) => {
        const amount = amounts[orderId];
        if (!amount || isNaN(parseFloat(amount))) {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid amount",
                variant: "destructive",
            });
            return;
        }

        setProcessingId(orderId);
        try {
            const response = await fetch(`${API_URL}/api/fulfillment/process`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    salesId: orderId,
                    amount: parseFloat(amount),
                }),
            });

            const data = await response.json();
            if (data.success) {
                toast({
                    title: "Success",
                    description: "Invoice generated successfully",
                });
                // Remove the processed order from the list
                setOrders(prev => prev.filter(o => o.id !== orderId));
                // Clear amount input
                const newAmounts = { ...amounts };
                delete newAmounts[orderId];
                setAmounts(newAmounts);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error("Error processing invoice:", error);
            toast({
                title: "Error",
                description: "Failed to generate invoice",
                variant: "destructive",
            });
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in bg-gradient-to-b from-background to-secondary/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Fulfillment</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage pending orders and generate invoices
                    </p>
                </div>
                <Button onClick={fetchPendingOrders} variant="outline" size="sm" disabled={loading}>
                    Refresh List
                </Button>
            </div>

            {loading ? (
                <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px] bg-white">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                    <p className="text-muted-foreground font-medium">Loading pending orders...</p>
                </div>
            ) : orders.length === 0 ? (
                <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px] bg-white text-center">
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Package className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
                    <p className="text-muted-foreground">No pending orders found requiring invoice generation.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="glass-card p-6 bg-white hover:shadow-lg transition-all duration-300 border border-border/50">
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                                <User className="w-4 h-4 text-primary" />
                                                {order.customer}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Calendar className="w-3 h-3" />
                                                Requested: {format(new Date(order.requested_date), "MMM d, yyyy")}
                                            </div>
                                        </div>
                                        <div className="bg-secondary/50 px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground">
                                            ID: #{order.id}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                                            <div className="bg-primary/10 p-2 rounded-md">
                                                <Package className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Product</p>
                                                <p className="font-medium">{order.product}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                                            <div className="bg-primary/10 p-2 rounded-md">
                                                <span className="text-xs font-bold text-primary">Qty</span>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground">Quantity</p>
                                                <p className="font-medium">{order.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-end gap-3 lg:w-72 border-t lg:border-t-0 lg:border-l border-border/50 pt-4 lg:pt-0 lg:pl-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <DollarSign className="w-4 h-4" />
                                            Invoice Amount
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                className="pl-7"
                                                value={amounts[order.id] || ""}
                                                onChange={(e) => handleAmountChange(order.id, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleProcessInvoice(order.id)}
                                        disabled={processingId === order.id || !amounts[order.id]}
                                        className="w-full"
                                    >
                                        {processingId === order.id ? (
                                            "Processing..."
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Send Invoice
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
