import {FC} from "react";
import styles from "./ChargingHistory.module.scss";
import Button from "@ui/Button";

export const ChargingHistory: FC = () => {
    return (
        <div className={styles.ChargingHistory}>
            <div className={styles.ChargingHistory__content}>
                <div className={styles.ChargingHistory__left}>
                    <p className={styles.ChargingHistory__title}>Начислено за декабрь:</p>
                    <p className={styles.ChargingHistory__price}>67,890.43 ₽</p>
                </div>
                <div className={styles.ChargingHistory__right}>
                    <Button
                        type={"button"}
                        onClick={() => console.log("Clicked!")}
                        label={"История начислений"}
                        color={"white"}
                    />
                    <Button
                        type={"button"}
                        onClick={() => console.log("Clicked!")}
                        label={"Оплатить квитанцию"}
                        color={"blue"}
                    />
                </div>
            </div>
        </div>
    )
}