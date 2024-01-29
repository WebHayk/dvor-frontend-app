import React, {ChangeEvent, FC} from "react";
import styles from "./PhoneField.module.scss";
import PhoneInput, {CountryData} from "react-phone-input-2";

interface PhoneField {
    value: string,
    setValue: React.Dispatch<string>
}

export const PhoneField: FC<PhoneField> = (
    {
        value,
        setValue
    }
) => {

    const handleChange = (value: string) => {
        setValue(value);
    };

    return (
            <PhoneInput
                isValid={(value, country: any) => {
                    if (value.match(/12345/)) {
                        return 'Invalid value: '+value+', '+country.name;
                    } else if (value.match(/1234/)) {
                        return false;
                    } else {
                        return true;
                    }
                }}
                country={"ru"}
                inputClass={styles.PhoneField__field}
                containerClass={styles.PhoneField}
                buttonClass={styles.PhoneField__button}
                placeholder={"Номер телефона"}
                onChange={handleChange}
                value={value}
            />
    )
}