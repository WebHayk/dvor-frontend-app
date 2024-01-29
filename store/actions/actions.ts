import {DispatchType} from "@typescript/types";
import {
    AUTH_CHECKER,
    SET_APARTMENT_ID,
    SET_APARTMENT_MY_TASKS,
    SET_APARTMENT_NEWS,
    SET_APARTMENT_TASKS,
    SET_APARTMENT_USERS,
    SET_CHATS_VIEW,
    SET_CURRENT_CHAT_INFO,
    SET_FILTERED_HOUSES_MAP,
    SET_MORE_NEWS,
    SET_NEWS_DETAIL,
    SET_NEWS_ID,
    SET_NEWS_LIST,
    SET_NOTIFICATIONS_SHOW,
    SET_ORGANIZATION_INFO,
    SET_ORGANIZATIONS,
    SET_ORGANIZATIONS_HOUSES_MAP,
    SET_SESSION_USER,
    SET_SIDEBAR_SHOW,
    SET_USER_PROFILE,
    SET_CAMERA_CATEGORY,
    SET_CAMERAS_LIST,
    SET_CAMERA_PAGE,
    USER_LOGIN,
    USER_LOGOUT,
    SET_CAMERA_CATEGORIES,
    SET_METERS_LIST,
    SET_MY_TASKS_LIST,
    SET_TASKS_LIST,
    SET_SEARCH_TASK_STATUS,
    SET_SEARCH_TASK_DATE,
    SET_TASK,
    SET_APARTMENT_HOUSE_ID,
    SET_CURRENT_POLLS,
    SET_PAST_POLLS,
    SET_SEARCH_POLL_DATE,
    SET_SEARCH_POLL_TYPE,
    SET_SEARCH_POLL_QUERY,
    SET_POLL_ONE,
    SET_APARTMENT_HOUSES,
    SET_APARTMENT_HOUSE_INFO,
    SET_APARTMENT_HOUSE_ORGANIZATION_REVIEWS,
    SET_ORGANIZATIONS_TYPES,
    SET_SEARCH_ORGANIZATIONS_TYPE,
    SET_SERVICE_ORGANIZATIONS,
    SET_APARTMENT_HOUSE_ONE,
    SET_HOUSE_ORGANIZATION_REVIEWS,
    SET_HOUSE_ORGANIZATION_USER_REVIEWS,
    SET_METERS_RECORDS,
    SET_METERS_FILTER_TYPE,
    SET_UPDATE_REVIEWS,
    SET_LOCALITY,
    SET_ACTIVE_LOCALITY,
    SET_APARTMENT_HOUSE_USERS,
    SET_APARTMENT_HOUSE_FILTER_NUMBER,
    SET_APARTMENT_HOUSE_SENIORS,
    SET_APARTMENT_HOUSE_WORKERS,
    SET_APARTMENT_FILTER_CITY,
    SET_POLLS_UPDATE_STATE,
    SET_APARTMENT_USERS_UPDATE_STATE,
    SET_TASK_LOGS,
    SET_LIST_COUNT,
    SET_POLL_ONE_UPDATE_STATE,
    SET_DOCUMENTS,
    SET_DOCUMENTS_TYPES,
    SET_DOCUMENTS_TARGET_GROUPS_TYPES,
    SET_DOCUMENTS_UPDATE_STATE,
    SET_SEARCH_TASK_URGENTLY,
    SET_SELECTED_MESSAGES,
    SET_CHAT_CONTENT_SCROLL,
    SET_CHAT_REPLY_MESSAGE,
    SET_SEARCH_TASK_QUERY,
    SET_MESSAGE,
    DELETE_MESSAGE,
    SET_HOUSE_ORGANIZATION_CHANGES,
    SET_ORGANIZATIONS_UPDATE_STATE,
    SET_GLOBALLY_UPDATE_STATE
} from "./actionTypes";
import {
    ApartmentHouseType,
    ApartmentHouseUserType,
    ApartmentOneType,
    ApartmentType,
    ApartmentUserType,
    ChatsViewType,
    CurrentChatType,
    HouseType,
    LocalityType,
    MeterRecordType,
    MetersType,
    NewsType,
    OrganizationReviewType,
    OrganizationsApartmentsType,
    OrganizationsType,
    PollListType,
    PollType,
    ServiceOrganizationType,
    TaskLogType, TaskPayloadType,
    TaskType,
    UserLoginType,
    UserProfileType,
    UserSessionType,
    VideoType,
    DocumentType, CurrentChatMessageType, ApartmentHouseReviewType, MessageModel, OrganizationChangeType
} from "@typescript/interfaces";
import {payloadNullableChecker} from "@common/utils/helpers";

// Добавить сообщение

