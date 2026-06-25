export const getUserStatus = (user) => {
    if (user.is_blocked) {
      return "Blocked";
    }
  
    if (user.email_status === "unverified") {
      return "Unverified";
    }
  
    return "Active";
  };