import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, TicketIcon, ThumbsUpIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF8F4] text-black py-10 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <img
          src="/images/logo/logo_den.png" // Logo của bạn
          className="w-[160px]"
          alt="Logo"
        />

        {/* Company */}
        <div>
          <h2 className="font-semibold border-b-2 border-orange-600 inline-block mb-4">Hệ thống</h2>
          <ul className="space-y-2">
            <li><a href="#">Về chúng tôi</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Đề thi</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="font-semibold border-b-2 border-orange-600 inline-block mb-4">Quyền</h2>
          <ul className="space-y-2">
            <li><a href="#">Terms</a></li>
            <li><a href="#">Chính sách</a></li>
          </ul>
        </div>

        {/* Contact - Social */}
        <div>
          <h2 className="font-semibold border-b-2 border-orange-600 inline-block mb-4">Liên hệ qua</h2>
          <div className="flex flex-wrap gap-3 text-white">
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Facebook size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><TicketIcon size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Instagram size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Youtube size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Twitter size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><ThumbsUpIcon size={18} /></div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-600">
        BSK Toeic là một hệ thống test kỹ năng Toeic Reading dựa theo các câu hỏi theo đề thi thực tế được thu thập từ các nguồn đáng tin cậy.
      </div>

    </footer>
  );
};

export default Footer;
