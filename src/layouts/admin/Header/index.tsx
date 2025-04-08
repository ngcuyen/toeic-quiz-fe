import { Menu, Bell, UserCircle, Settings2 } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-white border-b shadow-sm mb-8">
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer" />
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
        <Settings2 className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
        <UserCircle className="w-8 h-8 text-gray-600 hover:text-gray-800 cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminHeader;
