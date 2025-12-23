import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Lỗi lấy lịch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  const bookingsInDay = bookings.filter((b) => {
    const d = new Date(b.date);
    return (
      d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear()
    );
  });

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const hasBooking = bookings.some((b) => {
        const d = new Date(b.date);
        return (
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      });

      if (hasBooking) {
        return (
          <div className="flex justify-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mt-1"></span>
          </div>
        );
      }
    }
    return null;
  };

  if (loading) {
    return <p className="text-center py-10">Đang tải lịch...</p>;
  }

  return (
    <section className="py-12 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-8">
          📅 Lịch hẹn của tôi
        </h2>

        {/* LỊCH */}
        <div className="flex justify-center">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="vi-VN"
            tileContent={tileContent}
            className="
              w-full 
              rounded-xl 
              border 
              p-4 
              text-lg
              [&_.react-calendar__tile]:h-20
              [&_.react-calendar__tile]:flex
              [&_.react-calendar__tile]:flex-col
              [&_.react-calendar__tile]:justify-center
            "
          />
        </div>

        {/* DANH SÁCH TRONG NGÀY */}
        <div className="mt-10">
          <h3 className="font-semibold text-xl mb-4 text-center">
            Lịch ngày {selectedDate.toLocaleDateString("vi-VN")}
          </h3>

          {bookingsInDay.length === 0 ? (
            <p className="text-gray-500 italic text-center">
              Không có lịch hẹn
            </p>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {bookingsInDay.map((booking) => {
                const timeStr = new Date(booking.date).toLocaleTimeString(
                  "vi-VN",
                  { hour: "2-digit", minute: "2-digit" }
                );

                return (
                  <div
                    key={booking._id}
                    className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {booking.serviceId?.name}
                      </p>
                      <p className="text-sm text-gray-600">⏰ {timeStr}</p>
                      <p className="text-sm text-gray-600">
                        📞 {booking.phone}
                      </p>
                    </div>

                    <Link
                      to={`/edit-appoint/${booking._id}`}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
                    >
                      Sửa
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyBookings;
