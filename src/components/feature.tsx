import React from "react";
import { FaAward, FaCogs, FaEye, FaUserTie } from "react-icons/fa";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="relative pl-16">
    <dt className="text-base/7 font-semibold text-gray-900">
      <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
        {icon}
      </div>
      {title}
    </dt>
    <dd className="mt-2 text-base/7 text-gray-600">{description}</dd>
  </div>
);

interface FeatureListProps {
  features: FeatureProps[];
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => (
  <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
    {features.map((feature, index) => (
      <Feature key={index} {...feature} />
    ))}
  </dl>
);

const FeatureSection: React.FC = () => {
  const features: FeatureProps[] = [
    {
      icon: <FaEye className="size-6 text-white" />,
      title: "Tầm nhìn và Sứ mệnh",
      description:
        "SoulCare hướng tới việc trở thành nền tảng hàng đầu về chăm sóc sức khỏe tinh thần, nơi mọi người có thể tìm thấy sự hỗ trợ, thấu hiểu và giải pháp cho những khó khăn trong cuộc sống.",
    },
    {
      icon: <FaUserTie className="size-6 text-white" />,
      title: "Đội ngũ Chuyên gia",
      description:
        "Đội ngũ SoulCare gồm các chuyên gia hàng đầu về công nghệ, y học và tâm lý học, tất cả đều làm việc với một mục tiêu chung: chăm sóc sức khỏe tinh thần của bạn một cách tốt nhất.",
    },
    {
      icon: <FaCogs className="size-6 text-white" />,
      title: "Công nghệ Tiên tiến",
      description:
        "Chúng tôi ứng dụng công nghệ tiên tiến như trí tuệ nhân tạo, dữ liệu lớn để cá nhân hóa trải nghiệm và đảm bảo bạn nhận được sự hỗ trợ phù hợp nhất.",
    },
    {
      icon: <FaAward className="size-6 text-white" />,
      title: "Cam kết Chất lượng",
      description:
        "SoulCare cam kết mang đến dịch vụ chất lượng cao, bảo mật thông tin và trải nghiệm tốt nhất để bạn luôn cảm thấy an tâm khi sử dụng.",
    },
  ];

  return (
    <div className="py-0 px-4">
      <div className="mx-auto max-w-full px-4 lg:px-6 rounded-xl border bg-white p-20">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-blue-600">SoulCare</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Những điều bạn cần biết về SoulCare
          </p>
          <p className="mt-6 text-xxl text-gray-600">
            SoulCare không chỉ là một nền tảng trực tuyến, mà còn là người bạn
            đồng hành trong hành trình chăm sóc sức khỏe tinh thần của bạn.
            Chúng tôi tin rằng mọi người đều xứng đáng được lắng nghe, thấu
            hiểu, và nhận được sự hỗ trợ phù hợp nhất.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <FeatureList features={features} />
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
