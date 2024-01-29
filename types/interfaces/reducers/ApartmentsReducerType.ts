import {
    ApartmentHouseUserType,
    ApartmentOneType,
    ApartmentType,
    OrganizationReviewType
} from "@typescript/interfaces";

export interface ApartmentsReducerType {
    apartments: ApartmentType[] | [],
    filters: {
        city: string | null
    },
    apartment: {
        info: ApartmentOneType | null,
        reviews: OrganizationReviewType[],
        users: {
            filters: {
                apartmentNumber: string | null
            },
            users: ApartmentHouseUserType[],
            seniors: [],
            workers: []
        }
    }
}