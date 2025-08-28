"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import type { Settings } from "@prisma/client";

// Use the Prisma-generated Settings type for our context
type AppContextType = Settings;

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppContextType>({
    id: 0,
    updatedAt: new Date(),
    contactEmail: "",
    contactPhone: "",
    instagramUrl: "",
    facebookUrl: "",
    tiktokUrl: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings/public");
        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data: AppContextType = await response.json();
        setSettings({
          companyName: "GeoWonder",
          ...data,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  return <AppContext.Provider value={settings}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === null) {
    // This can happen briefly during the initial load, or if the fetch fails
    throw new Error(
      "useAppContext must be used within an AppProvider and after settings have loaded"
    );
  }
  return context;
};
