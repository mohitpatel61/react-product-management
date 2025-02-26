import React, {useState} from "react";
import { X } from "lucide-react"; // Import close icon


export default function Messages({ type, message }) {
  const [visible, setVisible] = useState(true);
  
  if (!message || !visible) return null; // Hide if there's no message

  return (
    <div className="w-100">
      <div className={`alert alert-${type} alert-dismissible fade show d-flex align-items-center justify-content-between`} role="alert">
        <span>{message}</span>
        <button type="button" className="btn btn-sm btn-light border-0" onClick={() => setVisible(false)}>
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
