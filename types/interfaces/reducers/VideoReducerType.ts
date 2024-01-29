import {VideoType} from "@typescript/interfaces";

export interface VideoReducerType {
    videoList: VideoType[],
    page: number,
    category: "Все камеры" | "Парковка" | "Подъезды" | "Въезды" | "Прочие",
    categories: string[]
}