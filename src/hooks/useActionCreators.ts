import {useMemo} from 'react';
import {ActionCreatorsMapObject, bindActionCreators} from '@reduxjs/toolkit';
import {useAppDispatch} from './useAppDispatch';

export function useActionCreators<Actions extends ActionCreatorsMapObject>(
  actions: Actions
) {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
}
