import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types";
import { register, login } from "@/route/auth";
import CryptoJS from "crypto-js";

const SECRET_KEY = "#simapi-tech";

interface AuthState {
  user: Partial<User> | null;
  email: string;
  setEmail: (email: string) => void;
  token: string;
  isLoading: boolean;
  register: (user: Partial<User>) => Promise<void>;
  login: (user: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (data: string) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const useAuthStore = create(
  persist<AuthState>(
    (set) => {
      const defaultValues = {
        user: null,
        email: "",
        setEmail: (email: string) => set({ email }),
        token: "",
        isLoading: false,
      };

      const functions = {
        register: async (user: Partial<User>) => {
          try {
            const registerData = {
              names: user.names || "",
              surnames: user.surnames || "",
              email: user.email || "",
              password: user.password || "",
              profileImage: user.profileImage,
            };
            const response = await register(registerData);
            return response;
          } catch (error) {
            throw error;
          }
        },

        login: async (user: Partial<User>) => {
          try {
            const loginData = {
              identifier: user.identifier || "",
              password: user.password || "",
            };
            const newLogin = await login(loginData);
            document.cookie = `role=${newLogin.user.role}; path=/; max-age=86400; secure; samesite=strict`;

            set({
              user: {
                id: newLogin.user.id,
                code: newLogin.user.code,
                names: newLogin.user.names,
                surnames: newLogin.user.surnames,
                fullName: newLogin.user.fullName,
                profileImage: newLogin.user.profileImage,
                email: newLogin.user.email,
                role: newLogin.user.role,
                profileId: newLogin.user.profileId,
              },
              token: newLogin.tokens.accessToken,
            });
          } catch (error) {
            throw error;
          }
        },

        logout: async () => {
          document.cookie = "role=; path=/; max-age=0;";
          set({
            user: null,
            token: "",
          });

          sessionStorage.removeItem("auth-storage");
        },
      };

      return {
        ...defaultValues,
        ...functions,
        setUser: (user: User | null) => set({ user }),
      };
    },
    {
      name: "auth-storage",
      // storage: createJSONStorage(() => sessionStorage),
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const data = sessionStorage.getItem(name);
          return data ? decryptData(data) : null;
        },
        setItem: (name, value) => {
          const data = encryptData(value);
          sessionStorage.setItem(name, data);
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      })),
    }
  )
);
