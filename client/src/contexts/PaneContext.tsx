import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

type PaneContextType = {
  navCollapsed: boolean;
  setNavCollapsed: (v: boolean) => void;
  filterCollapsed: boolean;
  setFilterCollapsed: (v: boolean) => void;
};

const PaneContext = createContext<PaneContextType>({
  navCollapsed: false,
  setNavCollapsed: () => {},
  filterCollapsed: false,
  setFilterCollapsed: () => {},
});

export const usePaneContext = () => useContext(PaneContext);

export const PaneContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [filterCollapsed, setFilterCollapsed] = useState(false);

  return (
    <PaneContext.Provider
      value={{
        navCollapsed,
        setNavCollapsed,
        filterCollapsed,
        setFilterCollapsed,
      }}
    >
      {children}
    </PaneContext.Provider>
  );
};
