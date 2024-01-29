import {FC, useEffect} from "react";
import styles from "./ApartmentHouseReviews.module.scss";
import ReviewsContent from "./ReviewsContent";
import {useHousesMapSelector, useMainSelector} from "@store/selectors";
import useActions from "@hooks/useActions";
import RatingView from "@ui/Rating/RatingView";
import {useQuery} from "@apollo/client";
import {APARTMENT_HOUSE_REVIEWS} from "@api/query/query";
import {APARTMENT_HOUSES_REVIEW_MODERATION_STATES} from "@typescript/enums";
import {useRouter} from "next/router";

export const ApartmentHouseReviews: FC = () => {

    let {query} = useRouter();
    let mainState = useMainSelector();
    let housesMapState = useHousesMapSelector();

    let houseReviews = useQuery(APARTMENT_HOUSE_REVIEWS);

    let {
        setApartmentHouseReviewsAction,
        setApartmentHouseUserReviewsAction,
        setUpdateStateHouseReviewsAction
    } = useActions();

    useEffect(() => {

        let variables = {
            moderation_state_key: APARTMENT_HOUSES_REVIEW_MODERATION_STATES.PUBLISHED,
            apartment_house_id: query.id,
            is_archive: false
        };

        houseReviews.refetch({
            ...variables,
            user_id: null
        })
            .then(response => {
                let data = response.data.apartment_house_reviews;
                setApartmentHouseReviewsAction(data);
            })
            .catch(err => console.log(err));

        if (mainState.user) {
            houseReviews.refetch({
                ...variables,
                user_id: mainState.user.user_id
            })
                .then(response => {
                    let data = response.data.apartment_house_reviews;
                    setApartmentHouseUserReviewsAction(data);
                })
                .catch(err => console.log(err));
        }

        if (housesMapState.isUpdate) {
            setUpdateStateHouseReviewsAction(false);
        }

    }, [housesMapState.isUpdate]);

    return (
        <div className={styles.OrganizationReviews}>
            <ReviewsContent/>
            {
                housesMapState.apartmentHouse.info
                    ?
                    housesMapState.apartmentHouse.info.organization
                        ?
                        <RatingView
                            className={styles.OrganizationReviews__rating}
                            rating={housesMapState.apartmentHouse.info.organization.rating}
                            title={"Рейтинг организации"}
                        />
                        :
                        null
                    :
                    null
            }
        </div>
    )
}