import {NewsType, TaskType} from "@typescript/interfaces";

export interface DesktopReducerType {
    id: number | null,
    news: NewsType[] | [],
    tasks: TaskType[] | [],
    myTasks: TaskType[] | []
}