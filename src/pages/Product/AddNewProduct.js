import React, { Component } from "react";
import { createProduct, fetchProducts } from "../../services/productService";
import Messages from "../../components/common/Messages";
import { productValidation } from "../../utils/validation/productValidation";

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    //  const [addProductModal, setAddProductModal] = useState(false);
    this.state = {
      productName: "",
      productPrice: 0,
      productModal: "",
      productDescription: "",
      successMessage: "",
      errorMessage: "",
      displayError: false,
      validateData: {}
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

createNewProduct = async (e) => {
    e.preventDefault();
    try {
        // console.log("this.props.products=====",this.props);return false;
     const validate = productValidation(this.state);
        if(validate.status === "success"){
          const response = await createProduct(this.state);
    if(response.status == 200){

        this.setState({
            successMessage: response.message || "Product added successfully!",
            errorMessage: "",
          });
          setTimeout(() => {
            this.setState({
                productName: "",
                productPrice: 0,
                productModal: "",
                productDescription: "",
                successMessage: '',
                errorMessage: "",
                displayError: false,
                validateData: {}
              });
            this.props.setAddProductModal(false); // Hide modal after save data
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
          this.setState({displayError: true,
             validateData : validate
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
            this.props.setAddProductModal(false); // Hide modal after save data
        },3000)
  }
}
;

  render() {
    return (
     <>
      <Messages type="success" message={this.state.successMessage} />
      <Messages type="danger" message={this.state.errorMessage} />
      <form onSubmit={this.createNewProduct}>
        <div className="mb-3">
          <label className="col-form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={this.state.productName}
            onChange={this.handleChange}
          />
          {
            this.state.displayError && this.state.validateData.productName != "" &&
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
           {
            this.state.displayError && this.state.validateData.productPrice != "" &&
            <span style={{color:'red'}}>{this.state.validateData.productPrice}</span>
          }
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
           {
            this.state.displayError && this.state.validateData.productModal != "" &&
            <span style={{color:'red'}}>{this.state.validateData.productModal}</span>
          }
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

export default AddNewProduct;
