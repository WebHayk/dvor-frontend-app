import {FC} from "react";
import styles from "./RecordsHistoryHeader.module.scss";
import {useRouter} from "next/router";
import HistoryControl from "./HistoryControl";

export const RecordsHistoryHeader: FC = () => {

    let router = useRouter();

    const handleBack = () => router.push("/meters");

    return (
        <div className={styles.RecordsHistoryHeader}>
            <div className={styles.RecordsHistoryHeader__left}>
                <button onClick={handleBack} className={styles.RecordsHistoryHeader__back}>
                    <img
                        src={"/images/arrow-grey-icon.svg"}
                        alt={"arrow-icon"}
                        width={30}
                        height={30}
                    />
                </button>
                <p className={styles.RecordsHistoryHeader__title}>История показаний</p>
            </div>
            <div className={styles.RecordsHistoryHeader__right}>
                <HistoryControl />
            </div>
        </div>
    )
}