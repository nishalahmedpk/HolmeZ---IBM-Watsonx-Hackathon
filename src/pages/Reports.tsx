import { useState, useEffect } from "react";
import { format } from "date-fns";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, Package, Truck } from "lucide-react";
import SummaryCard from "@/components/SummaryCard";
import NoData from "@/components/NoData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const API_URL = "https://sales-analysis-api-soa1.onrender.com";
const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"];

export default function Reports() {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const handleChatbotReport = (event: any) => {
      console.log("📊 Received chatbot report data:", event.detail);
      setReportData(event.detail);
      toast({
        title: "Report Updated",
        description: "Dashboard updated from chatbot!",
      });
    };

    window.addEventListener("watsonx-report-data", handleChatbotReport);
    return () => window.removeEventListener("watsonx-report-data", handleChatbotReport);
  }, [toast]);

  useEffect(() => {
    loadTodayReport();
  }, []);

  const loadTodayReport = async () => {
    const today = format(new Date(), "yyyy-MM-dd");
    await fetchReport(today, today);
  };

  const fetchReport = async (start: string | null, end: string | null) => {
    setLoading(true);
    try {
      const body = start && end
        ? { query: `Sales report from ${start} to ${end}`, startDate: start, endDate: end }
        : { query: "All sales data" };

      const response = await fetch(`${API_URL}/api/sales/generate-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("📊 Report data received:", data);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report:", error);
      toast({
        title: "Error",
        description: "Failed to load report",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      fetchReport(startDate, endDate);
    } else {
      fetchReport(null, null);
    }
  };

  const handleQuickFilter = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    const startStr = format(start, "yyyy-MM-dd");
    const endStr = format(end, "yyyy-MM-dd");

    setStartDate(startStr);
    setEndDate(endStr);
    fetchReport(startStr, endStr);
  };

  const hasData = reportData && reportData.summary && reportData.summary.totalOrders > 0;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in bg-gradient-to-b from-background to-secondary/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Sales Analytics</h1>
          <p className="text-muted-foreground mt-1">
            {reportData ? reportData.dateRange : "Loading..."}
          </p>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleQuickFilter(0)} variant="secondary" size="sm">
              Today
            </Button>
            <Button onClick={() => handleQuickFilter(7)} variant="secondary" size="sm">
              This Week
            </Button>
            <Button onClick={() => handleQuickFilter(30)} variant="secondary" size="sm">
              This Month
            </Button>
            <Button
              onClick={() => {
                setStartDate("");
                setEndDate("");
                fetchReport(null, null);
              }}
              variant="secondary"
              size="sm"
            >
              All Time
            </Button>
          </div>

          <Button onClick={handleGenerateReport} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Loading..." : "Generate Report"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px] bg-white">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
          <p className="text-muted-foreground font-medium">Loading report data...</p>
        </div>
      ) : !hasData ? (
        <NoData />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard
              title="Total Orders"
              value={reportData.summary.totalOrders}
              icon={<Package className="w-6 h-6" />}
              color="#3b82f6"
            />
            <SummaryCard
              title="Total Quantity"
              value={reportData.summary.totalQuantity}
              icon={<TrendingUp className="w-6 h-6" />}
              color="#14b8a6"
            />
            <SummaryCard
              title="Delivery Rate"
              value={`${reportData.summary.deliveryRate.toFixed(1)}%`}
              icon={<Truck className="w-6 h-6" />}
              color="#10b981"
            />
            <SummaryCard
              title="Top Product"
              value={reportData.summary.topProduct}
              icon={<Users className="w-6 h-6" />}
              color="#8b5cf6"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reportData.data.monthlyTrend && reportData.data.monthlyTrend.length > 0 && (
              <div className="glass-card p-6 bg-white">
                <h3 className="text-xl font-semibold text-foreground mb-4">Monthly Sales Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reportData.data.monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="quantity" stroke="#3b82f6" strokeWidth={2} name="Quantity" />
                    <Line type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} name="Delivered" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {reportData.data.topCustomers && reportData.data.topCustomers.length > 0 && (
              <div className="glass-card p-6 bg-white">
                <h3 className="text-xl font-semibold text-foreground mb-4">Top Customers</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportData.data.topCustomers.slice(0, 10)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="quantity" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {reportData.data.topProducts && reportData.data.topProducts.length > 0 && (
              <div className="glass-card p-6 bg-white">
                <h3 className="text-xl font-semibold text-foreground mb-4">Top Products</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportData.data.topProducts.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="quantity" fill="#14b8a6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {reportData.data.deliveryStatus && reportData.data.deliveryStatus.length > 0 && (
              <div className="glass-card p-6 bg-white">
                <h3 className="text-xl font-semibold text-foreground mb-4">Delivery Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.data.deliveryStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={(entry: any) => `${entry.name}: ${((entry.value / reportData.summary.totalOrders) * 100).toFixed(1)}%`}
                    >
                      {reportData.data.deliveryStatus.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
