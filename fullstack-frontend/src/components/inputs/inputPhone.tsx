import { ForwardRefExoticComponent, InputHTMLAttributes, RefAttributes, forwardRef } from "react";

import InputMask, { ReactInputMask } from 'react-input-mask';


interface Error {
  message?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: Error;
  label?: string;
  id?: string;
  animationClass?: string
  [key: string]: any;
}

const InputPhone: ForwardRefExoticComponent<InputProps & RefAttributes<ReactInputMask>> = forwardRef(
  ({ error, label, id, animationClass, ...rest }, ref):any => {
    return (
      <div className={`w-full p-4 ${animationClass}`}>
        <label htmlFor={label} className="text-sm font-normal">{label}</label>
        <InputMask
        mask="(99) 99999-9999"
        id={label}
        className="input" 
        ref={ref}{...rest} />
        {error ? <p className="mt-3 text-red-600">{error.message}</p> : null}
      </div>
    );
  }
);

InputPhone.displayName = "InputPhone";

export default InputPhone;