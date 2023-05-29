import React, {TextareaHTMLAttributes} from 'react';
import cn from 'classnames';

import styles from './Textarea.module.scss';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  classNameContainer?: string;
};

export function Textarea({
  label,
  classNameContainer,
  placeholder,
  ...props
}: Props) {
  return (
    <div className={styles.formControl}>
      <label>{label}</label>
      <div className={cn(styles.wrapper, classNameContainer)}>
        {placeholder && !props.value && (
          <span
            className={styles.placeholder}
            dangerouslySetInnerHTML={{__html: placeholder}}
          ></span>
        )}
        <textarea {...props} />
      </div>
    </div>
  );
}
