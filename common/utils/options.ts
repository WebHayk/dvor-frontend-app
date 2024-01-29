export const CHARGING_OPTIONS_LIST = [
    "Сумма всех услуг по квитанции",
    "Другое значение"
];

export const IMAGE_ACCEPT = "image/x-png,image/gif,image/jpeg";
export const FILES_ACCEPT = ".pdf, .doc, .xml, .txt";
export const ASSETS_BASE_URL = process.env.NEXT_PUBLIC_ASSETS_BASE_URL;
export const BREAK_LINE_REGEXP = /\r|\n/;
export const LINE_REGEXP = /\n/g;
export const TASK_CRITICALITY_LIST = ["Высокая", "Низкая"];

export const MONTH_NAMES = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

export const COLORS = {
    YELLOW: "#FFCE00",
    GREEN: "#00B67A",
    BLUE: "#73CF11",
    ORANGE: "#FF8622",
    RED: "#FF3722"
};

export const URGENTLY_LIST = [
    {
        key: true,
        name: "Срочная"
    },
    {
        key: false,
        name: "Обычная"
    }
];

export const RATING_INITIAL_STATE = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
};

// MOCK DATA
export const EXPENSES_LABELS = ['Содержание жилья', 'Электропотребление - день', 'Лифты', 'Вода', 'Вывоз мусора', 'Отопление'];
export const EXPENSES_COLORS = [
    'rgba(3, 189, 91)',
    'rgba(208, 2, 27)',
    'rgba(80, 227, 194)',
    'rgba(31, 112, 243)',
    'rgba(26, 45, 78)',
    'rgba(245, 166, 35)',
];
export const EXPENSES_DATA = [35, 15, 25, 5, 5, 15];