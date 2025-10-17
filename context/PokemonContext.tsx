import React, { createContext, ReactNode, useContext, useState } from "react";
import { PokemonData } from "../services/pokeApi";

// Definimos la forma del contexto
interface PokemonContextProps {
  selectedPokemon: PokemonData | null;
  setSelectedPokemon: (pokemon: PokemonData | null) => void;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

// Hook para consumir el contexto
export const usePokemon = (): PokemonContextProps => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon debe usarse dentro de un PokemonProvider");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<ProviderProps> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );

  return (
    <PokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};
