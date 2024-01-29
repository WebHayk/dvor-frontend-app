import React, {SetStateAction} from "react";

export interface ActionType {
    type: string,
    payload?: any
}

export interface ImageType {
    image: string,
    id: number
}

export interface FileType {
    file: File,
    id: number
}

export interface ImagesUploadType {
    title: string,
    files: FileType[],
    setFiles: React.Dispatch<SetStateAction<FileType[]>>,
    imagesList?: ImageType[],
    maxLength?: number
}

export interface DocumentType {
    apartment_house_id: number,
    document_name: string,
    id: number,
    path: string,
    owner_id: number,
    type: KeyType,
    target_group: KeyType,
    created_at: string
}

export interface PositionType {
    x: number,
    y: number
}

export interface FileUploadType {
    file: File,
    image: string
}

export interface OrganizationsType {
    id: number,
    email: string | null,
    name: string,
    note: string | null,
    logotype_path: string,
    legal_address: string,
    inn: string | null,
    created_at: string,
    description: string | null,
    website: string | null,
    service_email: string | null,
    reviews_count: number | null,
    rating: number,
    phone_number: string | null,
    type: {
        name: string
    },
    documents: DocumentType[],
    reviews: OrganizationReviewType[]
}

export interface ApartmentHouseType {
    id: number,
    lon: string,
    lat: string,
    organization: {
        id: number,
        type: {
            name: string
        }
    }
}

export interface OrganizationsApartmentsType {
    type: {
        "name": string
    },
    rating: number | null,
    phone_number: string | null,
    website: string | null,
    email: string | null,
    id: number,
    reviews_count: number | null,
    logotype_path: string | null,
    name: string
}

export interface HouseType {
    formatted: string | null,
    id: number,
    users_count: number | null
}

export interface HousesInMapType {
    organization: OrganizationsApartmentsType,
    house: HouseType
}

export interface UserLoginType {
    access_token: string
}

export interface RegistrationControlType {
    phone_number: string,
    first_name: string,
    last_name: string,
    password: string,
    password_repeat: string,
    gender: string
}

export interface UserSessionType {
    id: string,
    user_id: number,
    role: {
        key: string,
        name: string
    },
    apartment_user: {
        id: number,
        is_verified: boolean,
        role: {
            key: string,
            name: string
        },
        docs: string[],
        apartment: {
            id: number,
            apartment_number: string,
            apartment_house: {
                id: number,
                lat: string,
                lon: string,
                thoroughfare_name: string,
                premise_number: string,
                organization_id: number,
                organization: {
                    name: string,
                    rating: number | null,
                    reviews_count: number | null,
                    logotype_path: string | null,
                    type: {
                        name: string
                    },
                    work_schedule: {
                        start_time: string,
                        end_time: string
                    }
                }
            }
        }
    }
}

export interface UserProfileType {
    avatar: string,
    created_at: string,
    gender: string,
    id: number,
    last_name: string,
    mail: string,
    name: string,
    nickname: string,
    phone_number: string,
    user: {
        is_verified: boolean
    }
}

export interface ApartmentUserType {
    id: number,
    is_verified: boolean,
    docs: string[],
    apartment: {
        id: number,
        apartment_number: string | null,
        apartment_house: {
            id: number,
            lon: string,
            lat: string,
            thoroughfare_name: string,
            premise_number: string
        }
    }
}

export interface NewsType {
    apartment_house_id: number,
    created_at: string,
    description: string,
    id: number,
    image_path: string,
    title: string
}

export interface TaskTagType {
    tag: {
        name: string,
        id: number
    }
}

interface TaskChatType {
    id: number,
    name: string,
    chat_type: {
        key: string,
        name: string
    },
    organization: {
        name: string
    } | null,
    private_user: {
        user: {
            is_online: boolean,
            is_verified: boolean
        }
    } | null
}

