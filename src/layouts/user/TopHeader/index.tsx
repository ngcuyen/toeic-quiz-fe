import { User, LogIn, Search, ChevronDown, LogOut, Settings } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../api/authApi";

const TopHeader = () => {
  const user = useAuthStore((state) => state.user);
  // const isAdmin = user?.role === "Admin";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Sự kiện đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="bg-white pt-1 pb-3 text-gray-800 text-sm">
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* <div className="text-orange-600 font-bold text-lg">TOEIC® Test Pro</div> */}
        <img
          src="/images/logo/logo_den.png" // Logo của bạn
          className="w-[100px] cursor-pointer"
          onClick={() => navigate("/")}
          alt="Logo"
        />

        {/* Search */}
        <div className="flex items-center w-96 bg-white rounded-full border border-gray-300 px-4 py-1  shadow-sm">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi, đề thi,..."
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-500 bg-transparent"
          />
        </div>

        {/* Right: Đăng ký & Đăng nhập */}
        <div className="flex items-center gap-6">
          { !user ? (
            <>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-indigo-800"
              >
                <User className="w-4 h-4 text-gray-900" />
                <span>Đăng ký</span>
              </a>

              {/* Divider */}
              <div className="h-4 w-px bg-gray-400 opacity-40"></div>

              {/* Đăng nhập */}
              <a
                href="/login"
                className="flex items-center gap-2 text-orange-600 px-3 py-1 border border-gray-600 rounded-md 
                hover:bg-orange-600 hover:text-white transition hover:border-orange-400 outline-none hover:ring-1 hover:ring-orange-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập</span>
              </a>            
            </>
          ): (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                <img
                  src={"/images/avatar/avatar.png"} // Avatar mặc định nếu không có ảnh
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="text-gray-900 font-bold pl-1">{user.fullname}</span>
                <ChevronDown className="w-4 h-4 text-gray-900 font-bold relative top-[1px]" />                
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                  <ul>
                    <li>
                      <button 
                        onClick={() => navigate("/")}
                        className="flex w-full items-center px-4 pt-4 pb-3 text-gray-700 hover:bg-gray-100 hover:font-medium hover:text-orange-600"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Hồ sơ
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => navigate("/")} 
                        className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:font-medium hover:text-orange-600"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Cài đặt
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          logoutAction();
                        }}
                        className="flex w-full items-center px-4 pt-3 pb-4 text-red-600 hover:bg-gray-100 hover:font-medium"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
