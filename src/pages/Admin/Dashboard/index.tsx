import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, BarChart2 } from "lucide-react";
import {
  getAllQuestions,
  getQuestionsByPart,
} from "../../../mocks/questions.mock";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    part1Questions: 0,
    part2Questions: 0,
    part3Passages: 0,
    part4Passages: 0,
    recentlyAdded: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get dashboard stats
    setLoading(true);
    setTimeout(() => {
      const allQuestions = getAllQuestions();
      const part1 = getQuestionsByPart("Part 1");
      const part2 = getQuestionsByPart("Part 2");
      const part3 = getQuestionsByPart("Part 3");
      const part4 = getQuestionsByPart("Part 4");

      // Calculate total questions including those in passages
      let totalCount = 0;
      allQuestions.forEach((q) => {
        if ("passageText" in q) {
          totalCount += q.questions.length;
        } else {
          totalCount += 1;
        }
      });

      // Get questions added in the last 7 days
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const recentlyAdded = allQuestions.filter((q) => {
        if (!q.createdAt) return false;
        const createdDate = new Date(q.createdAt);
        return createdDate > oneWeekAgo;
      }).length;

      setStats({
        totalQuestions: totalCount,
        part1Questions: part1.length,
        part2Questions: part2.length,
        part3Passages: part3.length,
        part4Passages: part4.length,
        recentlyAdded,
      });

      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Questions"
          value={stats.totalQuestions}
          icon={<BookOpen size={24} />}
          color="bg-blue-600"
        />
        <StatCard
          title="Part 1 Questions"
          value={stats.part1Questions}
          icon={<BookOpen size={24} />}
          color="bg-green-600"
        />
        <StatCard
          title="Part 2 Questions"
          value={stats.part2Questions}
          icon={<BookOpen size={24} />}
          color="bg-yellow-600"
        />
        <StatCard
          title="Recently Added"
          value={stats.recentlyAdded}
          icon={<Clock size={24} />}
          color="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Question Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Part 1
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {stats.part1Questions}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (stats.part1Questions / stats.totalQuestions) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Part 2
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {stats.part2Questions}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (stats.part2Questions / stats.totalQuestions) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Part 3
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {stats.part3Passages}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-yellow-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (stats.part3Passages / stats.totalQuestions) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    Part 4
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {stats.part4Passages}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (stats.part4Passages / stats.totalQuestions) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/admin/questions/part1-2/create"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="p-2 bg-blue-600 rounded-full text-white mr-3">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-medium">Add Part 1 & 2</h3>
                <p className="text-sm text-gray-600">Create new questions</p>
              </div>
            </Link>
            <Link
              to="/admin/questions/part3-4/create"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="p-2 bg-green-600 rounded-full text-white mr-3">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-medium">Add Part 3 & 4</h3>
                <p className="text-sm text-gray-600">Create new passages</p>
              </div>
            </Link>
            <Link
              to="/admin/questions"
              className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <div className="p-2 bg-yellow-600 rounded-full text-white mr-3">
                <BarChart2 size={20} />
              </div>
              <div>
                <h3 className="font-medium">Manage Questions</h3>
                <p className="text-sm text-gray-600">View and edit questions</p>
              </div>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="p-2 bg-purple-600 rounded-full text-white mr-3">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-medium">Settings</h3>
                <p className="text-sm text-gray-600">
                  Manage application settings
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
