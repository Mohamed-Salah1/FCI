import type { BusLocation, AttendanceRecord, Notification, RouteStop, StudentPickup } from "@/types";

export const mockBusLocations: BusLocation[] = [
  { busId: "bus-1", busNumber: "SB-101", lat: 33.8886, lng: 35.4955, speed: 35, heading: 45, occupancy: 28, capacity: 40, status: "on-route", routeName: "Route Alpha", nextStop: "City Center", eta: 8, driverName: "Ahmad K.", lastUpdated: new Date().toISOString() },
  { busId: "bus-2", busNumber: "SB-102", lat: 33.8950, lng: 35.5010, speed: 20, heading: 120, occupancy: 35, capacity: 40, status: "approaching", routeName: "Route Beta", nextStop: "University Gate", eta: 3, driverName: "Sara M.", lastUpdated: new Date().toISOString() },
  { busId: "bus-3", busNumber: "SB-103", lat: 33.8820, lng: 35.4880, speed: 0, heading: 0, occupancy: 0, capacity: 40, status: "idle", routeName: "Route Gamma", nextStop: "Depot", eta: 0, driverName: "Omar R.", lastUpdated: new Date().toISOString() },
  { busId: "bus-4", busNumber: "SB-104", lat: 33.8900, lng: 35.5050, speed: 45, heading: 270, occupancy: 22, capacity: 40, status: "on-route", routeName: "Route Delta", nextStop: "Mall Junction", eta: 12, driverName: "Lina H.", lastUpdated: new Date().toISOString() },
  { busId: "bus-5", busNumber: "SB-105", lat: 33.8870, lng: 35.4920, speed: 15, heading: 180, occupancy: 38, capacity: 40, status: "delayed", routeName: "Route Epsilon", nextStop: "Hospital Road", eta: 18, driverName: "Karim B.", lastUpdated: new Date().toISOString() },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: "1", studentName: "Maya Johnson", busNumber: "SB-101", date: "2026-02-22", boardingTime: "07:15", status: "present" },
  { id: "2", studentName: "Ali Hassan", busNumber: "SB-101", date: "2026-02-22", boardingTime: "07:18", status: "present" },
  { id: "3", studentName: "Emma Davis", busNumber: "SB-102", date: "2026-02-22", boardingTime: "-", status: "absent" },
  { id: "4", studentName: "Noah Smith", busNumber: "SB-102", date: "2026-02-22", boardingTime: "07:32", status: "late" },
  { id: "5", studentName: "Lara Khalil", busNumber: "SB-103", date: "2026-02-22", boardingTime: "07:10", status: "present" },
  { id: "6", studentName: "Zain Abou", busNumber: "SB-104", date: "2026-02-22", boardingTime: "07:20", status: "present" },
  { id: "7", studentName: "Sophie Lee", busNumber: "SB-101", date: "2026-02-22", boardingTime: "-", status: "absent" },
  { id: "8", studentName: "Omar Fayed", busNumber: "SB-105", date: "2026-02-22", boardingTime: "07:40", status: "late" },
];

export const mockNotifications: Notification[] = [
  { id: "1", title: "Bus SB-105 Delayed", message: "SB-105 is running 10 minutes behind schedule due to traffic.", type: "warning", timestamp: new Date(Date.now() - 120000).toISOString(), read: false },
  { id: "2", title: "Bus SB-102 Approaching", message: "SB-102 will arrive at University Gate in 3 minutes.", type: "info", timestamp: new Date(Date.now() - 300000).toISOString(), read: false },
  { id: "3", title: "Attendance Recorded", message: "28 students boarded SB-101 successfully.", type: "success", timestamp: new Date(Date.now() - 600000).toISOString(), read: true },
  { id: "4", title: "Route Optimized", message: "Route Alpha has been optimized, saving 12 minutes.", type: "success", timestamp: new Date(Date.now() - 900000).toISOString(), read: true },
  { id: "5", title: "SB-103 Maintenance Due", message: "Bus SB-103 is due for scheduled maintenance.", type: "error", timestamp: new Date(Date.now() - 1800000).toISOString(), read: false },
];

export const mockRouteStops: RouteStop[] = [
  { id: "s1", name: "Depot", lat: 33.88, lng: 35.49, eta: "06:45", status: "completed", studentsCount: 0 },
  { id: "s2", name: "Green Valley", lat: 33.883, lng: 35.492, eta: "07:00", status: "completed", studentsCount: 8 },
  { id: "s3", name: "Elm Street", lat: 33.886, lng: 35.495, eta: "07:10", status: "completed", studentsCount: 5 },
  { id: "s4", name: "City Center", lat: 33.889, lng: 35.498, eta: "07:20", status: "current", studentsCount: 10 },
  { id: "s5", name: "University Gate", lat: 33.892, lng: 35.501, eta: "07:35", status: "upcoming", studentsCount: 7 },
  { id: "s6", name: "School Campus", lat: 33.895, lng: 35.505, eta: "07:50", status: "upcoming", studentsCount: 0 },
];

export const mockStudentPickups: StudentPickup[] = [
  { id: "p1", name: "Maya Johnson", stop: "City Center", status: "waiting" },
  { id: "p2", name: "Ali Hassan", stop: "City Center", status: "waiting" },
  { id: "p3", name: "Noah Smith", stop: "City Center", status: "boarded" },
  { id: "p4", name: "Lara Khalil", stop: "University Gate", status: "waiting" },
  { id: "p5", name: "Zain Abou", stop: "University Gate", status: "waiting" },
  { id: "p6", name: "Sophie Lee", stop: "University Gate", status: "absent" },
];
