import {FC} from "react";
import {Suspense} from "react";
import MainLayout from "@layouts/MainLayout";
import dynamic from "next/dynamic";

const HousesMap = dynamic(() => import("@components/HousesMap"), {
    suspense: true,
    ssr: true
})

const HousesInMap: FC = () => {
    return (
        <MainLayout>
            <Suspense fallback={`Загрузка...`}>
                <HousesMap/>
            </Suspense>
        </MainLayout>
    )
}

export default HousesInMap