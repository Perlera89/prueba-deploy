import { api } from "@/route/api";

export const useUploadThumbnail = async (file?: File) => {
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }

  try {
    const response = await api.post("/resources/save-thumbnail", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.secure_url;
  } catch (err) {
    throw err;
  }
};

export const useDeleteThumbnail = async (url: string) => {
  try {
    await api.delete("/resources/delete-by-url", {
      data: {
        url,
      },
    });
  } catch (error) {
    throw new Error("Failed to delete image");
  }
};
