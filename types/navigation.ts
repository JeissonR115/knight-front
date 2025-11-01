import { Knight } from "@/services/knightApi";

export type RootStackParamList = {
  Home: undefined; 
  KnightDetails: { knight: Knight }; 
};
