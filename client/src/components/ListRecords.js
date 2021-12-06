import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EditRecord from "./EditRecord";
const ListRecords = () => {
  const [records, setRecords] = useState([]);

  const deleteRecord = async (id) => {
    try {
      const deleteRec = await fetch(
        `https://dbhw-health.herokuapp.com/api/record/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(deleteRec);
      window.location = "/";
    } catch (err) {
      console.error(err);
    }
  };
  const getRecords = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/records"
      );
      const jsonData = await response.json();

      setRecords(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getRecords();
  }, []);
  return (
    <Fragment>
      <h1 className="text-center mt-5 mb-5">Records</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Public Servant</th>
            <th>Country</th>
            <th>Disease code</th>
            <th>Total Deaths</th>
            <th>Total Patients</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.email}</td>
              <td>{record.cname}</td>
              <td>{record.disease_code}</td>
              <td>{record.total_deaths}</td>
              <td>{record.total_patients}</td>
              <td>{<EditRecord record={record} />}</td>
              <td>
                <btn
                  className="btn btn-danger"
                  onClick={() => deleteRecord(record.id)}
                >
                  DELETE
                </btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NavLink
        className="btn btn-lg btn-info mt-5"
        to="/records"
        style={{
          padding: 10,
          fontWeight: "bold",
        }}
      >
        BACK
      </NavLink>
    </Fragment>
  );
};

export default ListRecords;
