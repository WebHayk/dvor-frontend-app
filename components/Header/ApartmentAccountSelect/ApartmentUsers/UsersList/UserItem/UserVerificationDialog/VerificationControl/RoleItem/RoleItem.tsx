import styles from "../../UserVerificationDialog.module.scss";
import Radio from "@ui/Radio";
import {FC} from "react";

interface RoleItem {
    handleChange: any,
    role_key: string,
    label: string,
    checked: boolean
}

export const RoleItem: FC<RoleItem> = (
    {
        handleChange,
        role_key,
        label,
        checked
    }
) => {
    return (
        <label className={styles.VerificationControl__item}>
            <Radio
                onChange={handleChange}
                name={"role_key"}
                value={role_key}
                checked={checked}
            />
            <span className={styles.VerificationControl__label}>{label}</span>
        </label>
    )
}