import { useState } from "react";
import {
  LayoutDashboard,
  Droplet,
  Type,
  Puzzle,
  MousePointer,
  FileText,
  User,
  LogOut
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutAction } from "../../../api/authApi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState<string>(
    location.pathname || "/admin/dashboard"
  );

  const handleSelect = (path: string) => {
    setSelected(path);
    navigate(path);
  };

  const linkClasses = (path: string) =>
    `flex items-center p-2 cursor-pointer rounded-md mt-2 transition 
     ${selected === path ? "bg-gray-700 text-white" : "text-gray-500 hover:bg-gray-700 hover:text-white"}`;

  const iconClasses = (path: string) =>
    `${selected === path ? "text-white" : "text-gray-500"} w-5 h-5 mr-2 transition`;

  const textClasses = (path: string) =>
    `${selected === path ? "text-white opacity-100" : "text-white opacity-80 group-hover:opacity-100"} transition`;

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-300 p-4">
      <div className="flex items-center space-x-2 text-white text-xl font-semibold mb-6">
        <img
          src="/images/logo/logo_trang.png"
          className="w-[120px] ml-2 cursor-pointer"
          alt="Logo"
        />
      </div>

      <nav>
        <ul>
          {/* Trang chủ */}
          <li className="mb-4">
            <div
              className={linkClasses("/admin/dashboard")}
              onClick={() => handleSelect("/admin/dashboard")}
            >
              <LayoutDashboard className={iconClasses("/admin/dashboard")} />
              <span className={textClasses("/admin/dashboard")}>Trang chủ</span>
              <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-0.5 rounded-md">
                NEW
              </span>
            </div>
          </li>

          <p className="text-gray-500 text-sm uppercase px-2">Đề thi</p>

          {/* Danh sách câu hỏi */}
          <li>
            <div
              className={`group ${linkClasses("/admin/question-list")}`}
              onClick={() => handleSelect("/admin/question-list")}
            >
              <Droplet className={iconClasses("/admin/question-list")} />
              <span className={textClasses("/admin/question-list")}>Danh sách câu hỏi</span>
            </div>
          </li>

          {/* Thêm câu hỏi */}
          <li>
            <div
              className={`group ${linkClasses("/admin/create-question")}`}
              onClick={() => handleSelect("/admin/create-question")}
            >
              <Type className={iconClasses("/admin/create-question")} />
              <span className={textClasses("/admin/create-question")}>Thêm câu hỏi</span>
            </div>
          </li>

          <p className="text-gray-500 text-sm uppercase px-2 mt-4">Quản lý</p>

          {/* Đáp án */}
          <li>
            <div className={`group ${linkClasses("/admin/answers")}`} onClick={() => handleSelect("/admin/answers")}>
              <Puzzle className={iconClasses("/admin/answers")} />
              <span className={textClasses("/admin/answers")}>Đáp án</span>
            </div>
          </li>

          {/* Lịch sử làm bài */}
          <li>
            <div className={`group ${linkClasses("/admin/history")}`} onClick={() => handleSelect("/admin/history")}>
              <MousePointer className={iconClasses("/admin/history")} />
              <span className={textClasses("/admin/history")}>Lịch sử làm bài</span>
            </div>
          </li>

          {/* Forms */}
          <li>
            <div className={`group ${linkClasses("/admin/forms")}`} onClick={() => handleSelect("/admin/forms")}>
              <FileText className={iconClasses("/admin/forms")} />
              <span className={textClasses("/admin/forms")}>Forms</span>
            </div>
          </li>

          <p className="text-gray-500 text-sm uppercase px-2 mt-4">Chế độ</p>

          {/* Trang user */}
          <li>
            <div className={`group ${linkClasses("/")}`} onClick={() => handleSelect("/")}>
              <User className={iconClasses("/")} />
              <span className={textClasses("/")}>Trang User</span>
            </div>
          </li>

          {/* Đăng xuất */}
          <li>
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-md mt-1 text-gray-500 hover:text-white"
              onClick={logoutAction}
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span className="text-white opacity-80 hover:opacity-100">Đăng xuất</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
