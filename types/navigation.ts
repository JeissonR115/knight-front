// types/navigation.ts
import { Film } from "@/services/gibliApi";

export type RootStackParamList = {
  Home: undefined;
  FilmDetails: { film: Film };
};
