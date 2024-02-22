import React, {
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  RefAttributes,
  forwardRef,
} from "react";

interface Error {
  message?: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: Error;
  label?: string;
  id?: string;
  animationClass?: string;
}

const Input: ForwardRefExoticComponent<
  InputProps & RefAttributes<HTMLInputElement>
> = forwardRef(({ error, label, id, animationClass, ...rest }, ref): any => {
  return (
    <div className={`w-full p-4 ${animationClass}`}>
      <label htmlFor={id} className="text-sm font-normal shadow-lg">
        {label}
      </label>
      <input id={id} className="input" ref={ref} {...rest} />
      {error ? <p className="mt-3 text-red-600">{error.message}</p> : null}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
