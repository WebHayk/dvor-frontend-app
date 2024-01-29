import React, {FC, memo} from "react";
import styles from "../ImagesList.module.scss";
import {ImageType} from "@typescript/interfaces";
import cs from "classnames";

interface ImageComponent extends ImageType {
    handleDelete?: () => void,
    className?: string
}

export const ImageComponent: FC<ImageComponent> = memo((
    {
        image,
        id,
        handleDelete,
        className
    }
) => {
    return (
        <div className={cs({
            [styles.ImagesList__item]: true,
            [className as string]: className
        })}>
            {
                handleDelete
                &&
                <button
                    onClick={handleDelete}
                    className={styles.ImagesList__delete}
                >
                    <img
                        loading={"lazy"}
                        src={"/images/delete-grey-icon.svg"}
                        alt={"delete-icon"}
                        width={12}
                        height={16}
                    />
                </button>
            }
            <img
                loading={"lazy"}
                className={styles.ImagesList__image}
                src={image}
                alt={"image"}
                width={100}
                height={75}
            />
        </div>
    )
});

ImageComponent.displayName = "ImageComponent";