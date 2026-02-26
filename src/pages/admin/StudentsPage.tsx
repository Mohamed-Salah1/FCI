import AppLayout from "@/components/layout/AppLayout";
import { mockAttendance } from "@/utils/mockData";
import { motion } from "framer-motion";
import { Users, Plus, Search, Filter, MoreVertical, Mail, Phone, Bus, CheckCircle, XCircle, Clock } from "lucide-react";
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

const StudentsPage = () => {
  const students = [
    { id: "s1", name: "Maya Johnson", grade: "10th Grade", bus: "SB-101", stop: "City Center", status: "active", email: "maya.j@example.com", phone: "+1 234 567 890" },
    { id: "s2", name: "Ali Hassan", grade: "11th Grade", bus: "SB-101", stop: "City Center", status: "active", email: "ali.h@example.com", phone: "+1 234 567 891" },
    { id: "s3", name: "Emma Davis", grade: "9th Grade", bus: "SB-102", stop: "University Gate", status: "inactive", email: "emma.d@example.com", phone: "+1 234 567 892" },
    { id: "s4", name: "Noah Smith", grade: "12th Grade", bus: "SB-102", stop: "University Gate", status: "active", email: "noah.s@example.com", phone: "+1 234 567 893" },
    { id: "s5", name: "Lara Khalil", grade: "10th Grade", bus: "SB-103", stop: "Elm Street", status: "active", email: "lara.k@example.com", phone: "+1 234 567 894" },
    { id: "s6", name: "Zain Abou", grade: "11th Grade", bus: "SB-104", stop: "Green Valley", status: "active", email: "zain.a@example.com", phone: "+1 234 567 895" },
  ];

  return (
    <AppLayout title="Student Directory">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search students by name, grade or bus..." className="pl-10" />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button size="sm" className="flex-1 md:flex-none">
              <Plus className="h-4 w-4 mr-2" /> Add Student
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
                <TableHead className="w-[250px]">Student</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Bus & Stop</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="hover:bg-secondary/10 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-[10px] text-muted-foreground">ID: {student.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{student.grade}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Bus className="h-3 w-3 text-primary" />
                        <span>{student.bus}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{student.stop}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs gap-1">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{student.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'active' ? 'default' : 'outline'} className="capitalize text-[10px] h-5">
                      {student.status}
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
                        <DropdownMenuItem>Attendance History</DropdownMenuItem>
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
              <h3 className="font-bold text-lg">Recent Attendance Activity</h3>
              <Button variant="link" size="sm" className="text-primary">View All</Button>
            </div>
            <div className="space-y-4">
              {mockAttendance.slice(0, 4).map((record, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      record.status === 'present' ? 'bg-success/10 text-success' :
                      record.status === 'absent' ? 'bg-destructive/10 text-destructive' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {record.status === 'present' ? <CheckCircle className="h-5 w-5" /> :
                       record.status === 'absent' ? <XCircle className="h-5 w-5" /> :
                       <Clock className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{record.studentName}</p>
                      <p className="text-xs text-muted-foreground">Bus {record.busNumber} • {record.boardingTime}</p>
                    </div>
                  </div>
                  <Badge variant={record.status === 'present' ? 'default' : record.status === 'late' ? 'secondary' : 'destructive'} className="capitalize">
                    {record.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-border/50 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">Student Statistics</h3>
              <p className="text-sm text-muted-foreground mb-6">Overview of student enrollment and status.</p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Students</span>
                    <span className="font-bold">1,240</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Riders</span>
                    <span className="font-bold">1,185</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[95%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pending Registration</span>
                    <span className="font-bold">55</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[5%]" />
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full mt-8 rounded-xl h-12">
              Generate Enrollment Report
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentsPage;
