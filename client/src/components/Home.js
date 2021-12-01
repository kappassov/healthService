import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [salarySpecs, setSalarySpecs] = useState([]);
  const [avgSalary, setAvgSalary] = useState([]);
  const [patients, setPatients] = useState([]);

  const getPatients = async (disease_code) => {
    try {
      const body = { disease_code };
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setPatients(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getAvgSalary = async (description) => {
    try {
      const body = { description };
      const response = await fetch("/api/avgsalary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();

      setAvgSalary(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getSalarySpecs = async () => {
    try {
      const response = await fetch("/api/salaryspecs");
      const jsonData = await response.json();
      //console.log(jsonData.data.users);
      setSalarySpecs(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSalarySpecs();
  }, []);

  return (
    <div>
      <h1
        className="text-center mt-5"
        style={{
          fontFamily: "Open Sans Condensed",
          fontSize: 48,
          color: "#333",
        }}
      >
        WELCOME
      </h1>
      <h3
        className="text-center mt-3"
        style={{
          fontFamily: "Open Sans Condensed",
          fontSize: 30,
          color: "#333",
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
          className="mt-3"
          style={{
            fontFamily: "Open Sans Condensed",
            fontSize: 20,
            color: "#333",
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
            fontFamily: "font-variant-numeric",
            fontSize: 40,
          }}
        >
          {avgSalary.map((avg) => avg.avg_salary) + " KZT"}
        </h4>

        <h2
          className="text-center mt-4"
          style={{
            fontFamily: "Open Sans Condensed",
            fontSize: 20,
            color: "#333",
          }}
        >
          You decide to be a Public Servant? Just look at those{" "}
          <b>number of COVID-19 patients </b>!
        </h2>
        <button
          className="btn btn-lg btn-outline-primary mt-2"
          onClick={() => getPatients("covid-19")}
        >
          REFRESH
        </button>
        <h4
          className="text-center mt-3"
          style={{
            fontFamily: "font-variant-numeric",
            fontSize: 40,
          }}
        >
          {patients.map((patient) => patient.sum)}
        </h4>
      </div>
    </div>
  );
};

export default Home;
