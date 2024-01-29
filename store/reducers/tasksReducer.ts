import {ActionType} from "@typescript/interfaces";
import {TaskReducerType} from "@typescript/interfaces/reducers/TaskReducerType";
import {
    SET_APARTMENT_HOUSE_ID, SET_LIST_COUNT,
    SET_MY_TASKS_LIST,
    SET_SEARCH_TASK_DATE,
    SET_SEARCH_TASK_QUERY,
    SET_SEARCH_TASK_STATUS, SET_SEARCH_TASK_URGENTLY,
    SET_TASK,
    SET_TASK_LOGS,
    SET_TASKS_LIST
} from "@store/actions/actionTypes";

const initialState: TaskReducerType = {
    tasks: {
        apartmentHouseId: null,
        all: {
            count: 0,
            data: []
        },
        local: {
            count: 0,
            data: []
        },
        filters: {
            status: null,
            creationDate: null,
            query: null,
            urgently: null
        }
    },
    task: {
        data: null,
        logs: []
    }
};

export const tasksReducer = (state= initialState, action: ActionType) => {
    let data = action.payload;

    switch (action.type) {
        case SET_TASKS_LIST: // Список задач с общим количеством задач
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    all: {
                        ...state.tasks.all,
                        data
                    }
                }
            }
        case SET_MY_TASKS_LIST: // Список задач локального юзера с общим количеством
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    local: {
                        ...state.tasks.local,
                        data
                    }
                }
            }
        case SET_LIST_COUNT: // Количество задач
            let {type, count} = data;

            if (type == "all") {
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        all: {
                            ...state.tasks.all,
                            count
                        }
                    }
                }
            } else {
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        local: {
                            ...state.tasks.local,
                            count
                        }
                    }
                }
            }
        case SET_SEARCH_TASK_QUERY: // Номер для поиска (id task)
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    filters: {
                        ...state.tasks.filters,
                        query: data
                    }
                }
            }
        case SET_SEARCH_TASK_STATUS: // Статус задачи для поиска
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    filters: {
                        ...state.tasks.filters,
                        status: data
                    }
                }
            }
        case SET_SEARCH_TASK_URGENTLY: // Срочность заявки для поиска
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    filters: {
                        ...state.tasks.filters,
                        urgently: data
                    }
                }
            }
        case SET_SEARCH_TASK_DATE: // Дата создания заявки для поиска
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    filters: {
                        ...state.tasks.filters,
                        creationDate: data
                    }
                }
            }
        case SET_TASK: // Детальная задача (один таск)
            return {
                ...state,
                task: {
                    ...state.task,
                    data
                }
            }
        case SET_APARTMENT_HOUSE_ID: // ID квартиры (apartment_house) для запроса для задач этого дома
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    apartmentHouseId: data
                }
            }
        case SET_TASK_LOGS: // Список истории изменений
            return {
                ...state,
                task: {
                    ...state.task,
                    logs: data
                }
            }
        default:
            return state
    }
}