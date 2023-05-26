export type Nullable<T> = T | null | undefined;

export interface HostType {
  host: string;
  port: number;
  login: Nullable<string>;
  password: Nullable<string>;
  /**
   * Позиция прокси в списке.
   */
  position: number;
  /**
   * Текущее состояние проверки, варианты:
   * PENDING - проверка еще не начата
   * IN_PROGRESS - проверка выполняется, результата еще нет.
   * OK - проверка выполнена, прокси работает.
   * FAILED - проверка выполнена, прокси не работает.
   */
  result: string;
  /**
   * Текст ошибки по прокси.
   * Поле присутствует только если result=FAILED.
   * Содержит текст, например, "Failed to connect".
   */
  error: string;
  /**
   * Протокол прокси, варианты: SOCKS4, SOCKS5, HTTP. (1)
   */
  protocol: string;
  /**
   * Выходной IP прокси. (1)
   */
  exit_ip: string;
  /**
   * География выходного IP прокси. (1)
   */
  exit_geo: ExitGeo;
  /**
   * Имя хоста выходного IP прокси. (1)
   */
  exit_host: string;
  /**
   * Round trip time запроса, выполненного через прокси, в мс.
   */
  rtt: number;
}

interface ExitGeo {
  country: string;
  subdivision: string;
  city: string;
  isp: string;
}

export type ProxyType = 'HTTP' | 'SOCKS5' | 'SOCKS4' | 'AUTO';

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
