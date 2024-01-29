import {FC} from "react";
import ProfileFormControl from "./FormControl/FormControl";
import Section from "@ui/Section";

const Profile: FC = () => {
    return (
        <Section title={"Настройки профиля"}>
            <ProfileFormControl />
        </Section>
    )
}

export default Profile