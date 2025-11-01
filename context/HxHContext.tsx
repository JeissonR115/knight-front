// contexts/HxHContext.tsx
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { fetchMongoHxHCharacters, fetchSQLHxHCharacters, HxHCharacter, HxHCharacterFilters } from '../services/HxHApi';

// Estado del contexto
interface HxHState {
  characters: HxHCharacter[];
  selectedCharacter: HxHCharacter | null;
  loading: boolean;
  error: string | null;
  useSQL: boolean;
  filters: HxHCharacterFilters;
}

// Acciones del contexto
type HxHAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CHARACTERS'; payload: HxHCharacter[] }
  | { type: 'SELECT_CHARACTER'; payload: HxHCharacter | null }
  | { type: 'SET_USE_SQL'; payload: boolean }
  | { type: 'SET_FILTERS'; payload: HxHCharacterFilters }
  | { type: 'ADD_CHARACTER'; payload: HxHCharacter }
  | { type: 'UPDATE_CHARACTER'; payload: HxHCharacter }
  | { type: 'DELETE_CHARACTER'; payload: string };

// Context
interface HxHContextType {
  state: HxHState;
  fetchCharacters: (filters?: HxHCharacterFilters) => Promise<void>;
  selectCharacter: (character: HxHCharacter | null) => void;
  toggleDatabase: () => void;
  setFilters: (filters: HxHCharacterFilters) => void;
  addCharacter: (character: Omit<HxHCharacter, 'id'>) => Promise<void>;
  updateCharacter: (id: string, character: Partial<HxHCharacter>) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;
  clearError: () => void;
}

const HxHContext = createContext<HxHContextType | undefined>(undefined);

// Estado inicial
const initialState: HxHState = {
  characters: [],
  selectedCharacter: null,
  loading: false,
  error: null,
  useSQL: false,
  filters: {},
};

// Reducer
const hxhReducer = (state: HxHState, action: HxHAction): HxHState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload, loading: false, error: null };
    case 'SELECT_CHARACTER':
      return { ...state, selectedCharacter: action.payload };
    case 'SET_USE_SQL':
      return { ...state, useSQL: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'ADD_CHARACTER':
      return { ...state, characters: [...state.characters, action.payload] };
    case 'UPDATE_CHARACTER':
      return {
        ...state,
        characters: state.characters.map(char =>
          char.id === action.payload.id ? action.payload : char
        ),
        selectedCharacter: state.selectedCharacter?.id === action.payload.id ? action.payload : state.selectedCharacter,
      };
    case 'DELETE_CHARACTER':
      return {
        ...state,
        characters: state.characters.filter(char => char.id !== action.payload),
        selectedCharacter: state.selectedCharacter?.id === action.payload ? null : state.selectedCharacter,
      };
    default:
      return state;
  }
};

// Provider
interface HxHProviderProps {
  children: ReactNode;
}

export const HxHProvider: React.FC<HxHProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(hxhReducer, initialState);

  const fetchCharacters = async (filters?: HxHCharacterFilters) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const characters = state.useSQL
        ? await fetchSQLHxHCharacters(filters || state.filters)
        : await fetchMongoHxHCharacters(filters || state.filters);

      dispatch({ type: 'SET_CHARACTERS', payload: characters });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error fetching characters'
      });
    }
  };

  const selectCharacter = (character: HxHCharacter | null) => {
    dispatch({ type: 'SELECT_CHARACTER', payload: character });
  };

  const toggleDatabase = () => {
    const newUseSQL = !state.useSQL;
    dispatch({ type: 'SET_USE_SQL', payload: newUseSQL });
    // Recargar personajes con la nueva base de datos
    fetchCharacters(state.filters);
  };

  const setFilters = (filters: HxHCharacterFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    fetchCharacters(filters);
  };

  const addCharacter = async (characterData: Omit<HxHCharacter, 'id'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Aquí iría la llamada a tu API para crear el personaje
      // Por ahora simulamos la creación
      const newCharacter: HxHCharacter = {
        ...characterData,
        id: Date.now().toString(), // ID temporal
      };
      
      dispatch({ type: 'ADD_CHARACTER', payload: newCharacter });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error adding character'
      });
    }
  };

  const updateCharacter = async (id: string, characterData: Partial<HxHCharacter>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Aquí iría la llamada a tu API para actualizar
      // Por ahora simulamos la actualización
      const updatedCharacter = { ...characterData, id } as HxHCharacter;
      
      dispatch({ type: 'UPDATE_CHARACTER', payload: updatedCharacter });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error updating character'
      });
    }
  };

  const deleteCharacter = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Aquí iría la llamada a tu API para eliminar
      
      dispatch({ type: 'DELETE_CHARACTER', payload: id });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Error deleting character'
      });
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value: HxHContextType = {
    state,
    fetchCharacters,
    selectCharacter,
    toggleDatabase,
    setFilters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    clearError,
  };

  return (
    <HxHContext.Provider value={value}>
      {children}
    </HxHContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useHxH = (): HxHContextType => {
  const context = useContext(HxHContext);
  if (context === undefined) {
    throw new Error('useHxH must be used within a HxHProvider');
  }
  return context;
};