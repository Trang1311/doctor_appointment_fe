"use client";
import Layout from "@/components/layout_nofooter";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gray-50 font-roboto p-5 md:p-10">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-10 rounded-lg shadow-lg mb-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-4">
                Chào mừng đến với SoulCare
              </h1>
              <p className="text-lg leading-relaxed">
                SoulCare - Nền tảng chăm sóc sức khỏe tinh thần tiên phong, nơi
                bạn tìm thấy sự đồng cảm, an yên và giải pháp cá nhân hóa.
              </p>
            </div>
            <div className="flex-1 mt-5 md:mt-0 flex justify-center">
              <img
                src="/content/logo/lotus.png"
                alt="SoulCare Hero"
                className="rounded-lg  w-[240px] h-[240px] ml-[480px] max-w-full"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-5 md:p-10 mb-10">
          <div className="flex-1 p-5 flex justify-center items-center">
            <img
              src="/content/panel/about2.jpg"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
          <div className="flex-1 p-5 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-5 text-indigo-600">
              Về SoulCare
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              SoulCare là nền tảng chăm sóc sức khỏe tinh thần tiên phong, được
              xây dựng bởi đội ngũ chuyên gia tận tâm trong lĩnh vực tâm lý và
              công nghệ. Chúng tôi không chỉ mang đến những giải pháp hỗ trợ cá
              nhân hóa mà còn tạo ra một không gian an toàn, nơi bạn có thể chia
              sẻ, lắng nghe, và tìm thấy sự đồng cảm. Với SoulCare, sức khỏe
              tinh thần của bạn luôn là ưu tiên hàng đầu.
            </p>
          </div>
        </section>

        {/* SoulCare2 Section */}
        <section className="flex flex-col md:flex-row-reverse bg-white rounded-lg shadow-md p-5 md:p-10 mb-10">
          <div className="flex-1 p-5 flex justify-center items-center">
            <img
              src="https://www.mindalife.vn/wp-content/uploads/2020/04/Tu-van-tam-ly-Giup-ban-hanh-phuc-va-thanh-cong-trong-cuoc-song.jpg"
              alt="SoulCare2"
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
          <div className="flex-1 p-5 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-5 text-pink-600">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Chúng tôi hướng tới việc tạo ra một không gian hỗ trợ sức khỏe
              tinh thần toàn diện. Với những công nghệ tiên tiến và đội ngũ
              chuyên gia giàu kinh nghiệm, chúng tôi cam kết mang đến những giải
              pháp hiệu quả và cá nhân hóa. Hãy cùng nhau khám phá hành trình
              hướng tới sự bình an và phát triển bản thân!
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white rounded-lg shadow-md p-5 md:p-10 mb-10">
          <h2 className="text-3xl font-bold mb-5 text-indigo-600 text-center">
            Đội Ngũ Chuyên Gia
          </h2>
          <div className="flex justify-around flex-wrap">
            <div className="text-center mx-2 mb-5">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
                alt="Member 1"
                className="w-36 h-36 rounded-full object-cover shadow-lg mb-2"
              />
              <h3 className="text-lg font-semibold">Dr. Nguyễn Văn A</h3>
              <p className="text-gray-600">Chuyên gia tâm lý</p>
            </div>
            <div className="text-center mx-2 mb-5">
              <img
                src="https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=926&fit=clip"
                alt="Member 2"
                className="w-36 h-36 rounded-full object-cover shadow-lg mb-2"
              />
              <h3 className="text-lg font-semibold">Dr. Trần Thị B</h3>
              <p className="text-gray-600">Chuyên gia trị liệu</p>
            </div>
            {/* Add more members as needed */}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-white rounded-lg shadow-lg p-5 md:p-10">
          <h2 className="text-3xl font-bold mb-5 text-center text-pink-600">
            Thống Kê Nổi Bật
          </h2>
          <div className="flex justify-around text-center">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-indigo-600">100K+</span>
              <span className="text-sm text-gray-600">Người dùng toàn cầu</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-indigo-600">30%</span>
              <span className="text-sm text-gray-600">
                Tỷ lệ tiết kiệm tối đa
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-indigo-600">$100M</span>
              <span className="text-sm text-gray-600">Vốn huy động</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold text-indigo-600">60+</span>
              <span className="text-sm text-gray-600">Bác sĩ</span>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
