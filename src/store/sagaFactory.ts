import {Saga} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {configActions} from 'store/config';

interface CreateFetchSagaOptions {
  preloader?: string;
}

const createFetchSaga = (fetch: Saga, options: CreateFetchSagaOptions) =>
  function* (action: PayloadAction<any>) {
    try {
      if (options?.preloader) {
        yield put(configActions.setPreloader(options.preloader));
      }
      yield call(fetch, action.payload);
    } catch (error) {
      console.error('ERROR FACTORY', error);
    } finally {
      if (options?.preloader) {
        yield put(configActions.unsetPreloader(options.preloader));
      }
    }
  };

export {createFetchSaga};
