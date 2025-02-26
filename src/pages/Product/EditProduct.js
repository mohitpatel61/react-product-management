import React, { Component , useState } from "react";
import { createProduct, fetchProducts, updateProduct } from "../../services/productService";
import Messages from "../../components/common/Messages";
import {productValidation} from '../../utils/validation/productValidation';

class EditProduct extends Component {
  constructor(props) {
    super(props);
    const { productData } = this.props;
   this.state = {
    productId: productData.id || 0,
    productName: productData.title || "",
    productPrice:  productData.product_price || 0,
    productModal:  productData.product_number || 0,
    productDescription: productData.description || "",
    successMessage: "",
    errorMessage: "",
    validateData : {},
    displayError: false   
};
 
  }
  
  
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

updateProduct = async (e) => {
  
    e.preventDefault();
    try {
    const validate = productValidation(this.state);
    if(validate.status === 'success'){
        const response = await updateProduct(this.state);
        if(response.status == 200){
        this.setState({
            successMessage: response.message || "Product added successfully!",
            errorMessage: "",
          });
          setTimeout(() => {
            this.setState({
                productId: 0,
                productName: "",
                productPrice: 0,
                productModal: 0,
                productDescription: "",
                successMessage: '',
                errorMessage: ""
              });
            this.props.setEditProductModal(false); // Hide modal after save data
          }, 3000);

          const updatedProducts = await fetchProducts();
          // Pass updated product list to parent component
          this.props.updateProductList(updatedProducts);

        }
        else{
           this.setState({errorMessage: response.message});
        }
    }
    else{
        this.setState({
           displayError: true,
           validateData: validate
        });
    }
  
  }
  catch(error){
    this.setState ({
            successMessage: "",
            errorMessage: error.message || "Could Not add product"
        });
        setTimeout(()=>{
            this.setState({errorMessage: ""});
            this.props.setEditProductModal(false); // Hide modal after save data
        },3000)
  }
}
;

  render() {
    return (
     <>
      <Messages type="success" message={this.state.successMessage} />
      <Messages type="danger" message={this.state.errorMessage} />
      <form onSubmit={this.updateProduct}>
        <div className="mb-3">
          <label className="col-form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={this.state.productName}
            onChange={this.handleChange}
          />
          {this.state.displayError && this.state.validateData.productName &&
          <span style={{color:'red'}}>{this.state.validateData.productName}</span>
          }
        </div>
        <div className="mb-3">
          <label className="col-form-label">Product Price:</label>
          <input
            type="number"
            className="form-control"
            name="productPrice"
            value={this.state.productPrice}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="col-form-label">Product Model:</label>
          <input
            type="text"
            className="form-control"
            name="productModal"
            value={this.state.productModal}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="col-form-label">Product Description:</label>
          <textarea
            className="form-control"
            name="productDescription"
            value={this.state.productDescription}
            onChange={this.handleChange}
          />
        </div>

        <div className="modal-footer">
            
            <button type="submit" className="btn btn-primary" >
             Save
            </button>
        </div>
      </form>
      </>
    );
  }
}

export default EditProduct;
