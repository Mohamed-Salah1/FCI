import { motion } from "framer-motion";
import { Bus, MapPin, Clock, Users } from "lucide-react";
import type { BusLocation } from "@/types";

interface MapViewProps {
  buses: BusLocation[];
  className?: string;
  fullScreen?: boolean;
}

const statusColors: Record<string, string> = {
  "on-route": "bg-primary",
  approaching: "bg-warning",
  arrived: "bg-success",
  idle: "bg-muted-foreground",
  delayed: "bg-destructive",
};

const MapView = ({ buses, className = "", fullScreen = false }: MapViewProps) => {
  return (
    <div className={`relative overflow-hidden rounded-xl glass-card ${fullScreen ? "h-full" : "h-[400px]"} ${className}`}>
      {/* Grid background to simulate map */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Simulated route lines */}
      <svg className="absolute inset-0 h-full w-full opacity-30">
        <path d="M 50 300 Q 200 100 400 200 T 700 150" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeDasharray="8 4" />
        <path d="M 100 350 Q 300 250 500 300 T 800 250" stroke="hsl(var(--success))" strokeWidth="2" fill="none" strokeDasharray="8 4" />
      </svg>

      {/* Bus markers */}
      {buses.map((bus, i) => (
        <motion.div
          key={bus.busId}
          initial={{ scale: 0 }}
          animate={{ scale: 1, x: [0, 3, -3, 0], y: [0, -2, 2, 0] }}
          transition={{ scale: { duration: 0.3, delay: i * 0.1 }, x: { duration: 4, repeat: Infinity, delay: i * 0.5 }, y: { duration: 3, repeat: Infinity, delay: i * 0.3 } }}
          className="absolute cursor-pointer group"
          style={{ left: `${15 + i * 18}%`, top: `${25 + (i % 3) * 20}%` }}
        >
          <div className="relative">
            <div className={`h-10 w-10 rounded-full ${statusColors[bus.status]} flex items-center justify-center shadow-lg`}>
              <Bus className="h-5 w-5 text-primary-foreground" />
            </div>
            {bus.status !== "idle" && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success animate-pulse-glow" />
            )}
            {/* Popup */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass-card-strong rounded-lg p-3 min-w-[180px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <p className="font-semibold text-sm">{bus.busNumber}</p>
              <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {bus.nextStop}</div>
                <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> ETA: {bus.eta} min</div>
                <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {bus.occupancy}/{bus.capacity}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Map legend */}
      <div className="absolute bottom-3 left-3 glass-card-strong rounded-lg p-2 text-xs">
        <p className="font-medium mb-1">Live Tracking</p>
        <div className="flex gap-3">
          {[
            { label: "On Route", color: "bg-primary" },
            { label: "Approaching", color: "bg-warning" },
            { label: "Delayed", color: "bg-destructive" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mapbox placeholder notice */}
      <div className="absolute top-3 right-3 glass-card-strong rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3 inline mr-1" />
        Map Simulation • Add Mapbox key for live map
      </div>
    </div>
  );
};

export default MapView;
