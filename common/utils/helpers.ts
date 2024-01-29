import React, {Dispatch, SetStateAction} from "react";
import {ASSETS_BASE_URL, COLORS, MONTH_NAMES} from "@common/utils/options";
import {ChatProfileType,PositionType, StarType} from "@typescript/interfaces";
import {requestsService} from "@services/requestsService";

export const dateFormatterHelper = (date: string) => new Date(date).toLocaleDateString("ru-RU");

export const dateToTimeHelper = (date: string) => {
    let dateObject = new Date(date);

    let hoursValue = dateObject.getHours();
    let minutesValue = dateObject.getMinutes();

    let hours = hoursValue <= 9 ? `0${hoursValue}` : hoursValue;
    let minutes = minutesValue <= 9 ? `0${minutesValue}` : minutesValue;

    return `${hours}:${minutes}`;
}

export const dateDayCheckHelper = (date: string) => {

    let dateTimestamp = new Date(date).getTime() / 1000;
    let currentDateTimestamp = new Date().getTime() / 1000;
    let halfDayTimestamp = 43200;

    if (currentDateTimestamp - dateTimestamp <= halfDayTimestamp) {
        return dateToTimeHelper(date);
    } else {
        return `${dateFormatterHelper(date)} ${dateToTimeHelper(date)}`;
    }
}

export const checkWebSocketSupport = () => {
    if (typeof window !== "undefined") {
        return typeof WebSocket != 'undefined' || !!window.WebSocket && window.WebSocket.prototype.send;
    }
}

export const calculateConsumptionHelper = (currentMonthRecords: number | null, lastMonthRecords: number | null) => {

    let data = {
        consumption: 0,
        decreased: false,
        percent: 0
    };

    if (currentMonthRecords !== null && lastMonthRecords !== null) {

        if (lastMonthRecords - currentMonthRecords > 0) { // Снизилась
            data.consumption = lastMonthRecords - currentMonthRecords;
            data.decreased = true;
            data.percent = Math.round((data.consumption / lastMonthRecords) * 100);

            return data;
        }

        if (currentMonthRecords - lastMonthRecords > 0) { // Повысилась
            data.consumption = currentMonthRecords - lastMonthRecords;
            data.decreased = false;
            data.percent = Math.round((data.consumption / currentMonthRecords) * 100);

            return data;
        }

        if (lastMonthRecords == currentMonthRecords) { // Не изменились данные
            data.consumption = currentMonthRecords - lastMonthRecords;
            data.decreased = false;
            data.percent = 0;

            return data;
        }
    }

    if (currentMonthRecords && !lastMonthRecords) { // Первый месяц показании
        data.consumption = currentMonthRecords;
        data.decreased = false;
        data.percent = 100;

        return data;
    }

    return data;
}

export const onlyNumbersContentHelper = (value: string) => {
    const re = /^[0-9\b]+$/;

    if (value == "" || re.test(value)) {
        return true;
    }
}

export const taskStatusFormatterHelper = (key: string) => {
    switch (key) {
        case "new":
            return "Новая"
        case "open":
            return "На рассмотрении"
        case "closed_succesful":
            return "Закрыто"
        case "in_progress":
            return "В работе"
        case "postponed":
            return "Отложено"
        case "canceled":
            return "Отменено"
    }
}

export const dateToFormattedHelper = (date: string | Date, format: string) => {
    let dateObj = new Date(date);

    let year = dateObj.getFullYear();
    let month: any = dateObj.getMonth() + 1;
    month = ('0' + month).slice(-2);
    let day: any = dateObj.getDate();
    day = ('0' + day).slice(-2);

    switch (format) {
        case "yyyy/mm/dd":
            return `${year}/${month}/${day}`;
        case "dd/mm/yyyy":
            return `${day}/${month}/${year}`;
        default:
            return `${day}/${month}/${year}`;
    }
}

export const pollTypeNameHelper = (type: string) => {
    switch (type) {
        case "one_of_many":
            return "Один из многих ответов"
        case "some_of_many":
            return "Несколько из многих ответов"
        case "rating":
            return "Оценка"
        default:
            return "Неизвестно"
    }
}

export const meterTypeNameHelper = (type: string) => {
    switch (type) {
        case "cold_water":
            return "Холодная вода"
        case "hot_water":
            return "Горячая вода"
        case "electricity_day":
            return "Электропотребление - День"
        case "electricity_night":
            return "Электропотребление - Ночь"
        case "gas":
            return "Газоснабжение"
        default:
            return "Отопление"
    }
}

export const pollDurationCalculateHelper = (endDate: string) => {

    let startDateObj = new Date().setHours(0) / 1000;
    let endDateObj = new Date(endDate).setHours(0) / 1000;

    let difference = endDateObj - startDateObj;

    return Math.round((difference) / 86400);
}

export const organizationTypeHelper = (key: string) => {
    switch (key) {
        case "tsj":
            return "ТСЖ"
        case "uk":
            return "УК"
        case "kp":
            return "КП"
        default:
            return "Неизвестно"
    }
}

export const organizationRatingHelper = (response: any, setOrganizationRatingAction: any) => {
    let data = response.data.apartment_houses_by_pk;
    let rating = data.organization;
    setOrganizationRatingAction(rating);
}

export const dateToTextStringHelper = (date: string) => {
    let dateObj = new Date(date);

    let monthValue = dateObj.getMonth();
    let month = MONTH_NAMES[monthValue];

    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;

}

