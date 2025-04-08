import AdminHeader from './Header';
import Sidebar from './Sidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 border-r">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>
      <main className="flex-1 ">
        <AdminHeader />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
