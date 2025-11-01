export interface Knight {
  _id?: string;
  name: string;
  armor: string;
  rank: string;
  power: number;
  img?: string; // puede venir vacío o ausente
}


export const fetchLocalKnights = async (name?: string): Promise<Knight[]> => {
  try {
    const url = name
      ? `http://localhost:3001/api/knights/search?name=${encodeURIComponent(name)}`
      : "http://localhost:3001/api/knights"; 

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener los caballeros del servidor local");

    const data: Knight[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error en fetchLocalKnight:", error);
    return [];
  }
};

export const fetchExternalKnights = async (name?: string): Promise<Knight[]> => {
  try {
    const url = name
      ? `https://knight-api-0qt2.onrender.com/api/knights/search?name=${encodeURIComponent(name)}`
      : "https://knight-api-0qt2.onrender.com/api/knights"; 

    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al obtener los caballeros del servidor");

    const data: Knight[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error en fetchLocalKnight:", error);
    return [];
  }
};