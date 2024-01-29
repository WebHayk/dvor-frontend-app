import {FC} from "react";
import styles from "../Review.module.scss";
import {ReviewAnswerType} from "@typescript/interfaces";
import {dateFormatterHelper} from "@common/utils/helpers";

interface ReviewAnswerModel {
    content: ReviewAnswerType
}

export const ReviewAnswer: FC<ReviewAnswerModel> = (
    {
        content
    }
) => {

    let {organizationReply, createdAt} = content;
    let date = dateFormatterHelper(createdAt);

    return (
        <div className={styles.ReviewAnswer}>
            <div className={styles.ReviewContent__top}>
                <div className={styles.ReviewContent__left}>
                    {/*<div className={styles.ReviewContent__image}> </div>*/}
                    <div className={styles.ReviewContent__profile}>
                        <div className={styles.ReviewContent__info}>
                            <p className={styles.ReviewContent__name}>Олександрова Олександра</p>
                            <p className={styles.ReviewContent__label}>Ответ написан: {date}</p>
                        </div>
                        <p className={styles.ReviewContent__role}>Представитель</p>
                    </div>
                </div>
                <div className={styles.ReviewContent__right}>

                </div>
            </div>
            <div className={styles.ReviewContent__content}>
                <p className={styles.ReviewContent__text}>{organizationReply}</p>
            </div>
        </div>
    )
}

// <DropdownButton
//     setOpen={setOpen}
//     open={open}
// />
// <div className={styles.Review__dropdown}>
//     <ReviewAnswerDropdown open={open} />
// </div>