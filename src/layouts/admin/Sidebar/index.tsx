import { useState } from "react";
import { 
  LayoutDashboard, Droplet, Type, Puzzle, MousePointer, FileText,
  User,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../api/authApi";

const Sidebar = () => {
  const [ , setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-300 p-4">
      <div className="flex items-center space-x-2 text-white text-xl font-semibold mb-6">
      <img
          src="/images/logo/logo_trang.png" // Logo của bạn
          className="w-[120px] ml-2 cursor-pointer"
          alt="Logo"
        />
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <button className="flex items-center w-full p-2 rounded-md bg-gray-800 text-white">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              Trang chủ
              <span className="ml-auto bg-blue-500 text-xs px-2 py-0.5 rounded-md">NEW</span>
            </button>
          </li>
          <p className="text-gray-500 text-sm uppercase px-2">Đề thi</p>
          <li className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-2">
            <Droplet className="w-5 h-5 mr-2" /> Danh sách câu hỏi
          </li>
          <li className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-1">
            <Type className="w-5 h-5 mr-2" /> Thêm câu hỏi
          </li>
          <p className="text-gray-500 text-sm uppercase px-2 mt-4">Quản lý</p>
          <li className="mt-2">
            <button 
              className="flex items-center w-full p-2 cursor-pointer hover:bg-gray-700 rounded-md"
              onClick={() => toggleMenu("base")}
            >
              <Puzzle className="w-5 h-5 mr-2" /> Đáp án
            </button>
          </li>
          <li className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-1">
            <MousePointer className="w-5 h-5 mr-2" /> Lịch sử làm bài
          </li>
          <li className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-1">
            <FileText className="w-5 h-5 mr-2" /> Forms
          </li>
          <p className="text-gray-500 text-sm uppercase px-2 mt-4">Chế độ</p>
          <li 
            className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-2"
            onClick={() => navigate("/")}
          >
            <User className="w-5 h-5 mr-2" /> Trang User
          </li>
          <li 
            className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-1"
            onClick={() => logoutAction()}
          >
            <LogOut className="w-5 h-5 mr-2" /> Đăng xuất
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
