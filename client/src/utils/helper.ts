export const getInitials = (name: string) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i].charAt(0);
  }

  return initials.toUpperCase();
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getToastMessage = (type: "draft" | "updated" | "published") => {
  switch (type) {
    case "draft":
      return "Draft saved successfully";
    case "updated":
      return "Post updated successfully";
    case "published":
      return "Post published successfully";
    default:
      return "Something went wrong";
  }
};
