import {gql} from "@apollo/client";

export const CHATS_VIEW = gql`
    subscription chats_view {
        chats_view(order_by: {draft: {content: desc_nulls_last}}) {
            id
            unreaded_messages_count
            name
            created_at
            draft {
                content
            }
            chat_type {
                key
                name
            }
            organization {
                logotype_path
            }
            chat_messages_view(limit: 1, order_by: {id: desc}) {
                content
                id
                created_at
                is_readed
            }
            private_user {
                profile {
                    avatar
                    last_name
                    name
                }
                user {
                    is_verified
                    is_online
                    last_seen
                }
            }
            owner {
                is_online
                last_seen
            }
        }
    }  
`;

export const CHAT_MESSAGES = gql`
  subscription chat_get_older_messages($chat_id: Int, $offset: Int) {
    chat_get_older_messages(
        args: {
            selected_chat_id: $chat_id,
            _limit: 50,
            _offset: $offset
        }
    ) {
        content
        id
        user {
            profile {
                avatar
                last_name
                name
            }
        }
        attachments
        created_at
        is_readed
        user_id
        reply_to {
            id
            attachments
            content
            user {
                profile {
                    name
                }
            }
        }
    }
  }
`;


export const CHAT_USERS = gql`
subscription chat_users($chat_id: bigint) {
  chat_users(where: {chat_id: {_eq: $chat_id}}) {
    user {
      id
      is_verified
      is_online
      last_seen
      profile {
        avatar
        name
        last_name
      }
    }
  }
}
`;

export const GET_TASK_ONE = gql`
    subscription tasks($id: bigint!) {
  tasks_by_pk(id: $id) {
    operator_id
    apartment_id
    apartment_house {
      thoroughfare_name
      premise_number
      id
    }
    worker_user_images
    id
    created_at
    task_type {
      key
      name
    }
    task_status {
      name
      key
    }
    tags {
      tag {
        name
        id
      }
    }
    owner {
      profile {
        last_name
        name
      }
      phone_number
    }
    theme
    urgently
    rating
    owner_id
    owner_images
    description
    entrance_number
    floor_number
    description
    worker {
      name
    }
    operator_user_chat {
      id
      name
      chat_type {
        key
        name
      }
      organization {
        name
      }
      private_user {
        user {
          is_online
          is_verified
        }
      }
    }
    worker_user_chat {
      id
      name
      chat_type {
        key
        name
      }
      organization {
        name
      }
      private_user {
        user {
          is_online
          is_verified
        }
      }
    }
  }
}
`;

export const GET_TASKS = gql`
    subscription task_search(
    $pattern: String,
    $offset: Int,
    $limit: Int,
    $owner_id: bigint,
    $status_key: String,
    $created_at: timestamp,
    $urgently: Boolean
) {
    task_search(
        offset: $offset,
        limit: $limit,
        where: {
            owner_id: {_eq: $owner_id},
            status_key: {_eq: $status_key},
            created_at: {_gte: $created_at},
            urgently: {_eq: $urgently}
        },
        order_by: {created_at: desc},
        args: {pattern: $pattern}
    ) {
        apartment_id
        theme
        description
        id
        owner_id
        urgently
        owner_images
        task_status {
            key
            name
        }
        tags {
            tag {
                name
                id
            }
        }
        task_type {
            key
            name
        }
        created_at
        apartment_house {
            thoroughfare_name
            premise_number
            id
        }
    }
}
`;


export const TASKS_COUNT = gql`
subscription tasks_aggregate(
    $owner_id: bigint, 
    $status_key: String,
    $urgently: Boolean,
    $created_at: timestamp,
    $pattern: String
) {
    task_search_aggregate(where: {
        owner_id: {_eq: $owner_id},
        status_key: {_eq: $status_key},
        urgently: {_eq: $urgently},
        created_at: {_eq: $created_at}},
        args: {pattern: $pattern}
    ) {
        aggregate {
            count
        }
    }
}
`;

export const NOTIFICATIONS = gql`
  subscription notifications {
    notifications(order_by: {created_at: desc}) {
        body
        created_at
        id
        link
        title
    }
  }
`;

export const ORGANIZATION_OPERATORS = gql`
subscription worker_users($organization_id: bigint) {
  worker_users(where: {role_key: {_eq: "operator"}, worker: {organization_id: {_eq: $organization_id}}}) {
    user {
      profile {
        avatar
      }
      is_online
      last_seen
    }
    name
  }
}
`;