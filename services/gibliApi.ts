export interface Film {
  id: number | string;
  title: string;
  director: string;
  release_date: string;
  rt_score: string;
  image: string | null;
  description?: string;
  producer?: string;
  original_title?: string;
  localDescription?: string;
  source: "local" | "external";
}

export const fetchLocalFilms = async (title?: string): Promise<Film[]> => {
  const url = title
    ? `http://localhost:3002/api/ghibli/films/title/${title}`
    : "http://localhost:3002/api/ghibli/films";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener films de la API local");

  const data = await res.json();
  return data;
};

export const fetchExternalFilms = async (title?: string): Promise<Film[]> => {
  const res = await fetch("https://ghibliapi.vercel.app/films/");
  if (!res.ok) throw new Error("Error al obtener films de la API externa");

  let data = await res.json();

  if (title) {
    const searchTerm = title.toLowerCase();

    data = data.filter(
      (film: any) =>
        film.title.toLowerCase().includes(searchTerm) ||
        film.original_title.toLowerCase().includes(searchTerm)
    );
  }

  return data;
};
