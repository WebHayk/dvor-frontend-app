import React, {FC} from "react";
import styles from "./Radio.module.scss";

interface Radio {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    data?: any,
    checked?: boolean,
    name: string,
    defaultChecked?: boolean,
    value?: string,
    id?: string
}

export const Radio: FC<Radio> = (
    {
        onChange,
        data,
        checked,
        defaultChecked,
        name,
        value,
        id
    }
) => {
    return (
        <input
            id={id}
            value={value}
            className={styles.Radio}
            name={name}
            type={"radio"}
            onChange={onChange}
            data-value={data}
            checked={checked}
            defaultChecked={defaultChecked}
        />
    )
}