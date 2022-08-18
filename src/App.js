import "./App.css";
import Container from "react-bootstrap/Container";
import Home from "./components/Home";
import ParseExcell from "./components/ParseExcell";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import StudentList from "./components/StudentList";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import ImportCsv from "./components/ImportCsv";
import React, { useState } from "react";

// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const [token, setToken] = useState();

  //const token = getToken();

  // if (!token) {
  //   return (
  //     <Container>
  //       <Router>
  //         <Login setToken={setToken} />
  //       </Router>
  //     </Container>
  //   );
  // }
  if (!token) {
    return (
      <Container>
        <Login setToken={setToken} />
      </Container>
    );
  }

  return (
    // <Container>
    //   <Routes>
    //     <Route>
    //       {/* element={<Layout />} */}
    //       {/* public routes */}
    //       <Route path="login" element={<Login />} />

    //       {/* we want to protect these routes */}

    //       {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
    //       <Route path="/" element={<Home />} />
    //       <Route path="register" element={<Register />} />
    //       {/* </Route> */}

    //       {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
    //       <Route exact path="/autoregister" element={<ParseExcell />} />
    //       <Route exact path="/studentlist" element={<StudentList />} />
    //       {/* </Route> */}

    //       {/* catch all */}
    //       {/* <Route path="*" element={<Missing />} /> */}
    //     </Route>
    //   </Routes>
    // </Container>

    <Container>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/autoregister" element={<ParseExcell />} />

        <Route exact path="/studentlist" element={<StudentList />} />
        <Route exact path="/importCsv" element={<ImportCsv />}></Route>
      </Routes>
    </Container>
  );
}

export default App;
