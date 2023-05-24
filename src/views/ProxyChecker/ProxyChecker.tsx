import {ChangeEvent, useCallback, useMemo, useRef, useState} from 'react';
import {useAppContext} from 'context';
import {Button, Input, Result, Select, Textarea, Welcome} from 'components';
import './styles.scss';
import {createAxios} from 'helpers/axios';
import {
  ProxyType,
  FirstRequest,
  RepeatedRequest,
  RepeatedResponse,
  Version,
} from './types';
import {v4} from 'uuid';
import {fakeProxy, proxyTypeOptions} from './constants';

const axios = createAxios();

export function ProxyChecker() {
  const {
    onChangeContext,
    value: {isInit, isFetching},
  } = useAppContext();
  const [targetUrl, setTargetUrl] = useState('https://www.google.com');
  const [proxyType, setProxyType] = useState<ProxyType>('AUTO');
  const [proxyList, setProxyList] = useState(fakeProxy);

  const session = useRef<string>(v4());
  const cancelled = useRef<boolean>(false);

  const disabled = useMemo(() => isFetching, [isFinite]);

  const onStart = useCallback(async () => {
    const payload: FirstRequest = {
      proxy_list: proxyList,
      proxy_type: proxyType,
      session_id: session.current,
      target_url: targetUrl,
    };
    onChangeContext({
      isFetching: true,
    });
    await axios.post('/api/v1/proxy-checker/request', payload);
  }, [targetUrl, proxyList, session, proxyType]);

  const onRequest = useCallback(
    async (version: Version) => {
      const payload: RepeatedRequest = {
        session_id: session.current,
        timeout: 30,
        version: version,
      };

      const response = await axios.post(
        '/api/v1/proxy-checker/result',
        payload
      );
      const {status, data} = response;
      const responseData = data as RepeatedResponse;
      if (responseData.done) {
        console.log('exit done');
        return;
      }
      if (cancelled.current === true) {
        console.log('cancelled');
        cancelled.current = false;
        return;
      }
      if (responseData.proxy_full) {
        onChangeContext({
          isInit: true,
        });
      }
      await new Promise(resole => setTimeout(resole, 1000));
      await onRequest(responseData.version);
    },
    [targetUrl, proxyList, session, cancelled]
  );

  const onChangeTargetUrl = (event: ChangeEvent<HTMLInputElement>) => {
    // const request: RequestPayload = {};
    setTargetUrl(event.target.value);
  };

  const onChangeProxyList = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setProxyList(event.target.value);
  };

  const onChangeProxyType = (event: ChangeEvent<HTMLSelectElement>) => {
    setProxyType(event.target.value as ProxyType);
  };

  const onStartHandler = async () => {
    await onStart();
    await onRequest(undefined);
  };

  const onCancelHandler = useCallback(() => {
    cancelled.current = true;
  }, [cancelled]);

  return (
    <div className="container">
      <div className="header mb-8">
        <h1 className="mb-4">🏁 Let’s Start by Checking your Site</h1>
        <h4>
          Pirate ipsum arrgh bounty warp jack. Blossom hail-shot pinnace
          starboard pirate run landlubber. Pounders spot jib me warp.
        </h4>
      </div>
      <div className="body">
        <div className="left">
          <h1 className="mb-6">Checking Site</h1>
          <Input
            label="Target URL"
            className="mb-8"
            value={targetUrl}
            onChange={onChangeTargetUrl}
          />
          <Select
            label="Proxy Type"
            classNameContainer="mb-8"
            value={proxyType}
            onChange={onChangeProxyType}
            options={proxyTypeOptions}
          />
          <Textarea
            label="Output"
            className="mb-8"
            rows={5}
            value={proxyList}
            onChange={onChangeProxyList}
          />
          <Button disabled={disabled} text="Start" onClick={onStartHandler} />
          <Button kind="link" text="Clear all" onClick={onCancelHandler} />
        </div>
        <div className="content">{!isInit ? <Welcome /> : <Result />}</div>
      </div>
    </div>
  );
}
