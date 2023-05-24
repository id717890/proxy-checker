import {createContext} from 'react';
import {Host} from 'types';

export interface ContextType {
  value: ContextValue;
  onChangeContext: (value: Partial<ContextValue>) => void;
}

export interface ContextValue {
  isFetching: boolean;
  isInit: boolean;
  hosts: Host[];
}

export const AppContext = createContext<ContextType | null>(null);

export const AppProvider = AppContext.Provider;
