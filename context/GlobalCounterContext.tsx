import { createContext, ReactNode, useContext, useState } from "react";

export type GlobalCounterContextType = [number, (value: number) => void];

const GlobalCounterContext = createContext<
  GlobalCounterContextType | undefined
>(undefined);

export const GlobalCounterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <GlobalCounterContext.Provider value={[counter, setCounter]}>
      {children}
    </GlobalCounterContext.Provider>
  );
};

export const useGlobalCounter = (): GlobalCounterContextType => {
  const context = useContext(GlobalCounterContext);
  if (!context) {
    throw new Error(
      "useGlobalCounter debe usarse dentro de un GlobalCounterProvider"
    );
  }
  return context;
};
