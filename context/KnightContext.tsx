import { Knight } from "@/services/knightApi";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface KnightContextProps {
  selectedKnight: Knight | null;
  setSelectedKnight: (knight: Knight | null) => void;
}

const KnightContext = createContext<KnightContextProps | undefined>(undefined);


export const useKnight = (): KnightContextProps => {
  const context = useContext(KnightContext);
  if (!context) {
    throw new Error("useKnight debe usarse dentro de un <KnightProvider>");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const KnightProvider: React.FC<ProviderProps> = ({ children }) => {
  const [selectedKnight, setSelectedKnight] = useState<Knight | null>(null);

  return (
    <KnightContext.Provider value={{ selectedKnight, setSelectedKnight }}>
      {children}
    </KnightContext.Provider>
  );
};
