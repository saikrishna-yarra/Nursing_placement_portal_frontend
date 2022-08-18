import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import userstore from "./Userstore";
import PropTypes from "prop-types";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login({ setToken }) {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
    React.useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  async function loginUser(credentials) {
    return fetch("http://localhost:5000/routes/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:5000/routes/login", variables)
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data.message == "Invalid inputs") {
  //         setErrors(result.data.errors);
  //         setIsSuccessfullySubmitted(false);
  //         alert(result.msg);
  //       } else {
  //         setIsSuccessfullySubmitted(result.success);
  //         userstore.isLoggedIn = true;
  //         userstore.username = result.username;
  //         const roles = "2001";
  //         const accessToken = result.username;
  //         setAuth(variables.username, variables.password, roles, accessToken);
  //         navigate(from, { replace: true });
  //       }
  //     })
  //     .catch((error) => console.log(error.response.data));
  //   };
  // try {
  //   const response = await axios.post(
  //     "http://localhost:5000/routes/login",
  //     JSON.stringify({ username, password }),
  //     {
  //       headers: { "Content-Type": "application/json" },
  //       withCredentials: true,
  //     }
  //   );
  //   console.log(JSON.stringify(response?.data));
  //   //console.log(JSON.stringify(response));
  //   const accessToken = response?.data?.username;
  //   const roles = "2001";
  //   setAuth({ username, password, roles, accessToken });
  //   setUsername("");
  //   setPassword("");
  //   navigate(from, { replace: true });
  // } catch (err) {
  //   if (!err?.response) {
  //     setErrMsg("No Server Response");
  //   } else if (err.response?.status === 400) {
  //     setErrMsg("Missing Username or Password");
  //   } else if (err.response?.status === 401) {
  //     setErrMsg("Unauthorized");
  //   } else {
  //     setErrMsg("Login Failed");
  //   }
  //   errRef.current.focus();
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    setToken(token);
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

// export default function Login({ setToken }) {
//   let navigate = useNavigate();
//   const [variables, setVariables] = useState({
//     username: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] =
//     React.useState(false);

//   const handleChange = (e) => {
//     setVariables({
//       ...variables,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const resetForm = () => {
//     this.setState({
//       username: "",
//       password: "",
//       buttonDisabled: false,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5000/routes/login", variables)
//       .then((result) => {
//         console.log(result);
//         if (result.data.message == "Invalid inputs") {
//           setErrors(result.data.errors);
//           setIsSuccessfullySubmitted(false);
//           alert(result.msg);
//         } else {
//           setIsSuccessfullySubmitted(result.success);
//           userstore.isLoggedIn = true;
//           userstore.username = result.username;
//           setToken(variables.username);
//           navigate("/studentList");
//         }
//       })
//       .catch((error) => console.log(error.response.data));
//   };

//   return (
//     <>
//       <h1> Login </h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>{errors.username ?? "Username"}</Form.Label>
//           <Form.Control
//             name="username"
//             type="text"
//             value={variables.username}
//             onChange={handleChange}
//             placeholder="username"
//             className={errors.username && "is-invalid"}
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>{errors.password ?? "Password"}</Form.Label>
//           <Form.Control
//             name="password"
//             type="password"
//             value={variables.password}
//             onChange={handleChange}
//             placeholder="password"
//             className={errors.password && "is-invalid"}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Login
//         </Button>
//       </Form>
//     </>
//   );
// }

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
