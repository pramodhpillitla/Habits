export const formatDate = (value) => {
  if (!value) return "Not completed yet";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
};
