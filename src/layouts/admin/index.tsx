import { useState, createContext, useContext } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import {
  fetchAdminResource,
  createAdminResource,
  updateAdminResource,
  deleteAdminResource,
} from "../../api/adminApi";

// Create a context for admin API operations
interface AdminApiContextType {
  getResource: <T>(
    resource: string,
    filters?: Record<string, any>
  ) => Promise<T>;
  createResource: <T>(
    resource: string,
    data: Record<string, any>
  ) => Promise<T>;
  updateResource: <T>(
    resource: string,
    id: string,
    data: Record<string, any>
  ) => Promise<T>;
  deleteResource: <T>(resource: string, id: string) => Promise<T>;
  isLoading: boolean;
}

const AdminApiContext = createContext<AdminApiContextType | undefined>(
  undefined
);

// Hook to use the admin API context
export const useAdminApi = () => {
  const context = useContext(AdminApiContext);
  if (!context) {
    throw new Error("useAdminApi must be used within an AdminLayout");
  }
  return context;
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // API operations with loading state management
  const getResource = async <T,>(
    resource: string,
    filters?: Record<string, any>
  ): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await fetchAdminResource(resource, filters);
      return result as T;
    } finally {
      setIsLoading(false);
    }
  };

  const createResource = async <T,>(
    resource: string,
    data: Record<string, any>
  ): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await createAdminResource(resource, data);
      return result as T;
    } finally {
      setIsLoading(false);
    }
  };

  const updateResource = async <T,>(
    resource: string,
    id: string,
    data: Record<string, any>
  ): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await updateAdminResource(resource, id, data);
      return result as T;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteResource = async <T,>(
    resource: string,
    id: string
  ): Promise<T> => {
    setIsLoading(true);
    try {
      const result = await deleteAdminResource(resource, id);
      return result as T;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const apiContextValue: AdminApiContextType = {
    getResource,
    createResource,
    updateResource,
    deleteResource,
    isLoading,
  };

  return (
    <AdminApiContext.Provider value={apiContextValue}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} />

        <div
          className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Header toggleSidebar={toggleSidebar} />

          <main className="flex-1 p-6 mt-16 overflow-y-auto">
            {isLoading && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                  <div className="h-6 w-6 mr-3 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                  <p>Loading...</p>
                </div>
              </div>
            )}
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </AdminApiContext.Provider>
  );
};

export default AdminLayout;
