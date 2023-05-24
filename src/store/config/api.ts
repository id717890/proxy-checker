import {createAxios} from 'helpers/axios';
import {FormType} from './types';
import {AxiosResponse} from 'axios';
import {ApiEndpoints} from './constants';

const axios = createAxios();

export function sendMessageApi(payload: FormType): Promise<AxiosResponse> {
  return axios.post(ApiEndpoints.SENDING_MESSAGE, payload);
}
