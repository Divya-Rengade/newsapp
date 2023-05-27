import React, { Component } from 'react'
import './CardStyle.css'

export class NewsItem extends Component {
  render() {
    const {img, title, desc, newsUrl} = this.props;
    return (
        <div className='my-3'>
            <div className='card' >
                <img src={img? img: "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} alt="" className='card-img-top'/>
                <div className='card-body'>
                    <h5 className='card=title'>{title}</h5>
                    <p className='card-text'>{desc}</p>
                    <a href={newsUrl} className="btn btn-primary btn-sm" target="_blank" rel="noreferrer">Read More</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem;
