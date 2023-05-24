import {createContext} from 'react';

export interface ContextType {
  value: ContextValue;
  onChangeContext: (value: Partial<ContextValue>) => void;
}

export interface ContextValue {
  isFetching: boolean;
}

export const AppContext = createContext<ContextType | null>(null);

export const AppProvider = AppContext.Provider;
