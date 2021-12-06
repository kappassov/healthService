import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const CreateUser = () => {
  const [countries, setCountries] = useState([]);
  const [servEmails, setServEmails] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [cname, setCname] = useState("");
  const [department, setDepartment] = useState("");
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        name,
        surname,
        salary,
        phone,
        cname,
      };
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/createuser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      //console.log(response);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };
  const createServant = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email,
        department,
      };
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/publicservant",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };
  const getEmails = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/users"
      );
      const jsonData = await response.json();
      setServEmails(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getCountries = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/countries"
      );
      const jsonData = await response.json();

      setCountries(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEmails();
    getCountries();
  }, []);
  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <h2
          className="mt-5"
          style={{
            fontSize: 20,
            margin: "auto",
          }}
        >
          First time? Create user account:
        </h2>
        <form className="mt-2" onSubmit={createUser} style={{ margin: "auto" }}>
          <input
            type="text"
            className="form-control text-center w-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="email"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="name"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="surname"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="salary"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="phone number"
          />

          <select
            value={cname}
            className="form-control text-center w-50"
            aria-label=".form-select-lg example"
            onChange={(e) => setCname(e.target.value)}
            style={{ margin: "auto" }}
          >
            <option value="">Country</option>
            {countries.map((country) => (
              <option
                name={country.cname}
                key={country.cname}
                value={country.cname}
              >
                {country.cname}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-primary mt-3">
            Register user
          </button>
        </form>
        <form
          className="form-control d-flex mt-5 w-50"
          style={{ margin: "auto" }}
          onSubmit={createServant}
        >
          <select
            value={email}
            className="form-control text-center w-50"
            aria-label=".form-select-lg example"
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "auto" }}
          >
            <option value="">email</option>
            {servEmails.map((user) => (
              <option name={user.email} key={user.email} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
          <input
            className="form-control text-center w-50"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
          />
          <button type="submit" className="btn btn-primary w-60 ml-3">
            Add Servant
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateUser;
