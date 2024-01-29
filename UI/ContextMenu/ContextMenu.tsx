import {FC} from "react";
import styles from "./ContextMenu.module.scss";
import {stringNumberConcatHelper} from "@common/utils/helpers";

interface ContextMenu {
    position: {
        x: number,
        y: number
    },
    isShow: boolean
}

export const ContextMenu: FC<ContextMenu> = (
    {
        position,
        isShow,
        children
    }
) => {

    let {x, y} = position;

    let xValue = stringNumberConcatHelper(x, "px");
    let yValue = stringNumberConcatHelper(y, "px");

    return (
        isShow
        ?
        <div
            style={{ top: yValue, left: xValue }}
            className={styles.ContextMenu}
        >
            {children}
        </div>
        :
        null
    )
}