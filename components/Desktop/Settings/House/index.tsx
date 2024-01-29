import {FC} from "react";
import styles from "./House.module.scss";
import Section from "@ui/Section";
import HouseFormControl from "./FormControl/FormControl";

const House: FC = () => {
    return (
        <Section
            title={"Данные дома"}
            description={"Первоуральск, ул. Трубников, 44, кв.2"}
            classes={[styles.House]}
        >
            <HouseFormControl />
        </Section>
    )
}

export default House