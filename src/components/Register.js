import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Register() {
  const [variables, setVariables] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    student_number: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    React.useState(false);
  const handleChange = (e) => {
    setVariables({
      ...variables,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/addStudent", variables)
      .then((result) => {
        console.log(result);
        if (result.data.message == "Invalid inputs") {
          setErrors(result.data.errors);
          setIsSuccessfullySubmitted(false);
        } else {
          setIsSuccessfullySubmitted(result.success);
        }
      })
      .catch((error) => console.log(error));

    // setVariables({
    //   first_name: "",
    //   last_name: "",
    //   email: "",
    //   student_number: "",
    // });
  };
  return (
    <>
      <h1>Register</h1>
      <Row>
        <Col></Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>{errors.first_name ?? "Firstname"}</Form.Label>
              <Form.Control
                name="first_name"
                type="text"
                value={variables.first_name}
                onChange={handleChange}
                placeholder="Enter your firstname"
                className={errors.first_name && "is-invalid"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> {errors.last_name ?? "Lastname"}</Form.Label>
              <Form.Control
                name="last_name"
                type="text"
                value={variables.last_name}
                onChange={handleChange}
                placeholder="Enter your lastname"
                className={errors.last_name && "is-invalid"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> {errors.email ?? "Email Address"}</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={variables.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={errors.email && "is-invalid"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> {errors.username ?? "Username"}</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={variables.username}
                onChange={handleChange}
                placeholder="Enter username"
                className={errors.username && "is-invalid"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {" "}
                {errors.student_number ?? "Student Number"}
              </Form.Label>
              <Form.Control
                name="student_number"
                type="text"
                value={variables.student_number}
                onChange={handleChange}
                placeholder="Enter your student number"
                className={errors.student_number && "is-invalid"}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          {isSuccessfullySubmitted && (
            <div className="success">Form submitted successfully</div>
          )}
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}

export default Register;
