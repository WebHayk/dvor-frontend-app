import {FC} from "react";
import styles from "./PaymentItem.module.scss";

interface PaymentItem {
    company: string,
    description: string,
    amount: number
}

export const PaymentItem: FC<PaymentItem> = (
    {
        company,
        description,
        amount
    }
) => {
    return (
        <div className={styles.PaymentItem}>
            <div className={styles.PaymentItem__left}>
                <p className={styles.PaymentItem__company}>{company}</p>
                <p>{description}</p>
            </div>
            <div className={styles.PaymentItem__right}>
                <p className={styles.PaymentItem__amount}>-{amount} ₽</p>
            </div>
        </div>
    )
}