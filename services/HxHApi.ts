// types/hxh-character.ts
export interface HxHCharacter {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  img: string;
}

export interface HxHCharacterFilters {
  name?: string;
  age?: number;
  minHeight?: number;
  maxHeight?: number;
  minWeight?: number;
  maxWeight?: number;
}

export interface CreateHxHCharacterDTO {
  name: string;
  age: number;
  height: number;
  weight: number;
  img: string;
}

export interface UpdateHxHCharacterDTO {
  name?: string;
  age?: number;
  height?: number;
  weight?: number;
  img?: string;
}

export interface FetchOptions {
  url: string;
  filters?: HxHCharacterFilters;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// URLs base de tus APIs
const MONGO_BASE_URL = 'https://hxh-api-tel1.onrender.com';
const SQL_BASE_URL = 'https://hxh-api-sql.onrender.com';

// Función base para hacer fetch con manejo de errores
const fetchApi = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: HxHCharacter = await response.json();
    console.log('API Response:', data);
    if (!data) {
      throw new Error( 'Error en la respuesta del servidor');
    }

    return data as T;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// CREATE - Crear personaje
export const createHxHCharacter = async (
  characterData: CreateHxHCharacterDTO, 
  useSQL: boolean = false
): Promise<HxHCharacter> => {
  const baseUrl = useSQL ? SQL_BASE_URL : MONGO_BASE_URL;
  return fetchApi<HxHCharacter>(`${baseUrl}/api/hxh-characters`, {
    method: 'POST',
    body: JSON.stringify(characterData),
  });
};

// READ - Obtener personajes con filtros
export const fetchHxHCharacters = async (
  filters: HxHCharacterFilters = {}, 
  useSQL: boolean = false
): Promise<HxHCharacter[]> => {
  const baseUrl = useSQL ? SQL_BASE_URL : MONGO_BASE_URL;
  
  const queryParams = new URLSearchParams();
  if (filters.name) queryParams.append('name', filters.name);
  if (filters.age) queryParams.append('age', filters.age.toString());
  if (filters.minHeight) queryParams.append('minHeight', filters.minHeight.toString());
  if (filters.maxHeight) queryParams.append('maxHeight', filters.maxHeight.toString());
  if (filters.minWeight) queryParams.append('minWeight', filters.minWeight.toString());
  if (filters.maxWeight) queryParams.append('maxWeight', filters.maxWeight.toString());

  const queryString = queryParams.toString();
  const url = queryString 
    ? `${baseUrl}/api/hxh-characters?${queryString}`
    : `${baseUrl}/api/hxh-characters`;

  return fetchApi<HxHCharacter[]>(url);
};

// READ - Obtener personaje por ID
export const fetchHxHCharacterById = async (
  id: string, 
  useSQL: boolean = false
): Promise<HxHCharacter> => {
  const baseUrl = useSQL ? SQL_BASE_URL : MONGO_BASE_URL;
  return fetchApi<HxHCharacter>(`${baseUrl}/api/hxh-characters/${id}`);
};

// UPDATE - Actualizar personaje completo
export const updateHxHCharacter = async (
  id: string, 
  characterData: UpdateHxHCharacterDTO, 
  useSQL: boolean = false
): Promise<HxHCharacter> => {
  const baseUrl = useSQL ? SQL_BASE_URL : MONGO_BASE_URL;
  return fetchApi<HxHCharacter>(`${baseUrl}/api/hxh-characters/${id}`, {
    method: 'PUT',
    body: JSON.stringify(characterData),
  });
};

// UPDATE - Actualización parcial
export const partialUpdateHxHCharacter = async (
  id: string, 
  updates: Partial<UpdateHxHCharacterDTO>, 
  useSQL: boolean = false
): Promise<HxHCharacter> => {
  const baseUrl = useSQL ? SQL_BASE_URL : MONGO_BASE_URL;
  return fetchApi<HxHCharacter>(`${baseUrl}/api/hxh-characters/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

// DELETE - Eliminar personaje
export const deleteHxHCharacter = async (
  id: string, 
  useSQL: boolean = false
): Promise<{ message: string }> => {
  const baseUrl = useSQL ? SQL_BASE_URL : MONGO_BASE_URL;
  return fetchApi<{ message: string }>(`${baseUrl}/api/hxh-characters/${id}`, {
    method: 'DELETE',
  });
};

// Funciones específicas por base de datos (para compatibilidad)
export const fetchMongoHxHCharacters = async (filters?: HxHCharacterFilters): Promise<HxHCharacter[]> => {
  return fetchHxHCharacters(filters, false);
};

export const fetchSQLHxHCharacters = async (filters?: HxHCharacterFilters): Promise<HxHCharacter[]> => {
  return fetchHxHCharacters(filters, true);
};

export const createMongoHxHCharacter = async (characterData: CreateHxHCharacterDTO): Promise<HxHCharacter> => {
  return createHxHCharacter(characterData, false);
};

export const createSQLHxHCharacter = async (characterData: CreateHxHCharacterDTO): Promise<HxHCharacter> => {
  return createHxHCharacter(characterData, true);
};

export const updateMongoHxHCharacter = async (id: string, characterData: UpdateHxHCharacterDTO): Promise<HxHCharacter> => {
  return updateHxHCharacter(id, characterData, false);
};

export const updateSQLHxHCharacter = async (id: string, characterData: UpdateHxHCharacterDTO): Promise<HxHCharacter> => {
  return updateHxHCharacter(id, characterData, true);
};

export const deleteMongoHxHCharacter = async (id: string): Promise<{ message: string }> => {
  return deleteHxHCharacter(id, false);
};

export const deleteSQLHxHCharacter = async (id: string): Promise<{ message: string }> => {
  return deleteHxHCharacter(id, true);
};