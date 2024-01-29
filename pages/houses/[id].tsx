import {FC} from "react";
import MainLayout from "@layouts/MainLayout";
import Breadcrumbs from "@ui/Breadcrumbs";
import Breadcrumb from "@ui/Breadcrumbs/Breadcrumb";
import ApartmentHouseComponent from "@components/ApartmentHouse";

const ApartmentHouse: FC = () => {
    return (
        <MainLayout>
            <Breadcrumbs>
                <Breadcrumb href={"/"} label={"Дома на карте"} />
            </Breadcrumbs>
            <ApartmentHouseComponent />
        </MainLayout>
    )
}

export default ApartmentHouse;