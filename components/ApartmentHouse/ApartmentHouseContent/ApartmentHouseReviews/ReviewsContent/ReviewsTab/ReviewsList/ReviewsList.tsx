import {FC} from "react";
import styles from "../../ReviewsContent.module.scss";
import {ApartmentHouseReviewType, ReviewAnswerType, ReviewType} from "@typescript/interfaces";
import Review from "@ui/Review";
import {organizationIconDetector} from "@common/utils/helpers";

interface ReviewsList {
    array: ApartmentHouseReviewType[]
}

export const ReviewsList: FC<ReviewsList> = (
    {
        array
    }
) => {
    return (
        <div className={styles.ReviewsList}>
            {
                array.length
                    ?
                    array.map((review: ApartmentHouseReviewType) => {

                        let imagesList: string[] = [];

                        let {
                            id,
                            created_at,
                            rating,
                            user_info,
                            organization_reply,
                            organization_reply_at,
                            organization_change,
                            owner_images,
                            images,
                            is_hided_user_info,
                            user_id
                        } = review;

                        if (owner_images.length) {
                            imagesList.push(...owner_images);
                        }

                        if (images?.length) {
                            imagesList.push(...images);
                        }

                        let {
                            avatar,
                            nickname,
                            name,
                            last_name,
                            user
                        } = user_info.profile;

                        let reviewContent: ReviewType = {
                            created_at,
                            review: review.review,
                            rating,
                            avatar,
                            nickName: nickname,
                            firstName: name,
                            lastName: last_name,
                            isVerified: user.is_verified,
                            organizationReply: organization_reply,
                            images: imagesList,
                            isHidedUserInfo: is_hided_user_info,
                            ownerId: user_id
                        };

                        let reviewAnswerContent: ReviewAnswerType = {
                            organizationReply: organization_reply,
                            createdAt: organization_reply_at
                        };

                        let reviewOrganization = reviewsContentChildren(organization_change.organization.logotype_path, organization_change.organization.name);

                        return (
                            <Review
                                key={id}
                                reviewAnswerContent={reviewAnswerContent}
                                content={reviewContent}
                                childrenReviewsContent={reviewOrganization}
                            />
                        )
                    })
                    :
                    <p>Пока пусто</p>
            }
        </div>
    )
}

const reviewsContentChildren = (logo: string | null, name: string) => {

    let logoCondition = organizationIconDetector(logo);

    return (
        <div className={styles.Review__organization}>
            <img
                src={logoCondition}
                width={50}
                height={50}
                alt={"organization-icon"}
            />
            <p className={styles.Review__name}>{name}</p>
        </div>
    )
}