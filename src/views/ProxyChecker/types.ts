import {HostType} from 'types';

export interface FirstRequest {
  proxy_type: string;
  proxy_list: string;
  target_url: string;
  session_id: string;
}

export interface RepeatedRequest {
  session_id: string;
  timeout: number;
  version?: Version;
}

export interface RepeatedResponse {
  done: boolean;
  proxy_full: HostType[];
  proxy_update: HostType[];
  version: Version;
}

export interface Version {
  id: string;
  seq: number;
}

export type ProxyType = 'HTTP' | 'SOCKS5' | 'SOCKS4' | 'AUTO';
