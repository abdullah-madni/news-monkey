import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Preloader from "./Preloader";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      pageSize: 10,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsMonkey - ${props.category} news`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apikey}&country=us&category=${this.props.category}&pageSize=${this.state.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(40);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    }, ()=>{
      this.props.setProgress(100);
    });
  }

  fetchMore = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apikey}&country=us&category=${this.props.category}&pageSize=${this.state.pageSize}&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-center text-2xl font-semibold text-red-500 md:text-3xl">
          News Monkey - Top {this.props.category} Headlines
        </h1>
        {this.state.loading && (
          <div className="mt-2">
            <Preloader />
          </div>
        )}

        {!this.state.loading && (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMore}
            hasMore={this.state.articles.length != this.state.totalResults}
            loader={<Preloader />}
            style={{overflow: 'visible'}}
            endMessage={
              <p className="text-center font-medium text-gray-500">
                No more results there.
              </p>
            }
          >
            <div className="mb-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {this.state.articles.map((item, index) => {
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
  }
}
