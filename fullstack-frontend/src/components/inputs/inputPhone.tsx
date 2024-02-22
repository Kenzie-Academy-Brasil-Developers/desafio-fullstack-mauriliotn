import React, {
  FormEvent,
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
export const formatPhone = (str: string) => {
  return str
    .replace(/\D/g, "")
    .replace(
      /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
      (fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
        if (country)
          return `${country} (${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
        if (ddd || dddWithZero)
          return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
        if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
        return str;
      }
    );
};

export const handlePhone = (e: FormEvent<HTMLInputElement>) => {
  e.currentTarget.maxLength = 15;
  let value = e.currentTarget.value;
  e.currentTarget.value = formatPhone(value);
};

const InputPhone: ForwardRefExoticComponent<
  InputProps & RefAttributes<HTMLInputElement>
> = forwardRef(({ error, label, id, animationClass, ...rest }, ref): any => {
  return (
    <div className={`w-full p-4 ${animationClass}`}>
      <label htmlFor={id} className="text-sm font-normal shadow-lg">
        {label}
      </label>
      <input
        id={id}
        className="input"
        ref={ref}
        {...rest}
        onKeyUp={handlePhone}
      />
      {error ? <p className="mt-3 text-red-600">{error.message}</p> : null}
    </div>
  );
});

InputPhone.displayName = "InputPhone";

export default InputPhone;
