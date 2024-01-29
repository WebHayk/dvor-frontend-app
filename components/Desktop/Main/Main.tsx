import {FC} from "react";
import styles from "./Main.module.scss";
import MainTop from "./MainTop";
import MainBottom from "./MainBottom";

export const Main: FC = () => {
    return (
        <div className={styles.Main}>
            <MainTop />
            <MainBottom />
        </div>
    )
}
