const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();

PORT = process.env.PORT || 5000;
HOST = "0.0.0.0";
//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(resolve(process.cwd(), "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(resolve(process.cwd(), "client/build/index.html"));
  });
}

//CREATE PUB SERVANT
app.post("/api/publicservant", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO publicservant (email, department) values ($1, $2) returning *",
      [req.body.email, req.body.department]
    );
    res.json({
      status: "success",
      data: {
        user: result.rows[0],
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//CREATE USER
app.post("/api/createuser", async (req, res) => {
  console.log("RESPONSE", req.body.email);
  console.log("RESPONSE", req.body.name);
  console.log("RESPONSE", req.body.surname);

  try {
    const result = await db.query(
      "INSERT INTO users (email, name, surname, salary, phone, cname) values ($1, $2, $3, $4, $5, $6) returning *",
      [
        req.body.email,
        req.body.name,
        req.body.surname,
        req.body.salary,
        req.body.phone,
        req.body.cname,
      ]
    );
    res.json({
      status: "success",
      data: {
        user: result.rows[0],
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//get top countries
app.get("/api/topcountries/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT cname, sum(total_patients) FROM record group by cname order by sum(total_patients) desc"
    );
    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET ALL RECORDS
app.get("/api/records/", async (req, res) => {
  try {
    const result = await db.query("select * from record");
    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET covid-19 patients
app.post("/api/patients", async (req, res) => {
  try {
    const body = req.body.disease_code;
    const result = await db.query(
      "select sum(record.total_patients) from record where record.disease_code = $1 ",
      [body]
    );
    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//GET Specializations for salary
app.get("/api/salaryspecs/", async (req, res) => {
  try {
    const result = await db.query(
      "select distinct dt.description from specialize left join diseasetype as dt on dt.id = specialize.id"
    );
    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET AVG Salary per specialization
app.post("/api/avgsalary/", async (req, res) => {
  try {
    const body = req.body.description;
    const result = await db.query(
      "SELECT ROUND(avg(users.salary), 0) as avg_salary FROM specialize INNER JOIN diseasetype as dt ON specialize.id = dt.id INNER JOIN doctor as doc ON specialize.email = doc.email INNER JOIN users ON doc.email = users.email INNER JOIN country ON users.cname = country.cname where dt.description = $1 ",
      [body]
    );
    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET SPECS
app.get("/api/specializations/", async (req, res) => {
  try {
    const result = await db.query(
      "select spec.index, spec.email,dt.description from specialize as spec inner join diseasetype as dt on dt.id = spec.id order by spec.email"
    );
    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//DELETE SPEC
app.delete("/api/spec/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("DELETE FROM specialize where index = $1", [
      id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (e) {
    console.log(e);
  }
});

//GET PUBLIC SERVANTS
app.get("/api/pubservants/", async (req, res) => {
  try {
    const result = await db.query("select email from publicservant");

    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET USERS
app.get("/api/users/", async (req, res) => {
  try {
    const result = await db.query("select email from users");

    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET COUNTRIES
app.get("/api/countries/", async (req, res) => {
  try {
    const result = await db.query("select cname from country");

    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET DISEASES
app.get("/api/diseases/", async (req, res) => {
  try {
    const result = await db.query("select disease_code from disease");

    res.json({
      status: "success",
      result: result.rows.length,
      data: {
        users: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//GET PARTICULAR RECORD
app.get("/api/user/", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await db.query("select * from users where email = $1", [
      email,
    ]);

    res.json({
      status: "success",
      data: {
        user: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//UPDATE RECORD
app.put("/api/record/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query(
      "UPDATE record SET total_deaths = $2, total_patients = $3 where id = $1 returning *",
      [id, req.body.total_deaths, req.body.total_patients]
    );
    res.json({
      status: "success",
      data: {
        user: result.rows,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//CREATE RECORD
app.post("/api/record", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO record (email, cname, disease_code, total_deaths, total_patients) values ($1, $2, $3, $4, $5) returning *",
      [
        req.body.email,
        req.body.cname,
        req.body.disease_code,
        req.body.total_deaths,
        req.body.total_patients,
      ]
    );
    res.json({
      status: "success",
      data: {
        user: result.rows[0],
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//DELETE RECORD
app.delete("/api/record/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("DELETE FROM record where id = $1", [id]);
    res.status(204).json({
      status: "success",
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
