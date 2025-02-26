import React from "react";

class AddItem extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            productName : "",
            productPrice : 0,
            productDesc: "",
            productQty: 0,
        }
    }
    render() { 
        return  (<form className="row mb-5" onSubmit={(e) =>{
                e.preventDefault()
                this.props.addNewItem(this.state);
                }}>
        <div className="mb-3 col-4">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange = {(e) => {
                this.setState({productName : e.currentTarget.value});
            }}
            value={this.state.productName}
            name="productName"
            className="form-control"
            id="inputName"
            aria-describedby="emailHelp"
          />
         
        </div>
        <div className="mb-3 col-4">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            name="productPrice"
            className="form-control"
            id="productPrice"
            onChange = {(e) => {
                this.setState({productPrice : e.currentTarget.value});
            }}
            value={this.state.productPrice}
          />
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="inputQty" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            onChange = {(e) => {
                this.setState({productQty : e.currentTarget.value});
            }}
            value={this.state.productQty}
            name="inputQty"
            className="form-control"
            id="inputQty"
            aria-describedby="Quantity"
          />
         
        </div>

        <div className="mb-3 col-4">
          <label htmlFor="productDesc" className="form-label">
            Description
          </label>
          <input
            type="text"
            onChange = {(e) => {
                this.setState({productDesc : e.currentTarget.value});
            }}
            value={this.state.productDesc}
            name="productDesc"
            className="form-control"
            id="productDesc"
            aria-describedby="Description"
          />
         
        </div>
        
        <button type="submit" className="btn btn-primary col-4">
          Add item
        </button>
      </form>
    )
    }
}
 
export default AddItem;