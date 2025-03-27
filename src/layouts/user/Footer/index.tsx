import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, TicketIcon, PrinterIcon, ThumbsUpIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF8F4] text-black py-10 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-orange-600">TOEIC® Test Pro</h1>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-semibold border-b-2 border-orange-600 inline-block mb-4">Company</h2>
          <ul className="space-y-2">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="font-semibold border-b-2 border-orange-600 inline-block mb-4">Legal</h2>
          <ul className="space-y-2">
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>

        {/* Contact - Social */}
        <div>
          <h2 className="font-semibold border-b-2 border-orange-600 inline-block mb-4">Contact</h2>
          <div className="flex flex-wrap gap-3 text-white">
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Facebook size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><TicketIcon size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Instagram size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Youtube size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><Twitter size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><PrinterIcon size={18} /></div>
            <div className="bg-orange-600 rounded-full p-2 cursor-pointer"><ThumbsUpIcon size={18} /></div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-600">
        TOEIC® is a registered trademark of Educational Testing Service (ETS). This web is not affiliated with or endorsed by Educational Testing Service.
      </div>

    </footer>
  );
};

export default Footer;
