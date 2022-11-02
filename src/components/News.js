import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)

  const update =  async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
    setLoading(true);
    props.progress(30)
    let response = await fetch(url);
    let data = await response.json();
    props.progress(70)

    setArticles(data.articles);
    setTotalResults(data.totalResults);
    setPage(page+1);
    setLoading(false);
    
    props.progress(100)
  }

  const fetchMoreData = async () => {
    setPage(page+1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    setArticles(articles.concat(data.articles));
    setTotalResults(data.totalResults);
  };

  useEffect(() => {
  document.title = `Newsify - ${capitalize(props.category)}`;
    update()
  }, [])
  

 

  // const handlePrev = async () => {
  //   setPage(page - 1)
  //   update();
    
  // };

  // const handleNext = async () => {
  //   if (
  //     !(
  //       page >
  //       Math.ceil(totalResults / props.pageSize)
  //     )
  //   ) {
  //     setPage(page + 1)
  //     update();
  //   }
  // };
    return (
      <>
        <h1 className="title text-center my-4">
          Newsify - Top {capitalize(props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Loading />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Loading />}
        >
          <div className="container my-3">
            <div className="row my-2">
              {
                articles.map((elem, index) => {
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
        <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
