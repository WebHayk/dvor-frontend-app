import {NewsType} from "@typescript/interfaces";

export interface NewsReducerType {
    news: NewsType[],
    newsId: null,
    newsDetail: NewsType | null
}