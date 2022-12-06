import React from "react";
import "./DownloadPopUp.css";
import { CSVLink } from "react-csv";

export const DownloadPopUp = ({
  closePopup,
  fileDataProp,
  fileHeadersProp,
}) => {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>Are you sure you would like to do this export?</h1>
        <br />
        <br />
        {fileDataProp?.length && (
          <CSVLink
            headers={fileHeadersProp}
            data={fileDataProp}
            filename="Butterfly_report_dynamo.csv"
            target="_blank"
            style={{ marginRight: "5rem" }}
          >
            Export
          </CSVLink>
        )}
        <button className="popup-button" onClick={closePopup}>
          {" "}
          Cancel{" "}
        </button>
      </div>
    </div>
  );
};
