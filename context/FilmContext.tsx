import { Film } from "@/services/gibliApi";
import React, { createContext, ReactNode, useContext, useState } from "react";
interface FilmContextProps {
  selectedFilm: Film | null;
  setSelectedFilm: (Film: Film | null) => void;
}

const FilmContext = createContext<FilmContextProps | undefined>(undefined);

// Hook para consumir el contexto
export const useFilm = (): FilmContextProps => {
  const context = useContext(FilmContext);
  if (!context) {
    throw new Error("useFilm debe usarse dentro de un FilmProvider");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const FilmProvider: React.FC<ProviderProps> = ({ children }) => {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  return (
    <FilmContext.Provider
      value={{ selectedFilm, setSelectedFilm: setSelectedFilm }}
    >
      {children}
    </FilmContext.Provider>
  );
};
