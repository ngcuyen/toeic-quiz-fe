export const NOTIFICATIONS = {
    ERROR: {
      SYSTEM: "An unexpected error occurred!",
      SERVER: "Request failed with status ",
      UNDEFINED: "Something went wrong!",
    },
    AUTH: {
      TOKEN_MISSED: "Invalid response from server. Tokens are missed.",
      LOGIN: {
        TOAST: {
          title: "Đăng nhập thành công!",
          description: "Chào mừng đến với BSK Toeic!",
        },
      },
    },
    CART: {
      TOAST: {
        title: "Successfully!",
        description: "You have already added this product to cart.",
      },
    }
  };
  
  export const ERROR_TOAST = (message: string) => ({
    title: "Error!",
    variant: "destructive" as const,
    description: message,
  });