export interface TaskType {
    theme: string,
    operator_id?: number | null,
    apartment_id?: number,
    id: number,
    owner_images?: string[]
    urgently: boolean | string,
    owner_id?: number,
    rating?: number,
    entrance_number?: string,
    floor_number?: string,
    description?: string,
    worker_user_images?: string[],
    task_status: {
        key: string,
        name: string
    },
    tags: TaskTagType[],
    created_at: string,
    task_type?: {
        key: string,
        name: string
    },
    operator_user_chat?: TaskChatType | null,
    worker_user_chat?: TaskChatType | null,
    owner?: {
        profile: {
            last_name: string,
            name: string
        },
        phone_number: string
    },
    apartment_house: {
        thoroughfare_name?: string,
        premise_number?: string,
        id: number,
        lat?: string,
        lon?: string,
        formatted?: string
    } | null,
    worker?: {
        name: string
    } | null
}

export interface TaskLogType {
    id: number,
    event_message: string,
    created_at: string
}

export interface MessageViewType {
    content: string,
    id: number,
    created_at: string,
    is_readed: boolean
}

export interface ChatsViewType {
    created_at: string,
    id: number,
    name: string,
    unreaded_messages_count: number,
    draft: {
        content: string
    },
    chat_type: {
        key: string,
        name: string
    },
    organization: {
        logotype_path: string
    } | null,
    chat_messages_view: MessageViewType[],
    private_user: ChatProfileType,
    owner: {
        last_seen: string,
        is_online: boolean
    }
}

export interface CurrentChatType {
    id: number,
    chat_type: {
        key: string,
        name: string
    },
    name: string,
    organization: {
        logotype_path: string
    } | null,
    private_user: ChatProfileType | null,
    draft: {
        content: string
    } | null
}

export interface CurrentChatMessageType {
    attachments: string[],
    content: string,
    created_at: string,
    is_readed: boolean,
    user_id: number,
    id: number,
    reply_to: {
        attachments: string[],
        content: string,
        id: number,
        user: {
            profile: {
                name: string
            }
        }
    } | null,
    user: {
        profile: {
            avatar: string | null,
            last_name: string,
            name: string
        }
    }
}

export interface VideoType {
    category: {
        id: number,
        name: string
    }
    id: number
    path_to_stream: string,
    sort: number
}

interface RecordType {
    id: number,
    meter_id?: number,
    value: number
}

export interface MetersType {
    description: string,
    id: number,
    number: string,
    records: RecordType[],
    images: string[],
    type: {
        key: string,
        name: string
    }
}

export interface MeterRecordType {
    value: number,
    created_at: string,
    created_date: string,
    meter: {
        id: number,
        number: string,
        records: RecordType[],
        description: string,
        type: {
            key: string,
            name: string
        }
    }
}

export interface KeyType {
    key: string,
    name: string
}

export interface IndicationType {
    value: number,
    meter_id: number
}

export interface PollListType {
    theme: string,
    content: string,
    start_date: string,
    end_date: string,
    id: number
}

export interface DatasetType {
    data: number,
    label: string,
    backgroundColor: string,
}

export interface PollItemType {
    id?: number | string,
    text: string,
    image: string,
    votes?: { id: number }[]
}

export interface PollOptionType {
    option: PollItemType
}

export interface PollVoteType {
    created_at: string,
    comment: string,
    rate: number,
    options: PollOptionType[],
    user: {
        id: number,
        profile: {
            last_name: string,
            name: string,
            avatar: string | null
        }
    }
}

export interface PollType {
    is_finished: boolean,
    options: PollItemType[],
    content: string,
    apartment_house_id: number,
    end_date: string,
    id: number,
    notes: string,
    images: string[],
    start_date: string,
    theme: string,
    question_type_key: string,
    apartment_house: {
        users_count: number
    },
    owner: {
        profile: {
            avatar: string,
            last_name: string,
            name: string
        }
    },
    votes: PollVoteType[],
    is_vote_changeable: boolean,
    is_anonymous: boolean
}

export interface AvatarType {
    image: string,
    file: File | null
}

export interface ApartmentType {
    id: number,
    users_count: number,
    note: string,
    premise_number: string,
    thoroughfare_name: string,
    locality: {
        name: string
    },
    organization: {
        logotype_path: string,
        name: string
    }
}

