import React, {FC, useEffect, useState} from "react";
import styles from "./IndicationRow.module.scss";
import TextField from "@ui/TextField";
import {IndicationType} from "@typescript/interfaces";
import {onlyNumbersContentHelper} from "@common/utils/helpers";

interface IndicationRow {
    icon: string,
    placeholder: string,
    lastValue: number | null,
    type: {
        key: string,
        name: string
    },
    indications: IndicationType[],
    isSubmitted: boolean,
    id: number
}

export const IndicationRow: FC<IndicationRow> = (
    {
        icon,
        placeholder,
        lastValue,
        type,
        indications,
        isSubmitted,
        id
    }
) => {

    const [value, setValue] = useState<string>("");
    let recordPoint = type.key == "electricity_day" || type.key == "electricity_night" ? "кВТ.ч" : "куб. м";

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.target.value;

        let onlyNumbersCheck = onlyNumbersContentHelper(value);

        if (onlyNumbersCheck) setValue(value);
    };

    useEffect(() => {
        if (isSubmitted) {
            if (value !== "") {
                let data = {
                    value: parseInt(value),
                    meter_id: id
                };

                if (!indications.includes(data)) indications.push(data);
            }
        }
    }, [isSubmitted])

    return (
        <div className={styles.IndicationRow}>
            <div className={styles.IndicationRow__left}>
                <img
                    src={`/images/${icon}-icon.svg`}
                    alt={"counter-icon"}
                    width={40}
                    height={40}
                />
                <div className={styles.IndicationRow__field}>
                    <TextField
                        type={"text"}
                        value={value}
                        name={"counter-value"}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {
                lastValue
                ?
                <div className={styles.IndicationRow__right}>
                    <div className={styles.IndicationRow__item}>
                        <p className={styles.IndicationRow__label}>Пред. знач.</p>
                        <span className={styles.IndicationRow__value}>{lastValue} {recordPoint}</span>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}