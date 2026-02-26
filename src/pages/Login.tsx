import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bus, Eye, EyeOff } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import type { UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const demoUsers = [
  { email: "admin@bustrack.io", password: "admin", role: "admin" as UserRole, name: "Admin User" },
  { email: "student@bustrack.io", password: "student", role: "student" as UserRole, name: "Maya Johnson" },
  { email: "driver@bustrack.io", password: "driver", role: "driver" as UserRole, name: "Ahmad K." },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));

    const found = demoUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      login(
        { id: `user-${found.role}`, name: found.name, email: found.email, role: found.role },
        `demo-jwt-token-${found.role}`
      );
      navigate(`/${found.role}`);
    } else {
      setError("Invalid credentials. Try one of the demo accounts below.");
    }
    setLoading(false);
  };

  const quickLogin = (role: UserRole) => {
    const user = demoUsers.find((u) => u.role === role)!;
    login(
      { id: `user-${user.role}`, name: user.name, email: user.email, role: user.role },
      `demo-jwt-token-${user.role}`
    );
    navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gradient-dark">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 rounded-2xl gradient-primary items-center justify-center mb-4 glow-primary">
            <Bus className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">BusTrack Pro</h1>
          <p className="text-muted-foreground text-sm mt-1">Smart School Bus Tracking System</p>
        </div>

        {/* Login Form */}
        <div className="glass-card-strong rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Quick login */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {demoUsers.map((user) => (
                <button
                  key={user.role}
                  onClick={() => quickLogin(user.role)}
                  className="rounded-lg border border-border/50 p-2 text-xs hover:bg-secondary transition-colors text-center"
                >
                  <span className="capitalize font-medium">{user.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
