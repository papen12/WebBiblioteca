import type { FC } from "react";  
import "./Input.css"

type Props = {
    placeholder?: string
    handleInput: Function
    type:
    | "text"
    | "password"
    | "email"
    | "tel"
    | "number"
    | "file"
    | "date"
    | "time"
    | "checkbox"
    | "radio";
    resetMessage: Function
    autocomplete?: "email" | "curren-password" | "new-password"
    value: string | boolean | number | Date
    min?: number
    max?: number
}

const Input: FC<Props> = ({
    placeholder,
    handleInput,
    type,
    resetMessage,
    autocomplete,
    value,
    min,
    max
}) => {
    function handleResult(value: string | boolean | number | File) {
        resetMessage()
        handleInput(value)
    }
    return (
        <input
            autoComplete={autocomplete ? autocomplete : ""}
            className="input"
            onInput={(e) => {
                if (type === "checkbox" || type === "radio") return
                const target = e.target as HTMLInputElement
                const result = target.value
                handleResult(result)
            }}
            type={type}
            checked={typeof value === "boolean" ? value : false}
            onChange={(e) => {
                if (type !== "checkbox" && type != "radio" && type != "file") return
                if (type === "file" && e.target.files && e.target.files.length > 0) {
                    handleResult(e.target.files.item(0)!);
                    return;
                }

                let result;
                const target = e.target as HTMLInputElement;
                if (type === "checkbox" || type === "radio") {
                    result = target.checked;
                } else if (type === "number") {
                    result = target.value === "" ? 0 : parseFloat(target.value);
                } else {
                    result = target.value;
                }
                handleResult(result);
            }}
            placeholder={placeholder ? placeholder : ""}
            {...(type !== "file"
                ? { value: typeof value !== "string" ? "" : value }
                : {})}
            {...(type === "number" && min !== undefined ? { min: min } : {})}
            {...(type === "number" && max !== undefined ? { max: max } : {})}
        />
    );
};

export default Input;