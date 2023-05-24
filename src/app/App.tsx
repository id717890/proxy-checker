import {AppProvider, ContextValue} from 'context';
import {ProxyChecker} from 'views';
import {useCallback, useState} from 'react';

export function App() {
  const [value, setValue] = useState<ContextValue>({
    isFetching: false,
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
