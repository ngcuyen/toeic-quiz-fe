import { FileText, HelpCircle, Eye, ClockFading } from "lucide-react";

interface QuestionTypeCardProps {
    part: string;
    title: string;
    exercises: number;
    time: number;
    views: number;
    completed: number;
    total: number;
    color: string; // Thêm thuộc tính color
    questionIds: string[];
    onClick: () => void;
  }
  
  const QuestionTypeCard: React.FC<QuestionTypeCardProps> = ({
    part,
    title,
    exercises,
    time,
    views,
    completed,
    total,
    color, // Nhận color từ props
    questionIds,
    onClick,
  }) => {

    return (
      <div 
        className={`relative w-[266px] rounded-2xl shadow-md cursor-pointer`}
        onClick={onClick}
      >
        {/* Phần tiêu đề được đẩy lên trên */}
        <div className={`absolute top-0 left-0 w-full text-center min-h-[135px] flex flex-col justify-center ${color} rounded-t-2xl`}>
          <h2 className="text-xl font-bold text-white">{part}</h2>
          <p className="text-sm text-white font-medium">TOEIC READING</p>
        </div>

        {/* Nội dung chính */}
        <div className="bg-white p-4 pt-[150px] rounded-2xl shadow-sm">
          <h3 className="text-lg font-bold text-dark">{title}</h3>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 text-gray-700">
              <FileText className="text-orange-500" size={18} />
              <span className="font-bold text-orange-500">{exercises}</span> bài tập
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <HelpCircle className="text-orange-500" size={18} />
              <span className="font-bold text-orange-500">{questionIds.length}</span> câu hỏi
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <ClockFading  className="text-orange-500" size={18} />
              <span className="font-bold text-orange-500">{time}</span> phút
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Eye className="text-orange-500" size={18} />
              <span className="font-bold text-orange-500">{views}</span> lượt xem
            </div>
          </div>
          <div className="mt-4 h-1 bg-gray-200 rounded-full">
            <div
              className="h-1 bg-green-500 rounded-full"
              style={{ width: `${(completed / total) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-green-600 font-bold mt-2">
            {completed}/{total} bài hoàn thành
          </p>
        </div>
      </div>
    );
  };
  
  export default QuestionTypeCard;
  