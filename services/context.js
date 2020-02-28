import React, { createContext, useContext } from 'react';

const AppContext = createContext({ me: null });

export const AppContextProvider = ({ children, value }) => (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
);

export const useAppContext = () => useContext(AppContext);
