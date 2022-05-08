import { ref } from "vue";

export default function checkUserRole(user, roleValue) {
  const isHasRole = ref(false);
  isHasRole.value = user?.roles?.some((role) => role.value === roleValue);
  return {
    isHasRole,
  };
}
