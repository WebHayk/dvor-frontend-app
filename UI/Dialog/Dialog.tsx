import {FC, ReactNode, useEffect} from "react";
import styles from "./Dialog.module.scss";
import {addHiddenStyle, removeHiddenStyle} from "@common/utils/views";

interface Dialog {
    handleClose: () => void,
    open: boolean,
    title: string | ReactNode
}

export const Dialog: FC<Dialog> = (
    {
        children,
        handleClose,
        open,
        title
    }
) => {

    useEffect(() => {
        if (open) {
            addHiddenStyle();
        } else {
            removeHiddenStyle();
        }
    }, [open])

    return (
        open
            ?
            <>
                <div className={styles.Dialog__backdrop}> </div>
                <div className={styles.Dialog}>
                    <div className={styles.Dialog__content}>
                        <div className={styles.Dialog__header}>
                            {
                                typeof title == "string"
                                ?
                                <p className={styles.Dialog__title}>{title}</p>
                                :
                                title
                            }
                            <button onClick={handleClose}>
                                <img
                                    loading={"lazy"}
                                    src={"/images/close-black-icon.svg"}
                                    alt={"close-icon"}
                                    width={24}
                                    height={24}
                                />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>
            </>
            :
            null
    )
}