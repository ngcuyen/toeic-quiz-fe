import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilPuzzle,
  cilSpeech,
  cilHeadphones,
  cilSettings,
} from "@coreui/icons";
import "../admin.css";

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);

  return (
    <CSidebar
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      className="admin-sidebar"
    >
      <CSidebarBrand className="d-md-flex">
        <span>TOEIC Admin</span>
      </CSidebarBrand>

      <CSidebarNav>
        <CNavItem>
          <CNavLink
            as={Link} // Sử dụng 'as' thay vì 'component'
            to="/admin"
            active={location.pathname === "/admin"}
          >
            <CIcon icon={cilSpeedometer} className="me-2" />
            Dashboard
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            as={Link}
            to="/admin/questions/part1"
            active={location.pathname.includes("/admin/questions/part1")}
          >
            <CIcon icon={cilPuzzle} className="me-2" />
            Part 1 Questions
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            as={Link}
            to="/admin/questions/part2"
            active={location.pathname.includes("/admin/questions/part2")}
          >
            <CIcon icon={cilSpeech} className="me-2" />
            Part 2 Questions
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            as={Link}
            to="/admin/questions/part3"
            active={location.pathname.includes("/admin/questions/part3")}
          >
            <CIcon icon={cilHeadphones} className="me-2" />
            Part 3 Questions
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            as={Link}
            to="/admin/questions/part4"
            active={location.pathname.includes("/admin/questions/part4")}
          >
            <CIcon icon={cilHeadphones} className="me-2" />
            Part 4 Questions
          </CNavLink>
        </CNavItem>

        <CNavItem>
          <CNavLink
            as={Link}
            to="/admin/settings"
            active={location.pathname === "/admin/settings"}
          >
            <CIcon icon={cilSettings} className="me-2" />
            Settings
          </CNavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default AdminSidebar;
