import {FC, memo} from "react";
import styles from "./Organization.module.scss";
import OrganizationTab from "./OrganizationTab";
import Rating from "@ui/Rating";
import {OrganizationContext} from "@context/context";
import {OrganizationsType} from "@typescript/interfaces";
import OrganizationType from "@ui/Organizations/OrganizationType";
import {ASSETS_BASE_URL} from "@common/utils/options";
import ContactsInfoComponent from "./ContactsInfo";

interface Props {
    data: OrganizationsType
}

export const Organization: FC<Props> = memo((
    {
        data
    }
) => {
    return (
        <OrganizationContext.Provider value={data}>
            <div className={styles.Organization}>
                <div className={styles.Organization__content}>
                    <div className={styles.Organization__left}>
                        <img
                            className={styles.Organization__logo}
                            src={data.logotype_path ? ASSETS_BASE_URL + data.logotype_path : "/images/empty-organization-icon.svg"}
                            alt={"organization-image"}
                            width={100}
                            height={100}
                        />
                        <div className={styles.Organization__rating}>
                            <Rating
                                rating={data.rating}
                            />
                            <p className={styles.Organization__reviews}>{data.reviews_count || 0} отзыв</p>
                        </div>
                    </div>
                    <div className={styles.Organization__right}>
                        <div className={styles.Organization__top}>
                            <div className={styles.Organization__info}>
                                <p className={styles.Organization__title}>{data.name}</p>
                                <OrganizationType
                                    type={data.type.name}
                                />
                            </div>
                        </div>

                        <div className={styles.Organization__common}>
                            <div className={styles.Organization__tab}>
                                <OrganizationTab/>
                            </div>
                            <div>
                                <ContactsInfoComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OrganizationContext.Provider>
    )
});

Organization.displayName = "Organization";