import { User } from "@/stores/user/types";
import { ref } from "vue";

export default function checkUserRole(user: User | null, roleValue: string | string[]) {
  const isHasRole = ref(false);
  if (Array.isArray(roleValue)) {
    isHasRole.value = user?.roles.some((role) => roleValue.includes(role)) || false;
  } else {
    isHasRole.value = user?.roles.some((role) => role === roleValue) || false;
  }

  return {
    isHasRole,
  };
}
