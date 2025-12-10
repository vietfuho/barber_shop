import { Link } from "react-router-dom";
import backgroundHome from "../assets/image/backgroundHome.png";
import { FaArrowRight } from "react-icons/fa6";
import BookingButton from "./button/BookingButton";
export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        {/* Background image để trống */}
        <img
          src={backgroundHome}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl text-white">
          <div className="inline-block px-4 py-2 bg-amber-500/20 border border-amber-500 rounded-full mb-6">
            <span className="text-amber-500">Premium Barbershop</span>
          </div>

          <h1 className="text-5xl md:text-7xl mb-6">
            Khẳng Định
            <br />
            <span className="text-amber-500">Phong Cách Nam</span>
          </h1>

          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            Trải nghiệm dịch vụ cắt tóc đẳng cấp cùng đội ngũ thợ chuyên nghiệp
            với hơn 10 năm kinh nghiệm.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* Nút Đặt lịch */}
            <BookingButton/>

            {/* Nút Xem dịch vụ */}
            <Link
              to="/services"
              className="flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-6 py-3 rounded-full text-base font-semibold transition"
            >
              Xem dịch vụ
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-700">
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                {/* Icon để trống */}
                <span className="w-6 h-6"></span>
                <span className="text-3xl">5000+</span>
              </div>
              <p className="text-neutral-400">Khách hàng</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <span className="w-6 h-6"></span>
                <span className="text-3xl">10+</span>
              </div>
              <p className="text-neutral-400">Năm kinh nghiệm</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <span className="w-6 h-6"></span>
                <span className="text-3xl">7/7</span>
              </div>
              <p className="text-neutral-400">Phục vụ cả tuần</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
