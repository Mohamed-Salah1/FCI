import AppLayout from "@/components/layout/AppLayout";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import { motion } from "framer-motion";
import { Calendar, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import KPICard from "@/components/dashboard/KPICard";
import { Bus, Users, Clock, AlertTriangle } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <AppLayout title="Analytics & Reports">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Feb 1, 2026 - Feb 22, 2026</span>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Download className="h-4 w-4 mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Avg. Occupancy" value="82%" icon={Users} variant="primary" trend="+5% from last month" />
          <KPICard title="On-Time Rate" value="94.2%" icon={Clock} variant="success" trend="+1.2% improvement" />
          <KPICard title="Fuel Efficiency" value="12.5 km/L" icon={Bus} variant="warning" trend="Stable" />
          <KPICard title="Safety Incidents" value="0" icon={AlertTriangle} variant="destructive" trend="No incidents" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold mb-6">Performance Trends</h2>
          <AnalyticsCharts />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="font-semibold mb-4">Route Efficiency</h3>
            <div className="space-y-4">
              {[
                { name: "Route Alpha", efficiency: 95, color: "bg-success" },
                { name: "Route Beta", efficiency: 88, color: "bg-primary" },
                { name: "Route Gamma", efficiency: 72, color: "bg-warning" },
                { name: "Route Delta", efficiency: 91, color: "bg-success" },
              ].map((route) => (
                <div key={route.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span>{route.name}</span>
                    <span className="font-medium">{route.efficiency}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${route.color}`} style={{ width: `${route.efficiency}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="font-semibold mb-4">Driver Performance</h3>
            <div className="space-y-4">
              {[
                { name: "Ahmad K.", rating: 4.9, trips: 124 },
                { name: "Sara M.", rating: 4.8, trips: 118 },
                { name: "Omar R.", rating: 4.5, trips: 92 },
                { name: "Lina H.", rating: 4.7, trips: 105 },
              ].map((driver) => (
                <div key={driver.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{driver.name}</p>
                      <p className="text-xs text-muted-foreground">{driver.trips} trips completed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{driver.rating}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Rating</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
