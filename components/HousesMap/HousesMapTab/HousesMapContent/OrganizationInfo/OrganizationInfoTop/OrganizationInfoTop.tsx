import {FC} from "react";
import styles from "./OrganizationInfoTop.module.scss";
import Rating from "@ui/Rating";
import {useHousesMapSelector} from "@store/selectors";
import {ASSETS_BASE_URL} from "@common/utils/options";
import OrganizationType from "@ui/Organizations/OrganizationType";

export const OrganizationInfoTop: FC = () => {

    let state = useHousesMapSelector();
    let info = state.organization;

    return (
        <div className={styles.OrganizationInfoTop}>
            <div className={styles.OrganizationInfoTop__left}>
                <img
                    loading={"lazy"}
                    className={styles.OrganizationInfoTop__profile}
                    src={`${ASSETS_BASE_URL + info.organization.logotype_path}`}
                    alt={"organization-icon"}
                    width={65}
                    height={65}
                />
            </div>
            <div className={styles.OrganizationInfoTop__right}>
                <div className={styles.OrganizationInfoTop__info}>
                    <OrganizationType type={info.organization.type.name} />
                    <p className={styles.OrganizationInfoTop__name}>{info.organization.name}</p>
                </div>
                <p className={styles.OrganizationInfoTop__address}>{info.house.formatted}</p>
                <div className={styles.OrganizationInfoTop__bottom}>
                    <div className={styles.OrganizationInfoTop__rating}>
                        <Rating
                            rating={info.organization.rating}
                        />
                        <p className={styles.OrganizationInfoTop__counter}>{info.organization.rating || 0}</p>
                        <p className={styles.OrganizationInfoTop__reviews}>({info.organization.reviews_count || 0} отзыв)</p>
                    </div>
                    <button className={styles.OrganizationInfoTop__share}>
                        <img
                            loading={"lazy"}
                            src={"/images/share-icon.svg"}
                            alt={"share-icon"}
                            width={18}
                            height={18}
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}