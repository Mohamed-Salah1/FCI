import AppLayout from "@/components/layout/AppLayout";
import { mockRouteStops } from "@/utils/mockData";
import { motion } from "framer-motion";
import { Route, Plus, Search, Filter, MoreVertical, MapPin, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const RoutesPage = () => {
  const routes = [
    { id: "r1", name: "Route Alpha", stops: 6, students: 42, status: "active", color: "bg-primary" },
    { id: "r2", name: "Route Beta", stops: 8, students: 35, status: "active", color: "bg-success" },
    { id: "r3", name: "Route Gamma", stops: 5, students: 28, status: "inactive", color: "bg-muted" },
    { id: "r4", name: "Route Delta", stops: 7, students: 31, status: "active", color: "bg-warning" },
  ];

  return (
    <AppLayout title="Route Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search routes by name or stop..." className="pl-10" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button size="sm" className="flex-1 md:flex-none">
              <Plus className="h-4 w-4 mr-2" /> Create Route
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${route.color}/10 ${route.color.replace('bg-', 'text-')}`}>
                    <Route className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{route.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" /> {route.stops} Stops
                      </span>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" /> {route.students} Students
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant={route.status === 'active' ? 'default' : 'outline'} className="capitalize">
                  {route.status}
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Main Stops</h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {mockRouteStops.slice(1, 5).map((stop, i) => (
                    <div key={stop.id} className="flex items-center shrink-0">
                      <div className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium">
                        {stop.name}
                      </div>
                      {i < 3 && <div className="w-4 h-px bg-border mx-1" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border/50">
                <Button variant="outline" size="sm" className="flex-1 h-10">
                  Edit Route
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-10">
                  View Map
                </Button>
                <Button variant="outline" size="sm" className="h-10 px-3">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-6 border border-border/50">
          <h3 className="font-semibold mb-4">Route Optimization Suggestions</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">Route Alpha Optimization</p>
                <p className="text-xs text-muted-foreground mt-1">
                  By bypassing City Center during peak hours (07:30-08:00), you can save approximately 12 minutes per trip.
                </p>
                <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-primary">
                  Apply Optimization
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RoutesPage;