export const setMessageAction = (data: MessageModel) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_MESSAGE, payload: data});
    }
}

// Удалить сообщение

export const deleteMessageAction = (data: number) => {
    return (dispatch: DispatchType) => {
        dispatch({type: DELETE_MESSAGE, payload: data});
    }
}

// Состояние обновления (глобальное)

export const setGloballyUpdateStateAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_GLOBALLY_UPDATE_STATE, payload: data});
    }
}

// Показать/скрыть панель меню (sidebar)

export const setSidebarShowAction = () => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_SIDEBAR_SHOW});
    }
}

// Показать/скрыть панель уведомлении

export const setNotificationsShowAction = () => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_NOTIFICATIONS_SHOW});
    }
}

// Организации

export const setOrganizationsAction = (payload: OrganizationsType[] | []) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_ORGANIZATIONS, payload})
    }
}

// Состояние обновления организации

export const setOrganizationsUpdateStateAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_ORGANIZATIONS_UPDATE_STATE, payload: data});
    }
}

// Типы организации

export const setOrganizationsTypesAction = (payload: KeyType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_ORGANIZATIONS_TYPES, payload});
    }
}

// Тип организации для фильтра

export const setSearchOrganizationsTypeAction = (payload: string) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_SEARCH_ORGANIZATIONS_TYPE, payload});
    }
}

// Маркеры домов (карта)

export const setHousesInMapAction = (payload: ApartmentHouseType[] | []) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_ORGANIZATIONS_HOUSES_MAP, payload: payload});
    }
}


// Информация организации (карта)

export const setOrganizationInfoAction = (organization: OrganizationsApartmentsType | null, house: HouseType | null) => {
    return (dispatch: DispatchType) => {

        let data = {
            organization,
            house
        };

        if (organization == null && house == null) {
            return dispatch({type: SET_ORGANIZATION_INFO, payload: null});
        }

        return dispatch({type: SET_ORGANIZATION_INFO, payload: data});
    }
}

// Фильтрация маркеров домов (карта)

export const setFilteredHousesMapAction = (houses: ApartmentHouseType[], filters: string[]) => {
    return (dispatch: DispatchType) => {
        let data = houses.filter(house => {
            if (house.organization !== null) {
                let type = house.organization.type.name;
                return filters.includes(type);
            }
        });

        dispatch({type: SET_FILTERED_HOUSES_MAP, payload: data});

    }
}

// Организации (с информацией дома), список

export const setServiceOrganizationsAction = (data: ServiceOrganizationType[] | []) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_SERVICE_ORGANIZATIONS, payload: data});
    }
}

// Авторизация пользователя

export const userLoginAction = (data: UserLoginType) => {
    return (dispatch: DispatchType) => {
        let token = data.access_token;

        localStorage.setItem("token", token);

        dispatch({type: USER_LOGIN, payload: token});
    }
}

// Выход пользователя

export const userLogoutAction = () => {
    return (dispatch: DispatchType) => {
        try {
            localStorage.clear();
            dispatch({type: USER_LOGOUT})
        } catch (error) {
            console.log(error);
        }
    }
}


// Проверка, авторизован ли пользователь

export const authCheckAction = () => {
    return (dispatch: DispatchType) => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem("token") !== null) {
                dispatch({type: AUTH_CHECKER, payload: true});
            } else {
                dispatch({type: AUTH_CHECKER, payload: false});
            }
        }
    }
}

// Данные пользователя (session)

export const setSessionUserAction = (data: UserSessionType) => {
    return (dispatch: DispatchType) => {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({type: SET_SESSION_USER, payload: data});
    }
}

// Получение списка квартир

export const setApartmentUsersAction = (data: ApartmentUserType[] | []) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_USERS, payload: data});
    }
}

// Обновление состояния списка квартир

export const setApartmentUsersUpdateStateAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_USERS_UPDATE_STATE, payload: data});
    }
}

// "Жители" дома

export const setApartmentHouseUsersAction = (data: ApartmentHouseUserType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSE_USERS, payload: data});
    }
}

// "Правление" дома

export const setApartmentHouseSeniorsAction = (data: ApartmentHouseUserType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSE_SENIORS, payload: data});
    }
}

// "Персонал" дома

export const setApartmentHouseWorkersAction = (data: ApartmentHouseUserType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSE_WORKERS, payload: data});
    }
}

// Номер помещения для фильтра

export const setApartmentHouseFilterNumber = (data: string) => {
    return (dispatch: DispatchType) => {
        let payload = payloadNullableChecker(data);
        dispatch({type: SET_APARTMENT_HOUSE_FILTER_NUMBER, payload});
    }
}

// Получение профиля пользователя

