import * as yup from 'yup';

export const REGISTRATION_FORM_SCHEMA = yup.object().shape({
    first_name: yup.string().required("Необходимо для заполнения"),
    last_name: yup.string().required("Необходимо для заполнения"),
    password: yup.string().required("Необходимо для заполнения"),
    password_repeat: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают")
});

export const LOGIN_FORM_SCHEMA = yup.object().shape({
    password: yup.string().required("Необходимо для заполнения")
});

export const ADD_METER_DEVICE_FORM_SCHEMA = yup.object().shape({
    type_key: yup.string().required("Необходимо для заполнения"),
    number: yup.string().required("Необходимо для заполнения"),
    description: yup.string().required("Необходимо для заполнения")
});

export const TASK_INTERACTION_FORM_SCHEMA = yup.object().shape({
    theme: yup.string().required("Необходимо для заполнения"),
    description: yup.string().required("Необходимо для заполнения"),
    type_key: yup.string().required("Необходимо для заполнения")
});

export const CREATE_POLL_FORM_SCHEMA = yup.object().shape({
    theme: yup.string().required("Необходимо для заполнения"),
    content: yup.string().required("Необходимо для заполнения"),
    start_date: yup.string().required("Необходимо для заполнения"),
    duration_key: yup.string().required("Необходимо для заполнения"),
    notes: yup.string().typeError("Введите строковое значение"),
    question_type_key: yup.string().required("Необходимо для заполнения")
});

export const PROFILE_UPDATE_FORM_SCHEMA = yup.object().shape({
    name: yup.string().required("Необходимо для заполнения"),
    last_name: yup.string().required("Необходимо для заполнения"),
    mail: yup.string().email("Введите правильную электронную почту").required("Необходимо для заполнения")
});

export const COMPLAIN_FORM_SCHEMA = yup.object().shape({
    rule: yup.string().required("Необходимо для заполнения")
});

export const CREATE_REVIEW_FORM_SCHEMA = yup.object().shape({
    review: yup.string().required("Необходимо для заполнения")
});

export const GET_STATEMENT_FORM_SCHEMA = yup.object().shape({
    statement_number: yup.string().required("Необходимо для заполнения"),
    start_date: yup.date().required("Необходимо для заполнения"),
    end_date: yup.date().required("Необходимо для заполнения")
});

export const ADD_DOCUMENT_FORM_SCHEMA = yup.object().shape({
    target_group_key: yup.string().required("Необходимо для выбора")
});

export const EDIT_DOCUMENT_FORM_SCHEMA = yup.object().shape({
    target_group_key: yup.string().required("Необходимо для выбора"),
    document_name: yup.string().required("Необходимо для выбора")
});