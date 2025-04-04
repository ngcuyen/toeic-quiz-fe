import React, { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [active, setActive] = useState("TRANG CHỦ");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    { name: "TRANG CHỦ", path: "/" },
    { name: "ĐỀ THI", path: "/exams" },
    { name: "LỊCH SỬ LÀM BÀI", path: "/history-exam" },
    { name: "LIÊN HỆ", path: "/contact" },
  ];

  return (
    <div className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* Menu bên trái */}
        <div className="flex items-center gap-8">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setActive(item.name);
                navigate(item.path);
              }}
              className={`cursor-pointer font-semibold uppercase ${
                active === item.name ? "text-orange-600" : "text-black"
              } hover:text-orange-600`}
            >
              {item.name}
            </div>
          ))}

          {/* Luyện tập Dropdown */}
          <div className="relative">
            <div
              onClick={() => {
                setActive("LUYỆN TẬP");
                setShowDropdown(!showDropdown);
              }}
              className={`cursor-pointer font-semibold uppercase flex items-center ${
                active === "LUYỆN TẬP" ? "text-orange-600" : "text-black"
              } hover:text-orange-600`}
            >
              LUYỆN TẬP
              <ChevronDown className="w-4 h-4 ml-1" />
            </div>

            {showDropdown && (
              <div className="absolute top-full mt-2 w-48 text-[15px] bg-white border border-gray-300 shadow rounded">
                {["Ngữ pháp", "Nghe", "Đọc hiểu", "Viết bài luận"].map(
                  (option) => (
                    <div
                      key={option}
                      className="px-4 py-[10px] hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Notification Bell */}
        <div className="relative cursor-pointer mr-2">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
