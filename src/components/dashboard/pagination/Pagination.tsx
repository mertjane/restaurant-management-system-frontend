import React from "react";
import { PaginationProps } from "./pagination.types";
import "./pagination.component.scss";
import { LeftChevronIcon, RightChevronIcon } from "../../../lib/icons/Icons";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = () => {
    const pages = [];
    const maxPages = 5;

    if (totalPages > maxPages) {
      pages.push(1);

      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    return pages;
  };
  return (
    <div className="pagination-container">
      <button
        className="pagination-btn-prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LeftChevronIcon />
      </button>
      {pageNumbers().map((page, index) => (
        <button
          key={index}
          className={`pagination-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => typeof page === "number" && onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn-next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <RightChevronIcon />
      </button>
    </div>
  );
};

export default Pagination;
