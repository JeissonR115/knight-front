// hooks/useHxHOperations.ts
import { useHxH } from '@/context/HxHContext';
import { CreateHxHCharacterDTO, UpdateHxHCharacterDTO } from '@/services/HxHApi';
import { useState } from 'react';

export const useHxHOperations = () => {
  const { state, addCharacter, updateCharacter, deleteCharacter } = useHxH();
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);

  const createCharacter = async (characterData: CreateHxHCharacterDTO) => {
    setOperationLoading(true);
    setOperationError(null);
    
    try {
      const result = await addCharacter(characterData);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error creating character';
      setOperationError(errorMessage);
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  const editCharacter = async (id: string, characterData: UpdateHxHCharacterDTO) => {
    setOperationLoading(true);
    setOperationError(null);
    
    try {
      const result = await updateCharacter(id, characterData);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error updating character';
      setOperationError(errorMessage);
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  const removeCharacter = async (id: string) => {
    setOperationLoading(true);
    setOperationError(null);
    
    try {
      await deleteCharacter(id);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error deleting character';
      setOperationError(errorMessage);
      throw error;
    } finally {
      setOperationLoading(false);
    }
  };

  const clearOperationError = () => {
    setOperationError(null);
  };

  return {
    createCharacter,
    editCharacter,
    removeCharacter,
    operationLoading,
    operationError,
    clearOperationError,
    currentDatabase: state.useSQL ? 'PostgreSQL' : 'MongoDB',
  };
};