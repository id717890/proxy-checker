import {createContext} from 'react';
import {HostType, Nullable} from 'types';
import {Moment} from 'moment';

export interface ContextType {
  value: ContextValue;
  onChangeContext: (value: Partial<ContextValue>) => void;
  onReset: VoidFunction;
}

export interface ContextValue {
  isFetching: boolean;
  isInit: boolean;
  isDone: boolean;
  targetUrl: string;
  hosts: HostType[];
  startTime: Nullable<Moment>;
  endTime: Nullable<Moment>;
}

export const AppContext = createContext<ContextType | null>(null);

export const AppProvider = AppContext.Provider;
