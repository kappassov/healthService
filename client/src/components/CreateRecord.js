import React, { Fragment, useState, useEffect } from "react";

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
      const response = await fetch("/api/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      //console.log(response);
      window.location = "/records";
    } catch (err) {
      console.log(err);
    }
  };
  const getEmails = async () => {
    try {
      const response = await fetch("/api/pubservants");
      const jsonData = await response.json();
      setServEmails(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  const getCountries = async () => {
    try {
      const response = await fetch("/api/countries");
      const jsonData = await response.json();

      setCountries(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  const getDisCodes = async () => {
    try {
      const response = await fetch("/api/diseases");
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
      <h1 className="text-center mt-5">Record Registration</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <select
          value={email}
          className="form-control text-center"
          aria-label=".form-select-lg example"
          onChange={(e) => setEmail(e.target.value)}
        >
          <option value="">Email</option>
          {servEmails.map((serv) => (
            <option name={serv.email} key={serv.email} value={serv.email}>
              {serv.email}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        /> */}
        <select
          value={cname}
          className="form-control text-center"
          aria-label=".form-select-lg example"
          onChange={(e) => setCname(e.target.value)}
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
        {/* <input
          type="text"
          className="form-control"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
          placeholder="country"
        /> */}
        <select
          value={disease_code}
          className="form-control text-center"
          aria-label=".form-select-lg example"
          onChange={(e) => setDisease_code(e.target.value)}
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
        {/* <input
          type="text"
          className="form-control"
          value={disease_code}
          onChange={(e) => setDisease_code(e.target.value)}
          placeholder="disease code"
        /> */}
        <input
          type="text"
          className="form-control"
          value={total_deaths}
          onChange={(e) => setTotal_deaths(e.target.value)}
          placeholder="deaths"
        />
        <input
          type="text"
          className="form-control"
          value={total_patients}
          onChange={(e) => setTotal_patients(e.target.value)}
          placeholder="patients"
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </Fragment>
  );
};

export default CreateRecord;
