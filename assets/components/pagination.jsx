import React, { useState, useEffect } from "react";
import PostCard from "./postcard.jsx";
import postData from "../services/postData.js";

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    parseInt(localStorage.getItem("itemsPerPage")) || 10
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "Newest"
  );

  // ✅ Simpan ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("itemsPerPage", itemsPerPage);
    localStorage.setItem("sortBy", sortBy);
  }, [currentPage, itemsPerPage, sortBy]);

  // ✅ Sort benar-benar berdasarkan tanggal
  const sortedData = [...postData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortBy === "Newest") return dateB - dateA;
    return dateA - dateB;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="p-6">
      {/* Info & Controls */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <span className="text-sm mb-2 md:mb-0">
          Showing {indexOfFirstItem + 1} -{" "}
          {indexOfLastItem > sortedData.length
            ? sortedData.length
            : indexOfLastItem}{" "}
          of {sortedData.length}
        </span>
        <div className="flex space-x-4">
          <label className="text-sm">
            Show per page:{" "}
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-2 py-1"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
          <label className="text-sm">
            Sort by:{" "}
            <select
              value={sortBy}
              onChange={handleSortByChange}
              className="border rounded px-2 py-1"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </label>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mx-auto">
        {currentItems.map((post) => (
          <PostCard
            key={post.id}
            imageUrl={post.imageUrl}
            date={post.date}
            title={post.title}
            description={post.description}
          />
        ))}
      </div>

      {/* Page Number Controls */}
      <div className="flex justify-center items-center mt-6 space-x-1">
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &laquo;
        </button>
        <button
          onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &lsaquo;
        </button>

        {renderPageNumbers()}

        <button
          onClick={() =>
            currentPage < totalPages && handlePageClick(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &rsaquo;
        </button>
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}
