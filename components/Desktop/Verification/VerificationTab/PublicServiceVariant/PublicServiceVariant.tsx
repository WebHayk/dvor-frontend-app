import {FC} from "react";
import styles from "./PublicServiceVariant.module.scss";
import Button from "@ui/Button";

const PublicServiceVariant: FC = () => {

    const handleSubmit = () => {
        console.log("Verification handler");
    }

    return (
        <div className={styles.PublicService}>
            <div className={styles.PublicService__content}>
                <div className={styles.PublicService__left}>
                    <img
                        width={65}
                        height={72}
                        src={"/images/gosuslugi-image.png"}
                        alt={"gosuslugi-image"}
                        loading={"lazy"}
                    />
                </div>
                <div className={styles.PublicService__right}>
                    <p className={styles.PublicService__title}>Воспользоваться этим способом можно, если у тебя есть учетная запись на портале Госуслуги</p>
                    <p className={styles.PublicService__description}>Это существенно ускорит верификацию</p>
                    <div className={styles.PublicService__action}>
                        <Button
                            type={"button"}
                            onClick={handleSubmit}
                            label={"Пройти верификацию с помощью портала Госуслуги"}
                            color={"blue"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicServiceVariant