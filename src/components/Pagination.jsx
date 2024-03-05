import React, { Component } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

export default class Pagination extends Component {
  getPaginationItems = (page, totalPages) => {
    let tempArr = new Array(totalPages).fill(0);
    let html = tempArr.map((item, index) => {
      return (
        <button
          className={`${index + 1 == page && "active"} flex size-10 items-center justify-center rounded-full border border-red-500 text-xl font-medium text-red-500 outline-none [&.active]:bg-red-500 [&.active]:text-white`}
          key={index}
          onClick={() => this.props.goToPage(index + 1)}
        >
          {index + 1}
        </button>
      );
    });
    return html;
  };

  render() {
    let { handlePagePrev, handlePageNext, page, pageSize, totalResults } =
      this.props;
    let totalPages = Math.ceil(totalResults / pageSize);
    return (
      <div className="flex flex-wrap justify-center gap-2 text-red-500">
        <button
          className="flex size-10 items-center justify-center rounded-full border border-red-500 text-lg font-medium text-red-500 outline-none disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400 [&.active]:bg-red-500 [&.active]:text-white"
          disabled={page <= 1}
          onClick={handlePagePrev}
        >
          <FaAnglesLeft />
        </button>

        {this.getPaginationItems(page, totalPages)}

        <button
          className="flex size-10 items-center justify-center rounded-full border border-red-500 text-lg font-medium text-red-500 outline-none disabled:border-gray-400 disabled:bg-gray-300 disabled:text-gray-400 [&.active]:bg-red-500 [&.active]:text-white"
          disabled={page + 1 > totalPages}
          onClick={handlePageNext}
        >
          <FaAnglesRight />
        </button>
      </div>
    );
  }
}
