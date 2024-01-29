import React, {SetStateAction} from "react";
import {FileType, FileUploadType, ImageType} from "@typescript/interfaces";
import {ASSETS_BASE_URL} from "@common/utils/options";
import {getRandomFloat} from "@common/utils/helpers";
import {VERIFICATIONS_UPLOAD_URL} from "@common/utils/variables";

export class FilesService {
    static handleFilesUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        files: FileType[],
        images: ImageType[],
        setImages: React.Dispatch<SetStateAction<ImageType[]>>,
        setFiles: React.Dispatch<SetStateAction<FileType[]>>
    ) => {
        let filesList: FileList | null = event.target.files;

        if (filesList) {

            for (let i = 0; i < filesList.length; i++) {
                let file = filesList[i];

                let image = window.URL.createObjectURL(file);

                let id = getRandomFloat(1, 10, 3);

                let fileData = {
                    id,
                    file
                };

                let imageData = {
                    id,
                    image
                };

                setFiles(prevState => [...prevState, fileData]);
                setImages(prevState => [...prevState, imageData]);
            }

            event.target.value = "";
        }
    }

    static handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let filesList: FileList | null  = event.target.files;

        if (filesList) {
            let file = filesList[0];
            let image = window.URL.createObjectURL(file);
            return {
                file,
                image
            } as FileUploadType;
        }
    }

    static getFiles = (array: FileType[]) => {
        return array.map(file => file.file);
    }

    static verificationFileUploadRequest = (file: File) => {
        let data = new FormData();
        data.append("session-id", localStorage.getItem("token") as string);
        data.append("file", file);

        const requestHandler = async () => {
            try {
                let response = await fetch(VERIFICATIONS_UPLOAD_URL, {
                    body: data,
                    method: "POST"
                });
                return await response.json();
            } catch (err) {
                console.log(err);
            }

        }

        return requestHandler();
    }

    static filesUploadRequest = (files: File[] | File) => {

        let data = new FormData();
        data.append("session-id", localStorage.getItem("token") as string);

        if (Array.isArray(files)) {
            for (const file of files) {
                data.append('files', file);
            }
        } else {
            data.append('files', files);
        }

        const requestHandler = async () => {
            try {
                let response = await fetch(process.env.NEXT_PUBLIC_FILES_UPLOAD_BASE_URL as string, {
                    body: data,
                    method: "POST"
                });
                return await response.json();
            } catch (err) {
                console.log(err);
            }

        }

        return requestHandler();
    }

    static filterFiles = (files: FileType[], uploads: File[], currentFiles: string[]) => {
        files.map((element: FileType) => {

            let file = element.file;

            if (typeof file != "string") {
                uploads.push(file);
            } else {
                currentFiles.push(file);
            }

        });
    };

    static toFileObjectsHelper = (array: string[]) => {
        return array.map((file: string, index: number) => {
            return {
                file,
                id: index
            }
        });
    };

    static toImageObjectsHelper = (array: string[]) => {
        return array.map((image: string, index: number) => {
            let url = ASSETS_BASE_URL + image;

            return {
                image: url,
                id: index
            }
        })
    }

    static imagesArrayCreator = (data: any) => {

        let files = [];

        for (let i = 0; i < data.length; i++) {
            let path = data[i].path;
            files.push(path);
        }

        return files;
    }
}