function dec2hex(dec: number) {
    return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
export function generateId(len: number) {
    let arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}

export const chatProfileImageHelper = (type_key: string, organization: any, private_user: ChatProfileType | null) => {
    if (type_key == "organization" && organization !== null) {
        return ASSETS_BASE_URL + organization.logotype_path;
    } else if (type_key == "apartment_house") {
        return "/images/home-icon.svg";
    } else if (type_key == "task") {
        return "/images/operator-chat-icon.svg";
    } else if (type_key == "private") {
        if (private_user) {
            let avatar = private_user.profile.avatar;

            if (avatar) {
                return ASSETS_BASE_URL + avatar;
            } else {
                return "/images/profile-empty-icon.svg";
            }
        }
    }
}

const starsColorDetector = (rating: number) => {
    if (rating > 4) {
        return COLORS.GREEN;
    } else if (rating > 3 && rating <= 4) {
        return COLORS.BLUE;
    } else if (rating > 2 && rating <= 3) {
        return COLORS.YELLOW;
    } else if (rating > 1 && rating <= 2) {
        return COLORS.ORANGE;
    } else {
        return COLORS.RED;
    }
}

const createStarsList = (
    filledHalfStar: number | null,
    roundedRating: number,
    emptyStars: number | null,
    rating: number,
    setStars: React.Dispatch<SetStateAction<StarType[]>>
) => {

    let activeColor = starsColorDetector(rating);

    for (let i = 0; i < roundedRating; i++) {
        let star = {
            offset: 100,
            activeColor
        };

        setStars(prevState => [...prevState, star]);
    }

    if (filledHalfStar) {
        let halfStar = {
            offset: filledHalfStar,
            activeColor
        };

        setStars(prevState => [...prevState, halfStar]);
    }

    if (emptyStars) {
        for (let i = 0; i < emptyStars; i++) {
            let emptyStar = {
                offset: 100,
                activeColor: null
            };

            setStars(prevState => [...prevState, emptyStar]);
        }
    }
}

export const initRatingHandler = (rating: number, setStars: React.Dispatch<SetStateAction<StarType[]>>) => {

    setStars([]);

    let starsMaxCount = 5;

    if (rating != 0) {
        let decimals = rating - Math.floor(rating);
        let emptyStarsMath = Math.floor(starsMaxCount - rating);
        let emptyStars = emptyStarsMath > 0 ? emptyStarsMath : null;

        if (decimals != 0.0) {
            let filledHalfStar = Math.round(decimals * 100);
            let roundedRating = Math.round(rating - decimals);
            createStarsList(filledHalfStar, roundedRating, emptyStars, rating, setStars);
        } else {
            createStarsList(null, rating, emptyStars, rating, setStars);
        }
    } else {
        for (let i = 0; i < starsMaxCount; i++) {
            let star = {
                activeColor: null,
                offset: 100
            };

            setStars(prevState => [...prevState, star]);
        }
    }
}

const createOnlineInterval = () => {
    return setInterval(() => {
        requestsService.userOnline();
    }, 10000);
}

export const userOnlineInterval = () => {

    let isOnlineInterval: any = createOnlineInterval();

    let hidden: string | undefined;
    let visibilityChange: string | undefined;
    let documentContext: any = document;

    if (typeof documentContext.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof documentContext.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof documentContext.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if (hidden) {
            if (documentContext[hidden]) {
                clearInterval(isOnlineInterval);
            } else {
                isOnlineInterval = createOnlineInterval();
            }
        }
    }

    if (typeof document.addEventListener === "undefined" || hidden === undefined) {
        console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
        document.addEventListener(visibilityChange as string, handleVisibilityChange, false);
    }

}

export const lastSeenHelper = (last_seen: string, setLastSeen: React.Dispatch<string>) => {
    let time = dateToTimeHelper(last_seen);
    let date = dateFormatterHelper(last_seen);

    let dateNow = new Date().getTime() / 1000;
    let lastSeenDate = new Date(last_seen).getTime() / 1000;

    if (dateNow - lastSeenDate < 86400) {
        setLastSeen(`Был в сети: сегодня ${time}`);
    } else {
        setLastSeen(`Был в сети: ${date} ${time}`);
    }
}

export function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const documentIconDetectorHelper = (documentPath: string) => {
    let index = documentPath.indexOf(".") + 1;
    let path = documentPath.substring(index, documentPath.length);

    if (path == "pdf") {
        return "/images/pdf-icon.svg";
    } else if (path == "doc" || path == "docx") {
        return "/images/doc-icon.svg";
    } else if (path == "xml") {
        return "/images/xml-icon.svg";
    } else {
        return "/images/pdf-icon.svg";
    }
}

export const getRandomFloat = (min: number, max: number, decimals: number) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

export const payloadNullableChecker = (data: any) => {
    if (!data) {
        return null;
    }

    return data;
}

export const contextMenuInitHelper = <T>(
    event: React.MouseEvent<T>,
    setIsShow: Dispatch<boolean>,
    setPosition: Dispatch<PositionType>
) => {
    let {pageX, pageY} = event;

    setIsShow(false);

    const newPosition = {
        x: pageX,
        y: pageY,
    };

    setPosition(newPosition);
    setIsShow(true);
}

export const stringNumberConcatHelper = (value: number, concatValue: string) => value + concatValue;

export const chatNameDetectorHelper = (private_user: ChatProfileType, name: string) => {
    if (private_user) {
        return `${private_user.profile.name} ${private_user.profile.last_name}`;
    } else {
        return name;
    }
}

export const replaceWithRegexp = (value: string, regexp: RegExp | string, replaceValue: any) => {
    return value.replace(regexp, replaceValue);
}

export const replaceAllWithRegexp = (value: string, regexp: RegExp | string, replaceValue: any) => {
    return value.replaceAll(regexp, replaceValue);
}

export const organizationIconDetector = (logo: string | null) => {
    if (logo) {
        return ASSETS_BASE_URL + logo;
    }

    return "/images/empty-organization-icon.svg";
}