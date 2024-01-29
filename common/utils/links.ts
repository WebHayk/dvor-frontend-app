export const links = {
    all: [
        {
            icon: "/images/organizations-icon.svg",
            label: "Организации",
            href: "/organizations"
        },
        {
            icon: "/images/houses-in-map-icon.svg",
            label: "Дома на карте",
            href: "/"
        }
    ],
    is_verified: [
        {
            icon: "/images/building-icon.svg",
            label: "Рабочий стол",
            href: "/desktop",
            roles: ["resident", "spokesman", "owner", "senior"]
        },
        {
            icon: "/images/news-icon.svg",
            label: "Новости",
            href: "/news",
            roles: ["agent", "resident", "owner", "spokesman", "operator"]
        },
        {
            icon: "/images/tasks-icon.svg",
            label: "Задачи",
            href: "/tasks",
            roles: ["operator", "agent", "senior", "resident", "spokesman", "owner"]
        },
        {
            icon: "/images/data-counters-icon.svg",
            label: "Показания счетчиков",
            href: "/meters",
            roles: ["resident", "operator", "owner", "spokesman"]
        },
        {
            icon: "/images/video-observe-icon.svg",
            label: "Видеонаблюдение",
            href: "/video-observing",
            roles: ["resident", "owner", "spokesman", "operator"]
        },
        {
            icon: "/images/voting-icon.svg",
            label: "Голосования",
            href: "/polls",
            roles: ["resident", "owner", "spokesman", "operator"]
        },
        {
            icon: "/images/documents-icon.svg",
            label: "Документы",
            href: "/documents",
            roles: ["resident", "owner", "spokesman", "operator"]
        },
        {
            icon: "/images/bank-icon.svg",
            label: "Банк",
            href: "/bank",
            roles: ["senior"]
        },
        {
            icon: "/images/settings-icon.svg",
            label: "Настройки",
            href: "/desktop/settings",
            roles: ["resident", "owner", "spokesman", "senior"]
        }
    ],
    not_verified: [
        {
            icon: "/images/building-icon.svg",
            label: "Рабочий стол",
            href: "/desktop",
            roles: ["resident", "spokesman", "owner", "senior"]
        },
        {
            icon: "/images/data-counters-icon.svg",
            label: "Показания счетчиков",
            href: "/meters",
            roles: ["resident", "operator", "owner", "spokesman"]
        },
        {
            icon: "/images/settings-icon.svg",
            label: "Настройки",
            href: "/desktop/settings",
            roles: ["resident", "owner", "spokesman", "senior"]
        }
    ]
};
