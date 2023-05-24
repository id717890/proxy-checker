import React, {useEffect, useState} from 'react';
import {Spin} from 'antd';
import './styles.scss';
import {AppConfigurationProps, ConfigState} from './types';
import {useActionCreators} from '../hooks';
import {configActions} from 'store/config';

export function AppConfiguration({children}: AppConfigurationProps) {
  const [init, setInit] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const actions = useActionCreators(configActions);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('./config.json');
      const json: ConfigState = await response.json();
      actions.setConfig(json);
      setInit(true);
    };

    fetchData().catch(error => {
      console.error('app configuration error', error);
      setShowError(true);
    });
  }, []);
  return (
    <>
      {!init ? (
        <div className="app-configuration">
          <Spin size="large" tip="loading..." />
          {showError && <div>App Configuration Error!</div>}
        </div>
      ) : (
        children
      )}
    </>
  );
}
