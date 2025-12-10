import React from 'react';

import bannerAbout from '../assets/image/bannerAbout.png';
import thocattoc from '../assets/image/thocattoc.png';
import teamus from '../assets/image/teamus.png';
import HeroOther from '../Components/HeroOther';

export default function About() {
  return (
    <main className="bg-white text-neutral-800">
      {/* Phần 1: Giới thiệu (HeroSection tái sử dụng) */}
      <HeroOther
        title="Về Elite Barber"
        subtitle="Hơn 10 năm định hình phong cách nam giới Việt"
        image={bannerAbout}
      />

      {/* Phần 2: Câu chuyện */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Câu chuyện của chúng tôi</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Elite Barber được thành lập vào năm 2014 với sứ mệnh mang đến trải nghiệm cắt tóc và chăm sóc nam giới đẳng cấp quốc tế ngay tại Việt Nam.
              Chúng tôi tin rằng mỗi người đàn ông đều xứng đáng có được một phong cách riêng biệt, tự tin và đẳng cấp.
            </p>
            <p className="text-sm text-gray-700 mt-4 leading-relaxed">
              Với đội ngũ thợ giàu kinh nghiệm được đào tạo bài bản, không gian sang trọng và sản phẩm cao cấp,
              chúng tôi đã phục vụ hơn 5000 khách hàng — mỗi người đều mang theo một câu chuyện và phong cách riêng.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li>✔ Đội ngũ thợ tay nghề cao với chứng chỉ quốc tế</li>
              <li>✔ Sản phẩm chính hãng từ các thương hiệu hàng đầu</li>
              <li>✔ Không gian sang trọng, hiện đại và riêng tư</li>
              <li>✔ Cam kết vệ sinh, an toàn tuyệt đối</li>
            </ul>
            <div className="mt-6 text-orange-500 font-bold text-lg">★ 4.9</div>
            <p className="text-sm text-gray-600">Đánh giá từ 5000+ khách hàng</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src={thocattoc}
              alt="Thợ cắt tóc"
              className="rounded-xl shadow-md object-cover h-48 w-full"
            />
            <img
              src={teamus}
              alt="Đội ngũ Elite Barber"
              className="rounded-xl shadow-md object-cover h-48 w-full"
            />
            <img
              src="https://manhnguyen.com/wp-content/uploads/2022/07/%E2%80%9Cbest-barber-viet-nam%E2%80%9D-2022-da-nang-tam-%E2%80%9Cbarber%E2%80%9D-tro-thanh-truong-phai-nghe-thuat-sang-tao-thuc-thu-4.jpg"
              alt="Không gian tiệm"
              className="rounded-xl shadow-md object-cover h-48 w-full col-span-2"
            />
          </div>
        </div>
      </section>

      {/* Phần 3: Giá trị cốt lõi */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-orange-500 mb-2">Giá trị cốt lõi</h2>
          <p className="text-sm text-gray-600 mb-10">
            Những giá trị mà chúng tôi luôn theo đuổi trong mọi dịch vụ
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left text-sm">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded shadow-sm">
              <h3 className="font-bold text-orange-600 mb-2">Sứ mệnh</h3>
              <p>
                Mang đến trải nghiệm cắt tóc và chăm sóc nam giới đẳng cấp quốc tế,
                giúp mỗi khách hàng tự tin với diện mạo hoàn hảo.
              </p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded shadow-sm">
              <h3 className="font-bold text-orange-600 mb-2">Chất lượng</h3>
              <p>
                Cam kết sử dụng sản phẩm cao cấp, kỹ thuật hiện đại và dịch vụ chuyên nghiệp
                với tiêu chuẩn quốc tế.
              </p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded shadow-sm">
              <h3 className="font-bold text-orange-600 mb-2">Tận tâm</h3>
              <p>
                Lắng nghe và thấu hiểu nhu cầu của từng khách hàng, tư vấn nhiệt tình
                để tạo ra phong cách phù hợp nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Phần 4: Thành tựu nổi bật */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold text-orange-500">10+</p>
            <p className="text-sm mt-2">Năm kinh nghiệm</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-orange-500">5000+</p>
            <p className="text-sm mt-2">Khách hàng</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-orange-500">15+</p>
            <p className="text-sm mt-2">Thợ chuyên nghiệp</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-orange-500">⭐ 4.9</p>
            <p className="text-sm mt-2">Đánh giá trung bình</p>
          </div>
        </div>
      </section>
    </main>
  );
}