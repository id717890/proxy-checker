import React, {
  ChangeEvent,
  KeyboardEventHandler,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from 'react';

import styles from './Textarea.module.scss';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({label, ...props}: Props) {
  const [height, setHeight] = useState(100);
  const [value, setValue] = useState<string>(props.value?.toString());
  const onKeyUp = useCallback(
    (el: React.KeyboardEvent<HTMLTextAreaElement>) => {
      console.log('el', el);
      const numberOfLineBreaks = (value.match(/\n/g) || []).length;
      // min-height + lines x line-height + padding + border
      const newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
      setHeight(newHeight);
      // return newHeight;
    },
    [value]
  );

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div className={styles.formControl}>
      <label>{label}</label>
      <textarea
        {...props}
        // onKeyUp={onKeyUp}
        defaultValue={value}
        // onChange={onChange}
      />
    </div>
  );
}
