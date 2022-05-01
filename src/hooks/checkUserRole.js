import { ref } from "vue";

export default function checkUserRole(user, roleValue) {
  const isHaveRole = ref(false);
  if (!user) return { isHaveRole };
  user.roles.forEach((role) => {
    if (role.value === roleValue) isHaveRole.value = true;
  });
  return {
    isHaveRole,
  };
}
