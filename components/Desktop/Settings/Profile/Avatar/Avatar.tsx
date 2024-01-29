import React, {FC, SetStateAction, useState} from "react";
import styles from "./Avatar.module.scss";
import {ASSETS_BASE_URL, IMAGE_ACCEPT} from "@common/utils/options";
import FileUpload from "@ui/FileUpload";
import {AvatarType, FileUploadType} from "@typescript/interfaces";
import {useMainSelector} from "@store/selectors";
import {FilesService} from "@services/filesService";

interface Avatar {
    avatar: AvatarType,
    setAvatar: React.Dispatch<SetStateAction<AvatarType>>
}

const Avatar: FC<Avatar> = (
    {
        avatar,
        setAvatar
    }
) => {

    let state = useMainSelector();

    let [selectedImage, setSelectedImage] = useState<string>("");

    const handleEdit = async (event: React.ChangeEvent<HTMLInputElement>) => {
            FilesService.handleFileUpload(event)
                .then(response => {
                    let {file, image} = response as FileUploadType;
                    setSelectedImage(image);
                    setAvatar({
                        image,
                        file
                    });
                })
                .catch(err => console.log(err))
    }

    return (
        <div className={styles.Avatar}>
            <img
                alt={"avatar"}
                loading={"lazy"}
                width={180}
                height={180}
                src={state.profile?.avatar && !selectedImage ? ASSETS_BASE_URL + state.profile?.avatar : selectedImage != "" ? selectedImage : "/images/profile-empty-icon.svg" }
                className={styles.Avatar__image}
            />
            <FileUpload
                accept={IMAGE_ACCEPT}
                handleChange={handleEdit}
            >
                <div className={styles.Avatar__edit}>
                    <img
                        src={"/images/edit-icon.svg"}
                        alt={"edit-icon"}
                        width={24}
                        height={24}
                    />
                    <span>Сменить аватар</span>
                </div>
            </FileUpload>
        </div>
    )
}

export default Avatar