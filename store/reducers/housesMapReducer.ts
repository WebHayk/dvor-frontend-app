import {ActionType} from "@typescript/interfaces";
import {
    SET_ACTIVE_LOCALITY,
    SET_APARTMENT_HOUSE_ONE,
    SET_FILTERED_HOUSES_MAP,
    SET_HOUSE_ORGANIZATION_CHANGES,
    SET_HOUSE_ORGANIZATION_REVIEWS,
    SET_HOUSE_ORGANIZATION_USER_REVIEWS,
    SET_LOCALITY,
    SET_ORGANIZATION_INFO,
    SET_ORGANIZATIONS_HOUSES_MAP,
    SET_SERVICE_ORGANIZATIONS,
    SET_UPDATE_REVIEWS
} from "@store/actions/actionTypes";
import {HousesMapReducerType} from "@typescript/interfaces/reducers/HousesMapReducerType";

const initialState: HousesMapReducerType = {
    organization: null,
    locality: [],
    houses: [],
    housesCopy: [],
    serviceOrganizations: [],
    isUpdate: false,
    filters: {
        activeLocality: null
    },
    apartmentHouse: {
        info: null,
        organizationChanges: [],
        reviews: [],
        myReviews: []
    }
};

export const housesMapReducer = (state = initialState, action: ActionType) => {

    let data = action.payload;

    switch (action.type) {
        case SET_ORGANIZATIONS_HOUSES_MAP: // Маркеры домов
            return {
                ...state,
                houses: data,
                housesCopy: data
            }
        case SET_ORGANIZATION_INFO: // Информация организации
            return {
                ...state,
                organization: data
            }
        case SET_FILTERED_HOUSES_MAP: // Фильтрация маркеров домов
            return {
                ...state,
                houses: data
            }
        case SET_SERVICE_ORGANIZATIONS: // Организации (с информацией дома), список
            return  {
                ...state,
                serviceOrganizations: data
            }
        case SET_APARTMENT_HOUSE_ONE: // Информация дома
            return {
                ...state,
                apartmentHouse: {
                    ...state.apartmentHouse,
                    info: data
                }
            }
        case SET_HOUSE_ORGANIZATION_REVIEWS: // Отзывы организации дома
            return {
                ...state,
                apartmentHouse: {
                    ...state.apartmentHouse,
                    reviews: data
                }
            }
        case SET_HOUSE_ORGANIZATION_CHANGES: // История изменений обслуживающих организации дома
            return {
                ...state,
                apartmentHouse: {
                    ...state.apartmentHouse,
                    organizationChanges: data
                }
            }
        case SET_HOUSE_ORGANIZATION_USER_REVIEWS: // Отзывы локального юзера
            return {
                ...state,
                apartmentHouse: {
                    ...state.apartmentHouse,
                    myReviews: data
                }
            }
        case SET_UPDATE_REVIEWS: // Статус обновления отзывов (после добавления нового)
            return {
                ...state,
                isUpdate: data
            }
        case SET_LOCALITY: // Список городов с координатами
            return {
                ...state,
                locality: data
            }
        case SET_ACTIVE_LOCALITY: // Активный город с координатами
            return {
                ...state,
                filters: {
                    ...state.filters,
                    activeLocality: data
                }
            }
        default:
            return state
    }

}