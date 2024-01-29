import React, {FC} from "react";
import styles from "./Checkbox.module.scss";

interface Checkbox {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name?: string,
    defaultChecked?: boolean,
    data?: string,
    checked?: any
}

export const Checkbox: FC<Checkbox> = (
    {
        defaultChecked,
        checked,
        name,
        onChange,
        data
    }
) => {
    return (
        <div>
            <input
                className={styles.Checkbox}
                defaultChecked={defaultChecked}
                checked={checked}
                data-value={data}
                name={name}
                type={"checkbox"}
                onChange={onChange}
            />
        </div>
    )
}