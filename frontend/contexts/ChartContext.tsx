import * as React from "react";

interface ChartContextInterface {
  show: boolean;
  setShow: ((show: boolean) => void) | ((show: boolean) => any);
}

export const ChartContext = React.createContext<Partial<ChartContextInterface>>(
  {}
);

interface ChartContextProviderInterface {}

export const ChartContextProvider: React.FC<ChartContextProviderInterface> = ({
  children,
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <ChartContext.Provider value={{ show, setShow }}>
      <>{children}</>
    </ChartContext.Provider>
  );
};
