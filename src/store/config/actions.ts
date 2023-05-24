import {createAction} from '@reduxjs/toolkit';
import {FormType} from './types';

export const sendMessageAction = createAction<FormType>('send-message');
