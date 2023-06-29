import {useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {useAppContext} from 'context';
import {createAxios} from 'helpers/axios';
import {Button, Notification} from 'components';
import {Host} from './Host';
import styles from './Result.module.scss';

interface Props {
  onCancel: VoidFunction;
  session: string;
}

export function Result({onCancel, session}: Props) {
  const {onReset} = useAppContext();
  const [showNotification, setNotification] = useState(true);
  const {
    value: {hosts, isDone},
  } = useAppContext();

  const onSearchNew = useCallback(() => {
    onCancel();
    onReset();
  }, [onCancel, onReset]);

  const onExport = async () => {
    createAxios();
    const {data}: AxiosResponse = await axios({
      url: `${process.env.REACT_APP_DOMAIN}api/v1/proxy-checker/result-xlsx/${session}`,
      method: 'GET',
      responseType: 'blob',
    });

    if (data) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'results.xls');
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <>
      {showNotification && (
        <Notification
          className={styles.notification}
          onClose={() => setNotification(false)}
        />
      )}
      <div className={styles.tableWrapper}>
        <table className={styles.resultTable} cellPadding={0} cellSpacing={0}>
          <colgroup>
            <col width="220" />
            <col width="150" />
            <col width="150" />
            <col width="300" />
            <col width="100" />
            <col width="150" />
            <col width="150" />
            <col width="150" />
            <col width="250" />
            <col width="150" />
          </colgroup>
          <thead>
            <tr>
              <th>Address</th>
              <th>Type</th>
              <th>Status</th>
              <th>Error</th>
              <th>
                Response <br /> time,ms
              </th>
              <th>Exit IP</th>
              <th>Exit host</th>
              <th>Exit IP Geo</th>
              <th>Login</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map(item => (
              <Host key={`${item.host}/${item.port}`} host={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.line} />
      <div className={styles.actions}>
        <Button text="Search New" onClick={onSearchNew} />
        <Button text="Download xlsx" onClick={onExport} disabled={!isDone} />
      </div>
    </>
  );
}
