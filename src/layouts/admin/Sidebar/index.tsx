import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  const [questionsOpen, setQuestionsOpen] = useState(true);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Questions",
      icon: <BookOpen size={20} />,
      submenu: true,
      submenuItems: [
        { title: "Part 1 & 2", path: "/admin/questions/part1-2" },
        { title: "Part 3 & 4", path: "/admin/questions/part3-4" },
        { title: "All Questions", path: "/admin/questions" },
      ],
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-20 pt-16 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => setQuestionsOpen(!questionsOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {questionsOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {questionsOpen && (
                    <ul className="pl-10 space-y-1 mt-1">
                      {item.submenuItems?.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 text-sm ${
                              isActive(subItem.path)
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            } transition-colors rounded-md`}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } transition-colors`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
