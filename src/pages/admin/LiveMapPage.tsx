import AppLayout from "@/components/layout/AppLayout";
import MapView from "@/components/map/MapView";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { mockBusLocations } from "@/utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, MapPin, Users, Clock, ChevronRight, ChevronLeft, Search, Filter, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LiveMapPage = () => {
  const { busLocations, setBusLocations } = useAppStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (busLocations.length === 0) {
      setBusLocations(mockBusLocations);
    }
  }, [busLocations.length, setBusLocations]);

  const filteredBuses = busLocations.filter(bus => 
    bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bus.driverName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title="Live Tracking Map">
      <div className="flex h-[calc(100vh-120px)] w-full rounded-xl overflow-hidden border border-border/50 bg-background relative">
        {/* Map Area */}
        <div className="flex-1 relative">
          <MapView buses={busLocations} fullScreen />
          
          {/* Toggle Sidebar Button (Mobile/Tablet) */}
          {!isSidebarOpen && (
            <Button 
              variant="secondary" 
              size="icon" 
              className="absolute top-4 left-4 z-10 shadow-lg border border-border/50"
              onClick={() => setIsSidebarOpen(true)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Live Trips Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="w-80 border-l border-border/50 bg-background/95 backdrop-blur-md flex flex-col z-20"
            >
              <div className="p-4 border-b border-border/50 flex items-center justify-between bg-secondary/20">
                <h3 className="font-bold flex items-center gap-2">
                  <Bus className="h-4 w-4 text-primary" /> Live Trips
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSidebarOpen(false)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-3 space-y-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input 
                    placeholder="Search trips..." 
                    className="pl-8 h-9 text-xs" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-secondary">All</Badge>
                  <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-secondary">On Route</Badge>
                  <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-secondary text-destructive">Delayed</Badge>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {filteredBuses.length > 0 ? (
                  filteredBuses.map((bus) => (
                    <div 
                      key={bus.busId} 
                      className="p-3 rounded-xl border border-border/50 bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                            bus.status === 'delayed' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                          }`}>
                            <Bus className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{bus.busNumber}</p>
                            <p className="text-[10px] text-muted-foreground">{bus.routeName}</p>
                          </div>
                        </div>
                        <Badge variant={bus.status === 'delayed' ? 'destructive' : 'default'} className="text-[9px] h-4 px-1.5">
                          {bus.status === 'on-route' ? 'Live' : bus.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{bus.occupancy}/{bus.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{bus.eta} min</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] font-medium text-foreground bg-background/50 p-1.5 rounded-md border border-border/30">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span className="truncate">Next: {bus.nextStop}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2 opacity-20" />
                    <p className="text-xs text-muted-foreground">No active trips found</p>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-border/50 bg-secondary/10">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Active Buses</span>
                  <span className="font-bold">{busLocations.filter(b => b.status !== 'idle').length}</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default LiveMapPage;
