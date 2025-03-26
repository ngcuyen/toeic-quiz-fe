import { User, LogIn, Search } from "lucide-react";
import React from "react";

const TopHeader = () => {
  return (
    <div className="bg-white pt-4 pb-3 text-gray-800 text-sm">
      <div className="container mx-auto flex justify-between items-center px-8">
        <div className="text-orange-600 font-bold text-lg">TOEIC® Test Pro</div>

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
          {/* Đăng ký */}
          <a
            href="https://itcoder.hutech.edu.vn/site/signup"
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
            hover:bg-orange-600 hover:text-white transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng nhập</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
