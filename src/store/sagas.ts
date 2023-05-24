import {all} from 'redux-saga/effects';
import {configSaga} from 'store/config';

export default function* rootSaga() {
  yield all([configSaga()]);
}
