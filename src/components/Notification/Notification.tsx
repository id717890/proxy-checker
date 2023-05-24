import styles from './Notification.module.scss';
import Info from '../../assets/images/info.svg';
import Close from '../../assets/images/close.svg';

interface Props {
  onClose: VoidFunction;
}

export function Notification({onClose}: Props) {
  return (
    <div className={styles.notification}>
      <img src={Info} alt="info" />
      <div>
        <div className={styles.title}>Welcome to Info Proxy Checker</div>
        <div className={styles.text}>
          Infatica’s info proxy checker is a powerful tool that allows you to
          verify the authenticity and reliability of proxy servers. With robust
          reliability checks, it ensures that you are using trusted proxies,
          protecting your online activities and sensitive information. It also
          offers superior performance optimisation, allowing you to select
          high-performing proxies based on speed, latency, and other performance
          metrics. Moreover, it provides a cost-effective solution by helping
          you identify free or low-cost proxies that meet your needs, enabling
          you to optimise your proxy usage while minimising expenses.
        </div>
      </div>
      <img className={styles.close} src={Close} alt="close" onClick={onClose} />
    </div>
  );
}
