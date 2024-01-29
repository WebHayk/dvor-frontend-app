import {
    ApartmentHouseReviewType,
    ApartmentHouseType,
    ApartmentOneType,
    HousesInMapType,
    LocalityType,
    OrganizationChangeType,
    ServiceOrganizationType
} from "@typescript/interfaces";

export interface HousesMapReducerType {
    organization: HousesInMapType | null,
    houses: ApartmentHouseType[] | [],
    housesCopy: ApartmentHouseType[] | [],
    serviceOrganizations: ServiceOrganizationType[] | [],
    isUpdate: boolean,
    locality: LocalityType[] | [],
    filters: {
      activeLocality: LocalityType | null
    },
    apartmentHouse: {
        info: ApartmentOneType | null,
        reviews: ApartmentHouseReviewType[] | [],
        myReviews: ApartmentHouseReviewType[] | [],
        organizationChanges: OrganizationChangeType[]
    }
}