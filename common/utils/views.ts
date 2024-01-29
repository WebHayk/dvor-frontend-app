export const addHiddenStyle = () => {
    let HTMLElement = document.getElementById("next__page");
    if (HTMLElement !== null) HTMLElement.classList.add("hidden");
}

export const removeHiddenStyle = () => {
    let HTMLElement = document.getElementById("next__page");
    if (HTMLElement !== null) HTMLElement.classList.remove("hidden");
}

export const VERIFICATION_ITEMS = [
    "Наведите фокус, если камера не фокусируется.",
    "Удерживайте камеру параллельно паспорту.",
    "Отключите фотовспышку - при ее срабатывании паспорт может засвечиваться.",
    "Расположите паспорт так, чтобы он был равномерно и хорошо освещён. Лучше делать фото при естественном дневном свете.",
    "Фотографируйте паспорт при ровном освещении, чтобы в кадре не было бликов.",
    "Убедитесь, что вся информация четко видна."
];