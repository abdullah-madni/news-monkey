import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Pagination from "./Pagination";
import Preloader from "./Preloader";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articles: [],
      category: props.category,
      pageSize: 10,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsMonkey - ${props.category} news`
  }

  async componentDidMount() {
    this.goToPage(this.state.page);
  }

  handlePageNext = () => {
    this.goToPage(this.state.page + 1);
  };

  handlePagePrev = () => {
    this.goToPage(this.state.page - 1);
  };

  goToPage = (page) => {
    this.setState({
        page: page,
        loading: true,
    },this.showData);
  };

  showData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?apiKey=be1581cd0e9447b3a6c388fa496db91e&country=us&category=${this.state.category}&pageSize=${this.state.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
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
        <div className="mb-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!this.state.loading &&
            this.state.articles.map((item, index) => {
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
        <div className="mb-2">
          <Pagination
            handlePageNext={this.handlePageNext}
            handlePagePrev={this.handlePagePrev}
            goToPage={this.goToPage}
            page={this.state.page}
            pageSize={this.state.pageSize}
            totalResults={this.state.totalResults}
          />
        </div>
      </div>
    );
  }
}
