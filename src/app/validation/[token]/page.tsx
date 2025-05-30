"use client";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { api } from "@/route/api";
import { Oval } from "react-loader-spinner";

interface Response {
  data: {
    success: boolean;
    user: {
      id: string;
      code: string;
      names: string;
      surnames: string;
      fullName: string;
      profileImage: string;
      email: string;
      role: string;
      profileId: string;
    };
  };
}

export default function ValidateToken() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const { setUser } = useAuthStore();
  const [status, setStatus] = useState<string>("Validando token...");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response: Response = await api.get(
          "/auth/validate-token-google",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        if (response.data.success) {
          setUser({
            id: response.data.user.id,
            code: response.data.user.code,
            names: response.data.user.names,
            surnames: response.data.user.surnames,
            fullName: response.data.user.fullName,
            profileImage: response.data.user.profileImage,
            email: response.data.user.email,
            role: response.data.user.role,
            profileId: response.data.user.profileId,
          });
          const authStore = useAuthStore.getState();
          useAuthStore.setState({ ...authStore, token });

          setStatus("Validación exitosa. Redirigiendo al inicio...");
          setTimeout(() => {
            redirect("/home");
          }, 2000);
        } else {
          setStatus("Validación fallida. Redirigiendo...");
          redirect("/auth/login");
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        setStatus("Error en la validación. Redirigiendo...");
        redirect("/auth/login");
      }
    };

    if (token) {
      validateToken();
    } else {
      setStatus("Token no encontrado. Redirigiendo...");
      redirect("/auth/login");
    }
  }, [token, setUser, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="currentColor"
        secondaryColor="#71717a"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <h3 className="text-2xl font-bold mt-4">{status}</h3>
    </div>
  );
}
