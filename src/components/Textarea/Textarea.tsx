import React, {TextareaHTMLAttributes} from 'react';

import styles from './Textarea.module.scss';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({label, ...props}: Props) {
  return (
    <div className={styles.formControl}>
      <label>{label}</label>
      <textarea {...props} />
    </div>
  );
}
