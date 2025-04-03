import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import "../admin.css";
const Dashboard: React.FC = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm">
          <CCardHeader className="bg-primary text-white">
            <h4>Bảng điều khiển Quản lý TOEIC</h4>
          </CCardHeader>
          <CCardBody>
            <p>Chào mừng bạn đến với Bảng điều khiển Quản lý TOEIC Quiz.</p>
            <p>Từ đây, bạn có thể quản lý các câu hỏi TOEIC và xem dữ liệu.</p>
            <p>
              Sử dụng thanh điều hướng bên trái để chuyển đến các phần khác
              nhau.
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Dashboard;
