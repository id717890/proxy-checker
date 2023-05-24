export interface ConfigState {
  weddingInfo: WeddingInfo;
  history: History;
  ceremony: Ceremony;
  invite: Invite;
  question: Question;
  gallery: string[];
  map: Map;
  site: Site;
  preloaders: string[];
}

export interface Question {
  main: MainQuestion;
  vehicleFreeSpace: boolean;
  pool: Pool[];
}

export interface MainQuestion {
  yes: string;
  no: string;
}

export interface Pool {
  id: number;
  text: string;
  variants: string[];
  withCustom: boolean;
}

export interface WeddingInfo {
  he: string;
  she: string;
  date: string;
  emails: string[];
}

export interface History {
  he: string;
  she: string;
}

export interface Ceremony {
  title: string;
  subTitle: string;
  places: CeremonyPlaceType[];
  footer: string;
}

export type CeremonyPlaceType = BaseType;
export type Invite = BaseType;

type BaseType = {
  title: string;
  text: string;
};

export type Map = {
  registration: Registration;
  banquet: Banquet;
};

export interface Registration {
  title: string;
  address: string;
  marker: Marker;
}

type Banquet = Registration;

export interface Marker {
  point: [number, number];
  preset: string;
  zoom: number;
}

export interface MenuItem {
  title: string;
  id: string;
  href: string;
}

export interface Site {
  name: string;
  domain: string;
}

export interface FormType {
  contacts?: string;
  contacts5XpoQHFBBwpS3F6NeUEck?: string;
  domain?: string;
  message?: string;
  recipients?: string[];
}
