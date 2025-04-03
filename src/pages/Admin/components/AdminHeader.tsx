import React from "react";
import {
  CHeader,
  CHeaderNav,
  CNavItem,
  CNavLink,
  CButton,
  CHeaderToggler,
  CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";
import { Link } from "react-router-dom";
import "../admin.css"; // Import CSS chung

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  return (
    <CHeader position="sticky" className="mb-4 bg-primary text-white shadow-sm">
      <CContainer fluid>
        <CHeaderToggler className="ps-1 text-white" onClick={toggleSidebar}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/admin" component={Link} className="text-white">
              Bảng điều khiển
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              to="/admin/questions/part1"
              component={Link}
              className="text-white"
            >
              Part 1
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              to="/admin/questions/part2"
              component={Link}
              className="text-white"
            >
              Part 2
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              to="/admin/questions/part3"
              component={Link}
              className="text-white"
            >
              Part 3
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              to="/admin/questions/part4"
              component={Link}
              className="text-white"
            >
              Part 4
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <CButton
            color="light"
            onClick={() => (window.location.href = "/signin")}
          >
            Đăng xuất
          </CButton>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AdminHeader;
