import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import TestQuestion from "./components/test-questions.component";
import TestRegister from "./components/test-register.component";
import TestList from "./components/test-list.component";
import Home from "./components/home.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Test-system
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/teste"} className="nav-link">
                Register Test
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/test-list"} className="nav-link">
                Tests
              </Link>
            </li>
          </div>
        </nav>

        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teste" element={<TestRegister />} />
            <Route path="/test-question/:id" element={<TestQuestion />} />
            <Route path="/test-list" element={<TestList />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
