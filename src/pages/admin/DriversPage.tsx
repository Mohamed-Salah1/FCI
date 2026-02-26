import AppLayout from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { Users, Plus, Search, Filter, MoreVertical, Mail, Phone, Star, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DriversPage = () => {
  const drivers = [
    { 
      id: "d1", 
      name: "Ahmad K.", 
      email: "ahmad.k@example.com", 
      phone: "+1 234 567 890",
      bus: "SB-101",
      route: "Route Alpha",
      status: "active",
      rating: 4.9,
      trips: 124,
      license: "DL-2024-001",
      joinDate: "2023-06-15"
    },
    { 
      id: "d2", 
      name: "Sara M.", 
      email: "sara.m@example.com", 
      phone: "+1 234 567 891",
      bus: "SB-102",
      route: "Route Beta",
      status: "active",
      rating: 4.8,
      trips: 118,
      license: "DL-2024-002",
      joinDate: "2023-07-20"
    },
    { 
      id: "d3", 
      name: "Omar R.", 
      email: "omar.r@example.com", 
      phone: "+1 234 567 892",
      bus: "SB-103",
      route: "Route Gamma",
      status: "inactive",
      rating: 4.5,
      trips: 92,
      license: "DL-2024-003",
      joinDate: "2023-08-10"
    },
    { 
      id: "d4", 
      name: "Lina H.", 
      email: "lina.h@example.com", 
      phone: "+1 234 567 893",
      bus: "SB-104",
      route: "Route Delta",
      status: "active",
      rating: 4.7,
      trips: 105,
      license: "DL-2024-004",
      joinDate: "2023-09-05"
    },
    { 
      id: "d5", 
      name: "Hassan A.", 
      email: "hassan.a@example.com", 
      phone: "+1 234 567 894",
      bus: "SB-105",
      route: "Route Epsilon",
      status: "active",
      rating: 4.6,
      trips: 98,
      license: "DL-2024-005",
      joinDate: "2023-10-12"
    },
  ];

  return (
    <AppLayout title="Driver Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search drivers by name, bus or route..." className="pl-10" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button size="sm" className="flex-1 md:flex-none">
              <Plus className="h-4 w-4 mr-2" /> Add Driver
            </Button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl border border-border/50 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                <TableHead className="w-[200px]">Driver</TableHead>
                <TableHead>Bus & Route</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>License</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow key={driver.id} className="hover:bg-secondary/10 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                        {driver.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{driver.name}</span>
                        <span className="text-[10px] text-muted-foreground">ID: {driver.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{driver.bus}</span>
                      <span className="text-xs text-muted-foreground">{driver.route}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs gap-1">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{driver.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{driver.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-mono text-muted-foreground">{driver.license}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-bold text-sm">{driver.rating}</span>
                      <span className="text-xs text-muted-foreground">({driver.trips} trips)</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={driver.status === 'active' ? 'default' : 'outline'} className="capitalize text-[10px] h-5">
                      {driver.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Performance Report</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" /> Top Performers
              </h3>
              <Button variant="link" size="sm" className="text-primary">View All</Button>
            </div>
            <div className="space-y-4">
              {drivers.filter(d => d.status === 'active').sort((a, b) => b.rating - a.rating).slice(0, 4).map((driver) => (
                <div key={driver.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{driver.name}</p>
                      <p className="text-xs text-muted-foreground">{driver.bus} • {driver.route}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-bold">{driver.rating}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">{driver.trips} trips</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-border/50 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">Driver Statistics</h3>
              <p className="text-sm text-muted-foreground mb-6">Overview of driver fleet and performance.</p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Drivers</span>
                    <span className="font-bold">{drivers.length}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Drivers</span>
                    <span className="font-bold">{drivers.filter(d => d.status === 'active').length}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[80%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg. Rating</span>
                    <span className="font-bold flex items-center gap-1">
                      {(drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1)}
                      <Star className="h-3 w-3 fill-warning text-warning" />
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[92%]" />
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full mt-8 rounded-xl h-12">
              Generate Performance Report
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DriversPage;
