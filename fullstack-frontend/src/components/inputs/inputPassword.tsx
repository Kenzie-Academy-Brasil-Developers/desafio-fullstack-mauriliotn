import { ForwardRefExoticComponent, InputHTMLAttributes, RefAttributes, forwardRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";


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

const InputPassword: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>> = forwardRef(
  ({ error, label, id, animationClass, ...rest }, ref):any => {
    const [isHidden, setIsHidden] = useState(true);
    return (
      <div className={`w-full p-4 ${animationClass}`}>
        <label htmlFor={label} className="text-sm font-normal" >{label}</label>
        <div className="w-full relative">
          <input id={label} className="input" type={isHidden ? "password" : "text"} ref={ref}{...rest} />  
          <button className="absolute top-9 right-4" type="button" onClick={() => setIsHidden(!isHidden)}>
            {isHidden ? <MdVisibility className="text-gray-900 text-xl" /> : <MdVisibilityOff className="text-gray-900 text-xl"/>}
          </button>
        </div>
        {error ? <p className="mt-3 text-red-600">{error.message}</p> : null}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
