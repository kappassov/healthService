import React, { Fragment, useEffect, useState } from "react";

const ListSpec = () => {
  const [specs, setSpecs] = useState([]);
  const getSpecs = async () => {
    try {
      const response = await fetch(
        "https://dbhw-health.herokuapp.com/api/specializations"
      );
      const jsonData = await response.json();

      setSpecs(jsonData.data.users);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getSpecs();
  }, []);

  const deleteSpec = async (id) => {
    try {
      const deleteSpec = await fetch(
        `https://dbhw-health.herokuapp.com/api/spec/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(deleteSpec);
      getSpecs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Specializations</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Doctor</th>
            <th>Disease Type</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.index}>
              <td>{spec.index}</td>
              <td>{spec.email}</td>
              <td>{spec.description}</td>
              <td>
                <btn
                  className="btn btn-danger"
                  onClick={() => deleteSpec(spec.index)}
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

export default ListSpec;
