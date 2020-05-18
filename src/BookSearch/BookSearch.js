import React from 'react';
import ResultRender from './ResultRender.js'
import './BookSearch.css'

export default class BookSearch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading:false,
      searchResults:[],
      searchValue:'',
      filterValue:null,
      printValue:'all',
      error:null
    }
    this.printChangeHandle=this.printChangeHandle.bind(this)
    this.filterChangeHandle=this.filterChangeHandle.bind(this)
    this.searchChangeHandle=this.searchChangeHandle.bind(this)
    this.submitHandle=this.submitHandle.bind(this)
  }
  
  printChangeHandle(e){this.setState({printValue:e.target.value});this.fetchBooks()}
  filterChangeHandle(e){this.setState({filterValue:e.target.value});this.fetchBooks()}
  searchChangeHandle(e){this.setState({searchValue:e.target.value})}
  submitHandle(e){e.preventDefault();this.fetchBooks()};

  fetchBooks=()=>{
    if (this.state.searchValue===''){alert('Please enter search values')} 
    else{
      this.setState({loading:true,error:null});
      fetch(this.state.filterValue===null?`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchValue}&printType=${this.state.printValue}`:`https://www.googleapis.com/books/v1/volumes?q=${this.state.searchValue}&printType=${this.state.printValue}&filter=${this.state.filterValue}`).then(res=>res.ok?res.json():Promise.reject('failed call')).then(searchResults=>this.setState({searchResults:searchResults.items,loading:false})).catch(error=>this.setState({error,loading:false}))
    }
  }
  render(){
    return(
      <div className='main'>
        <header>
          Google Book Search
        </header>
        <section className='toolbar'>
          <form className='search' onSubmit={this.handleSubmit}>
              <input type='text' placeholder='Search' value={this.state.searchValue} onChange={this.searchChangeHandle} />
              <button type='submit' onClick={this.submitHandle}>Search</button>
            <section className='Filters'>
              <select className='printType' onChange={this.printChangeHandle} defaultValue={'all'}>
                <option value='all'>All</option>
                <option value='books'>Books</option>
                <option value='magazines'>Magazines</option>
              </select>
              <select className='bookType' onChange={this.filterChangeHandle} defaultValue={null}>
                <option value='null'>No Filter</option>
                <option value='ebooks'>E-Books</option>
                <option value='free-ebooks'>Free E-Books</option>
                <option value='full'>Full</option>
                <option value='paid-ebooks'>Paid E-books</option>
                <option value='partial'>Partial</option>
              </select>
            </section>
          </form>
        </section>
        <section className='results'>
          {this.state.loading===true?'Loading...':null}
          {this.state.error===null?null:this.state.error}
          {this.state.searchResults==={}?null:
            this.state.searchResults.map((book,i)=>{
              return (
                <ResultRender
                  book={book}
                  key={`book${i}`}
                />
              )
            })}
        </section>
      </div>
    )
  }
}