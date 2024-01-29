import {gql} from "@apollo/client";

export const USER_SESSION = gql`
query sessions {
  sessions {
    id
    user_id
    role {
      key
      name
    }
    apartment_user {
      id
      is_verified
      role {
        key
        name
      }
      docs
      apartment {
        apartment_number
        id
        apartment_house {
          id
          lon
          lat
          thoroughfare_name
          premise_number
          organization {
            name
            rating
            reviews_count
            logotype_path
            type {
              name
            }
            work_schedule
          }
          organization_id
        }
      }
    }
  }
}
`;

export const APARTMENT_USERS = gql`
query apartment_users($user_id: bigint) {
  apartment_users(where: {user_id: {_eq: $user_id}}) {
    id
    is_verified
    docs
    apartment {
      id
      apartment_number
      apartment_house {
        id
        lon
        lat
        thoroughfare_name
        premise_number
      }
    }
  }
}

`;

export const GET_NEWS = gql`
    query news(
        $limit: Int,
        $offset: Int
    ) {
        news(
            limit: $limit,
            offset: $offset,
            order_by: {created_at: desc}
        ) {
            apartment_house_id
            created_at
            description
            id
            image_path
            title
        }
    }
`;

export const GET_NEWS_ONE = gql`
    query news_one($id: bigint!) {
        news_by_pk(id: $id) {
            created_at
            description
            id
            image_path
            title
        }
    }
`;

export const GET_TASK_LOGS = gql`
    query history_changes($id: bigint) {
        task_logs(where: {task_id: {_eq: $id}}, order_by: {created_at: desc}) {
            id
            created_at
            event_message
        }
    }
`;

export const GET_MAP_APARTMENT_HOUSES = gql`
     query apartment_houses {
        apartment_houses {
            id
            lon
            lat
            organization {
                id
                type {
                    name
                }
            }
        }
     }
`;

export const GET_MAP_ORGANIZATION_INFO = gql`
        query organizations_by_pk($id: bigint!) {
            organizations_by_pk(id: $id) {
                id
                name
                email
                rating
                phone_number
                website
                type {
                    name
                }
                reviews_count
                logotype_path
            }
        }
`;

export const GET_HOUSE_INFO = gql`
    query getHouseInfo($id: bigint!) {
        apartment_houses_by_pk(id: $id) {
            id
            formatted
            users_count
        }
    }
`;

export const GET_CAMERAS = gql`
   query cameras($name: String, $offset: Int) {
        cameras(
            order_by: {sort: asc},
            where: {category: {name: {_eq: $name}}},
            limit: 4,
            offset: $offset
        ) {
            id
            path_to_stream
            sort
            category {
                id
                name
            }
        }
   }
`;

export const GET_CAMERAS_CATEGORY = gql`
    query cameras_categories {
        camera_categories {
           name
        }
    }
`;

export const GET_METERS = gql`
    query meters {
        meters {
            id
            images
            description
            number
            type {
                key
                name
            }
            records(order_by: {created_at: desc}, limit: 2) {
                id
                value
                meter_id
            }
        }
    }
`;

export const GET_METER_TYPES = gql`
    query meter_types {
      meter_types {
        key
        name
      }
    }
`;

export const GET_METER_RECORDS = gql`
   query meter_records($date_to: timestamp, $date_from: timestamp, $types: [String!] = "") {
        meter_records(
            order_by: {created_at: desc},
            where: {
                _and: { 
                    created_at: {_gte: $date_from},
                    _and: {created_at: {_lte: $date_to}}
                },
                meter: {
                    type: {
                        key: {
                            _in: $types
                        }
                    }
                }
            }) {
            value
            created_at
            created_date
            meter {
                id
                number
                records(limit: 2, order_by: {created_at: desc}) {
                    value
                    id
                }
                description
                type {
                    key
                    name
                }
            }
        }
    }
`;

export const GET_TASK_STATUSES = gql`
    query task_status {
        task_status {
            name
            key
        }
    }
`;

export const GET_TASK_TYPES = gql`
    query task_types {
        task_types {
            key
            name
        }
    }
`;

export const GET_POLLS_QUESTION_TYPES = gql`
    query polls {
        poll_question_types {
            key
        }
    }
`;

export const GET_POLLS = gql`
    query polls(
        $question_type_key: String,
        $created_at: timestamp,
        $is_finished: Boolean
    ) {
        polls(where: {
            question_type_key: {_eq: $question_type_key},
            created_at: {_gte: $created_at},
            is_finished: {_eq: $is_finished},
        }) {
            theme
            content
            start_date
            end_date
            id
        }
    }
`;

