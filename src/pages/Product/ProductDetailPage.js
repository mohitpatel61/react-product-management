import React, { useRef } from "react";
import { getImageUrl } from "../../utils/getImageUrl";
import { FaCamera, FaEdit } from "react-icons/fa";
import Messages from "../../components/common/Messages";

const ProductDetailPage = ({ 
  productData, 
  handleProductImage, 
  productId, 
  productImage, 
  errorUpdateMessage, 
  successUpdateMessage, 
  handleProductEdit 
}) => {
    
  const fileInputRef = useRef(null);

  if (!productData) {
    return <p className="text-center text-danger">Product details not available.</p>;
  }

  const imageUrl = productData.thumbnail_image
    ? getImageUrl(productData.thumbnail_image)
    : "https://placeholder.pics/svg/180";

  return (
    <div className="container">
      <div className="p-3 rounded shadow-sm bg-white">
        <Messages type="success" message={successUpdateMessage} />
        <Messages type="danger" message={errorUpdateMessage} />

        <div className="row align-items-center">
          {/* Product Image Section */}
          <div className="col-md-4 text-center">
            <div className="position-relative d-inline-block">
              <input 
                type="file" 
                ref={fileInputRef}  
                accept="image/*" 
                style={{ display: "none" }} 
                id="productImage" 
                data-productid={productId} 
                onChange={(e) => handleProductImage(e, productData.id)} 
              />
              <img 
                src={getImageUrl(productData.thumbnail_image || productImage)} 
                className="img-thumbnail rounded"  
                style={{ width: "150px", height: "150px", objectFit: "cover" }} 
                alt="Product"
              />
              <label
                htmlFor="productImage"
                className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2"
                style={{
                  cursor: "pointer",
                  transform: "translate(25%, -25%)",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)"
                }}
              >
                <FaCamera size={18} />
              </label>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="text-primary m-0">{productData.title}</h4>
              <button 
                type="button" 
                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                onClick={handleProductEdit}
              >
                <FaEdit size={16} /> Edit
              </button>
            </div>

            <div className="mb-2">
              <strong>Product Model:</strong> <span className="text-muted">{productData.product_number}</span>
            </div>

            <div className="mb-2">
              <strong>Price:</strong> 
              <span className="badge bg-success fs-6 ms-2">₹ {productData.product_price}</span>
            </div>

            <div className="mb-2">
              <strong>Description:</strong>
              <p className="text-muted">{productData.description || "No description available"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
