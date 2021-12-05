import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const CreateUser = () => {
  const [countries, setCountries] = useState([]);
  const [servEmails, setServEmails] = useState([]);
  const [regEmail, setRegEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [regSurname, setRegSurname] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regSalary, setRegSalary] = useState("");
  const [cname, setCname] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    console.log("regEmail", regEmail);
    console.log("regName", regName);
    console.log("regSurname", regSurname);
    console.log("regPhone", regPhone);
    console.log("reqSalary", regSalary);
    console.log("cname", cname);

    try {
      const body = {
        regEmail,
        regName,
        regSurname,
        regSalary,
        regPhone,
        cname,
      };
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = "/records";
    } catch (err) {
      console.log(err);
    }
  };

  const getEmails = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/pubservants");
      const jsonData = await response.json();
      setServEmails(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  const getCountries = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/countries");
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
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="email"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="name"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={regSurname}
            onChange={(e) => setRegSurname(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="surname"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={regSalary}
            onChange={(e) => setRegSalary(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="salary"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
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
            Register
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateUser;
