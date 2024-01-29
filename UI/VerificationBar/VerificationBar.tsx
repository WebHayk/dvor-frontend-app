import {FC} from "react";
import styles from "./VerificationTab.module.scss";
import cs from "classnames";

interface VerificationBar {
    label: string,
    isVerified: boolean | string
}

export const VerificationBar: FC<VerificationBar> = (
    {
        isVerified,
        label
    }
) => {
    return (
        <div className={cs({
            [styles.VerificationBar]: true,
            [styles.VerificationBar__verified]: isVerified,
            [styles.VerificationBar__not]: !isVerified,
            [styles.VerificationBar__pending]: isVerified == "pending"
        })}>
            {label}
        </div>
    )
}