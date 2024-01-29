import {FC, ReactNode, useEffect} from "react";
import cx from "classnames";
import styles from "./Alert.module.scss";
import useActions from "@hooks/useActions";

interface AlertModel {
    type: "info" | "error" | "warning" | "success",
    id: number,
    children: ReactNode
}

export const Alert: FC<AlertModel> = (
    {
        type,
        children,
        id
    }
) => {

    let {deleteMessageAction} = useActions();

    useEffect(() => {

        let closeAlertTimeout: ReturnType<typeof setTimeout>;

        closeAlertTimeout = setTimeout(() => {
            deleteMessageAction(id);
        }, 5000);

        return () => clearTimeout(closeAlertTimeout);

    }, []);

    const handleClose = () => deleteMessageAction(id);

    return (
        <div className={cx({
            [styles.Alert]: true
        }, styles[type])}>
            <div className={styles.Alert__left}>
                <img
                    src={`/images/${type}-icon.svg`}
                    alt={"alert-icon"}
                    width={24}
                    height={24}
                />
                <p className={styles.Alert__text}>{children}</p>
            </div>
            <div className={styles.Alert__right}>
                <button
                    onClick={handleClose}
                >
                    <img
                        src={"/images/close-black-icon.svg"}
                        alt={"close-icon"}
                    />
                </button>
            </div>
        </div>
    )
}