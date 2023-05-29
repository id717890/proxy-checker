import {
  ChangeEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useAppContext} from 'context';
import {
  Button,
  Input,
  Result,
  Select,
  Statistics,
  Textarea,
  Welcome,
} from 'components';
import './styles.scss';
import {createAxios} from 'helpers/axios';
import {
  ProxyType,
  FirstRequest,
  RepeatedRequest,
  RepeatedResponse,
  Version,
  HostType,
} from 'types';
import {v4} from 'uuid';
import {fakeProxy, PLACEHOLDER, proxyTypeOptions} from './constants';
import moment from 'moment';

const axios = createAxios();

const DEFAULT_PROXY_TYPE = 'AUTO';

export function ProxyChecker() {
  const {
    onChangeContext,
    value: {isInit, isFetching, hosts},
  } = useAppContext();
  const [targetUrl, setTargetUrl] = useState('https://www.google.com');
  const [proxyType, setProxyType] = useState<ProxyType>(DEFAULT_PROXY_TYPE);
  const [proxyList, setProxyList] = useState('');

  const session = useRef<string>(v4());
  const cancelled = useRef<boolean>(false);
  const allHosts = useRef<HostType[]>(hosts);

  const disabled = useMemo(
    () => (isFetching && !isInit) || !targetUrl || !proxyList,
    [targetUrl, proxyList, isFetching, isInit]
  );

  const onStart = useCallback(async () => {
    const payload: FirstRequest = {
      proxy_list: proxyList,
      proxy_type: proxyType,
      session_id: session.current,
      target_url: targetUrl,
    };
    onChangeContext({
      isFetching: true,
      targetUrl,
      startTime: moment(),
      isDone: false,
      hosts: [],
      endTime: null,
      isInit: false,
      protocol: proxyType,
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
      const {data} = response;
      const responseData = data as RepeatedResponse;
      if (responseData.proxy_full?.length) {
        allHosts.current = responseData.proxy_full.sort(
          (a, b) => a.position - b.position
        );
        onChangeContext({
          isInit: true,
          hosts: responseData.proxy_full,
        });
      }
      if (responseData.proxy_update?.length) {
        const newHosts = responseData.proxy_update;
        const payload: HostType[] = allHosts.current.map(item => {
          const find = newHosts.find(
            x => x.host === item.host && x.port === item.port
          );
          return find ?? item;
        });
        onChangeContext({
          hosts: payload,
        });
        allHosts.current = payload;
      }
      if (responseData.done) {
        console.log('exit done');
        onChangeContext({
          isDone: true,
          isFetching: false,
          endTime: moment(),
        });
        return;
      }
      if (cancelled.current === true) {
        console.log('cancelled');
        cancelled.current = false;
        return;
      }
      if (responseData) await new Promise(resole => setTimeout(resole, 0));
      await onRequest(responseData.version);
    },
    [targetUrl, proxyList, session, cancelled, allHosts]
  );

  const onChangeTargetUrl = (event: ChangeEvent<HTMLInputElement>) => {
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

  const onClear = useCallback(() => {
    setTargetUrl('');
    setProxyType(DEFAULT_PROXY_TYPE);
    setProxyList('');
  }, []);

  const onCancel = useCallback(() => {
    cancelled.current = true;
  }, [cancelled]);

  useLayoutEffect(() => {
    const left = document.getElementById('left');
    const body = document.getElementById('body');
    const content = document.getElementById('content');

    const paddingLeft = window
      .getComputedStyle(content, null)
      .getPropertyValue('padding-left')
      .replace('px', '');

    if (window.innerWidth > 992) {
      content.style.width = `${
        body.clientWidth - left.clientWidth - parseInt(paddingLeft)
      }px`;
    }
    content.style.height = `${left.clientHeight}px`;
  }, [isInit]);

  const startBtnLabel = useMemo(() => {
    return isFetching && isInit ? 'Restart' : 'Start';
  }, [isFetching, isInit]);

  return (
    <div className="container" id="container">
      <div className="header mb-8">
        <h1 className="mb-4">🏁 Let’s Start by Checking your Site</h1>
        <h4>
          Pirate ipsum arrgh bounty warp jack. Blossom hail-shot pinnace
          starboard pirate run landlubber. Pounders spot jib me warp.
        </h4>
      </div>
      <div className="body" id="body">
        <div className="left" id="left">
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
            classNameContainer="mb-8"
            rows={13}
            value={proxyList}
            onChange={onChangeProxyList}
            placeholder={PLACEHOLDER}
          />
          <Button
            disabled={disabled}
            text={startBtnLabel}
            onClick={onStartHandler}
          />
          <Button kind="link" text="Clear all" onClick={onClear} />

          <br />
          {isInit && <Statistics />}
        </div>
        <div className="content" id="content">
          {!isInit ? <Welcome /> : <Result onCancel={onCancel} />}
        </div>
      </div>
    </div>
  );
}
