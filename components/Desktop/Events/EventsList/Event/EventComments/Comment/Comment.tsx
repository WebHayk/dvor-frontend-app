import {FC} from "react";
import styles from "./Comment.module.scss";

const Comment: FC = () => {
    return (
        <div className={styles.Comment}>
            <div className={styles.Comment__profile}> </div>
            <div className={styles.Comment__right}>
                <div className={styles.Comment__top}>
                    <p className={styles.Comment__name}>Александра</p>
                    <p className={styles.Comment__date}>2 часа назад</p>
                </div>
                <div className={styles.Comment__content}>
                    <p className={styles.Comment__text}>Лорем ипсум долор сит амет етс, лорем ипсум</p>
                </div>
                <div className={styles.Comment__bottom}>
                    <p className={styles.Comment__reply}>Ответить</p>
                    <div className={styles.Comment__vote}>
                        <img
                            loading={"lazy"}
                            src={"/images/comment-like-icon.svg"}
                            alt={"comment-like-icon"}
                            width={16}
                            height={16}
                        />
                        <span className={styles.Comment__count}>45</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment