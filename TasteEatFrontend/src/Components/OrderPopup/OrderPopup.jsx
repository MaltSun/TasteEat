import React, { useState } from "react";
import "./OrderPopup.css";

const OrderPopup = ({ onClose, onConfirm }) => {
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm({ address, comment });
        onClose();
    };

    return (
        <div className="popupOverlay">
            <div className="popupContent">
                <h2>Please input delivery address</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Delivery adress:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <span>
                        <button type="submit">Submit</button>
                    <button type="button" onClick={onClose}>Close</button>
                    </span>
                    
                </form>
            </div>
        </div>
    );
};

export default OrderPopup;