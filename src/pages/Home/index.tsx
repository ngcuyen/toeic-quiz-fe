import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Banner from "../../components/Banner";
import Feature from "../../components/Feature";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Banner />
      <Feature />

      {/* Nút Lên Đầu Trang */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all hover:bg-orange-700 z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Home;
