import {useAppContext} from 'context';
import {useState} from 'react';
import {Notification} from '../Notification';
import styles from './Result.module.scss';

export function Result() {
  const [showNotification, setNotification] = useState(true);
  const {
    value: {hosts},
  } = useAppContext();
  return (
    <>
      {/*{showNotification && (*/}
      {/*  <Notification*/}
      {/*    className={styles.notification}*/}
      {/*    onClose={() => setNotification(false)}*/}
      {/*  />*/}
      {/*)}*/}
      <div className={styles.tableWrapper}>
        <table className={styles.resultTable}>
          <colgroup>
            <col width="146" />
            <col width="146" />
            <col width="232" />
            <col width="146" />
            <col width="146" />
            <col width="200" />
            <col width="200" />
            <col width="200" />
            <col width="200" />
            <col width="400" />
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
              <th>Response time,ms</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
