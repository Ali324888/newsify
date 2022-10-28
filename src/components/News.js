import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'


export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let response = await fetch(url);
    let data = await   response.json();
    console.log(data);
    this.setState({articles: data.articles, totalResults: data.totalResults, loading: false})
  }

  handlePrev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let response = await fetch(url);
    let data = await   response.json();
    console.log(data);
    this.setState({articles: data.articles, page: this.state.page - 1, loading: false})
  }

  handleNext = async () => {
    if(!(this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=bd8765f393e74dcd8486bccea9c2458e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let response = await fetch(url);
      let data = await   response.json();
      console.log(data);
      this.setState({articles: data.articles, page: this.state.page + 1, loading: false})
    }
    
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='title'>Daily news updates</h1>
        {this.state.loading && <Loading/>}
        <div className="row my-2">
          {!this.state.loading && this.state.articles.map((elem) => {
            return <div className="col-md-4 my-2" key={elem.url}>
                  <NewsItem title = {elem.title?elem.title: ""} description = {elem.description? elem.description: ""} url = {elem.url} imgUrl = {elem.urlToImage?elem.urlToImage:"https://images.livemint.com/img/2022/10/28/600x338/gallery-7_1666945754015_1666945761627_1666945761627.jpg"}/>
                  </div>
          })}  
        </div>
        <div className="container my-3 d-flex justify-content-between">
        <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
        <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News