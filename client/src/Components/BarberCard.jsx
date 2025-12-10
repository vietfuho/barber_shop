// src/components/BaberCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function BaberCard({ member }) {
  return (
    <div className="bg-orange-50 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold mb-4">
        {member.initials}
      </div>
      <h3 className="text-lg font-semibold text-orange-600 mb-1">{member.name}</h3>
      <p className="text-sm text-gray-700 mb-1">{member.title}</p>
      <p className="text-sm text-gray-500 mb-2">{member.experience}</p>
      <p className="text-sm font-medium text-gray-800 mb-2">{member.specialty}</p>
      <p className="text-sm text-gray-600 mb-4">{member.description}</p>

      {/* Nút xem thông tin */}
      <Link
        to={`/team/${member.initials}`}
        className="mt-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Xem thông tin
      </Link>
    </div>
  );
}