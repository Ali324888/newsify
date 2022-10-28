import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    return (
        <div>
            <div className="card" style={{width: "18rem"}}>
                <img src="https://variety.com/wp-content/uploads/2022/10/albumcovertreatment-14.jpg?w=1000&h=562&crop=1" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Rihanna Drops ‘Lift Me Up,’ Her First Single in Six Years, From ‘Black Panther: Wakanda Forever’ - Variety</h5>
                    <p className="card-text">Rihanna dropped her first single in six years on Thursday night: “Lift Me Up,” the first track to emerge from Marvel’s blockbuster sequel “Black Panther: Wakanda Forever.” The song, a tribute to the life and legacy of Chadwick Boseman, was written by Nigerian…</p>
                    <a href="/newsDescp" className="btn btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem