import React, {FC} from "react";
import styles from "./Textarea.module.scss";
import cs from "classnames";
import event from "@components/Desktop/Events/EventsList/Event/Event";

interface Textarea {
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onBlur?: any,
    value: string,
    name: string,
    className?: any,
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void,
    maxLength?: number
}

export const Textarea: FC<Textarea> = (
    {
        placeholder,
        onBlur,
        onChange,
        value,
        className,
        name,
        onKeyDown,
        maxLength
    }
) => {
    return (
        <textarea
            maxLength={maxLength}
            onKeyDown={onKeyDown}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            className={cs({
                [styles.Textarea]: true,
                [className]: className
            })}
        />
    )
}