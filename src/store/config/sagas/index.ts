import {all, takeEvery, takeLatest} from 'redux-saga/effects';

import {sendMessageAction} from '../actions';
import {sendMessageSaga} from './sendMessageSaga';

export default function* entryHydrocarbonLossesSaga() {
  yield all([takeLatest(sendMessageAction, sendMessageSaga)]);
}
