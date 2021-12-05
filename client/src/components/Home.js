import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [salarySpecs, setSalarySpecs] = useState([]);
  const [avgSalary, setAvgSalary] = useState([]);
  const [patients, setPatients] = useState([]);
  const [countries, setCountries] = useState([]);

  const getTopCountries = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/topcountries"
      );
      const jsonData = await response.json();

      setCountries(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getPatients = async (disease_code) => {
    try {
      const body = { disease_code };
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/patients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const jsonData = await response.json();

      setPatients(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getAvgSalary = async (description) => {
    try {
      const body = { description };
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/avgsalary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const jsonData = await response.json();

      setAvgSalary(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getSalarySpecs = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/salaryspecs"
      );
      const jsonData = await response.json();
      //console.log(jsonData.data.users);
      setSalarySpecs(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSalarySpecs();
    getTopCountries();
  }, []);

  return (
    <div>
      <h1
        className="text-center mt-5"
        style={{
          fontWeight: "bold",
          fontSize: 48,
        }}
      >
        WELCOME
      </h1>
      <h3
        className="text-center mt-3"
        style={{
          fontSize: 30,
        }}
      >
        you can access data based on <b>who you are </b>:
      </h3>

      <div
        className="mt-3"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NavLink
          className="btn btn-lg btn-outline-success w-100"
          to="/records"
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          Public Servant
        </NavLink>

        <NavLink
          className="btn btn-lg btn-outline-danger w-100"
          to="/specs"
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          Doctor
        </NavLink>
      </div>
      <div className="mt-5 text-center">
        <h2
          className="text-center mt-3"
          style={{
            fontSize: 20,
          }}
        >
          You decide to be a Public Servant? Just look at those{" "}
          <b>number of COVID-19 patients </b>!
        </h2>
        <button
          className="btn btn-primary mt-2"
          onClick={() => getPatients("covid-19")}
        >
          REFRESH
        </button>
        <h4
          className="text-center mt-3"
          style={{
            fontSize: 40,
          }}
        >
          {patients.map((patient) => patient.sum)}
        </h4>
        <h2
          className="mt-5"
          style={{
            fontSize: 20,
          }}
        >
          If you want to be a Doctor but didn't come up with specialization, you
          can look for <b>average salaries per specialization </b> for extra
          motivation:
        </h2>
        <select
          value="specialization"
          className="form-control text-center"
          onChange={(e) => getAvgSalary(e.target.value)}
        >
          <option value="">Specializations</option>
          {salarySpecs.map((spec) => (
            <option
              name={spec.description}
              key={spec.description}
              value={spec.description}
            >
              {spec.description}
            </option>
          ))}
        </select>
        <h4
          className="text-center mt-4"
          style={{
            fontSize: 40,
          }}
        >
          {avgSalary.map((avg) => avg.avg_salary) + " KZT"}
        </h4>
      </div>
      <h2
        className="text-center mt-5"
        style={{
          fontSize: 20,
        }}
      >
        We need your help to treat all of these people:
      </h2>
      <div style={{ textAlign: "center" }}>
        <table
          className="table table-striped mt-3 w-50 "
          style={{ margin: "auto" }}
        >
          <thead>
            <tr>
              <th>Country</th>
              <th>Currently diseased</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.cname}>
                <td>{country.cname}</td>
                <td>{country.sum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
