export const toDate = (created_on) => {
  let dd = new Date(created_on.seconds * 1000);

  return dd.toLocaleString("en-IN", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
