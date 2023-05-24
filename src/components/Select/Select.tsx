import {SelectHTMLAttributes} from 'react';

import styles from './Select.module.scss';
import cn from 'classnames';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  classNameContainer?: string;
};

export function Select({label, classNameContainer, ...props}: Props) {
  return (
    <div className={styles.formControl}>
      <label>{label}</label>

      <div className={cn(styles.select, classNameContainer)}>
        <div className={styles.icon} />
        <select {...props}>
          <option value="v1" label="v1" />
          <option value="v2" label="v2" />
        </select>
      </div>
    </div>
  );
}
