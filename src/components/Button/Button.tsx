import {ButtonHTMLAttributes, useMemo} from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type ButtonType = 'primary' | 'link';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  kind?: ButtonType;
};

export function Button({
  text = 'OK',
  kind = 'primary',
  className,
  ...rest
}: Props) {
  const kindClass = useMemo(() => {
    switch (kind) {
      case 'primary':
        return styles.primary;
      case 'link':
        return styles.link;
    }
  }, [kind]);

  return (
    <button className={cn(styles.button, kindClass, className)} {...rest}>
      {text}
    </button>
  );
}
