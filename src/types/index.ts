export type Nullable<T> = T | null | undefined;

export interface Host {
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
  error: '';
  /**
   * Протокол прокси, варианты: SOCKS4, SOCKS5, HTTP. (1)
   */
  protocol: 'SOCKS5';
  /**
   * Выходной IP прокси. (1)
   */
  exit_ip: '10.20.23.24';
  /**
   * География выходного IP прокси. (1)
   */
  exit_geo: {
    country: 'US';
    subdivision: 'Illinois';
    city: 'Chicago';
    isp: 'COMCAST-7922';
  };
  /**
   * Имя хоста выходного IP прокси. (1)
   */
  exit_host: 'abc.def.com';
  /**
   * Round trip time запроса, выполненного через прокси, в мс.
   */
  rtt: 1200;
}
