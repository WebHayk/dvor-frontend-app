import React, {FC} from "react";
import styles from "./Select.module.scss";
import cs from "classnames";

interface Select {
    options: string[] | any,
    defaultValue?: string,
    value: string | number,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    label?: string,
    name?: string,
    onBlur?: any,
    optionKey?: string,
    optionName?: string,
    className?: any,
    firstOptionDisabled?: boolean
}

export const Select: FC<Select> = (
    {
        options,
        defaultValue,
        onChange, value,
        label,
        name,
        onBlur,
        optionKey,
        optionName,
        className,
        firstOptionDisabled
    }
) => {

    let firstOptionDisabledCondition = firstOptionDisabled != undefined ? firstOptionDisabled : true;

    return (
        <div className={cs({
            [styles.Select]: true,
            [className]: className
        })}>
            <div className={styles.Select__content}>
                {
                    label && <p className={styles.Select__label}>{label}</p>
                }
                <select
                    onBlur={onBlur}
                    name={name}
                    onChange={onChange}
                    defaultValue={defaultValue}
                    className={styles.Select__field}
                    value={value}
                >
                    <option disabled={firstOptionDisabledCondition} value={""}>{label}</option>
                    {
                        options.map((option: any, index: number) => {
                            return (
                                <option
                                    key={index}
                                    value={typeof option == "string" ? option : optionKey ? option[optionKey] : ""}
                                >
                                    {typeof option == "string" ? option : optionName ? option[optionName] : ""}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}