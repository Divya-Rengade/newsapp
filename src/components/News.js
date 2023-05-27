import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor(){
        super();
        this.state={
            articles:[],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){ //runs after all compenents are mounted like useEffect
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7bea0ee42c0b4918aec65390acb57002&pageSize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        const data = await fetch(url);
        const parsedData = await data.json();
        
        this.setState({
            loading:false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
        // console.log(this.state.articles)
    }
    handleNext= async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7bea0ee42c0b4918aec65390acb57002&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        this.setState({
            loading:true
        })
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            loading:false,
            page: this.state.page + 1,
            articles: parsedData.articles
        })
    }
    handlePrev= async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7bea0ee42c0b4918aec65390acb57002&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
        this.setState({
            loading:true
        })
        const data = await fetch(url);
        const parsedData = await data.json();
        this.setState({
            loading:false,
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }
  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>Daily Top News</h1>
        {this.state.loading && <Loading/>}
        <div className='row'> 
        {/* below this row all the card will align themselves in grid */}
        {!this.state.loading && this.state.articles.map((element) =>{
            return <div className='col-md-4' key={element.url}>
                <NewsItem img={element.urlToImage} title={element.title} desc={element.description} newsUrl={element.url} />
            </div>
         })} 
        </div>
        <div className='d-flex justify-content-between'>
        <button disabled={this.state.page <=1} className='btn btn-dark' onClick={this.handlePrev}> &larr; Previous</button>
        <button disabled={Math.ceil(this.state.totalResults/20)<= this.state.page } className='btn btn-dark' onClick={this.handleNext}> Next &rarr;</button>
        </div>
        
      </div>
    )
  }
}

/* 
*********Display in pages*********
button is disabled by calculating total received results and results displayes per page
        per page no of articles can be given by mentioning "pageSize=(no of articles per page) ==> passed in url"
        thus totresult/pageSize will give us total pages needed to show all artcles
        remaining articles are placed on next page which can be retrieved by passing page=(page_number) in url*/
