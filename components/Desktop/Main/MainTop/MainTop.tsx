import {FC, useEffect} from "react";
import styles from "../Main.module.scss";
import ChargingHistory from "./ChargingHistory";
import ChartCharging from "./ChartCharging";
import dynamic from "next/dynamic";
import {useQuery} from "@apollo/client";
import {GET_NEWS} from "@api/query/query";
import useActions from "@hooks/useActions";
import {useDesktopSelector, useMainSelector} from "@store/selectors";

const HouseBanner = dynamic(() => import("@ui/Houses/HouseBanner"), {ssr: false});
const NewsCarousel = dynamic(() => import("./NewsCarousel"), {ssr: false});

export const MainTop: FC = () => {

    let state = useMainSelector();
    let desktopState = useDesktopSelector();
    let user = state.user;
    let apartmentNews = useQuery(GET_NEWS);
    let {setDesktopNewsAction} = useActions();

    useEffect(() => {
        apartmentNews.refetch()
            .then(response => {
                setDesktopNewsAction(response.data.news);
            })
            .catch(err => console.log(err))

    }, [state.user])

    return (
        <div className={styles.Main__top}>
            {
                user
                ?
                user.apartment_user?.apartment.apartment_house.organization
                ?
                <HouseBanner
                    showRating={true}
                    control={true}
                    logotype_path={user.apartment_user.apartment.apartment_house.organization.logotype_path}
                    organizationName={user.apartment_user.apartment.apartment_house.organization.name}
                    rating={user.apartment_user.apartment.apartment_house.organization.rating}
                    premise_number={user.apartment_user.apartment.apartment_house.premise_number}
                    thoroughfare_name={user.apartment_user.apartment.apartment_house.thoroughfare_name}
                    reviews_count={user.apartment_user.apartment.apartment_house.organization.reviews_count}
                    type={user.apartment_user.apartment.apartment_house.organization.type.name}
                />
                :
                null
                :
                null
            }
            {
                desktopState.news.length
                ?
                <NewsCarousel />
                :
                null
            }
            <ChargingHistory />
            <ChartCharging />
        </div>
    )
}