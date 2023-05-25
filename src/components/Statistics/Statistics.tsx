import styles from './Statistics.module.scss';
import {useMemo} from 'react';

export function Statistics() {
  return (
    <div className={styles.statistics}>
      <div className={styles.title}>General</div>
      <StatisticRow name="Check Status" value="Canceled" />
      <StatisticRow name="Check Type" value="SOCKS5" />
      <StatisticRow name="Verification site" value="ya.ru:443" />
      <StatisticRow name="Request type" value="GET (HTTP)" />
      <StatisticRow name="Max. response time" value="30s" />
      <StatisticRow name="Number of checks" value="0/300" />
      <StatisticRow name="Check time interval" value="00:01:26" />
      <div className={styles.title} style={{marginTop: 48}}>
        Requests
      </div>
      <StatisticRow name="Addresses checked" value="3025/10461" />
      <StatisticRow color="green" name="Successful checks" value="2896" />
      <StatisticRow color="red" name="Checks with errors" value="129" />
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
