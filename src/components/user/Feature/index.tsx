import React from "react";

const features = [
  {
    image: "/images/feature/fea1.png",
    title: "Thuận tiện",
    description:
      "Bạn có thể làm bài thi mọi lúc, mọi nơi, chỉ cần một thiết bị có kết nối với Internet",
  },
  {
    image: "/images/feature/fea2.png",
    title: "Nhanh chóng",
    description:
      "Kết quả được hiển thị ngay sau khi hoàn thành bài kiểm tra",
  },
  {
    image: "/images/feature/fea3.png",
    title: "Chuẩn quốc tế",
    description:
      "Các bài test được dựa trên cấu trúc bài thi đánh giá năng lực TOEIC thực tế.",
  },
];

const Feature: React.FC = () => {
  return (
    <section className="text-center py-12 px-4">
      <h2 className="text-3xl font-bold mb-12 text-orange-600">
        Các điểm nổi bật khi làm bài trên BSK Toeic
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-[88px]">
        {features.map((feature, index) => (
          <div key={index} className="max-w-xs text-center">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-[150px] mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;