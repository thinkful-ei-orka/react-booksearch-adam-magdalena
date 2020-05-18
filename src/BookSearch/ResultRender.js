import React from 'react';

export default function ResultRender(props){
  console.log(props.book)
  return(
    <div className='bookEntry'>
      {props.book.volumeInfo.imageLinks!==undefined?<img className='coverPhoto' src={props.book.volumeInfo.imageLinks.thumbnail} alt={`${props.book.volumeInfo.title} cover`} />:<p className='coverPhoto'>"No Image Available"</p>}
      <section className='bookInfo'>
        <h1 className='title'>{props.book.volumeInfo.title}</h1>
        <h5 className='printType'>{props.book.volumeInfo.printType}</h5>
        {props.book.volumeInfo.authors!==undefined?<p className='authors'>Authors: {props.book.volumeInfo.authors.join(', ')}</p>:null}
        <p className='price'>Listing Price: {props.book.saleInfo.saleability!=='NOT_FOR_SALE'?props.book.saleInfo.listPrice!==undefined?`$${props.book.saleInfo.listPrice.amount}`:'0':'Not for sale'}</p>
        <p className='Description'>
        {props.book.volumeInfo.description}
        </p>
      </section>
    </div>
  )
}
