import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bus, Users, Map, User, CheckCircle, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppStore } from "@/store/useAppStore";
import { mockRouteStops, mockStudentPickups, mockBusLocations } from "@/utils/mockData";
import MapView from "@/components/map/MapView";
import NotificationPanel from "@/components/notifications/NotificationPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { StudentPickup } from "@/types";

type TabType = "Home" | "students" | "map" | "profile";

const DriverDashboard = () => {
  const { setBusLocations, logout, toggleTheme, isDark } = useAppStore();

  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<TabType>("Home");

  const [pickups, setPickups] = useState<StudentPickup[]>(mockStudentPickups);

  const [tripStatus, setTripStatus] = useState<"idle" | "running" | "paused" | "ended">("idle");

  const [seconds, setSeconds] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: "Ahmad Khaled",
    phone: "01012345678",
    email: "ahmad@email.com",
    license: "DRV-987654",
    busNumber: "SB-101",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    setBusLocations(mockBusLocations);
  }, [setBusLocations]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (tripStatus === "running") {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tripStatus]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const confirmBoarding = (id: string) => {
    setPickups((prev) => prev.map((student) => (student.id === id ? { ...student, status: "boarded" as const } : student)));
  };

  const markAbsent = (id: string) => {
    setPickups((prev) => prev.map((student) => (student.id === id ? { ...student, status: "absent" as const } : student)));
  };

  const boarded = pickups.filter((p) => p.status === "boarded").length;

  const absent = pickups.filter((p) => p.status === "absent").length;

  const waiting = pickups.filter((p) => p.status === "waiting").length;

  const currentStop = mockRouteStops.find((s) => s.status === "current");

  const copyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast({
      description: "Phone number copied",
    });
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { label: "Weak", color: "bg-red-500" };
    if (strength === 2) return { label: "Medium", color: "bg-yellow-500" };
    if (strength >= 3) return { label: "Strong", color: "bg-emerald-500" };

    return { label: "", color: "" };
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* HEADER */}
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

      {/* CONTENT */}
      <div className="flex-1 p-4 space-y-4">
        {/* Home */}
        {activeTab === "Home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Combined Card */}
            <div className="glass-card rounded-2xl p-5 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-muted-foreground">Current Stop</p>
                  <p className="text-lg font-bold">{currentStop?.name}</p>
                  <p className="text-xs text-muted-foreground">ETA {currentStop?.eta}</p>
                </div>

                <Badge>{tripStatus.toUpperCase()}</Badge>
              </div>

              <div className="text-center text-3xl font-bold tracking-widest">{formatTime(seconds)}</div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setTripStatus("running")}>
                  Start
                </Button>
                <Button variant="secondary" className="flex-1" onClick={() => setTripStatus("paused")}>
                  Pause
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => setTripStatus("ended")}>
                  End
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Boarded</p>
                  <p className="font-bold text-success">{boarded}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Waiting</p>
                  <p className="font-bold text-blue-500">{waiting}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Absent</p>
                  <p className="font-bold text-destructive">{absent}</p>
                </div>
              </div>
            </div>

            {/* Route Timeline */}
            <div className="glass-card rounded-2xl p-4 space-y-4">
              <h2 className="text-sm font-semibold">Route Progress</h2>

              {mockRouteStops.map((stop, index) => (
                <div key={stop.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${stop.status === "completed" ? "bg-success border-success" : stop.status === "current" ? "border-primary bg-primary/20 animate-pulse" : "border-border"}`}>{stop.status === "completed" && <CheckCircle className="h-3 w-3 text-white" />}</div>

                    {index !== mockRouteStops.length - 1 && <div className="w-0.5 h-8 bg-border mt-1" />}
                  </div>

                  <div className="flex-1 pb-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-sm ${stop.status === "current" ? "font-semibold text-primary" : ""}`}>{stop.name}</span>

                      <span className="text-xs text-muted-foreground">{stop.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ================= STUDENTS ================= */}
        {activeTab === "students" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-emerald-400">Boarded {boarded}</span>
              <span className="text-blue-400">Waiting {waiting}</span>
              <span className="text-red-400">Absent {absent}</span>
            </div>

            {pickups.map((student) => {
              const statusColor = student.status === "boarded" ? "text-emerald-400" : student.status === "waiting" ? "text-blue-400" : "text-red-400";

              return (
                <div key={student.id} className="glass-card rounded-lg p-3 border border-border/40">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">{student.name.charAt(0)}</div>

                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.stop}</p>
                        <button onClick={() => copyPhone("01012345678")} className="text-xs text-muted-foreground hover:text-primary">
                          📞 01012345678
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs ${statusColor}`}>{student.status}</span>

                      {student.status === "waiting" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="h-7 px-3 text-xs" onClick={() => confirmBoarding(student.id)}>
                            Board
                          </Button>

                          <Button size="sm" variant="destructive" className="h-7 px-3 text-xs" onClick={() => markAbsent(student.id)}>
                            Absent
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* MAP */}
        {activeTab === "map" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-170px)]">
            <MapView buses={mockBusLocations} fullScreen />
          </motion.div>
        )}

        {/* PROFILE */}
        {/* ================= PROFILE ================= */}
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Avatar Card */}
            <div className="glass-card rounded-2xl p-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full gradient-primary mx-auto flex items-center justify-center text-xl text-primary-foreground font-bold">{profile.name.charAt(0)}</div>

              <div>
                <h2 className="font-bold text-xl">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">Driver • {profile.busNumber}</p>
              </div>

              <Button size="sm" variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {/* Form */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" disabled={!isEditing} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" disabled={!isEditing} value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" disabled={!isEditing} value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>

              {/* License */}
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input
                  id="license"
                  disabled={!isEditing}
                  value={profile.license}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      license: e.target.value,
                    })
                  }
                />
              </div>

              {/* Bus Number (Disabled Always) */}
              <div className="space-y-2">
                <Label htmlFor="bus">Bus Number</Label>
                <Input id="bus" disabled value={profile.busNumber} />
              </div>

              {/* Password Section */}
              {isEditing && (
                <>
                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>

                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={profile.password}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            password: e.target.value,
                          })
                        }
                      />

                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {profile.password && (
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-border rounded">
                          <div
                            className={`h-1.5 rounded transition-all ${getPasswordStrength(profile.password).color}`}
                            style={{
                              width: getPasswordStrength(profile.password).label === "Weak" ? "33%" : getPasswordStrength(profile.password).label === "Medium" ? "66%" : "100%",
                            }}
                          />
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Strength: <span className="font-medium">{getPasswordStrength(profile.password).label}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>

                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={profile.confirmPassword}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            confirmPassword: e.target.value,
                          })
                        }
                      />

                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Save Button */}
              {isEditing && (
                <Button
                  className="w-full"
                  onClick={() => {
                    if (profile.password && profile.password !== profile.confirmPassword) {
                      toast({
                        title: "Error",
                        description: "Passwords do not match",
                        variant: "destructive",
                      });
                      return;
                    }

                    setIsEditing(false);

                    toast({
                      title: "Profile Updated",
                      description: "Changes saved successfully",
                    });
                  }}
                >
                  Save Changes
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="glass-card-strong border-t border-border/50 flex">
        {[
          {
            id: "Home",
            icon: Bus,
            label: "Home",
          },
          {
            id: "students",
            icon: Users,
            label: "Students",
          },
          {
            id: "map",
            icon: Map,
            label: "Map",
          },
          {
            id: "profile",
            icon: User,
            label: "Profile",
          },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as TabType)} className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors ${activeTab === tab.id ? "text-primary" : "text-muted-foreground"}`}>
            <tab.icon className="h-5 w-5 mb-1" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DriverDashboard;
