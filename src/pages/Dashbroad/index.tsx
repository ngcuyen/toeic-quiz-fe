import React from "react";
import {
  Users,
  FileText,
  ListChecks,
  Clock,
  BookOpen,
} from "lucide-react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const chartData = [
  { name: "Thứ 2", tests: 12 },
  { name: "Thứ 3", tests: 18 },
  { name: "Thứ 4", tests: 22 },
  { name: "Thứ 5", tests: 9 },
  { name: "Thứ 6", tests: 15 },
  { name: "Thứ 7", tests: 30 },
  { name: "CN", tests: 20 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <DashboardCard title="Người dùng" value="1,234" icon={<Users className="w-7 h-7 text-blue-600" />} />
        <DashboardCard title="Bài thi" value="87" icon={<FileText className="w-7 h-7 text-green-600" />} />
        <DashboardCard title="Câu hỏi" value="2,345" icon={<ListChecks className="w-7 h-7 text-yellow-500" />} />
        <DashboardCard title="Thời gian trung bình" value="12:45 phút" icon={<Clock className="w-7 h-7 text-purple-600" />} />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Lượt thi theo tuần</h2>
          <span className="text-sm text-gray-400">Dữ liệu demo</span>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tests" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">📌 Hoạt động gần đây</h2>
        <ul className="space-y-3">
          <ActivityItem
            icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
            message="Người dùng <strong>Nguyễn Văn A</strong> đã hoàn thành bài thi Reading Test 01"
          />
          <ActivityItem
            icon={<Users className="w-5 h-5 text-pink-600" />}
            message="Admin đã thêm mới <strong>5 người dùng</strong>"
          />
          <ActivityItem
            icon={<ListChecks className="w-5 h-5 text-yellow-600" />}
            message="Đã cập nhật <strong>10 câu hỏi</strong> trong Part 3"
          />
        </ul>
      </div>

      {/* Recent Users */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">👤 Người dùng mới</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-6">Tên</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Ngày đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Nguyễn Văn A", email: "a@gmail.com", date: "2025-04-08" },
                { name: "Trần Thị B", email: "b@gmail.com", date: "2025-04-07" },
                { name: "Lê Văn C", email: "c@gmail.com", date: "2025-04-06" },
              ].map((user, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Dashboard Card Component
type DashboardCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <div className="p-5 bg-white shadow-sm border rounded-2xl flex items-center justify-between hover:shadow-lg transition">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};

// Activity Item Component
type ActivityItemProps = {
  icon: React.ReactNode;
  message: string;
};

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, message }) => (
  <li className="flex items-start gap-3 p-4 bg-white shadow-sm border rounded-lg">
    <div className="mt-1">{icon}</div>
    <div
      className="text-gray-700 text-sm"
      dangerouslySetInnerHTML={{ __html: message }}
    />
  </li>
);

export default Dashboard;
