import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Preloader from "./Preloader";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    firstRun();
  }, []);

  const firstRun = async () => {
    document.title = `NewsMonkey - ${props.category} news`;
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apikey}&country=us&category=${props.category}&pageSize=${pageSize}&page=${page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(40);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  const fetchMore = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apikey}&country=us&category=${props.category}&pageSize=${pageSize}&page=${page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl font-semibold text-red-500 md:text-3xl">
        News Monkey - Top {props.category} Headlines
      </h1>
      {loading && (
        <div className="mt-2">
          <Preloader />
        </div>
      )}

      {!loading && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMore}
          hasMore={articles.length != totalResults}
          loader={<Preloader />}
          style={{ overflow: "visible" }}
          endMessage={
            <p className="text-center font-medium text-gray-500">
              No more results there.
            </p>
          }
        >
          <div className="mb-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((item, index) => {
              return (
                <NewsItem
                  title={item.title}
                  description={item.description}
                  urlToImage={item.urlToImage}
                  url={item.url}
                  author={item.author}
                  source={item.source.name}
                  publishedAt={item.publishedAt}
                  key={index}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default News;
