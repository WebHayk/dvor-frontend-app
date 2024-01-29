import {Dispatch, FC} from "react";
import styles from "./Switch.module.scss";

interface SwitchModel {
    checked: boolean,
    setChecked: Dispatch<boolean>,
    name: string
}

export const Switch: FC<SwitchModel> = (
    {
        checked,
        setChecked,
        name
    }
) => {

    const handleChange = () => setChecked(!checked);

    return (
        <label className={styles.Switch}>
            <input
                name={name}
                onChange={handleChange}
                checked={checked}
                type="checkbox"
            />
            <span className={styles.Switch__slider}></span>
        </label>
    )
}