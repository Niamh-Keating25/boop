import { HTMLInputTypeAttribute } from 'react';
import styles from './Input.module.css';

interface Props {
  labelText: string;
  placeHolder?: string;
  helpText?: string;
  id: string;
  type?: HTMLInputTypeAttribute | 'textarea' | 'date';
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  inputClassName?: string
}

const Input: React.FC<Props> = ({ labelText, id, type, value, onChange, helpText, readOnly, inputClassName }) => {
  let readOnlyValue = value
  if (type === 'date' && value) {
    readOnlyValue = new Date(value).toLocaleDateString()
  }

  const nonStandardInputTypes = ['textarea', 'date', 'file'];
  return (
    <div className={`${styles['input__container']} ${styles[`input__container--${type}`]}`}>
      <label className={styles['input__label']} htmlFor={id}>
        {labelText}
      </label>
      {(!readOnly && !nonStandardInputTypes.includes(type || '')) && (
        <input
          type={type || 'text'}
          className={`${styles['input']} ${inputClassName || ''}`}
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(type === 'checkbox' ? e.target.checked.toString() : e.target.value)}
          checked={type === 'checkbox' ? value === 'true' : undefined}
        />
      )}
      {(!readOnly && type === 'textarea') && (
        <textarea
          className={styles['input']}
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {readOnly && (
        <p className={`${styles['input']} ${styles['input--readonly']}`}>{readOnlyValue}</p>
      )}
      {!!helpText && <small className={styles['input__help-text']}>{helpText}</small>}
    </div>
  );
};

export default Input;
