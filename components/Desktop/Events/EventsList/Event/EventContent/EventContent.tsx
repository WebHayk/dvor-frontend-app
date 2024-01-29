import {FC} from "react";
import styles from "./EventContent.module.scss";
import MoreGallery from "@ui/MoreGallery";

const EventContent: FC = () => {
    return (
        <div className={styles.Event__content}>
            <p className={styles.Event__text}>Лорем ипсум долор сит амет етс. Лорем ипсум долор сит амет етс, лорем ипсум.</p>
            {/*<MoreGallery images={images} />*/}
        </div>
    )
}

export default EventContent