export const GET_POLL_ONE = gql`
query poll($id: bigint!) {
  polls_by_pk(id: $id) {
    is_finished
    options {
      text
      image
      id
      votes {
        id
      }
    }
    content
    images
    apartment_house_id
    end_date
    question_type_key
    id
    notes
    start_date
    theme
    apartment_house {
      users_count
    }
    owner {
      profile {
        avatar
        last_name
        name
      }
    }
    votes {
      comment
      rate
      created_at
      options {
        option {
          text
          id
          image
        }
      }
      user {
        id
        profile {
          last_name
          name
          avatar
        }
      }
    }
    is_vote_changeable
    is_anonymous
  }
}
`;

export const GET_APARTMENT_HOUSE_ONE = gql`
    query apartment($id: bigint!) {
        apartment_houses_by_pk(id: $id) {
            cadastral
            formatted
            premise_number
            thoroughfare_name
            id
            lat
            lon
            note
            users_count
            organization {
                rating
                id
                name
                reviews_count
                email
                logotype_path
                type {
                    name
                }
                legal_address
                phone_number
                website
            }
        }
    }
`;

export const GET_ORGANIZATIONS = gql`
query organizations($type: String) {
  organizations(where: {type_key: {_eq: $type}}, order_by: {rating: asc}) {
    id
    email
    name
    note
    logotype_path
    legal_address
    inn
    created_at
    description
    phone_number
    rating
    reviews_count
    service_email
    website
    type {
      name
    }
    documents {
      apartment_house_id
      document_name
      id
      path
      owner_id
      created_at
    }
    reviews {
      rating
      review
      images
      created_at
      id
      user_id
      user_profile_view {
        avatar
        last_name
        name
      }
      organization_id
      user {
        is_verified
        profile {
          nickname
        }
      }
    }
  }
}
`;

export const GET_ORGANIZATION_TYPES = gql`
    query organization_types {
        organization_types {
            name
            key
        }
    }
`;

export const GET_SERVICE_ORGANIZATIONS = gql`
   query service_organizations($offset: Int, $locality: String) {
        apartment_houses(limit: 10, offset: $offset, where: {locality: {name: {_eq: $locality}}}) {
            organization {
                type {
                    name
                }
                rating
                reviews_count
                logotype_path
                name
            }
            thoroughfare_name
            premise_number
            id
            locality {
                name
            }   
        }
   }
`;

export const GET_LOCALITY = gql`
  query locality {
    locality {
        lat
        lon
        name
    }
  }
`;

export const CHAT_USERS_COUNT = gql`
  query chat_users($chat_id: bigint) {
    chat_users_aggregate(where: {chat_id: {_eq: $chat_id}}) {
        aggregate {
            count
        }
    }
  }
`;

export const DOCUMENTS = gql`
query documents($apartment_house_id: bigint) {
  documents(where: {apartment_house_id: {_eq: $apartment_house_id}}) {
    apartment_house_id
    document_name
    id
    path
    owner_id
    type {
      name
      key
    }
    target_group {
      key
      name
    }
    created_at
  }
}
`;

export const DOCUMENTS_TYPES = gql`
    query document_types {
        documents_types {
            key
            name
        }
    }
`;

export const DOCUMENTS_TARGET_GROUPS_TYPES = gql`
    query documents_target_groups_types {
        documents_target_groups_types {
            key
            name
        }
    }
`;

export const APARTMENT_HOUSE_REVIEWS = gql`
query apartment_house_reviews(
    $moderation_state: String,
    $user_id: bigint,
    $apartment_house_id: bigint,
    $is_archive: Boolean
) {
  apartment_house_reviews(where: {
    moderation_state_key: {_eq: $moderation_state},
    user_id: {_eq: $user_id},
    apartment_house_id: {_eq: $apartment_house_id},
    is_archive: {_eq: $is_archive}
  }) {
    apartment_house_id
    created_at
    id
    images
    is_archive
    is_hided_user_info
    rating
    review
    user_info {
      profile {
        last_name
        name
        avatar
        nickname
        user {
          is_verified
        }
      }
    }
    user_id
    organization_reply
    organization_reply_at
    organization_change {
      organization {
        logotype_path
        name
      }
    }
    owner_images
  }
}
`;

export const APARTMENT_HOUSE_ORGANIZATION_CHANGES_LIST = gql`
query organization_changes($apartment_house_id: bigint) {
  apartment_house_organization_changes(where: {apartment_house_id: {_eq: $apartment_house_id}}) {
    end_date
    id
    start_date
    organization {
      logotype_path
      name
    }
  }
}
`;

export const USER_VERIFICATION_REQUESTS = gql`
    query user_verification_requests {
        user_verification_requests(order_by: {created_at: desc}) {
            id
            is_success
            moderator_comment
            moderator_decision_required
        }
    }
`;