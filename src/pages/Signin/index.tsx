import { Check, Facebook, Mail } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "../../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "../../api/authApi";
import { NOTIFICATIONS } from "../../constants/notifications";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/userApi";
import { toast, ToastContainer } from "react-toastify";
import { DotLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser); // Get setUser from useAuthStore
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Hàm xử lý submit form
  async function onSubmit(data: LoginType) {
    try {
      setLoading(true);
      await loginAction(data); // Call loginAction with data
      const userData = await getProfile(); // Get user data
      setUser(userData); // Set user data to the store
      // toast.success("Đăng nhập thành công!", {
      //   autoClose: 2000, // Thời gian hiển thị là 2 giây
      // });
      navigate("/"); // Navigate to the Home page
    } catch (error: unknown) {
      const errorMessage =
        (error as Error).message || NOTIFICATIONS.ERROR.UNDEFINED;
      toast(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80" style={{
        backgroundImage: "url('/images/signin/signin3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white text-gray-900 w-[750px] shadow-lg rounded-lg flex"
        >
          {/* Left Side - Sign In Form */}
          <div className="w-1/2 p-8">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-2xl font-semibold">Đăng nhập</h2>
              <div className="flex justify-center space-x-3">
                <button className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-white">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-white">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
            <label className="block text-sm font-medium mb-1">EMAIL</label>
            <input 
              type="text" 
              placeholder="Nhập Email" 
              {...form.register("email")}
              className="w-full px-3 py-2 mt-1 bg-gray-100 border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none" />
            <label className="block mt-6 text-sm font-medium mb-1">MẬT KHẨU</label>
            <input 
              type="password" 
              placeholder="Nhập mật khẩu" 
              {...form.register("password")}
              className="w-full px-3 py-2 mt-1 bg-gray-100 border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none" />
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setRemember(!remember)}>
                <div className={`w-4 h-4 flex items-center justify-center border ${remember ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`}>
                  {remember && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="text-sm text-orange-600">Nhớ mật khẩu</span>
              </div>
              <a href="#" className="text-sm text-gray-500">Quên mật khẩu</a>
            </div>
            {loading ? (
              <div className="w-full flex justify-center">
                <DotLoader color="#33C23F" size={50} />
              </div>
            ) : (          
              <button 
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded-md mt-6 mb-2 hover:bg-orange-700">
                  Đăng nhập
              </button>
            )}
          </div>
          {/* Right Side - Welcome Message */}
          <div className="w-1/2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white flex flex-col justify-center items-center p-6 rounded-r-lg">
            <h2 className="text-2xl font-semibold">Chào mừng đến BSK Toeic</h2>
            <p className="text-base mt-1">Bạn có tài khoản chưa?</p>
            <button className="mt-5 px-6 py-2 border border-white rounded-full text-white hover:bg-white hover:text-orange-600">Đăng ký ngay</button>
          </div>
        </form>
      </div>
    </>
  );
}


export default Signin;