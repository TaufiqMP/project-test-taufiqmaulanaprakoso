import React, { useState, useEffect } from "react";
import PostCard from "./postcard.jsx";

export default function Pagination() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    parseInt(localStorage.getItem("itemsPerPage")) || 10
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "Newest"
  );

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
    localStorage.setItem("itemsPerPage", itemsPerPage);
    localStorage.setItem("sortBy", sortBy);
  }, [currentPage, itemsPerPage, sortBy]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const sortParam = sortBy === "Newest" ? "-published_at" : "published_at";
        const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${itemsPerPage}&append[]=small_image&append[]=medium_image&sort=${sortParam}`;

        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.data);
        setTotal(data.meta.total);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage, itemsPerPage, sortBy]);

  const totalPages = Math.ceil(total / itemsPerPage);

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
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 4) {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 mx-1 rounded transition-all duration-300 ${
            i === currentPage
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-black hover:bg-orange-200"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <span key="dots" className="px-2">
          ...
        </span>
      );
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`px-3 py-1 mx-1 rounded transition-all duration-300 ${
            totalPages === currentPage
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-black hover:bg-orange-200"
          }`}
        >
          {totalPages}
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
          Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {currentPage * itemsPerPage > total ? total : currentPage * itemsPerPage} of {total}
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
        {posts.map((post) => (
        
          <PostCard
            key={post.id}
            imageUrl={post.small_image?.[0]?.url || post.medium_image?.[0]?.url || ''}
            date={post.published_at}
            title={post.title}
            description={post.excerpt}
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
          onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
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
