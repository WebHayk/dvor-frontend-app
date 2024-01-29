import {FC, useState, useEffect} from "react";
import styles from "./MoreGallery.module.scss";

let currentImages: string[] = [];

interface MoreGallery {
    images: string[]
}

export const MoreGallery: FC<MoreGallery> = ({images}) => {

    let [gridClasses, setGridClasses] = useState<string[]>([styles.MoreGallery__content]);

    useEffect(() => {
        for (let i = 0; i < images.length; i++) {

            let image = images[i];

            if (i < 3 && currentImages.length < 3 && !currentImages.includes(image)) {
                currentImages.push(image);
            } else {
                break;
            }
        }
    }, [])

    useEffect(() => {
        switch (images.length) {
            case 1:
                setGridClasses([...gridClasses, styles.MoreGallery__one]);
                break
            case 2:
                setGridClasses([...gridClasses, styles.MoreGallery__two]);
                break
            case 3:
                setGridClasses([...gridClasses, styles.MoreGallery__three]);
                break;
            default:
                setGridClasses([...gridClasses, styles.MoreGallery__another]);
        }
    }, [])

    let counter = images.length - currentImages.length;

    let poster = {
        backgroundImage: "url(" + `${images[3]}` + ")"
    };

    return (
        <div className={styles.MoreGallery}>
            <div className={gridClasses.join(" ")}>
                {
                    currentImages.map((image, index) => {
                        return (
                            <img key={index} src={image}/>
                        )
                    })
                }
                {
                    images.length > 3
                    ?
                    <div
                        style={poster}
                        className={styles.MoreGallery__control}
                    >
                        <div className={styles.MoreGallery__backdrop}> </div>
                        <span>+{counter}</span>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}
