import {useCallback, useState} from 'react';
import {AppProvider, ContextValue} from 'context';
import {ProxyChecker} from 'views';

export function App() {
  const [value, setValue] = useState<ContextValue>({
    isFetching: false,
    isInit: false,
    isDone: false,
    hosts: [],
    targetUrl: null,
    endTime: null,
    startTime: null,
  });

  const onChange = useCallback((value: Partial<ContextValue>) => {
    setValue(prev => ({
      ...prev,
      ...value,
    }));
  }, []);
  return (
    <AppProvider
      value={{
        value,
        onChangeContext: onChange,
      }}
    >
      <ProxyChecker />
    </AppProvider>
  );
}
