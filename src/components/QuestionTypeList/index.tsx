import QuestionTypeCard from "../QuestionTypeCard";

const QuestionTypeList = () => {
  const questionTypes = [
    {
      part: "Part 1",
      title: "Mô tả tranh",
      exercises: 22,
      questions: 174,
      lessons: 4,
      views: 50742,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-red-300 to-red-500"
    },
    {
      part: "Part 2",
      title: "Hỏi - Đáp",
      exercises: 22,
      questions: 550,
      lessons: 4,
      views: 54892,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-purple-300 to-purple-500"
    },
    {
      part: "Part 3",
      title: "Đoạn hội thoại",
      exercises: 22,
      questions: 858,
      lessons: 4,
      views: 38140,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-yellow-300 to-yellow-500"
    },
    {
      part: "Part 4",
      title: "Bài nói ngắn",
      exercises: 22,
      questions: 660,
      lessons: 4,
      views: 12149,
      completed: 0,
      total: 26,
      color: "bg-gradient-to-b from-blue-300 to-blue-500"
    }
  ];

  return (
    <div className="container mx-auto max-w-7xl py-6 px-8">
      <h2 className="text-3xl font-bold mb-10">Luyện READING
      <span className="w-[120px] h-1 bg-orange-500 mt-1 block"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[58px]">
        {questionTypes.map((item, index) => (
          <QuestionTypeCard
            key={index}
            part={item.part}
            title={item.title}
            exercises={item.exercises}
            questions={item.questions}
            lessons={item.lessons}
            views={item.views}
            completed={item.completed}
            total={item.total}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionTypeList;
