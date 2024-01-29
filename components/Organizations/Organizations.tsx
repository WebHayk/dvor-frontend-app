import {FC, memo, useEffect} from 'react';
import OrganizationsTop from "./OrganizationsTop";
import styles from "./Organizations.module.scss";
import OrganizationsList from "./OrganizationsList";
import {apiService} from "@services/apiService";
import {GET_ORGANIZATION_TYPES, GET_ORGANIZATIONS} from "@api/query/query";
import useActions from "@hooks/useActions";
import {useOrganizationsSelector} from "@store/selectors";
import OrganizationsFilters from "./OrganizationsTop/OrganizationsFilters";
import {useQuery} from "@apollo/client";

export const Organizations: FC = memo(() => {

    let state = useOrganizationsSelector();
    let {
        setOrganizationsAction,
        setOrganizationsTypesAction,
        setOrganizationsUpdateStateAction
    } = useActions();

    let organizations = useQuery(GET_ORGANIZATIONS);

    useEffect(() => {

        console.log(state.isUpdate);

        let type = state.filters.type;

        let variables = {
            type: type !== "" ? type : null
        };

        organizations.refetch(variables)
            .then(response => {
                let data = response.data.organizations;
                setOrganizationsAction(data);

                if (state.isUpdate) setOrganizationsUpdateStateAction(false);
            })
            .catch(err => console.log(err))
    }, [state.filters.type, state.isUpdate])

    useEffect(() => {
        apiService.queryRequest(GET_ORGANIZATION_TYPES)
            .then(response => {
                let data = response.data.organization_types;
                setOrganizationsTypesAction(data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={styles.Organizations}>
            <OrganizationsTop />
            <OrganizationsFilters />
            <OrganizationsList />
        </div>
    );
});

Organizations.displayName = "Organizations";