import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { MDBDataTable } from "mdbreact";

const StudentList = () => {
  //const [placementLocation, setPlacementLocation] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    load_data();
  }, []);

  // const columns = [
  //   { dataField: "Id", text: "Id" },
  //   { dataField: "last_name", text: "Last Name" },
  //   { dataField: "FirstName", text: "First Name" },
  //   { dataField: "StudentNumber", text: "S.no" },
  //   { dataField: "Email", text: "E-Mail" },
  // ];

  const data = {
    columns: [
      {
        label: "Student Number",
        field: "sno",
      },
      {
        label: "Last Name",
        field: "lname",
      },
      {
        label: "First Name",
        field: "fname",
      },
      {
        label: "Email",
        field: "email",
      },
      {
        label: "Placement selection",
        field: "selection",
      },
    ],
    rows: rows,
  };

  const load_data = async () => {
    try {
      let res = await fetch(
        "http://localhost:5000/routes/load_student_details",
        {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      let result = await res.json();
      console.log(result.data);
      setStudentInfo(result.data);
      const rows = [];
      result.data.map((student) => {
        rows.push({
          sno: student.student_number,
          lname: student.last_name,
          fname: student.first_name,
          email: student.email,
          selection: student.selectedLocation,
        });
      });
      setRows(rows);
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  };

  return (
    <div>
      <h1>Enrolled Students</h1>
      <div>
        <MDBDataTable
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={data}
          pagingTop
          searchTop
          searchBottom={false}
          barReverse
          searching={true}
        />
      </div>
    </div>
  );
};
export default StudentList;
