import {FC} from "react";
import styles from "./ReviewsContent.module.scss";
import ReviewsTab from "./ReviewsTab";

export const ReviewsContent: FC = () => {
    return (
       <div className={styles.ReviewsContent}>
           <p className={styles.ReviewsContent__title}>Отзывы</p>
           <ReviewsTab />
       </div>
    )
}