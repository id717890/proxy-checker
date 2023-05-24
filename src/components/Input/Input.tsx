import {InputHTMLAttributes} from 'react';

import styles from './Input.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({label, ...props}: Props) {
  return (
    <div className={styles.formControl}>
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
