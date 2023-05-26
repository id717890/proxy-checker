import {useCallback, useState} from 'react';
import {AppProvider, ContextValue} from 'context';
import {ProxyChecker} from 'views';

const DEFAULT_STATE: ContextValue = {
  isFetching: false,
  isInit: false,
  isDone: false,
  hosts: [],
  targetUrl: null,
  endTime: null,
  startTime: null,
};

export function App() {
  const [value, setValue] = useState<ContextValue>(DEFAULT_STATE);

  const onChange = useCallback((value: Partial<ContextValue>) => {
    setValue(prev => ({
      ...prev,
      ...value,
    }));
  }, []);

  const onReset = () => {
    setValue(DEFAULT_STATE);
  };
  return (
    <AppProvider
      value={{
        value,
        onChangeContext: onChange,
        onReset,
      }}
    >
      <ProxyChecker />
    </AppProvider>
  );
}
