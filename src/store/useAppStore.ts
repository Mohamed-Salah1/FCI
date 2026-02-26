import { create } from "zustand";
import type { User, BusLocation, Notification } from "@/types";

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;

  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Bus locations
  busLocations: BusLocation[];
  setBusLocations: (locations: BusLocation[]) => void;
  updateBusLocation: (location: BusLocation) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  unreadCount: () => number;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Theme
  isDark: true,
  toggleTheme: () => {
    set((state) => {
      const next = !state.isDark;
      document.documentElement.classList.toggle("dark", next);
      return { isDark: next };
    });
  },

  // Bus locations
  busLocations: [],
  setBusLocations: (locations) => set({ busLocations: locations }),
  updateBusLocation: (location) =>
    set((state) => ({
      busLocations: state.busLocations.map((b) =>
        b.busId === location.busId ? location : b
      ),
    })),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,

  // Sidebar
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
