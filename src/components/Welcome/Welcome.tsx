import {useState} from 'react';
import {useAppContext} from 'context';
import {Loader, Notification} from 'components';
import Logo from '../../assets/images/logo.png';
import styles from './Welcome.module.scss';

export function Welcome() {
  const {
    value: {isFetching},
  } = useAppContext();
  const [showNotification, setShowNotification] = useState(true);
  return (
    <div className={styles.welcome}>
      {!isFetching ? (
        <>
          <img src={Logo} alt="logo" className="mb-4" />
          <h1 className="mb-8">No Results Yet</h1>
        </>
      ) : (
        <>
          <Loader />
          <h1 className="mb-8">Loading...</h1>
        </>
      )}
      {showNotification && (
        <Notification onClose={() => setShowNotification(false)} />
      )}
    </div>
  );
}