export interface ApartmentOneType {
    cadastral: string | null,
    formatted: string,
    id: number,
    lat: number,
    lon: number,
    note: string | null,
    users_count: number,
    premise_number: string,
    thoroughfare_name: string,
    organization: {
        rating: number,
        reviews_count: number,
        email: string,
        name: string,
        logotype_path: string | null,
        id: number,
        legal_address: string,
        phone_number: string,
        website: string,
        type: {
            name: string
        }
    }
}

export interface OrganizationChangeType {
    id: number,
    end_date: string | null,
    start_date: string,
    organization: {
        logotype_path: string | null,
        name: string
    }
}

export interface OrganizationReviewType {
    rating: number,
    created_at: string,
    images: string[],
    review: string,
    id: number,
    user_id: number,
    user_profile_view: {
        avatar: string | null,
        last_name: string,
        name: string
    },
    user: {
        is_verified: boolean,
        profile: {
            nickname: string
        }
    },
    organization_id: number
}

export interface ServiceOrganizationType {
    organization: {
        type: {
            name: string
        },
        name: string,
        rating: number,
        logotype_path: string,
        reviews_count: number
    },
    thoroughfare_name: string,
    premise_number: string,
    id: number,
    locality: {
        name: string
    }
}

export interface ReviewFormType {
    rating: number,
    review: string,
    images: string[]
}

export interface OrganizationUpdateInfoType {
    rating: number,
    reviews_count: number
}

export interface LocalityType {
    lat: string,
    lon: string,
    name: string
}

export interface TabParentType {
    currentTabProp?: number,
    setCurrentTabProp?: React.Dispatch<number>
}

export interface ApartmentHouseUserType {
    user: {
        profile: {
            last_name: string,
            name: string
        }
    },
    apartment: {
        apartment_number: string
    }
}

export interface VerificationFormType {
    role_key: string
}

export interface StarType {
    offset: number,
    activeColor: string | null
}

export interface ChatUserType {
    user: {
        id: number,
        is_verified: boolean,
        is_online: boolean,
        last_seen: string,
        profile: {
            avatar: string,
            name: string,
            last_name: string
        }
    }
}

export interface ChatProfileType {
    profile: {
        avatar: string,
        last_name: string,
        name: string
    },
    user: {
        is_online: boolean,
        last_seen: string,
        is_verified: boolean
    }
}

export interface TaskPayloadType {
    count: number,
    tasks: TaskType[]
}

export interface NotificationType {
    body: string,
    created_at: string,
    id: number,
    link: string,
    title: string
}

export interface PollRatingType {
    [key: number]: number
}

export interface OrganizationOperatorType {
    user: {
        profile: {
            avatar: string | null
        }
        is_online: boolean,
        last_seen: string
    },
    name: string
}

export interface ApartmentHouseReviewType {
    apartment_house_id: number,
    created_at: string,
    id: number,
    images: string[] | null,
    is_archive: boolean,
    is_hided_user_info: boolean,
    rating: number,
    review: string,
    user_info: {
        profile: {
            last_name: string,
            name: string,
            avatar: string | null,
            nickname: string | null,
            user: {
                is_verified: boolean
            }
        }
    },
    user_id: number,
    organization_reply: string | null,
    organization_reply_at: string,
    organization_change: {
        organization: {
            logotype_path: string | null,
            name: string
        }
    },
    owner_images: string[]
}

export interface ReviewType {
    created_at: string,
    avatar: string | null,
    firstName: string,
    lastName: string,
    nickName: string | null,
    rating: number,
    review: string,
    isVerified: boolean,
    organizationReply: string | null,
    images: string[] | null,
    isHidedUserInfo?: boolean,
    ownerId?: number
}

export interface ReviewAnswerType {
    organizationReply: string | null,
    createdAt: string
}

export interface MessageModel {
    id?: number,
    type: "error" | "info" | "warning" | "success",
    body: string
}

export interface VerificationRequestModel {
    id: number,
    is_success: boolean | null,
    moderator_comment: string | null,
    moderator_decision_required: boolean
}