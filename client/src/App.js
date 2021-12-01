import { React, Fragment } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import CreateRecord from "./components/CreateRecord";
import ListRecords from "./components/ListRecords";
import ListSpec from "./components/ListSpec";
import Home from "./components/Home";
const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <div className="container">
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-light"
            style={{ backgroundColor: "black", height: 40 }}
          >
            <NavLink to="/" style={{ padding: 20, justifyContent: "center" }}>
              Home
            </NavLink>
          </nav>

          <Route path="/" exact component={Home} />
          <Route path="/records" exact component={CreateRecord} />
          <Route path="/records" exact component={ListRecords} />
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
