import AppLayout from "@/components/layout/AppLayout";
import { mockBusLocations } from "@/utils/mockData";
import { motion } from "framer-motion";
import { Bus, Plus, Search, Filter, MoreVertical, Settings, AlertTriangle, CheckCircle, Users, MapPin } from "lucide-react";
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

const BusesPage = () => {
  return (
    <AppLayout title="Fleet Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search buses by number or driver..." className="pl-10" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button size="sm" className="flex-1 md:flex-none">
              <Plus className="h-4 w-4 mr-2" /> Add Bus
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
                <TableHead className="w-[150px]">Bus Number</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Next Stop</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBusLocations.map((bus) => (
                <TableRow key={bus.busId} className="hover:bg-secondary/10 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                        bus.status === 'delayed' ? 'bg-destructive/10 text-destructive' :
                        bus.status === 'idle' ? 'bg-muted text-muted-foreground' :
                        'bg-primary/10 text-primary'
                      }`}>
                        <Bus className="h-5 w-5" />
                      </div>
                      <span className="font-bold">{bus.busNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{bus.routeName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                        {bus.driverName.charAt(0)}
                      </div>
                      <span className="text-sm">{bus.driverName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5 w-24">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">{bus.occupancy}/{bus.capacity}</span>
                        <span className="font-medium">{Math.round((bus.occupancy/bus.capacity)*100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full ${bus.occupancy / bus.capacity > 0.9 ? 'bg-destructive' : 'bg-primary'}`}
                          style={{ width: `${(bus.occupancy / bus.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{bus.nextStop}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      bus.status === 'on-route' ? 'default' :
                      bus.status === 'approaching' ? 'secondary' :
                      bus.status === 'delayed' ? 'destructive' : 'outline'
                    } className="capitalize text-[10px] h-5">
                      {bus.status.replace('-', ' ')}
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
                        <DropdownMenuItem>Track Live</DropdownMenuItem>
                        <DropdownMenuItem>Manage Bus</DropdownMenuItem>
                        <DropdownMenuItem>Maintenance Log</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove Bus</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        <div className="glass-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h3 className="font-semibold">Maintenance Alerts</h3>
          </div>
          <div className="space-y-3">
            {[
              { bus: "SB-103", issue: "Engine service due in 250km", priority: "medium" },
              { bus: "SB-105", issue: "Brake pad wear detected", priority: "high" },
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">{alert.bus}</span>
                  <span className="text-sm text-muted-foreground">{alert.issue}</span>
                </div>
                <Badge variant={alert.priority === 'high' ? 'destructive' : 'secondary'} className="text-[10px] uppercase">
                  {alert.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default BusesPage;
