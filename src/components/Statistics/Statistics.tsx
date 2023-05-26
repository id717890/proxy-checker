import {useMemo} from 'react';
import moment from 'moment';
import {useAppContext} from 'context';
import styles from './Statistics.module.scss';

export function Statistics() {
  const {
    value: {hosts, isDone, targetUrl, startTime, endTime},
  } = useAppContext();

  const successChecked = useMemo(() => {
    return hosts.filter(h => h.result.toLowerCase() === 'ok').length;
  }, [hosts]);

  const errorChecked = useMemo(() => {
    return hosts.filter(h => h.result.toLowerCase() === 'failed').length;
  }, [hosts]);

  const addressesChecked = useMemo(
    () => successChecked + errorChecked,
    [errorChecked, successChecked]
  );

  const maxResponsiveMs = useMemo(() => {
    if (!hosts?.length) {
      return '-';
    }
    const allResponses = hosts
      .filter(h => h.rtt !== null && h.rtt !== undefined)
      .map(h => h.rtt);
    if (!allResponses?.length) {
      return '-';
    }
    const max = Math.max(...allResponses);
    return !max ? '-' : `${max} ms`;
  }, [hosts]);

  const status = useMemo(
    () => (isDone ? 'Completed' : 'In progress'),
    [isDone]
  );

  const duration = useMemo(() => {
    if (!startTime) {
      return '-';
    }
    const end = endTime ?? moment();
    const diff = end.diff(startTime);
    return moment.utc(diff).format('HH:mm:ss');
  }, [startTime, endTime, hosts]);

  return (
    <div className={styles.statistics}>
      <div className={styles.title}>General</div>
      <StatisticRow name="Check Status" value={status} />
      <StatisticRow name="Check Type" value="SOCKS5" />
      <StatisticRow name="Verification site" value={targetUrl} />
      <StatisticRow name="Request type" value="GET (HTTP)" />
      <StatisticRow name="Max. response time" value={maxResponsiveMs} />
      <StatisticRow name="Check time interval" value={duration} />

      <br />
      <div className={styles.title} style={{marginTop: 48}}>
        Requests
      </div>
      <StatisticRow name="Addresses checked" value={addressesChecked} />
      <StatisticRow
        color="green"
        name="Successful checks"
        value={successChecked}
      />
      <StatisticRow
        color="red"
        name="Checks with errors"
        value={errorChecked}
      />
    </div>
  );
}

interface StatisticRowProps {
  name: string;
  value: string | number;
  color?: 'green' | 'red';
}
function StatisticRow({name, value, color}: StatisticRowProps) {
  const style = useMemo(() => {
    switch (color) {
      case 'green': {
        return '#34CCA9';
      }
      case 'red':
        return '#CF2F2F';
      default:
        return 'black';
    }
  }, [color]);
  return (
    <div className={styles.row}>
      <span style={{color: style}}>{name}</span>
      <span>{value}</span>
    </div>
  );
}
