import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ConfigState} from './types';

const initialState: ConfigState = {
  weddingInfo: null,
  history: null,
  ceremony: null,
  invite: null,
  question: null,
  gallery: null,
  map: null,
  site: null,
  preloaders: [],
};

const slice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state: ConfigState, {payload}: PayloadAction<ConfigState>) => {
      Object.assign(state, payload);
    },
    setPreloader(state: ConfigState, {payload}: PayloadAction<string>) {
      state.preloaders.push(payload);
    },
    unsetPreloader(state: ConfigState, {payload}: PayloadAction<string>) {
      state.preloaders = state.preloaders.filter(
        preloader => preloader !== payload
      );
    },
  },
});

export const {actions, reducer} = slice;
