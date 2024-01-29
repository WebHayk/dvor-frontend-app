import {FC, ReactNode} from "react";
import styles from "../Review.module.scss";
import Rating from "@ui/Rating";
import {ASSETS_BASE_URL} from "@common/utils/options";
import {dateFormatterHelper} from "@common/utils/helpers";
import Avatar from "@ui/Avatar";
import UserProfileBar from "@ui/UserProfileBar";
import {ReviewType} from "@typescript/interfaces";
import ImageComponent from "@ui/FilesUpload/ImagesList/Image";
import {useMainSelector} from "@store/selectors";

interface ReviewContentModel {
    content: ReviewType,
    children?: ReactNode
}

export const ReviewContent: FC<ReviewContentModel> = (
    {
        content,
        children
    }
) => {

    let {user} = useMainSelector();

    let {
        created_at,
        avatar,
        firstName,
        lastName,
        nickName,
        rating,
        review,
        isVerified,
        images,
        isHidedUserInfo
    } = content;

    let date = dateFormatterHelper(created_at);

    let profileCondition = avatar ? ASSETS_BASE_URL + avatar : "/images/profile-empty-icon.svg";
    let nameCondition = nickName ? nickName : `${firstName} ${lastName}`;

    let isHidedInfoCondition = isHidedUserInfo && content?.ownerId !== user?.user_id;

    return (
        <div className={styles.ReviewContent}>
            <div className={styles.ReviewContent__top}>
                <div className={styles.ReviewContent__left}>
                    <Avatar
                        image={isHidedInfoCondition ? "/images/profile-empty-icon.svg" : profileCondition}
                        size={"medium"}
                    />
                    <div className={styles.ReviewContent__profile}>
                        <div className={styles.ReviewContent__info}>
                            <UserProfileBar
                                weight={"regular"}
                                name={isHidedInfoCondition ? "Аноним" : nameCondition}
                                isVerifiedCondition={isHidedInfoCondition ? false : isVerified}
                            />
                            <p className={styles.ReviewContent__label}>{date}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.ReviewContent__right}>
                    {children}
                </div>
            </div>
            <div className={styles.ReviewContent__content}>
                <div className={styles.ReviewContent__rating}>
                    <Rating
                        rating={rating}
                    />
                    <span>{rating}</span>
                </div>
                <p className={styles.ReviewContent__text}>{review}</p>
                {
                    images
                    ?
                    images.length
                    ?
                    <div className={styles.ReviewContent__images}>
                        {
                            images.map((image, index) => (
                                <ImageComponent
                                    image={ASSETS_BASE_URL + image}
                                    id={index}
                                />
                            ))
                        }
                    </div>
                    :
                    null
                    :
                    null
                }
                <div className={styles.ReviewContent__control}>
                    <button className={styles.ReviewContent__row}>
                        <img
                            loading={"lazy"}
                            src={"/images/review-like-icon.svg"}
                            alt={"review-icon"}
                            width={16}
                            height={15}
                        />
                        <p className={styles.ReviewContent__label}>45</p>
                    </button>
                    <button className={styles.ReviewContent__row}>
                        <img
                            loading={"lazy"}
                            src={"/images/share-grey-icon.svg"}
                            alt={"share-icon"}
                            width={17}
                            height={18}
                        />
                        <p className={styles.ReviewContent__label}>Поделиться</p>
                    </button>
                </div>
            </div>
        </div>
    )
}