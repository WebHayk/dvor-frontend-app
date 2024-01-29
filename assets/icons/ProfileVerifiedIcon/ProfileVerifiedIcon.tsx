import {FC} from "react";

interface ProfileVerifiedIcon {
    className?: string
}

export const ProfileVerifiedIcon: FC<ProfileVerifiedIcon> = (
    {
        className
    }
) => {
    return (
        <img
            className={className}
            src={"/images/profile-verified-icon.svg"}
            alt={"profile-verified"}
            loading={"eager"}
        />
    )
}