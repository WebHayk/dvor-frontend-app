import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login_user($password: String!, $phone_number: String!, $fcm_token: String) {
        login_user(data: {password: $password, phone_number: $phone_number, fcm_token: $fcm_token}) {
            access_token
        }
    }
`;

export const REGISTRATION = gql`
    mutation Registration($password: String!, $phone_number: String!) {
        registration(data: {password: $password, phone_number: $phone_number}) {
            status
        }
    }
`;

export const CONFIRM_REGISTRATION = gql`
    mutation ConfirmRegistration($phone_number: String!, $pin_code: String!) {
        confirm_registration(data: {phone_number: $phone_number, pin_code: $pin_code}) {
            access_token
        }
    }
`;

export const GET_PROFILE = gql`
    mutation profile_get {
        profile_get {
            avatar
            gender
            id
            last_name
            mail
            name
            phone_number
            created_at
            nickname
            user {
                is_verified
            }
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation profile_update(
      $name: String,
      $last_name: String,
      $avatar: String,
      $gender: String,
      $mail: String,
      $password: String,
      $nickname: String
    ) {
      profile_update ( 
        data: {
          password: $password, 
          name: $name,
          last_name: $last_name, 
          avatar: $avatar, 
          gender: $gender, 
          mail: $mail,
          nickname: $nickname
        }
      ) {
        status
      }
    }
`;

export const USER_START_VERIFICATION = gql`
    mutation user_start_verification(
        $doc_image: String!,
        $selfie_image: String!
    ) {
        user_start_verification(
            doc_image: $doc_image,
            selfie_image: $selfie_image
        ) {
            verification_request_id
        }
    }
`;

export const APARTMENT_CHANGE = gql`
  mutation apartments_change($apartment_id: bigint!) {
    apartments_change(data: {apartment_id: $apartment_id}) {
        status
    }
  }  
`;

export const INSERT_CHAT_MESSAGE_VIEW = gql`
mutation insert_chat_messages_view_one(
    $chat_id: bigint!,
    $content: String,
    $attachments: jsonb,
    $reply_to_message_id: bigint
) {
        insert_chat_messages_view_one(object: {
            chat_id: $chat_id,
            content: $content,
            attachments: $attachments,
            reply_to_message_id: $reply_to_message_id
        }) {
            id
        }
    }
`;

export const INSERT_CHAT_DRAFT = gql`
    mutation chat_draft(
        $chat_id: bigint!,
        $content: String
    ) {
        chat_set_draft(
            chat_id: $chat_id,
            content: $content
        ) {
            chat_draft_id
        }
    }
`;

export const READ_ALL_MESSAGES = gql`
  mutation chat_set_readed($readed_chat_id: bigint) {
    chat_set_readed(args: {readed_chat_id: $readed_chat_id}) {
        user_id
    }
  }
`;

export const INSERT_METER = gql`
    mutation meter_insert(
        $apartment_id: bigint!,
        $number: String!,
        $type_key: String!,
        $description: String!,
        $images: [String]
    ) {
        meter_insert(data: {
            apartment_id: $apartment_id,
            number: $number,
            type_key: $type_key,
            images: $images,
            description: $description
        }) {
            id
        }
    }
`;

export const DELETE_METER = gql`
    mutation delete_meter($id: bigint!) {
        delete_meters(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;

export const UPDATE_METER = gql`
   mutation myMutation(
        $description: String,
        $images: jsonb,
        $number: String,
        $type_key: String,
        $id: bigint!
   ) {
       update_meters(
            where: {
                id: {_eq: $id}},
                _set: {
                    images: $images,
                    description: $description,
                    number: $number,
                    type_key: $type_key
                }
       ) {
           affected_rows
        }
   }
`;

export const INSERT_METER_RECORDS = gql`
    mutation insert_meter_records(
      $values: [meter_records_insert_input!]!
    ) {
      insert_meter_records(
        objects: $values
      ) {
        affected_rows
      }
    }
`;

export const INSERT_TASK = gql`
   mutation task_insert(
        $apartment_house_id: bigint!,
        $description: String!,
        $theme: String!,
        $type_key: String!,
        $urgently: Boolean,
        $owner_images: [String]
   ) {
    task_insert(data: {
           apartment_house_id: $apartment_house_id,
           description: $description,
           theme: $theme,
           type_key: $type_key,
           urgently: $urgently,
           owner_images: $owner_images
    }) {
        id
    }
}
`;

export const TASK_ESTIMATE = gql`
    mutation task_estimate(
        $rating: Int!,
        $review: String!,
        $id: bigint!,
        $is_hided_images: Boolean!,
        $is_hided_user_info: Boolean!,
        $review_images: [String]
    ) {
        task_rating(data: {
            id: $id,
            review: $review,
            rating: $rating,
            review_images: $review_images,
            is_hided_images: $is_hided_images, 
            is_hided_user_info: $is_hided_user_info
        }) {
            status
        }
    }
`;

export const POLL_VOTE = gql`
    mutation poll_vote(
        $comment: String,
        $options_ids: [bigint!],
        $poll_id: bigint!,
        $rate: Int
    ) {
        poll_vote(
            poll_id: $poll_id,
            comment: $comment,
            options_ids: $options_ids,
            rate: $rate
        ) {
            status
        }
    }
`;

export const INSERT_ORGANIZATION_REVIEW = gql`
    mutation organization_review_insert(
        $organization_id: bigint!,
        $rating: Int!,
        $review: String!, 
        $images: [String!]
    ) {
        organization_review_insert(
            data: {
                organization_id: $organization_id,
                rating: $rating,
                review: $review,
                images: $images
            }
        ) {
            status
        }
    }
`;

export const DELETE_ORGANIZATION_REVIEW = gql`
   mutation delete_organization_reviews($id: bigint) {
      delete_organization_reviews(where: {id: {_eq: $id}}) {
        affected_rows
      }
   }
`;

export const UPDATE_ORGANIZATION_REVIEW = gql`
    mutation update_organization_reviews(
        $rating: smallint,
        $review: String,
        $id: bigint,
        $images: jsonb
    ) {
        update_organization_reviews(where: {
            id: {_eq: $id}},
            _set: {
                rating: $rating,
                review: $review,
                images: $images
            }) {
            affected_rows
        }
    }
`;

export const INSERT_APARTMENT_USER_DOCS = gql`
   mutation insert_apartment_user_docs(
        $apartment_user_id: bigint!,
        $docs: [String!]!,
        $requested_role_key: RequestedApartmentUserRole!
   ) {
    insert_apartment_user_docs(
        apartment_user_id: $apartment_user_id,
        docs: $docs,
        requested_role_key: $requested_role_key
    ) {
        id
    }
}
`;

export const TASK_UPDATE = gql`
    mutation task_update(
        $description: String,
        $id: bigint!,
        $owner_images: [String],
        $theme: String, 
        $urgently: Boolean,
        $type_key: String
    ) {
        task_update(data: {
            id: $id,
            description: $description,
            theme: $theme,
            type_key: $type_key,
            urgently: $urgently,
            owner_images: $owner_images
        }) {
            status
        }
    }
`;

export const CHAT_PRIVATE_INSERT = gql`
    mutation chat_private_insert($user_id: bigint!) {
        chat_private_insert(data: {user_id: $user_id}) {
            id
            private_user {
                profile {
                    avatar
                    last_name
                    name
                }
                user {
                    is_verified
                }
            }
        }
    }
`;

export const USER_ONLINE = gql`
    mutation user_online {
        user_online {
            id
        }
    }
`;

export const TASK_CHAT_INSERT = gql`
    mutation task_chat_insert($task_id: bigint!, $chat_name: String!, $chat_type: TaskChatInsertChatType!) {
        task_chat_insert(chat_name: $chat_name, chat_type: $chat_type, task_id: $task_id) {
            chat {
                id
                name
                chat_type {
                    key
                    name
                }
            }
        }
    }
`;

export const TASK_CANCEL = gql`
    mutation task_cancel($id: bigint!) {
        task_cancel(data: {id: $id}) {
            status
        }
    }
`;

export const DELETE_DOCUMENT = gql`
    mutation delete_document($id: bigint) {
        delete_documents(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;

export const UPDATE_DOCUMENT = gql`
    mutation update_document(
        $id: bigint,
        $document_name: String,
        $target_group_key: String
    ) {
        update_documents(
            where: {id: {_eq: $id}},
            _set: {
                document_name: $document_name,
                target_group_key: $target_group_key
            }
        ) {
            affected_rows
        }
    }
`;

export const DELETE_MESSAGE = gql`
    mutation delete_message($ids: [bigint!]) {
        delete_chat_messages(where: {id: {_in: $ids}}) {
            affected_rows
        }
    }
`;

export const LOGOUT = gql`
    mutation logout {
        logout {
            status
        }
    }
`;
