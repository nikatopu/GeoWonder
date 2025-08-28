"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface AppContextType {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appData: AppContextType = {
  companyName: "GeoWonder",
  contactEmail: "info@geowonder.tours",
  contactPhone: "+995598420242",
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
