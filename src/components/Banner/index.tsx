import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    image: '/images/banner/banner1.png',
    title: 'TỰ TIN FLEX <br /> TIẾNG ANH CÙNG BẠN BÈ',
    desc: 'Nắm vững các ngữ pháp thường được gặp trong tiếng anh.',
    button: 'LÀM BÀI NGAY',
    position: 'left',
  },
  {
    image: '/images/banner/banner2.png',
    title: 'TẠO THÓI QUEN, PHẢN XẠ QUA CÁC BÀI TẬP',
    desc: 'Biết thêm các câu nói phổ biến <br /> mà người bản xứ hay dùng thông qua các bài đọc.',
    button: 'XEM CHI TIẾT',
    position: 'right',
  },
  {
    image: '/images/banner/banner3.png',
    title: 'LẤY GỐC TIẾNG ANH TRONG 1 NỐT NHẠC',
    desc: 'Củng cố kiến thức cơ bản qua các bài tập dễ.',
    button: 'LÀM BÀI NGAY',
    position: 'left',
  },
];

const Banner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    if (current === banners.length - 1) {
      setCurrent(0); // Khi đang ở banner3 -> chuyển về banner1
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (current === 0) {
      setCurrent(banners.length - 1); // Khi đang ở banner1 -> quay về banner3
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div
        className="flex transition-all duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="w-full min-w-full relative h-[400px]"
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className={`absolute ${
                banner.position === 'left' ? 'left-10 text-left' : 'right-10 text-right'
              } px-6 rounded-xl max-w-xl text-white`}
              style={{ top: '80px' }}
            >
              <h2
                className="text-4xl font-bold mb-2 leading-snug"
                dangerouslySetInnerHTML={{ __html: banner.title }}
              />
              <p className="text-lg mb-7" dangerouslySetInnerHTML={{ __html: banner.desc }} />

              <button
                className={`px-5 py-3 rounded-full text-white font-semibold transition transform
                  ${banner.position === 'left' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-500 hover:bg-blue-600'}
                  ${banner.desc.includes('<br') ? 'mt-2' : 'mt-4'}
                  animate-flicker`}
              >
                {banner.button}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nút chuyển */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-4 bg-white p-2 rounded-full shadow cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-4 bg-white p-2 rounded-full shadow cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === current ? 'bg-gray-600 w-8' : 'bg-gray-300 w-4'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
