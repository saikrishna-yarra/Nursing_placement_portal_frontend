import React, { useState, useEffect } from "react";
import {
  MDBDataTable,
  MDBDataTableV5,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
// import "./css/ImportCsv.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ImportCsv = () => {
  // toast.configure();
  //Data table
  const [datatable, setDatatable] = React.useState({
    columns: [],
    rows: [],
  });

  // React.useEffect(() => {}, callbacks());

  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);

  // toggle place students button
  const [toggleButton, setToggleButton] = useState(false);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;

        const temp = csvFileToArray(text);
        // console.log("temp", temp);
        const headerKeys = Object.keys(Object.assign({}, ...temp));
        const columns = [];
        headerKeys.forEach((x) => {
          columns.push({
            field: x,
            label: x,
          });
        });
        const rows = temp.filter((x) => x != null);
        setDatatable({ columns, rows });
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");

      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    setArray(array);
    return array;
  };

  const addStudentsInfo = async () => {
    //e.preventDefault();
    if (studentInfo.length > 0) {
      try {
        let res = await fetch("http://localhost:5000/routes/addStudentsInfo", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentInfo),
        });
        let result = await res.json();
        alert(result.msg);
      } catch (err) {
        console.log(err);
      }
    }
    setToggleButton(!toggleButton);
  };

  // adding the data to the database

  const addStudentData = async (e) => {
    e.preventDefault();
    var bigArr = [];

    array.forEach((v) => {
      let arr = [v.first_name, v.last_name, v.student_number, v.email];
      bigArr.push(arr);
      // addStudentsInfo(e);
    });
    bigArr.pop();
    setStudentInfo(bigArr);
    //console.log(studentInfo);
    //alert("data is added");
  };

  useEffect(() => {
    (() => {
      addStudentsInfo();
    })();
  }, [studentInfo]);

  // fetch students
  const fetchStudents = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/fetchStudents", {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let result = await res.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  // placing students
  const placeStudents = (e) => {
    e.preventDefault();

    fetchStudents(e);
    alert("Students have been placed!!");
    navigate("/StudentManagement");
  };

  return (
    <div>
      <h2 className="text-center">New Students</h2>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          className="btn btn-danger"
        >
          IMPORT CSV
        </button>
        <button onClick={(e) => addStudentData(e)} className="btn btn-danger">
          Add New Students
        </button>
      </form>

      <div>
        <MDBDataTableV5
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={datatable}
          pagingTop
          searchTop
          searchBottom={false}
          barReverse
        />
      </div>
    </div>
  );
};

export default ImportCsv;
