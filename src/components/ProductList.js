import React from 'react'
import Product from './Product.js';

export default function ProductList(props) {
  if(props.productList.length > 0){
  return (
        props.productList.map((product,i) => {
            return <Product product={product} key={i} incrementQuant={props.incrementQuant} removeItem={props.removeItem} decrementQuant={props.decrementQuant} index={i}/>
        })  
      )
}
  else{
    return(
<h1>Your cart Is empty... Please add tem </h1> 
    )
  }
}
