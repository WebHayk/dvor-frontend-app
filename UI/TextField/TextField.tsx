import React, {FC, useEffect, useState} from "react";
import styles from "./TextField.module.scss";

interface TextField {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    readOnly?: boolean,
    type: "text" | "password" | "number",
    value: string | number,
    defaultValue?: string,
    name: string,
    placeholder?: string,
    maxLength?: number,
    onBlur?: any,
    pattern?: string,
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export const TextField: FC<TextField> = (
    {
        type,
        onChange,
        name,
        value,
        defaultValue,
        placeholder,
        readOnly,
        maxLength,
        onBlur,
        pattern,
        onKeyPress
    }
) => {

    let [isActive, setIsActive] = useState<boolean>(readOnly !== undefined);

    useEffect(() => {
        if (value !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [value])

    return (
    <div className={styles.Input}>
        <input
            onKeyPress={onKeyPress}
            pattern={pattern}
            onBlur={onBlur}
            maxLength={maxLength}
            readOnly={readOnly}
            type={type}
            onChange={onChange}
            name={name}
            value={value}
            defaultValue={defaultValue}
            spellCheck={false}
        />
        <label className={isActive ? styles.Active : ""} htmlFor={type}>
            {placeholder}
        </label>
    </div>
    )
}