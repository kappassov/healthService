import { React, Fragment } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import CreateRecord from "./components/CreateRecord";
import CreateUser from "./components/CreateUser";
import ListRecords from "./components/ListRecords";
import ListSpec from "./components/ListSpec";
import Home from "./components/Home";
import "./App.css";
const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: "grey", height: 40, borderRadius: 25 }}
          >
            <NavLink
              to="/"
              style={{
                padding: 20,
                justifyContent: "center",
                color: "aliceblue",
                fontWeight: "bold",
              }}
            >
              Home
            </NavLink>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/records" exact component={CreateRecord} />
          {/* <Route path="/records" exact component={CreateUser} /> */}
          <Route path="/records/data" exact component={ListRecords} />
          <Route path="/specs" exact component={ListSpec} />
        </div>
      </BrowserRouter>
      {/* <CreateRecord />
        <ListRecords />
        <ListSpec /> */}
    </Fragment>
  );
};

export default App;
