import { InstructorProfile } from "@/types";
import { api } from "@/route/api";

export const findInstructorProfileById = async (
  profileId: string,
  token: string
) => {
  const response = await api.post(
    `/profile/instructor/get-by-id`,
    { id: profileId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return response.data;
};

export const updateProfile = async (
  data: Partial<InstructorProfile>,
  token: string
) => {
  const response = await api.put(`/profile/instructor/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (data: UpdatePassword, token: string) => {
  const response = await api.post(`/user/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

interface UpdateImage {
  profileId: string;
  imagePerfil: string;
}

export const updateImage = async (image: UpdateImage, token: string) => {
  const response = await api.put(`/profile/instructor/update-image`, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateStudentImage = async ({ studentProfileId, imagePerfil }: { studentProfileId: string, imagePerfil: string }, token: string) => {
  const response = await api.put(`/profile/student/update-image`, { studentProfileId, imagePerfil }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteImageProfile = async (profileId: string, token: string) => {
  await api.delete(`/profile/instructor/delete-image`, {
    data: { profileId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findStudentProfileById = async (id: string, token: string) => {
  const response = await api.post(
    "/profile/student/get-by-id",
    {
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteImageStudent = async (profileId: string, token: string) => {
  await api.delete(`/profile/student/delete-image`, {
    data: { profileId },
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}