export const setSessionUserProfileAction = (data: UserProfileType) => {
    return (dispatch: DispatchType) => {
        localStorage.setItem("profile", JSON.stringify(data));
        dispatch({type: SET_USER_PROFILE, payload: data});
    }
}

// ID квартиры пользователя

export const setApartmentIdAction = (data: number) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_ID, payload: data});
    }
}

// Новости каруселя (desktop)

export const setDesktopNewsAction = (data: NewsType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_NEWS, payload: data});
    }
}

// Задачи (desktop)

export const setDesktopTasksAction = (data: TaskType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_TASKS, payload: data});
    }
}

// Мои задачи (desktop)

export const setDesktopMyTasksAction = (data: TaskType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_MY_TASKS, payload: data});
    }
}

// Chats view (список чатов) - (chat)

export const setChatsViewAction = (data: ChatsViewType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_CHATS_VIEW, payload: data});
    }
}

// Информация текущего чата (chat)

export const setCurrentChatInfoAction = (data: CurrentChatType | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_CURRENT_CHAT_INFO, payload: data});
    }
}

// Выбранные сообщения текущего чата

export const setSelectedMessagesAction = (data: number | []) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_SELECTED_MESSAGES, payload: data});
    }
}

// Доступен скролл контейнера чата

export const setChatContentScrollAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_CHAT_CONTENT_SCROLL, payload: data});
    }
}

// Сообщение для ответа (локально)

export const setChatReplyMessageAction = (data: CurrentChatMessageType | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_CHAT_REPLY_MESSAGE, payload: data});
    }
}

// Список новостей (news)

export const setNewsListAction = (data: NewsType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_NEWS_LIST, payload: data});
    }
}

// ID текущей новости (news)

export const setNewsIdAction = (value: number | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_NEWS_ID, payload: value});
    }
}

// Текущая новость

export const setNewsDetailAction = (data: NewsType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_NEWS_DETAIL, payload: data});
    }
}

// Загрузить больше новостей

export const setMoreNewsAction = (data: NewsType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_MORE_NEWS, payload: data});
    }
}

// Список камер (video observing)

export const setCameraListAction = (data: VideoType[], stateVideo?: VideoType[]) => {
    return (dispatch: DispatchType) => {

        let payloadData = data;

        if (stateVideo) {
            payloadData = stateVideo.concat(payloadData);
        }

        dispatch({type: SET_CAMERAS_LIST, payload: payloadData});
    }
}

// Страница для загрузки больше элементов (video observing)

export const setCameraPageAction = (value: number) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_CAMERA_PAGE, payload: value});
    }
}

// Категория камер (video observing)

export const setCameraCategoryAction = (value: string) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_CAMERA_CATEGORY, payload: value});
    }
}

// Категории камер

export const setCameraCategoriesAction = (data?: any) => {
    return (dispatch: DispatchType) => {
        let allCategory = ["Все камеры"];
        let categories = allCategory.concat(data);
        dispatch({type: SET_CAMERA_CATEGORIES, payload: categories});
    }
}

// Показания приборов учета

export const setMetersAction = (data: MetersType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_METERS_LIST, payload: data});
    }
}

// Список показании (история показаний)

export const setMetersRecordsAction = (data: MeterRecordType[] | []) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_METERS_RECORDS, payload: data});
    }
}

// Типы для фильтрации

export const setMetersFilterTypeAction = (data: string[] | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_METERS_FILTER_TYPE, payload: data});
    }
}

// Список моих задач (tasks)

export const setMyTasksListAction = (data: TaskPayloadType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_MY_TASKS_LIST, payload: data});
    }
}

// Количество задач

export const setTasksCountAction = (count: number, type: "all" | "local") => {
    return (dispatch: DispatchType) => {

        let payload = {
          count,
          type
        };

        dispatch({type: SET_LIST_COUNT, payload});
    }
}

// Список задач (tasks)

export const setTasksListAction = (data: TaskPayloadType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_TASKS_LIST, payload: data});
    }
}

// ID задачи для поиска (tasks)

export const setSearchTaskQueryAction = (data: string | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_SEARCH_TASK_QUERY, payload: data});
    }
}

// Статус задачи для поиска (tasks)

export const setSearchTaskStatusAction = (data: string | null) => {
    return (dispatch: DispatchType) => {
        let payload = payloadNullableChecker(data);
        dispatch({type: SET_SEARCH_TASK_STATUS, payload: payload});
    }
}

// Дата подача заявки для поиска (tasks)

export const setSearchTaskDateAction = (data: string) => {
    return (dispatch: DispatchType) => {
        let payload = payloadNullableChecker(data);
        dispatch({type: SET_SEARCH_TASK_DATE, payload: payload});
    }
}

// Срочность заявки для поиска (tasks)

