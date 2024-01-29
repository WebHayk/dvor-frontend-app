import {FC} from "react";
import {useMainSelector} from "@store/selectors";
import styles from "./VerificationCheck.module.scss";
import {VerificationRequestModel} from "@typescript/interfaces";

interface VerificationCheckModel {
    verificationRequest: VerificationRequestModel
}

export const VerificationCheck: FC<VerificationCheckModel> = (
    {
        verificationRequest
    }
) => {

    let {
        moderator_comment,
        moderator_decision_required
    } = verificationRequest;

    const state = useMainSelector();

    let isVerified = state.profile.user.is_verified;

    const verificationViewConfig = () => {
        if (isVerified) {
            return <p>Ваши документы подтверждены</p>;
        }

        if (moderator_decision_required) {
            return <p>Система не распознала ваши документы. Документы были отправлены модераторам для ручной проверки. Ожидайте.</p>
        }

        if (moderator_comment) {
            return <p>Ответ в результате модерации - {moderator_comment}</p>
        }
    }

    return (
        <div className={styles.VerificationCheck}>
            {verificationViewConfig()}
        </div>
    )
}