import {FC} from "react";
import styles from "./Dropdown.module.scss";
import cs from "classnames";

interface Dropdown {
    open: boolean,
    className?: any
}

export const Dropdown: FC<Dropdown> = (
    {
        children,
        open,
        className
    }
) => {
    return (
        open
        ?
        <div className={cs({
            [styles.Dropdown]: true,
            [className]: className
        })}>
          <ul className={styles.Dropdown__list}>
              {children}
          </ul>
        </div>
        :
        null
    )
}
