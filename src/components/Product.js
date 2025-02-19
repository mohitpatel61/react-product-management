import React from 'react'

export default function Product(props) {
  return (
    <>
    <div className="row">

        <div className="col-4">
            <h2>{props.product.name} <span className="badge bg-secondary">₹ {props.product.price}</span></h2>
        </div>

        <div className="col-2">
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-danger" onClick={() => props.decrementQuant(props.index)}> - </button>
                <button type="button" className="btn btn-warning">{props.product.quantity}</button>
                <button type="button" className="btn btn-success" onClick={() => props.incrementQuant(props.index)}>+</button>
            </div>
        </div>
        <div className="col-2">
            {props.product.quantity * props.product.price}
        </div>

        <div className="col-2">
            <button type="button" className="btn btn-danger" onClick={() => props.removeItem(props.index)}> Remove </button>
        </div>
    </div>
    </>
  )
}
