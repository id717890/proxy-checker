import {useMemo} from 'react';
import {useAppContext} from 'context';
import {Button, Input, Select, Textarea, Welcome} from 'components';
import './styles.scss';

export function ProxyChecker() {
  const {onChangeContext, value} = useAppContext();

  const disabled = useMemo(() => {
    return value.isFetching;
  }, [value]);

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
          <Input label="Target URL" className="mb-8" />
          <Select label="Proxy Type" classNameContainer="mb-8" />
          <Textarea label="Output" className="mb-8" rows={5} />
          <Button
            disabled={disabled}
            text="Start"
            onClick={() => {
              onChangeContext({
                isFetching: true,
              });
            }}
          />
          <Button kind="link" text="Clear all" />
        </div>
        <div className="content">
          <Welcome />
        </div>
      </div>
    </div>
  );
}
