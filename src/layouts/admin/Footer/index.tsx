const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} TOEIC Quiz Admin. All rights reserved.
          </p>
        </div>
        <div className="text-gray-500 text-sm">
          <span>Version 1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
