import { User } from "@/stores/user/types";
import { ref } from "vue";

export default function checkUserRole(user: User | null, roleValue: string) {
  const isHasRole = ref(false);
  isHasRole.value = user?.roles?.some((role) => role === roleValue) || false;
  return {
    isHasRole,
  };
}
