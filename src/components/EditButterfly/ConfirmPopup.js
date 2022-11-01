import React from "react";
import "./ConfirmPopup.css";
export const ConfirmPopup = ({closePopup, deleteButterfly}) => {
  return (
    <div className="popup-container">
     <div className="popup-body">
      <h1>Are you sure you would like to delete this butterfly?</h1>
      <br/><br/>
      <button onClick={deleteButterfly}>Confirm</button>
      <button onClick={closePopup}> Cancel </button>
     </div>
    </div>
  );
};