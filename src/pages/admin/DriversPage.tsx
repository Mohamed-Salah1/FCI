import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { User as SteeringWheel, Plus, MoreVertical, Phone, CreditCard, Calendar as CalendarIcon, Edit, Trash2, Eye, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Driver } from "@/types/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DriverForm } from "@/components/forms/DriverForm";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DriversPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [viewingDriver, setViewingDriver] = useState<Driver | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: "d1", name: "Robert Wilson", phone: "+1 234 567 801", licenseNumber: "DL-99283", licenseExpiry: "2025-12-10", assignedBus: "SB-101", status: "active", availability: "on-duty" },
    { id: "d2", name: "Michael Chen", phone: "+1 234 567 802", licenseNumber: "DL-11234", licenseExpiry: "2026-05-22", assignedBus: "SB-102", status: "active", availability: "available" },
    { id: "d3", name: "Sarah Miller", phone: "+1 234 567 803", licenseNumber: "DL-88721", licenseExpiry: "2024-11-15", assignedBus: "SB-103", status: "active", availability: "off-duty" },
    { id: "d4", name: "David Brown", phone: "+1 234 567 804", licenseNumber: "DL-55432", licenseExpiry: "2025-08-30", assignedBus: "SB-104", status: "inactive", availability: "off-duty" },
  ]);

  const columns: ColumnDef<Driver>[] = [
    {
      accessorKey: "name",
      header: "Driver",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback className="gradient-primary text-primary-foreground font-bold">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground">ID: {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-sm">
          <Phone className="h-3 w-3 text-muted-foreground" />
          <span>{row.original.phone}</span>
        </div>
      ),
    },
    {
      accessorKey: "assignedBus",
      header: "Assigned Bus",
      cell: ({ row }) => (
        <Badge variant="secondary" className="font-mono">{row.original.assignedBus}</Badge>
      ),
    },
    {
      accessorKey: "availability",
      header: "Availability",
      cell: ({ row }) => {
        const colors = {
          "available": "bg-success/10 text-success border-success/20",
          "on-duty": "bg-primary/10 text-primary border-primary/20",
          "off-duty": "bg-muted text-muted-foreground border-transparent",
        };
        return (
          <Badge variant="outline" className={`capitalize text-[10px] ${colors[row.original.availability as keyof typeof colors]}`}>
            {row.original.availability.replace("-", " ")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'active' ? 'default' : 'outline'} className="capitalize text-[10px]">
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewingDriver(row.original)}>
                <Eye className="h-4 w-4 mr-2" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditingDriver(row.original)}>
                <Edit className="h-4 w-4 mr-2" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleStatus(row.original.id)}>
                {row.original.status === 'active' ? (
                  <><UserX className="h-4 w-4 mr-2" /> Deactivate</>
                ) : (
                  <><UserCheck className="h-4 w-4 mr-2" /> Activate</>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(row.original.id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const handleAdd = (data: any) => {
    const newDriver = {
      ...data,
      id: `d${drivers.length + 1}`,
      licenseExpiry: data.licenseExpiry.toISOString().split('T')[0],
    };
    setDrivers([newDriver, ...drivers]);
    setIsAddOpen(false);
    toast.success("Driver added successfully");
  };

  const handleEdit = (data: any) => {
    if (!editingDriver) return;
    setDrivers(drivers.map(d => d.id === editingDriver.id ? { 
      ...d, 
      ...data, 
      licenseExpiry: data.licenseExpiry instanceof Date ? data.licenseExpiry.toISOString().split('T')[0] : data.licenseExpiry 
    } : d));
    setEditingDriver(null);
    toast.success("Driver updated successfully");
  };

  const handleDelete = (id: string) => {
    setDrivers(drivers.filter(d => d.id !== id));
    toast.success("Driver deleted successfully");
  };

  const toggleStatus = (id: string) => {
    setDrivers(drivers.map(d => d.id === id ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' } : d));
    toast.success("Driver status updated");
  };

  return (
    <AppLayout title="Driver Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <SteeringWheel className="h-6 w-6 text-primary" />
            Drivers
          </h2>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Driver
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl border border-border/50 p-4"
        >
          <DataTable 
            columns={columns} 
            data={drivers} 
            searchKey="name" 
            searchPlaceholder="Search drivers by name..." 
          />
        </motion.div>
      </div>

      {/* Add Driver Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Driver</DialogTitle>
          </DialogHeader>
          <DriverForm 
            onSubmit={handleAdd} 
            onCancel={() => setIsAddOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Edit Driver Dialog */}
      <Dialog open={!!editingDriver} onOpenChange={(open) => !open && setEditingDriver(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Driver Details</DialogTitle>
          </DialogHeader>
          {editingDriver && (
            <DriverForm 
              initialData={editingDriver}
              onSubmit={handleEdit} 
              onCancel={() => setEditingDriver(null)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Driver Profile Drawer */}
      <Sheet open={!!viewingDriver} onOpenChange={(open) => !open && setViewingDriver(null)}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Driver Profile</SheetTitle>
          </SheetHeader>
          {viewingDriver && (
            <div className="mt-8 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl gradient-primary text-primary-foreground font-bold">
                    {viewingDriver.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{viewingDriver.name}</h3>
                  <Badge variant="outline" className="mt-1">ID: {viewingDriver.id}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</span>
                    <span className="font-medium">{viewingDriver.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><CreditCard className="h-4 w-4" /> License</span>
                    <span className="font-medium">{viewingDriver.licenseNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Expiry</span>
                    <span className="font-medium">{viewingDriver.licenseExpiry}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assigned Bus</span>
                    <Badge variant="secondary">{viewingDriver.assignedBus}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Status</span>
                    <Badge variant={viewingDriver.status === 'active' ? 'default' : 'outline'}>{viewingDriver.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => {
                  setEditingDriver(viewingDriver);
                  setViewingDriver(null);
                }}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default DriversPage;
