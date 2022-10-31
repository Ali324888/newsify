import React, { Component } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };

    document.title = `Newsify - ${this.capitalize(this.props.category)}`;
  }

  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      page: this.state.page + 1,
      loading: false,
    });
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
    });
  };

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let response = await fetch(url);
    // let data = await   response.json();
    // this.setState({articles: data.articles, totalResults: data.totalResults, loading: false})
    this.update();
  }

  handlePrev = async () => {
    this.setState({ page: this.state.page - 1 });
    this.update();
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let response = await fetch(url);
    // let data = await   response.json();
    // this.setState({articles: data.articles, page: this.state.page - 1, loading: false})
  };

  handleNext = async () => {
    if (
      !(
        this.state.page >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      this.setState({ page: this.state.page + 1 });
      this.update();
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true});
      // let response = await fetch(url);
      // let data = await   response.json();
      // this.setState({articles: data.articles, page: this.state.page + 1, loading: false})
    }
  };

  render() {
    return (
      <>
        <h1 className="title text-center my-4">
          Newsify - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Loading />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Loading />}
        >
          <div className="container my-3">
            <div className="row my-2">
              {
                this.state.articles.map((elem, index) => {
                  return (
                    <div className="col-md-4 my-2" key={index}>
                      <NewsItem
                        title={elem.title ? elem.title : ""}
                        description={elem.description ? elem.description : ""}
                        url={elem.url}
                        imgUrl={
                          elem.urlToImage
                            ? elem.urlToImage
                            : "https://images.livemint.com/img/2022/10/28/600x338/gallery-7_1666945754015_1666945761627_1666945761627.jpg"
                        }
                        author={elem.author}
                        date={elem.publishedAt}
                        source={elem.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container my-3 d-flex justify-content-between">
        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
        <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}

export default News;
