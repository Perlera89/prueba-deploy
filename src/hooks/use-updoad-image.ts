import { api } from "@/route/api";

export const useUploadImage = async (file: File) => {

    const formData = new FormData();
    if (file) {
        formData.append("file", file);
    }

    try {
        const response = await api.post("/resources/upload-file", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.resource;
    } catch (err) {
        throw err;
    }
}