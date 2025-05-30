import { useAuthStore } from "@/store/auth";

export function useSession() {
  const { token, user } = useAuthStore();

  const profileId = user?.profileId || "";

  return { token, profileId };
}
