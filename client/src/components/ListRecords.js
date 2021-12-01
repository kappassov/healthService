import React, { Fragment, useEffect, useState } from "react";
import EditRecord from "./EditRecord";
const ListRecords = () => {
  const [records, setRecords] = useState([]);

  const deleteRecord = async (id) => {
    try {
      const deleteRec = await fetch(`/api/record/${id}`, {
        method: "DELETE",
      });
      console.log(deleteRec);
      getRecords();
    } catch (err) {
      console.error(err);
    }
  };
  const getRecords = async () => {
    try {
      const response = await fetch("/api/records");
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
      {"\n"}
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
    </Fragment>
  );
};

export default ListRecords;
