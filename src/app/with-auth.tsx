import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const router = useRouter();
    const { token } = useAuthStore();
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const [isTokenLoaded, setIsTokenLoaded] = useState(false);

    useEffect(() => {
      if (token !== undefined) {
        setIsTokenLoaded(true);
      }
    }, [token]);

    useEffect(() => {
      if (isTokenLoaded) {
        if (!token) {
          router.push("/auth/login");
        } else {
          setIsCheckingToken(false);
        }
      }
    }, [router, token, isTokenLoaded]);

    if (isCheckingToken) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
