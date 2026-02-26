import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bus, MapPin, CheckCircle, XCircle, Users, Navigation, ChevronRight, Moon, Sun } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { mockRouteStops, mockStudentPickups, mockBusLocations } from "@/utils/mockData";
import MapView from "@/components/map/MapView";
import NotificationPanel from "@/components/notifications/NotificationPanel";

import { Button } from "@/components/ui/button";
import type { StudentPickup } from "@/types";

const DriverDashboard = () => {
  const { setBusLocations, logout, toggleTheme, isDark } = useAppStore();
  const [pickups, setPickups] = useState<StudentPickup[]>(mockStudentPickups);
  const stops = mockRouteStops;
  const currentStop = stops.find((s) => s.status === "current");

  useEffect(() => {
    setBusLocations(mockBusLocations);
  }, [setBusLocations]);

  const confirmBoarding = (id: string) => {
    setPickups((prev) => prev.map((p) => (p.id === id ? { ...p, status: "boarded" as const } : p)));
  };

  const markAbsent = (id: string) => {
    setPickups((prev) => prev.map((p) => (p.id === id ? { ...p, status: "absent" as const } : p)));
  };

  const boarded = pickups.filter((p) => p.status === "boarded").length;
  const total = pickups.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="glass-card-strong border-b border-border/50 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-bold text-sm">SB-101 • Route Alpha</p>
            <p className="text-xs text-muted-foreground">Ahmad K. • Driver</p>
          </div>
        </div>
        <div className="flex items-center gap-2">

          <button onClick={toggleTheme} className="rounded-lg p-2 hover:bg-secondary transition-colors">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <NotificationPanel />

          <button onClick={logout} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 border border-border rounded-lg">
            Logout
          </button>

        </div>
      </header>

      <div className="flex-1 p-4 space-y-4 max-w-2xl mx-auto w-full">
        {/* Route Progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-4">
          <h2 className="font-semibold text-sm mb-4">Route Progress</h2>
          <div className="space-y-0">
            {stops.map((stop, i) => (
              <div key={stop.id} className="flex gap-3">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs shrink-0 ${stop.status === "completed" ? "bg-success text-success-foreground" : stop.status === "current" ? "bg-primary text-primary-foreground animate-pulse-glow" : "bg-secondary text-muted-foreground"}`}>{stop.status === "completed" ? <CheckCircle className="h-3.5 w-3.5" /> : i + 1}</div>
                  {i < stops.length - 1 && <div className={`w-0.5 h-8 ${stop.status === "completed" ? "bg-success" : "bg-border"}`} />}
                </div>
                {/* Info */}
                <div className={`pb-4 ${stop.status === "current" ? "font-medium" : ""}`}>
                  <p className="text-sm">{stop.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {stop.eta} • {stop.studentsCount} students
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Current Stop & Student List */}
        {currentStop && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Current Stop</p>
                <h2 className="font-semibold">{currentStop.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Boarded</p>
                <p className="font-bold text-lg">
                  {boarded}/{total}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {pickups.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">{student.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.stop}</p>
                    </div>
                  </div>
                  {student.status === "waiting" ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => confirmBoarding(student.id)} className="h-10 px-4 text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" /> Board
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => markAbsent(student.id)} className="h-10 px-3">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className={`text-xs font-medium px-2 py-1 rounded ${student.status === "boarded" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>{student.status}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mini Map */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <MapView buses={mockBusLocations.slice(0, 1)} className="h-[250px]" />
        </motion.div>
      </div>
    </div>
  );
};

export default DriverDashboard;
