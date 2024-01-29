import {FC} from "react";
import styles from "./MessagesView.module.scss";
import {useMainSelector} from "@store/selectors";
import Alert from "@ui/Alert";

export const MessagesView: FC = () => {

    let state = useMainSelector();

    return (
        <div className={styles.MessagesView}>
            {
                state.messages.length
                    ?
                    state.messages.map(message => {
                        let {type, id, body} = message;
                        return (
                            <Alert
                                key={id}
                                id={id as number}
                                type={type}
                            >
                                {body}
                            </Alert>
                        )
                    })
                    :
                    null
            }
        </div>
    )
}