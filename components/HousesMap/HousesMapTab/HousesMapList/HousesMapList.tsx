import {FC} from "react";
import OrganizationsTable from "./OrganizationsTable";
import OrganizationRow from "./OrganizationsTable/OrganizationRow";
import {useHousesMapSelector} from "@store/selectors";
import {ServiceOrganizationType} from "@typescript/interfaces";
import {useRouter} from "next/router";

export const HousesMapList: FC = () => {

    let housesMapState = useHousesMapSelector();
    let router = useRouter();

    return (
        <OrganizationsTable>
            {
                housesMapState.serviceOrganizations.length
                ?
                housesMapState.serviceOrganizations.map((service: ServiceOrganizationType) => {

                    const handleClick = () => router.push(`/houses/${service.id}`);

                    return (
                        <OrganizationRow
                            handleClick={handleClick}
                            key={service.id}
                            organization={service.organization}
                            address={`${service.locality.name}, ${service.thoroughfare_name} ${service.premise_number}`}
                        />
                    )
                })
                :
                null
            }
        </OrganizationsTable>
    )
}