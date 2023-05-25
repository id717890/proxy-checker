import {RootState} from 'store';
import {createSelector} from '@reduxjs/toolkit';
import {
  ConfigState,
  WeddingInfo,
  History,
  Ceremony,
  Invite,
  Question,
  Map,
  MenuItem,
  Site,
} from './types';
import {Preloaders} from './constants';

export const configRawSelector = (state: RootState): ConfigState =>
  state.config;

export const weddingInfoSelector = createSelector(
  [configRawSelector],
  (config): WeddingInfo => config.weddingInfo
);

export const historySelector = createSelector(
  [configRawSelector],
  (config): History => config.history
);

export const ceremonySelector = createSelector(
  [configRawSelector],
  (config): Ceremony => config.ceremony
);

export const inviteSelector = createSelector(
  [configRawSelector],
  (config): Invite => config.invite
);

export const questionSelector = createSelector(
  [configRawSelector],
  (config): Question => config.question
);

export const gallerySelector = createSelector(
  [configRawSelector],
  (config): string[] => config.gallery
);

export const mapSelector = createSelector(
  [configRawSelector],
  (config): Map => config.map
);

export const siteSelector = createSelector(
  [configRawSelector],
  (config): Site => config.site
);

export const preloadersSelector = (state: RootState): string[] =>
  state.config.preloaders;

export const isSendingSelector = createSelector(
  [preloadersSelector],
  preloaders => preloaders.includes(Preloaders.SENDING_MESSAGE)
);