export const setSearchTaskUrgentlyAction = (data: string | null) => {
    return (dispatch: DispatchType) => {
        let payload: boolean | null = data == "true";

        if (data == null) {
            payload = null;
        }

        dispatch({type: SET_SEARCH_TASK_URGENTLY, payload});
    }
}

// Конкретная задача (task detail) (tasks)

export const setTaskAction = (data: TaskType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_TASK, payload: data});
    }
}

// Список история показаний

export const setTaskLogsAction = (data: TaskLogType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_TASK_LOGS, payload: data});
    }
}

// ID квартиры (apartment_house) для запроса задач этого дома

export const setTasksApartmentHouseIdAction = (id: number) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSE_ID, payload: id});
    }
}

// Список текущих голосований (polls)

export const setCurrentPollsAction = (data: PollListType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_CURRENT_POLLS, payload: data});
    }
}

// Список завершенных голосований (polls)

export const setPastPollsAction = (data: PollListType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_PAST_POLLS, payload: data});
    }
}

// Дата создания голосований для поиска (polls)

export const setCreationDatePollsAction = (data: string | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_SEARCH_POLL_DATE, payload: data});
    }
}

// Тип голосований для поиска (polls)

export const setTypePollsAction = (data: string | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_SEARCH_POLL_TYPE, payload: data});
    }
}

// Query (тема голосовании) для поиска (polls)

export const setQueryPollsAction = (data: string) => {
    return (dispatch: DispatchType) => {
        let payload = payloadNullableChecker(data);
        dispatch({type: SET_SEARCH_POLL_QUERY, payload});
    }
}

// Одно голосование (отдельное голосование - страница) (polls)

export const setPollOneAction = (data: PollType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_POLL_ONE, payload: data});
    }
}

// Обновление одного голосования (очередной запрос)

export const setPollOneUpdateStateAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_POLL_ONE_UPDATE_STATE, payload: data});
    }
}

// Обновить список голосований

export const setPollsUpdateStateAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_POLLS_UPDATE_STATE, payload: data});
    }
}

// Список домов (apartment houses)

export const setApartmentsAction = (data: ApartmentType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSES, payload: data});
    }
}

// Основная информация дома (apartment houses)

export const setApartmentInfoAction = (data: ApartmentOneType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSE_INFO, payload: data});
    }
}

// Список городов с координатами

export const setLocalityAction = (data: LocalityType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_LOCALITY, payload: data});
    }
}

// Активный город с координатами

export const setActiveLocalityAction = (data: LocalityType | null) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_ACTIVE_LOCALITY, payload: data});
    }
}

// Отзывы обслуживающей организации дома (apartment house)

export const setApartmentOrganizationReviewsAction = (data: OrganizationReviewType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSE_ORGANIZATION_REVIEWS, payload: data});
    }
}

// Информация одного дома (map)

export const setApartmentHouseOneAction = (data: ApartmentOneType) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_APARTMENT_HOUSE_ONE, payload: data});
    }
}

// Отзывы обслуживающей организации, дома

export const setApartmentHouseReviewsAction = (data: ApartmentHouseReviewType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_HOUSE_ORGANIZATION_REVIEWS, payload: data});
    }
}

// История изменений обслуживающих организации дома

export const setApartmentHouseOrganizationChangesAction = (data: OrganizationChangeType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_HOUSE_ORGANIZATION_CHANGES, payload: data});
    }
}

// Отзывы обслуживающей организации, дома, локального юзера

export const setApartmentHouseUserReviewsAction = (data: OrganizationReviewType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_HOUSE_ORGANIZATION_USER_REVIEWS, payload: data});
    }
}

// Статус обновления отзывов (после добавления нового)

export const setUpdateStateHouseReviewsAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_UPDATE_REVIEWS, payload: data});
    }
}

// Город, для фильтров (apartments)

export const setApartmentsCityFilter = (data: string) => {
    return (dispatch: DispatchType) => {
        let payload = payloadNullableChecker(data);
        dispatch({type: SET_APARTMENT_FILTER_CITY, payload});
    }
}

// Список документов

export const setDocumentsAction = (data: DocumentType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_DOCUMENTS, payload: data});
    }
}

// Типы документов (для чего предназначены)

export const setDocumentsTypesAction = (data: KeyType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_DOCUMENTS_TYPES, payload: data});
    }
}

// Список доступов (target_groups)

export const setDocumentsTargetGroupsAction = (data: KeyType[]) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_DOCUMENTS_TARGET_GROUPS_TYPES, payload: data});
    }
}

// Состояние обновления документов

export const setDocumentsUpdateStateAction = (data: boolean) => {
    return (dispatch: DispatchType) => {
        dispatch({type: SET_DOCUMENTS_UPDATE_STATE, payload: data});
    }
}