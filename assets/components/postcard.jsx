import React from "react";

export default function PostCard({ imageUrl, date, title, description }) {
  return (
    <div className="rounded overflow-hidden shadow hover:shadow-lg transform hover:scale-105 transition duration-300 cursor-pointer w-full max-w-sm">
      <img src={imageUrl} alt={title} loading="lazy" className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-500">{date}</p>
        <h3 className="text-lg font-semibold line-clamp-3">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
