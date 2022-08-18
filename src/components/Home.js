import React, { useState, useEffect } from "react";
import Register from "./Register";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { MDBDataTable } from "mdbreact";

function Home() {
  const [variables, setVariables] = useState({
    id: "",
    name: "",
    availableSlots: "",
    student_number: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    React.useState(false);
  const [locationInfo, setLocationInfo] = useState([]);
  const [rows, setRows] = useState([]);
  const [availableslots, setAvailableslots] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    load_data();
    load_slots();
  }, []);

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
      },
      {
        label: "Location Name",
        field: "name",
      },
      {
        label: "Available Slots",
        field: "slots",
      },
    ],
    rows: rows,
  };

  const load_data = async () => {
    try {
      let res = await fetch(
        "http://localhost:5000/routes/load_placement_locations",
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
      setLocationInfo(result.data);
      const rows = [];
      result.data.map((location) => {
        rows.push({
          name: location.location_name,
          slots: location.available_slots,
          id: location.id,
        });
      });
      setRows(rows);
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  };

  const load_slots = async () => {
    try {
      let res = await fetch(
        "http://localhost:5000/routes/load_available_slots",
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
      const availableSlots = [];
      result.data.map((slots) => {
        availableSlots.push({
          name: slots.location_name,
          slots: slots.available_slots,
        });
      });
      setAvailableslots(availableSlots);
    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  };

  const handleChange = (e) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    setLocationInfo({
      ...locationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    axios
      .post("http://localhost:5000/routes/updatePlacement", variables)
      .then((result) => {
        console.log(result);
        if (result.data.message == "Invalid inputs") {
          setErrors(result.data.errors);
          setIsSuccessfullySubmitted(false);
          setMessage(result.message);
        } else {
          setIsSuccessfullySubmitted(result.success);
          setMessage(result.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* <button onClick={handleClick}>CLICK REDIRECT</button> */}
      <h3>Select Placement Location</h3>
      <Form onSubmit={handleSubmit}>
        {message && <div>{message}</div>}
        <Form.Group className="mb-3">
          <Form.Label>{errors.student_number ?? "Student Number"}</Form.Label>
          <Form.Control
            name="student_number"
            type="text"
            value={variables.student_number}
            onChange={handleChange}
            placeholder="Student Number"
            className={errors.student_number && "is-invalid"}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>{errors.location ?? "location"}</Form.Label>
          <Form.Select
            aria-label="Select Location of placement"
            onChange={handleChange}
            className="browser-default custom-select"
            name="location"
          >
            <option>Select Location</option>
            {locationInfo.map((locationInfo) => (
              <option key={locationInfo.id} value={locationInfo.location_name}>
                {locationInfo.location_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <h1>Location Details</h1>
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
    </>
  );
}

export default Home;
