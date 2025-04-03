import React, { useState } from "react";
import {
  CSidebar,
  CSidebarNav,
  CNavItem,
  CNavLink,
  CSidebarBrand,
} from "@coreui/react";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Outlet } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilSpeedometer, cilList } from "@coreui/icons";
import "../admin.css";

const AdminLayout: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="c-app">
      <CSidebar
        className="admin-sidebar"
        visible={sidebarVisible}
        onVisibleChange={(visible) => setSidebarVisible(visible)}
      >
        <CSidebarBrand>Quản lý TOEIC</CSidebarBrand>
        <CSidebarNav>
          <CNavItem>
            <CNavLink
              to="/admin"
              as={React.forwardRef<HTMLAnchorElement>((props, ref) => (
                <a {...props} ref={ref} />
              ))}
            >
              <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
              Bảng điều khiển
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/admin/questions/part1">
              <CIcon icon={cilList} customClassName="nav-icon" />
              Câu hỏi Part 1
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/admin/questions/part2">
              <CIcon icon={cilList} customClassName="nav-icon" />
              Câu hỏi Part 2
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/admin/questions/part3">
              <CIcon icon={cilList} customClassName="nav-icon" />
              Câu hỏi Part 3
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/admin/questions/part4">
              <CIcon icon={cilList} customClassName="nav-icon" />
              Câu hỏi Part 4
            </CNavLink>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
      <div className="c-wrapper">
        <AdminHeader toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <div className="c-body">
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
