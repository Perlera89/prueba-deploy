import { api } from "./api";

export const getComments = async (contentId: string, contentType: string, token: string) => {

    const response = await api.get(`/course/content/comments/${contentType}/${contentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.comments;
}

export const addComment = async (contentType: string, contentId: string, comment: string, token: string) => {
    await api.post(`/course/content/comments/add`, {
        contentType,
        contentId,
        comment,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export const deleteComment = async (contentId: string, commentId: string, token: string) => {
    await api.delete(`/course/content/comments/delete`, {
        data: {
            contentId,
            commentId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}