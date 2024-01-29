import {FC, ReactNode} from "react";
import styles from "./Review.module.scss";
import {ReviewAnswerType, ReviewType} from "@typescript/interfaces";
import ReviewsContent from "./ReviewContent";
import ReviewAnswer from "@ui/Review/ReviewAnswer";

interface ReviewModel {
    content: ReviewType,
    reviewAnswerContent?: ReviewAnswerType,
    childrenReviewsContent?: ReactNode
}

export const Review: FC<ReviewModel> = (
    {
        content,
        reviewAnswerContent,
        childrenReviewsContent
    }
) => {

    let {organizationReply} = content;

    return (
        <div className={styles.Review}>
            <ReviewsContent
                content={content}
            >
                {childrenReviewsContent}
            </ReviewsContent>
            {
                organizationReply && reviewAnswerContent
                &&
                <ReviewAnswer content={reviewAnswerContent}/>
            }
        </div>
    )
}