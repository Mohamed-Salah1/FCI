import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { mockAttendance } from "@/utils/mockData";
import { motion } from "framer-motion";
import { Users, Plus, MoreVertical, CheckCircle, XCircle, Clock, User, Edit, Trash2, History } from "lucide-react";
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
import { Student } from "@/types/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StudentForm } from "@/components/forms/StudentForm";
import { toast } from "sonner";

const StudentsPage = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: "s1", name: "Maya Johnson", grade: "10th Grade", bus: "SB-101", stop: "City Center", status: "active", email: "maya.j@example.com", phone: "+1 234 567 890" },
    { id: "s2", name: "Ali Hassan", grade: "11th Grade", bus: "SB-101", stop: "City Center", status: "active", email: "ali.h@example.com", phone: "+1 234 567 891" },
    { id: "s3", name: "Emma Davis", grade: "9th Grade", bus: "SB-102", stop: "University Gate", status: "inactive", email: "emma.d@example.com", phone: "+1 234 567 892" },
    { id: "s4", name: "Noah Smith", grade: "12th Grade", bus: "SB-102", stop: "University Gate", status: "active", email: "noah.s@example.com", phone: "+1 234 567 893" },
    { id: "s5", name: "Lara Khalil", grade: "10th Grade", bus: "SB-103", stop: "Elm Street", status: "active", email: "lara.k@example.com", phone: "+1 234 567 894" },
    { id: "s6", name: "Zain Abou", grade: "11th Grade", bus: "SB-104", stop: "Green Valley", status: "active", email: "zain.a@example.com", phone: "+1 234 567 895" },
  ]);

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "name",
      header: "Student",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
            {row.original.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-[10px] text-muted-foreground">ID: {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "grade",
      header: "Grade",
    },
    {
      accessorKey: "bus",
      header: "Bus & Stop",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{row.original.bus}</span>
          <span className="text-xs text-muted-foreground">{row.original.stop}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'active' ? 'default' : 'outline'} className="capitalize text-[10px] h-5">
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
              <DropdownMenuItem onClick={() => setEditingStudent(row.original)}>
                <Edit className="h-4 w-4 mr-2" /> Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" /> View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <History className="h-4 w-4 mr-2" /> Attendance History
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
    const newStudent = {
      ...data,
      id: `s${students.length + 1}`,
      bus: data.route,
      stop: data.pickupPoint,
    };
    setStudents([newStudent, ...students]);
    setIsAddOpen(false);
    toast.success("Student added successfully");
  };

  const handleEdit = (data: any) => {
    if (!editingStudent) return;
    setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...data, bus: data.route, stop: data.pickupPoint } : s));
    setEditingStudent(null);
    toast.success("Student updated successfully");
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    toast.success("Student deleted successfully");
  };

  return (
    <AppLayout title="Student Directory">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Students
          </h2>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add Student
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl border border-border/50 p-4"
        >
          <DataTable 
            columns={columns} 
            data={students} 
            searchKey="name" 
            searchPlaceholder="Search students by name..." 
          />
        </motion.div>

      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <StudentForm 
            onSubmit={handleAdd} 
            onCancel={() => setIsAddOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={!!editingStudent} onOpenChange={(open) => !open && setEditingStudent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Student Details</DialogTitle>
          </DialogHeader>
          {editingStudent && (
            <StudentForm 
              initialData={editingStudent}
              onSubmit={handleEdit} 
              onCancel={() => setEditingStudent(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default StudentsPage;
