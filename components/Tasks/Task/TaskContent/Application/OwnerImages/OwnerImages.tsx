import {FC, memo} from "react";
import Paper from "@ui/Paper";
import styles from "./OwnerImages.module.scss";
import {ASSETS_BASE_URL} from "@common/utils/options";

interface OwnerImages {
    images: string[]
}

export const OwnerImages: FC<OwnerImages> = memo((
    {
        images
    }
) => {
    return (
        <Paper>
            <p className={styles.OwnerImages__title}>Изображения</p>
            <div className={styles.OwnerImages__list}>
            {
                images.length
                ?
                images.map(image => {
                    return (
                        <img
                            className={styles.OwnerImages__image}
                            key={image}
                            src={ASSETS_BASE_URL + image}
                            alt={"image"}
                            width={140}
                            height={100}
                        />
                    )
                })
                :
                <p>Пусто</p>
            }
            </div>
        </Paper>
    )
});

OwnerImages.displayName = "OwnerImages";