import React, { Fragment, useState } from "react";

const EditRecord = ({ record }) => {
  const [total_deaths, setTotal_deaths] = useState(record.total_deaths);
  const [total_patients, setTotal_patients] = useState(record.total_patients);
  //console.log(record);

  const updateData = async (e) => {
    e.preventDefault();

    try {
      const body = { total_deaths, total_patients };
      const response = await fetch(`/api/record/${record.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/records";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-info"
        data-toggle="modal"
        data-target={`#id${record.id}`}
      >
        EDIT
      </button>

      <div
        id={`id${record.id}`}
        class="modal fade"
        role="dialog"
        onClick={() => {
          setTotal_deaths(record.total_deaths);
          setTotal_patients(record.total_patients);
        }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit record</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => {
                  setTotal_deaths(record.total_deaths);
                  setTotal_patients(record.total_patients);
                }}
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <label for="death">Total deaths: </label>
              <input
                type="text"
                className="form-control"
                value={total_deaths}
                id="death"
                onChange={(e) => setTotal_deaths(e.target.value)}
              />
              <label for="patient">Total patients: </label>
              <input
                type="text"
                className="form-control"
                value={total_patients}
                id="patient"
                onChange={(e) => setTotal_patients(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-info"
                data-dismiss="modal"
                onClick={(e) => updateData(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={() => {
                  setTotal_deaths(record.total_deaths);
                  setTotal_patients(record.total_patients);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditRecord;
