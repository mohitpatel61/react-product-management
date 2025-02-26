import React, { useEffect, useState } from "react";
import { fetchProducts, getProductDetails, removeProduct, updateProductePic } from "../../services/productService";
import Product from "./Product";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";
import ProductDetailPage from "./ProductDetailPage";
import api from "../../services/api";
import Messages from "../../components/common/Messages";
// import AddNewProduct from "../../pages/Product/AddNewProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [addProductModal, setAddProductModal] = useState(false);
  const [viewProductModal, setViewProductModal] = useState(false);
  const [editProductModal , setEditProductModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successUpdateMessage, setSuccessUpdateMessage] = useState("");
  const [errorUpdateMessage, setErrorUpdateMessage] = useState("");
  const [productImage, setProductImage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (data) {
          setProducts(data);
        } else {
          throw new Error("No products found");
        }
      } catch (error) {
        setError(error.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const addNewProduct = () => {
    setAddProductModal(true);
  }
  const handleProductEdit= () => {
    setViewProductModal(false);
    setEditProductModal(true);
  };

  const getProductDetail = async(productId) => {
   try {
   
    const productDetail = await getProductDetails(productId);
    console.log(productDetail);
    if(productDetail.status == 200){
      setViewProductModal(true)
      setProductData(productDetail.productDetails);
      setProductImage(productDetail.productDetails.thumbnail_image);
    }
  } catch (error) {
    
   }
  }

  const handleDelete = async(productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product:", productId);
      try {
        const response = await removeProduct(productId);
        if(response.status == 200){
         
          setErrorMessage("");
          setSuccessMessage(response.message || "Product added successfully!" );

          setTimeout(() => {
              setSuccessMessage("");            
          },3000);

          // refresh product list
          setLoading(true);
          const data = await fetchProducts();
          if (data) {
            setProducts(data);
            setLoading(false);
          } else {
            setLoading(false);
            throw new Error("No products found");
          }
        }
        else{
          setSuccessMessage("");
          setErrorMessage(response.message || "Something went wrong!" );
            setTimeout(() => {
             setErrorMessage("");
            },3000);
        }
      } catch (error) {
        this.setState({
          errorMessage: error.message || "Something went wrong ",
          successMessage: "",
        });
        setTimeout(() => {
          setErrorMessage("");
        },3000);
      }
    }
  };

  const handleProductImage= async(e, productId) => {

     const file = e.target.files[0];
        if(file){
        
        //Update profile image code
        try {
          const formData = new FormData();
          formData.append('product_image', file);
          formData.append('product_id', productId);
         
          const response = await updateProductePic(formData);
         
          if(response.status == 200){
            
            setSuccessUpdateMessage(response.message);
            setTimeout(() => {
              setSuccessUpdateMessage("");
            },3000);
            setProductData((prevState) => ({
              ...prevState,
              thumbnail_image: response.thumbnailImage, // Ensure this matches API response key
            }));

            setProductImage(response.thumbnailImage);
            setLoading(true);
            const data = await fetchProducts();
            if (data) {
              setLoading(false);
              setProducts(data);
            } else {
              throw new Error("No products found");
            }
        }
        } catch (error) {
          setErrorUpdateMessage(error.message)
          setTimeout(() => {
            setErrorUpdateMessage("");
          },3000);
        }
      
        }
        else{
          setErrorUpdateMessage("File not found");
        }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Product List</h2>
      <div className="col-3 text-right mb-2">
        <button type="button" className="btn btn-primary" onClick={addNewProduct}>Add product</button>
      </div>
      {loading && <p className="text-center text-primary">Loading products...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && (
        <div className="row">
          <Messages type="success" message={successMessage} />
          <Messages type="danger" message={errorMessage} />
          {products.length > 0 ? (
            products.map((product, i) => (
              <div className="col-md-4 mb-4" key={i}> 
                <Product product={product} index={i} getProductDetail={getProductDetail} handleDelete={handleDelete}/>
              </div>
            ))
          ) : (
            <p className="text-center">No products available.</p>
          )}
        </div>
      )}

    {addProductModal && (
        <div className="modal modal-lg fade show" id="addNewProductModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create new product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setAddProductModal(false)}
              />

            </div>
            <div className="modal-body">
              <AddNewProduct setAddProductModal={setAddProductModal} updateProductList={(updatedProducts) => setProducts(updatedProducts)} />
              </div>
                
              </div>
            </div>
          </div>

    )}


{viewProductModal && (
        <div className="modal modal-lg fade show" id="productDetailModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Product Detail
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setViewProductModal(false)}
              />

            </div>
            <div className="modal-body">
              <ProductDetailPage setViewProductModal={setViewProductModal}    setEditProductModal={setEditProductModal} handleProductEdit={handleProductEdit} successUpdateMessage={successUpdateMessage} errorUpdateMessage={errorUpdateMessage} productData={productData} productId={productData.loading} handleProductImage={handleProductImage} productImage={productImage}/>
              </div>
                
              </div>
            </div>
          </div>

    )}
{ editProductModal && (
  <div className="modal modal-lg fade show" id="editProductModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
          Update product
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => setEditProductModal(false)}
        />

      </div>
      <div className="modal-body">
        <EditProduct handleProductEdit={handleProductEdit} setEditProductModal={setEditProductModal} updateProductList={(updatedProducts) => setProducts(updatedProducts)}   productData={productData} />
        </div>
          
        </div>
      </div>
    </div>
)}

    </div>
  );
};

export default ProductList;
