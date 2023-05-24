import {SelectHTMLAttributes} from 'react';

import styles from './Select.module.scss';
import cn from 'classnames';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  classNameContainer?: string;
  options: string[];
};

export function Select({label, classNameContainer, options, ...props}: Props) {
  return (
    <div className={styles.formControl}>
      <label>{label}</label>

      <div className={cn(styles.select, classNameContainer)}>
        <div className={styles.icon} />
        <select {...props}>
          {options.map(o => (
            <option key={o} value={o} label={o} />
          ))}
        </select>
      </div>
    </div>
  );
}
