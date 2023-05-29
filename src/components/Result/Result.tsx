import {useCallback, useState} from 'react';
import {useAppContext} from 'context';
import {Host} from './Host';
import {Button, Notification} from 'components';
import styles from './Result.module.scss';

interface Props {
  onCancel: VoidFunction;
}

export function Result({onCancel}: Props) {
  const {onReset} = useAppContext();
  const [showNotification, setNotification] = useState(true);
  const {
    value: {hosts},
  } = useAppContext();

  const onSearchNew = useCallback(() => {
    onCancel();
    onReset();
  }, [onCancel, onReset]);

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
            <col width="150" />
            <col width="200" />
            <col width="250" />
            <col width="150" />
            <col width="150" />
            <col width="150" />
            <col width="150" />
            <col width="150" />
            <col width="100" />
            <col width="300" />
          </colgroup>
          <thead>
            <tr>
              <th>Status</th>
              <th>Address</th>
              <th>Login</th>
              <th>Password</th>
              <th>Type</th>
              <th>Exit IP</th>
              <th>Exit IP Geo</th>
              <th>Exit host</th>
              <th>
                Response <br /> time,ms
              </th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map(item => (
              <Host key={`${item.host}/${item.port}`} host={item} />
            ))}
          </tbody>
        </table>
        {/*<div className={styles.line} />*/}
      </div>
      <div className={styles.line} />
      <div className={styles.actions}>
        <Button text="Search New" onClick={onSearchNew} />
        <Button text="Download xlsx" />
      </div>
    </>
  );
}
