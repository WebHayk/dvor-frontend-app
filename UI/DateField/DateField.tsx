import React, {FC} from "react";
import styles from "./DateField.module.scss";

interface DateField {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    defaultValue?: string,
    onBlur?: any
}

export const DateField: FC<DateField> = (
    {
        value,
        onBlur,
        onChange,
        defaultValue,
        name
    }
) => {
    return (
        <input
            className={styles.DateField}
            type={"date"}
            value={value}
            onChange={onChange}
            name={name}
            defaultValue={defaultValue}
            onBlur={onBlur}
        />
    )
}