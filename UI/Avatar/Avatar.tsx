import {FC} from "react";
import styles from "./Avatar.module.scss";
import cn from "classnames";
import cs from "classnames";

interface Avatar {
    image: string,
    size?: "small" | "medium" | "large",
    loading?: "eager" | "lazy",
    is_online?: boolean
}

export const Avatar: FC<Avatar> = (
    {
        image,
        size,
        loading,
        is_online
    }
) => {
    return (
        <div className={cn({
            [styles.Avatar]: true
        }, styles[size || "small"])}>
            <img
                className={cn({
                    [styles.Avatar__image]: true
                }, styles[size || "small"])}
                src={image}
                width={40}
                height={40}
                alt={"avatar"}
                loading={loading}
            />
            {is_online && <div className={cs({
                [styles.Avatar__online]: true,
                [styles.Avatar__onlineMedium]: size == "medium"
            })}></div>}
        </div>
    )
}