import React, { Component } from "react";
import dummyImage from "../assets/dummy-news.jpg";
import { FaAnglesRight } from "react-icons/fa6";

export default class NewsItem extends Component {
  render() {
    let { title, description, urlToImage, publishedAt, url, author, source } =
      this.props;
    return (
      <div className="relative flex flex-col shadow-lg">
        <div className="absolute right-0 top-0 rounded-lg bg-red-500 px-2 py-1 text-sm font-semibold text-white">
          {source}
        </div>
        <img src={urlToImage ? urlToImage : dummyImage} className="w-full" />
        <div className="grow border border-t-0 border-gray-300 p-4">
          <h1 className="mb-1 text-xl font-bold">{title}</h1>
          <p className="mb-3">{description}</p>
          <a
            href={url}
            className="mb-3 inline-block border border-red-500 px-4 py-2 font-medium text-red-500 hover:bg-red-500 hover:text-white"
          >
            Read More <FaAnglesRight className="inline" />
          </a>
          <p className="text-sm font-semibold text-gray-500">
            By {author ? author : "Unknown"} on{" "}
            {new Date(publishedAt).toUTCString()}
          </p>
        </div>
      </div>
    );
  }
}
