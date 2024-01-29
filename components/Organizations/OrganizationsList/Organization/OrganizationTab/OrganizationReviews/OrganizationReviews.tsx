import {FC, useContext} from "react";
import styles from "../OrganizationTab.module.scss";
import {OrganizationsType, ReviewType} from "@typescript/interfaces";
import {OrganizationContext} from "@context/context";
import Review from "@ui/Review";
import ReviewDropdown from "./ReviewDropdown";
import useActions from "@hooks/useActions";

export const OrganizationReviews: FC = () => {

    const data: OrganizationsType = useContext(OrganizationContext);
    let {setOrganizationsUpdateStateAction} = useActions();

    return (
        <div className={styles.OrganizationReviews}>
            {
                data.reviews.length
                    ?
                    data.reviews.map(review => {

                        let {
                            created_at,
                            rating,
                            user,
                            user_profile_view,
                            id,
                            images
                        } = review;

                        let {
                            name,
                            last_name,
                            avatar
                        } = user_profile_view;

                        let {
                            is_verified,
                            profile
                        } = user;

                        let reviewContent: ReviewType = {
                            created_at,
                            review: review.review,
                            rating,
                            avatar,
                            nickName: profile.nickname,
                            firstName: name,
                            lastName: last_name,
                            isVerified: is_verified,
                            organizationReply: null,
                            images
                        };

                        return (
                            <Review
                                key={id}
                                childrenReviewsContent={
                                    <ReviewDropdown
                                        updateStateAction={setOrganizationsUpdateStateAction}
                                        review={review}
                                    />
                                }
                                content={reviewContent}
                            />
                        )
                    })
                    :
                    null
            }
            </div>
    )
}