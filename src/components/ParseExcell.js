import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

export const ParseExcell = () => {
  const [fileName, setFileName] = useState(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const data = await file.arrayBuffer();
    const workbook = XLSX.readFile(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log(jsonData);
  };

  // using useNavigate() hook
  const navigate = useNavigate();
  const routeChange = () => {
    const path = "/ImportCsv";
    navigate(path);
  };

  return (
    <div>
      autoregister
      <h1>Excel</h1>
      {/* <input type="file" onChange={(e) => handleFile(e)} />
      <button onClick={handleFile}> SUBMIT </button> */}
      <button
        className="btn btn-danger float-right"
        style={{ float: "right" }}
        onClick={routeChange}
      >
        Import CSV
      </button>
    </div>
  );
};

export default ParseExcell;
