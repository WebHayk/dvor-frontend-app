import React, {FC, SetStateAction, useContext} from "react";
import styles from "./ImagesList.module.scss";
import {FileType, ImageType} from "@typescript/interfaces";
import ImageComponent from "./Image";
import {FilesUploadContext} from "@context/context";

interface ImagesList {
    setImages: React.Dispatch<SetStateAction<ImageType[]>>,
    images: ImageType[],
    files: FileType[],
    setFiles: React.Dispatch<SetStateAction<FileType[]>>
}

export const ImagesList: FC<ImagesList> = (
    {
        images,
        setImages,
        setFiles,
        files
    }
) => {

    return (
        <div className={styles.ImagesList}>
            {
                images.map((data: ImageType) => {

                    const handleDelete = () => {
                        let imagesData = images?.filter((image: ImageType) => image.id != data.id);
                        let filesData = files?.filter((file: FileType) => file.id != data.id);
                        setImages(imagesData);
                        setFiles(filesData);
                    }

                    return (
                        <ImageComponent
                            key={data.id}
                            handleDelete={handleDelete}
                            image={data.image}
                            id={data.id}
                        />
                    )
                })
            }
        </div>
    )
}