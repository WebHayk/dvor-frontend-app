import React, {FC, useEffect, useState} from "react";
import styles from "../../OrganizationTab.module.scss";
import Dropdown from "@ui/Dropdown";
import DropdownItem from "@ui/Dropdown/DropdownItem";
import {useMainSelector} from "@store/selectors";
import ReviewDialog from "@ui/Review/ReviewDialog";
import {OrganizationReviewType, ReviewFormType} from "@typescript/interfaces";
import WarningDialog from "@ui/Dialog/WarningDialog";
import {apiService} from "@services/apiService";
import {
    DELETE_ORGANIZATION_REVIEW,
    UPDATE_ORGANIZATION_REVIEW
} from "@api/mutations/mutations";
import DropdownButton from "@ui/Dropdown/DropdownButton";
import ReviewComplainDialog from "@ui/Review/ReviewComplainDialog";

interface ReviewDropdownModel {
    review: OrganizationReviewType,
    updateStateAction: any
}

export const ReviewDropdown: FC<ReviewDropdownModel> = (
    {
        review,
        updateStateAction
    }
) => {

    let state = useMainSelector();

    let {
        user_id,
        id,
        rating,
        images
    } = review;

    let [open, setOpen] = useState<boolean>(false);
    let [complainDialogOpen, setComplainDialogOpen] = useState<boolean>(false);

    let [show, setShow] = useState<boolean>(false); // Модальное окно редактирования
    let [warningOpen, setWarningOpen] = useState<boolean>(false);

    let [isDeleted, setIsDeleted] = useState<boolean>(false);

    const handleComplainDialogShow = () => setComplainDialogOpen(true);

    const handleShowEditDialog = () => setShow(true);

    const handleDelete = () => setWarningOpen(true);

    const handleEdit = (values: ReviewFormType) => {
        let {review, rating, images} = values;
        apiService.mutationRequest(UPDATE_ORGANIZATION_REVIEW, {
            review,
            rating,
            id,
            images
        })
            .then(() => {
                setShow(false);
                setOpen(false);
                updateStateAction(true);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (isDeleted) {
            apiService.mutationRequest(DELETE_ORGANIZATION_REVIEW, {
                id
            })
                .then(() => {
                    updateStateAction(true);
                    setIsDeleted(false);
                    setWarningOpen(false);
                })
                .catch(err => console.log(err))
        } else {
            setIsDeleted(false);
            setWarningOpen(false);
        }
    }, [isDeleted]);

    return (
        <>
            <ReviewComplainDialog
                open={complainDialogOpen}
                setOpen={setComplainDialogOpen}
            />
            <ReviewDialog
                images={images}
                review={review.review}
                ratingInitial={rating}
                open={show}
                setOpen={setShow}
                onSubmit={handleEdit}
                title={"Редактировать отзыв"}
            />
            <WarningDialog
                open={warningOpen}
                setOpen={setWarningOpen}
                setIsSubmitted={setIsDeleted}
            >
                Вы действительно хотите удалить отзыв?
            </WarningDialog>
            <DropdownButton
                setOpen={setOpen}
                open={open}
            />
            <div className={styles.OrganizationReviewDropdown}>
                <Dropdown open={open}>
                    <DropdownItem
                        onClick={handleComplainDialogShow}
                        label={"Пожаловаться"}
                        type={"handler"}
                    />
                    {
                        state.user
                            ?
                            user_id == state.user.user_id
                                ?
                                <>
                                    <DropdownItem
                                        onClick={handleShowEditDialog}
                                        label={"Редактировать"}
                                        type={"handler"}
                                    />
                                    <DropdownItem
                                        onClick={handleDelete}
                                        label={"Удалить"}
                                        type={"handler"}
                                    />
                                </>
                                :
                                null
                            :
                            null
                    }
                </Dropdown>
            </div>
        </>
    )
}