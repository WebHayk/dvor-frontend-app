import {FC} from "react";
import styles from "./ScrollToBottom.module.scss";
import cs from "classnames";

interface ScrollToBottom {
    handleScroll: () => void,
    classes?: any
}

export const ScrollToBottom: FC<ScrollToBottom> = (
    {
        handleScroll,
        classes
    }
) => {
    return (
        <div className={cs({
            [styles.ScrollToBottom]: true,
            [classes?.join(" ")]: classes?.length
        })}>
            <div onClick={handleScroll} className={styles.ScrollToBottom__button}>
                <img
                    loading={"lazy"}
                    src={"/images/arrow-grey-icon.svg"}
                    alt={"arrow-icon"}
                    width={27}
                    height={27}
                />
            </div>
        </div>
    )
}