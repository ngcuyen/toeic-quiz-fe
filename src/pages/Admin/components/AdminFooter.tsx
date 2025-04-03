import React from "react";
import { CFooter, CLink } from "@coreui/react";
import "../admin.css";
const AdminFooter: React.FC = () => {
  return (
    <CFooter className="bg-light text-muted py-3">
      <div>
        <span className="ms-1">
          Quản lý TOEIC Quiz © {new Date().getFullYear()}
        </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Được cung cấp bởi</span>
        <CLink href="https://coreui.io/react" target="_blank">
          CoreUI
        </CLink>
      </div>
    </CFooter>
  );
};

export default AdminFooter;
