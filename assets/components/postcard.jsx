import React from "react";

export default function PostCard({ imageUrl, date, title, description }) {
  return (
    <div className="w-full max-w-sm rounded overflow-hidden shadow-sm bg-white transform transition duration-300 hover:shadow-lg hover:scale-95 hover:cursor-pointer">
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2">{date}</p>
        <h3 className="text-lg font-semibold mb-2 line-clamp-3">
          {title}
        </h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
}
