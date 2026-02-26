// Types for the bus tracking system

export type UserRole = "admin" | "student" | "driver";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface BusLocation {
  busId: string;
  busNumber: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  occupancy: number;
  capacity: number;
  status: "on-route" | "approaching" | "arrived" | "idle" | "delayed";
  routeName: string;
  nextStop: string;
  eta: number; // minutes
  driverName: string;
  lastUpdated: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  timestamp: string;
  read: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentName: string;
  busNumber: string;
  date: string;
  boardingTime: string;
  status: "present" | "absent" | "late";
}

export interface RouteStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  eta: string;
  status: "completed" | "current" | "upcoming";
  studentsCount: number;
}

export interface StudentPickup {
  id: string;
  name: string;
  stop: string;
  status: "waiting" | "boarded" | "absent";
  avatar?: string;
}
