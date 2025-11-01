
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

export interface FetchOptions {
  url: string;
  filters?: HxHCharacterFilters;
}

// services/hxh-api.ts
const fetchHxHCharacters = async ({ url, filters = {} }: FetchOptions): Promise<HxHCharacter[]> => {
  try {
    // Construir query string desde los filtros
    const queryParams = new URLSearchParams();
    
    if (filters.name) queryParams.append('name', filters.name);
    if (filters.age) queryParams.append('age', filters.age.toString());
    if (filters.minHeight) queryParams.append('minHeight', filters.minHeight.toString());
    if (filters.maxHeight) queryParams.append('maxHeight', filters.maxHeight.toString());
    if (filters.minWeight) queryParams.append('minWeight', filters.minWeight.toString());
    if (filters.maxWeight) queryParams.append('maxWeight', filters.maxWeight.toString());

    const queryString = queryParams.toString();
    const fullUrl = queryString ? `${url}/api/hxh-characters?${queryString}` : `${url}/api/hxh-characters`;

    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || data; // Depende de cómo estructure tu API la respuesta
  } catch (error) {
    console.error('Error fetching HxH characters:', error);
    throw error;
  }
};

// services/hxh-api.ts
export const fetchMongoHxHCharacters = async (filters?: HxHCharacterFilters): Promise<HxHCharacter[]> => {
  return fetchHxHCharacters({
    url: 'https://hxh-api-tel1.onrender.com',
    filters
  });
};

export const fetchSQLHxHCharacters = async (filters?: HxHCharacterFilters): Promise<HxHCharacter[]> => {
  return fetchHxHCharacters({
    url: 'https://hxh-api-sql.onrender.com',
    filters
  });
};