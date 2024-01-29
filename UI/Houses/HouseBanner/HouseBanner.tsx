import {FC, memo, useState} from "react";
import styles from "./HouseBanner.module.scss";
import Rating from "@ui/Rating";
import {ASSETS_BASE_URL} from "@common/utils/options";
import Button from "@ui/Button";
import {useMainSelector} from "@store/selectors";
import ReviewDialog from "@ui/Review/ReviewDialog";
import {ReviewFormType} from "@typescript/interfaces";
import {useRouter} from "next/router";
import {apiService} from "@services/apiService";
import {INSERT_ORGANIZATION_REVIEW} from "@api/mutations/mutations";
import Link from "next/link";
import useActions from "@hooks/useActions";
import {MESSAGES_TYPES} from "@typescript/enums";

interface HouseBanner {
    logotype_path: string | null,
    type: string,
    organizationName: string,
    thoroughfare_name: string,
    premise_number: string,
    rating: number,
    reviews_count: number,
    control: boolean,
    showRating: boolean
}

export const HouseBanner: FC<HouseBanner> = memo((
    {
        logotype_path,
        type,
        organizationName,
        thoroughfare_name,
        premise_number,
        rating,
        reviews_count,
        control,
        showRating,
        children
    }
) => {

    let {setMessageAction} = useActions();

    let router = useRouter();
    let state = useMainSelector();

    let [open, setOpen] = useState<boolean>(false);

    const handleOpenReviewDialog = () => setOpen(true);
    let queryId = router.query?.id;
    let apartmentHouseId = queryId ? queryId : state.user?.apartment_user.apartment.apartment_house.id;

    const handleInsertReview = (values: ReviewFormType) => {
        let organization_id = state.user.apartment_user.apartment.apartment_house.organization_id;

        let {review, rating, images} = values;

        apiService.mutationRequest(INSERT_ORGANIZATION_REVIEW, {
            review,
            rating,
            organization_id,
            images
        })
            .then(() => {
                setOpen(false);

                setMessageAction({
                    type: MESSAGES_TYPES.SUCCESS,
                    body: "Отзыв добавлен."
                });
            })
            .catch(err => console.log(err))
    }

    const handleRedirectMyReviews = () => {
        router.push(`/houses/${apartmentHouseId}?reviews=local`);
    };

    return (
        <>
            <ReviewDialog
                open={open}
                setOpen={setOpen}
                onSubmit={handleInsertReview}
                title={"Написать отзыв"}
            />
            <div className={styles.HouseBanner}>
                <div className={styles.HouseBanner__content}>
                    <img
                        className={styles.HouseBanner__profile}
                        loading={"lazy"}
                        src={logotype_path ? ASSETS_BASE_URL + logotype_path : "/images/empty-organization-icon.svg"}
                        alt={"house-icon"}
                        width={72}
                        height={72}
                    />
                    <div className={styles.HouseBanner__right}>
                        {
                            type || organizationName
                                ?
                                <div className={styles.HouseBanner__organization}>
                                    <div className={styles.HouseBanner__type}>{type}</div>
                                    <p className={styles.HouseBanner__organizationName}>{organizationName}</p>
                                </div>
                                :
                                null
                        }
                        <div className={styles.HouseBanner__info}>
                            <p className={styles.HouseBanner__address}>{thoroughfare_name} {premise_number}</p>
                        </div>
                        {
                            showRating && rating
                                ?
                                <div className={styles.HouseBanner__rating}>
                                    <div className={styles.HouseBanner__ratingInfo}>
                                        <Rating
                                            rating={rating}
                                        />
                                        <p className={styles.HouseBanner__ratingLabel}>{rating}</p>
                                    </div>
                                    <Link href={`/houses/${apartmentHouseId}?reviews`}>
                                        <a className={styles.HouseBanner__reviews}>
                                            ({reviews_count} отзыв)
                                        </a>
                                    </Link>
                                </div>
                                :
                                null
                        }
                        {
                            control
                                ?
                                <div className={styles.HouseBanner__bottom}>
                                    <Button
                                        type={"button"}
                                        onClick={handleOpenReviewDialog}
                                        label={"Написать отзыв"}
                                        color={"blue"}
                                    />
                                    <Button
                                        type={"button"}
                                        onClick={handleRedirectMyReviews}
                                        label={"Мои отзывы"}
                                        color={"white"}
                                    />
                                </div>
                                :
                                null
                        }
                        {
                            children && children
                        }
                    </div>
                </div>
            </div>
        </>
    )
});