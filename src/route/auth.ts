import { User } from "@/types";
import { api } from "@/route/api";

export const register = async (user: Partial<User>) => {
  const response = await api.post("/user/register", {
    email: user.email,
    password: user.password,
    names: user.names,
    surnames: user.surnames,
    studentCode: user.studentCode,
    profileImage: user.profileImage,
    instructorRequest: user.instructorRequest,
  });
  return response.data;
};

export const requestVerificationEmail = async (email: string) => {
  const response = await api.post("/user/request-verification", {
    email,
  });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await api.post("/user/verify-otp", {
    email,
    otp,
  });
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await api.post("/user/request-password-reset", {
    email,
  });

  return response.data;
};

export const resetPasswordWithToken = async (
  token: string,
  newPassword: string
) => {
  const response = await api.post("/user/reset-password-with-token", {
    token,
    newPassword,
  });
  return response.data;
};

export const login = async (user: { identifier: string; password: string }) => {
  const response = await api.post("/auth/sign-in", {
    identifier: user.identifier,
    password: user.password,
  });

  return response.data;
};

export const validateToken = async (token: string) => {
  const response = await api.post("/auth/validateToken", token);

  return response.data;
};
