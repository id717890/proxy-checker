import {call, select} from 'redux-saga/effects';
import {createFetchSaga} from 'store/sagaFactory';
import {Preloaders} from '../constants';
import {sendMessageApi} from '../api';
import {FormType, WeddingInfo} from '../types';
import {notification} from 'antd';
import {weddingInfoSelector} from '../selectors';

export function* sendMessageWorker(payload: FormType) {
  const weddingInfo: WeddingInfo = yield select(weddingInfoSelector);
  if (!weddingInfo?.emails?.length) {
    return;
  }
  yield call(sendMessageApi, {
    ...payload,
    domain: window.origin,
    recipients: weddingInfo.emails,
  });
  notification.success({
    message: 'Успех',
    description: 'Ваше сообщение отправлено. Скоро мы сважемся с Вами!',
  });
}

export const sendMessageSaga = createFetchSaga(sendMessageWorker, {
  preloader: Preloaders.SENDING_MESSAGE,
});
