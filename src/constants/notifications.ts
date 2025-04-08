import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  export const ERROR_TOAST = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  export const SUCCESS_TOAST = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };