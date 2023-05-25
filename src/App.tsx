import {useCallback, useState} from 'react';
import {AppProvider, ContextValue} from 'context';
import {ProxyChecker} from 'views';

export function App() {
  const [value, setValue] = useState<ContextValue>({
    isFetching: false,
    isInit: false,
    hosts: [],
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
