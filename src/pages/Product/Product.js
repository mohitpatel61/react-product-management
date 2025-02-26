import React from "react";
import { getImageUrl } from "../../utils/getImageUrl";

export default function Product({ product, getProductDetail, handleDelete }) {
  const imageUrl = product.product_image
    ? getImageUrl(product.product_image)
    : "https://placeholder.pics/svg/300";


    const imgStyle = {
      // width: "300px",  // Fixed width
      // height: "300px", // Fixed height
      objectFit: "contain", // Ensure it fits within the box
      backgroundColor: "#f0f0f0", // Light gray background if no image
    };
  return (
   
    <div className="card shadow-sm p-3 rounded" style={{height: '491px'}} >
      <img src={imageUrl} className="card-img-top product-image img-responsive object-fit-contain" style={imgStyle}   alt={product.title} />

      <div className="card-body p-2">
  {/* Product Title & Price */}
  <h5 className="card-title d-flex  align-items-center mb-2">
    <span className="text-truncate" style={{ maxWidth: "65%", marginRight: '4px' }}>{product.title}</span>
    <span className="badge bg-primary px-2 py-1">₹ {product.product_price}</span>
  </h5>

  {/* Action Buttons */}
  <div className="d-flex gap-2">
    <button 
      type="button" 
      className="btn btn-outline-danger flex-fill py-1" 
      onClick={() => handleDelete(product.id)}
    >
      <i className="bi bi-trash"></i> Delete
    </button>

    <button 
      type="button" 
      className="btn btn-primary flex-fill py-1" 
      onClick={() => getProductDetail(product.id)}
    >
      <i className="bi bi-eye"></i> View
    </button>
  </div>
</div>

    </div>
  );
}
