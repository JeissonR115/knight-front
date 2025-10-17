// ==========================
// Tipos base
// ==========================
export interface PokemonStat {
  base_stat: number;
  effort?: number;
  stat: {
    name: string;
    url?: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    ["official-artwork"]?: {
      front_default: string;
    };
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
}

export interface PokemonData {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites?: PokemonSprites | null;
  source?: "api" | "local"; // <- añadido para saber el origen
}

// ==========================
// Funciones API
// ==========================
export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );
  if (!response.ok) throw new Error("Pokémon no encontrado");
  const data = await response.json();
  return normalizePokemonData(data);
};

export const fetchSuggestions = async (query: string): Promise<string[]> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await response.json();
  return data.results
    .map((p: { name: string }) => p.name)
    .filter((name: string) => name.includes(query.toLowerCase()))
    .slice(0, 10);
};

export const fetchPokemonLocal = async (
  name: string
): Promise<PokemonData[]> => {
  const response = await fetch(
    `http://localhost:3001/api/pokemons/search?name=${name.toLowerCase()}`
  );
  if (!response.ok) throw new Error("Pokémon no encontrado en la API local");
  const data = await response.json();
  return data.map(normalizePokemonData);
};

export function normalizePokemonData(data: any): PokemonData {
  if (data && data.sprites && data.species) {
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map((t: any) => ({
        type: { name: t.type.name },
      })),
      abilities: data.abilities.map((a: any) => ({
        ability: { name: a.ability.name },
      })),
      stats: data.stats.map((s: any) => ({
        base_stat: s.base_stat,
        effort: s.effort,
        stat: { name: s.stat.name },
      })),
      sprites: {
        front_default:
          data.sprites.other?.["official-artwork"]?.front_default ||
          data.sprites.front_default ||
          null,
      },
      source: "api",
    };
  }

  if (Array.isArray(data)) {
    data = data[0];
  }

  if (data && data.abilities && data.stats) {
    return {
      id: data.id,
      name: data.name.toLowerCase(),
      height: data.height,
      weight: data.weight,
      types: data.types.map((t: any) => ({
        type: { name: t.name.toLowerCase() },
      })),
      abilities: data.abilities.map((a: any) => ({
        ability: { name: a.name.toLowerCase() },
      })),
      stats: data.stats.map((s: any) => ({
        base_stat: s.baseValue,
        stat: { name: s.name.toLowerCase() },
      })),
      sprites: null,
      source: "local",
    };
  }

  throw new Error("Formato de Pokémon no reconocido");
}
