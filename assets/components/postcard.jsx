export default function PostCard({ imageUrl, date, title, description }) {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow hover:shadow-lg transition-shadow bg-white">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2">{date}</p>
        <h3 className="text-sm font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
