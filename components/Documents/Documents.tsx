import {FC, memo, useEffect} from "react";
import styles from "./Documents.module.scss";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsList from "./DocumentsList";
import {useQuery} from "@apollo/client";
import {
    DOCUMENTS,
    DOCUMENTS_TARGET_GROUPS_TYPES,
    DOCUMENTS_TYPES
} from "@api/query/query";
import useActions from "@hooks/useActions";
import {useDocumentsSelector, useMainSelector} from "@store/selectors";

export const Documents: FC = memo(() => {

    let mainState = useMainSelector();
    let state = useDocumentsSelector();

    let currentApartmentHouseId = mainState.user?.apartment_user.apartment.apartment_house.id;

    const documentsTypesQuery = useQuery(DOCUMENTS_TYPES);
    const documentsQuery = useQuery(DOCUMENTS, {
        variables: {
            apartment_house_id: currentApartmentHouseId
        }
    });
    const documentsTargetGroupsQuery = useQuery(DOCUMENTS_TARGET_GROUPS_TYPES);

    let {
        setDocumentsTypesAction,
        setDocumentsTargetGroupsAction,
        setDocumentsAction,
        setDocumentsUpdateStateAction
    } = useActions();

    useEffect(() => {
        const getDocumentsTypes = async () => {
            try {
                let response = await documentsTypesQuery.refetch();
                let data = response.data.documents_types;
                setDocumentsTypesAction(data);
            } catch (error) {
                console.log(error);
            }
        }

        const getDocumentsTargetGroups = async () => {
            try {
                let response = await documentsTargetGroupsQuery.refetch();
                let data = response.data.documents_target_groups_types;
                setDocumentsTargetGroupsAction(data);
            } catch (error) {
                console.log(error);
            }
        }

        getDocumentsTypes();
        getDocumentsTargetGroups();
    }, []);

    useEffect(() => {
        const getDocuments = async () => {
            try {
                let response = await documentsQuery.refetch();
                let data = response.data.documents;
                setDocumentsAction(data);

                if (state.isUpdate) setDocumentsUpdateStateAction(false);
            } catch (error) {
                console.log(error);
            }
        }

        getDocuments();
    }, [state.isUpdate, documentsQuery]);

    return (
        <div className={styles.Documents}>
            <DocumentsHeader />
            <DocumentsList
                control={true}
                user_id={mainState.user?.user_id}
                array={state.documents}
            />
        </div>
    )
});

Documents.displayName = "Documents";