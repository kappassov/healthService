import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const CreateRecord = () => {
  const [email, setEmail] = useState("");
  const [cname, setCname] = useState("");
  const [disease_code, setDisease_code] = useState("");
  const [total_deaths, setTotal_deaths] = useState("");
  const [total_patients, setTotal_patients] = useState("");
  const [countries, setCountries] = useState([]);
  const [servEmails, setServEmails] = useState([]);
  const [disCodes, setDisCodes] = useState([]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, cname, disease_code, total_deaths, total_patients };
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/record",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      //console.log(response);
      window.location = "/records";
    } catch (err) {
      console.log(err);
    }
  };
  const getEmails = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/pubservants"
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
  const getDisCodes = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/diseases"
      );
      const jsonData = await response.json();

      setDisCodes(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getEmails();
    getDisCodes();
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
          Detected new disease case or want to create new record? Add it here:
        </h2>
        <form
          className="mt-2"
          onSubmit={onSubmitForm}
          style={{ margin: "auto" }}
        >
          <select
            value={email}
            className="form-control text-center w-50"
            aria-label=".form-select-lg example"
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: "auto" }}
          >
            <option value="">Email</option>
            {servEmails.map((serv) => (
              <option name={serv.email} key={serv.email} value={serv.email}>
                {serv.email}
              </option>
            ))}
          </select>

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

          <select
            value={disease_code}
            className="form-control text-center w-50"
            onChange={(e) => setDisease_code(e.target.value)}
            style={{ margin: "auto" }}
          >
            <option value="">Disease code</option>
            {disCodes.map((dis) => (
              <option
                name={dis.disease_code}
                key={dis.disease_code}
                value={dis.disease_code}
              >
                {dis.disease_code}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="form-control text-center w-50"
            value={total_deaths}
            onChange={(e) => setTotal_deaths(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="deaths"
          />
          <input
            type="text"
            className="form-control text-center w-50"
            value={total_patients}
            onChange={(e) => setTotal_patients(e.target.value)}
            style={{ margin: "auto" }}
            placeholder="patients"
          />
          <button className="btn btn-primary mt-3">Add new record</button>
        </form>
        <NavLink
          className="btn btn-lg btn-success mt-5 mb-10 w-50"
          to="/records/data"
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          CHECK DATA
        </NavLink>
      </div>
    </Fragment>
  );
};

export default CreateRecord;
