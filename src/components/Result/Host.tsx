import {HostType} from 'types';
import {useMemo} from 'react';

interface Props {
  host: HostType;
}

export function Host({host}: Props) {
  const address = useMemo(() => `${host.host}:${host.port}`, [host]);

  const country = useMemo(() => {
    if (!host.exit_geo) {
      return null;
    }
    return `${host.exit_geo.country}, ${host.exit_geo.city}, ${host.exit_geo.subdivision}`;
  }, [host]);

  return (
    <tr>
      <td>{host.result}</td>
      <td>{address}</td>
      <td>{host.login}</td>
      <td>{host.password}</td>
      <td>{host.protocol}</td>
      <td>{host.exit_ip}</td>
      <td>{country}</td>
      <td>{host.exit_host}</td>
      <td>{host.rtt}</td>
      <td>{host.error}</td>
    </tr>
  );
}
