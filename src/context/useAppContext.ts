import {useContext} from 'react';
import {AppContext} from './types';

export function useAppContext() {
  const data = useContext(AppContext);

  if (!data) {
    throw new Error('can`t use useAppContext outside AppProvider');
  }

  return data;
}
