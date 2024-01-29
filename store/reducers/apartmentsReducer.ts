import {ActionType} from "@typescript/interfaces";
import {ApartmentsReducerType} from "@typescript/interfaces/reducers/ApartmentsReducerType";
import {
    SET_APARTMENT_FILTER_CITY,
    SET_APARTMENT_HOUSE_FILTER_NUMBER,
    SET_APARTMENT_HOUSE_INFO,
    SET_APARTMENT_HOUSE_ORGANIZATION_REVIEWS,
    SET_APARTMENT_HOUSE_SENIORS,
    SET_APARTMENT_HOUSE_USERS,
    SET_APARTMENT_HOUSE_WORKERS,
    SET_APARTMENT_HOUSES
} from "@store/actions/actionTypes";

const initialState: ApartmentsReducerType = {
    apartments: [],
    filters: {
        city: null
    },
    apartment: {
        info: null,
        reviews: [],
        users: {
            filters: {
              apartmentNumber: null
            },
            users: [],
            seniors: [],
            workers: []
        }
    }
};

export const apartmentsReducer = (state = initialState, action: ActionType) => {
    let data = action.payload;

    switch (action.type) {
        case SET_APARTMENT_HOUSES: // Список домов
            return {
                ...state,
                apartments: data
            }
        case SET_APARTMENT_HOUSE_INFO: // Основная информация одного дома
            return {
                ...state,
                apartment: {
                    ...state.apartment,
                    info: data
                }
            }
        case SET_APARTMENT_HOUSE_ORGANIZATION_REVIEWS: // Отзывы обслуживающей организации
            return {
                ...state,
                apartment: {
                    ...state.apartment,
                    reviews: data
                }
            }
        case SET_APARTMENT_HOUSE_USERS: // "Жители" дома
            return {
                ...state,
                apartment: {
                    ...state.apartment,
                    users: {
                        ...state.apartment.users,
                        users: data
                    }
                }
            }
        case SET_APARTMENT_HOUSE_SENIORS: // "Правление" дома
            return {
                ...state,
                apartment: {
                    ...state.apartment,
                    users: {
                        ...state.apartment.users,
                        seniors: data
                    }
                }
            }
        case SET_APARTMENT_HOUSE_WORKERS: // "Персонал" дома
            return {
                ...state,
                apartment: {
                    ...state.apartment,
                    users: {
                        ...state.apartment.users,
                        workers: data
                    }
                }
            }
        case SET_APARTMENT_HOUSE_FILTER_NUMBER: // Номер помещения для фильтра
            return {
                ...state,
                apartment: {
                    ...state.apartment,
                    users: {
                        ...state.apartment.users,
                        filters: {
                            apartmentNumber: data
                        }
                    }
                }
            }
        case SET_APARTMENT_FILTER_CITY: // Город для фильтрa
            return {
                ...state,
                filters: {
                    ...state.filters,
                    city: data
                }
            }
        default:
            return state
    }
}