import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bus, Clock, MapPin, CheckCircle, ChevronRight, User, Bell, History, Sun, Moon } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { mockBusLocations, mockAttendance, mockNotifications } from "@/utils/mockData";
import MapView from "@/components/map/MapView";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import { Badge } from "@/components/ui/badge";
import wsService from "@/services/websocket";
import type { BusLocation, Notification } from "@/types";

const statusStyles: Record<string, string> = {
  "on-route": "bg-primary/10 text-primary border-primary/30",
  approaching: "bg-warning/10 text-warning border-warning/30",
  arrived: "bg-success/10 text-success border-success/30",
  idle: "bg-muted text-muted-foreground border-border",
  delayed: "bg-destructive/10 text-destructive border-destructive/30",
};

const StudentDashboard = () => {
  const { busLocations, setBusLocations, updateBusLocation, addNotification, notifications, isDark, toggleTheme, logout } = useAppStore();
  const [activeTab, setActiveTab] = useState<"map" | "history" | "profile">("map");

  useEffect(() => {
    setBusLocations(mockBusLocations);
    if (notifications.length === 0) mockNotifications.forEach((n) => addNotification(n));
    wsService.connect();
    const handler = (data: BusLocation | Notification) => {
      if ("busId" in data) updateBusLocation(data as BusLocation);
    };
    wsService.subscribe("bus-location", handler);
    return () => wsService.unsubscribe("bus-location", handler);
  }, [notifications.length, setBusLocations, addNotification, updateBusLocation]);

  const myBus = busLocations[0]; // Demo: student's assigned bus

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="glass-card-strong border-b border-border/50 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <Bus className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sm">BusTrack</span>
        </div>
        <div className="flex items-center gap-2">

          <button onClick={toggleTheme} className="rounded-lg p-2 hover:bg-secondary transition-colors">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <NotificationPanel />
          <button onClick={logout} className="text-xs text-muted-foreground hover:text-foreground">
            Logout
          </button>
        </div>
      </header>

      {/* ETA Banner */}
      {myBus && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`mx-4 mt-3 rounded-xl p-4 border ${statusStyles[myBus.status]}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide opacity-70">Your Bus</p>
              <p className="text-xl font-bold">{myBus.busNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide opacity-70">ETA</p>
              <p className="text-2xl font-bold">
                {myBus.eta}
                <span className="text-sm ml-1">min</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <MapPin className="h-3 w-3" />
            <span>Next: {myBus.nextStop}</span>
            <span className="mx-1">•</span>
            <span className="capitalize">{myBus.status.replace("-", " ")}</span>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 p-4">
        {activeTab === "map" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-278px)]">
            <MapView buses={busLocations} fullScreen />
          </motion.div>
        )}
        {activeTab === "history" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <h2 className="font-semibold">Attendance History</h2>
            {mockAttendance
              .filter((a) => a.studentName === "Maya Johnson")
              .map((record) => (
                <div key={record.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{record.date}</p>
                    <p className="text-xs text-muted-foreground">
                      Bus {record.busNumber} • {record.boardingTime}
                    </p>
                  </div>
                  <Badge variant={record.status === "present" ? "default" : record.status === "late" ? "secondary" : "destructive"}>{record.status}</Badge>
                </div>
              ))}
          </motion.div>
        )}
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="h-16 w-16 rounded-full gradient-primary mx-auto flex items-center justify-center text-2xl text-primary-foreground font-bold">M</div>
              <h2 className="font-bold mt-3">Maya Johnson</h2>
              <p className="text-sm text-muted-foreground">Grade 10 • Bus SB-101</p>
            </div>
            <div className="glass-card rounded-xl divide-y divide-border/50">
              {[
                { label: "Route", value: "Route Alpha" },
                { label: "Stop", value: "City Center" },
                { label: "Pickup Time", value: "07:15 AM" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="glass-card-strong border-t border-border/50 flex">
        {[
          { id: "map" as const, icon: MapPin, label: "Map" },
          { id: "history" as const, icon: History, label: "History" },
          { id: "profile" as const, icon: User, label: "Profile" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}>
            <tab.icon className="h-5 w-5 mb-1" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default StudentDashboard;
