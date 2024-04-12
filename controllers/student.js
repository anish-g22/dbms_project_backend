const pool = require("../util/connectionPool");

exports.getHome = (req, res, next) => {
  console.log("Connection to student path established succesfully");
  return res.status(200).send({ status: "valid", role: "student" });
};

exports.getError = (req, res, next) => {
  console.log("Connection to student path established succesfully");
  pool
    .execute("SELECT * FROM STUDENT")
    .then(([rows, fields]) => {
      console.log("Query Fields:\n");
      console.log(fields);

      console.log("Query Results:\n");
      console.log(rows);
      const data = { rows: rows, fields: fields };
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
  // res.render("index");
};

exports.getUpdates = (req, res, next) => {
  pool
    .execute("SELECT MID 'SNO', CONTENT 'Update' FROM MESSAGES")
    .then(([rows, fields]) => {
      console.log("Query Fields:\n");

      col_names = [];
      for (const [key, value] of fields.entries()) {
        // console.log(key, value);
        col_names.push(value.name);
      }
      console.log(col_names);

      // console.log("Query Results:\n");
      // console.log(rows);
      const data = { fields: col_names, rows: rows };
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAllJobs = (req, res, next) => {
  console.log("Hiiii");
  pool
    .execute(
      "SELECT JID ID , JROLE Role, JSAL 'Monthly Salary', Jdesc Description FROM JOB WHERE JSTATUS = 'approved'"
    )
    .then(([rows, fields]) => {
      console.log("Query Fields:\n");

      col_names = [];
      for (const [key, value] of fields.entries()) {
        // console.log(key, value);
        col_names.push(value.name);
      }
      console.log(col_names);

      // console.log("Query Results:\n");
      // console.log(rows);
      const data = { fields: col_names, rows: rows };
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getEligibleJobs = (req, res, next) => {
  const user_id = req.body.user_id;
  pool
    .execute("SELECT * FROM STUDENT WHERE sroll = ?", [user_id])
    .then(([rows, fields]) => {
      // col_names = [];
      // for (const [key, value] of fields.entries()) {
      //   col_names.push(value.name);
      // }
      // const data = { fields: col_names, rows: rows };
      // console.log(data);
      // // res.send(data);
      return pool.execute(
        "SELECT JID FROM ELIGIBILITY WHERE CGPA<=? AND BR_ID = ? AND PR_ID = ?",
        [rows[0].CGPA, rows[0].BR_ID, rows[0].PR_ID]
      );
    })
    .then(([rows, fields]) => {
      console.log("rows", rows);
      jids = rows.map((val) => val.JID);
      console.log("jids", jids);
      const placeholders = jids.map(() => "?").join(",");
      return pool.execute(
        `SELECT JID ID , JROLE Role, 
      JSAL 'Monthly Salary', Jdesc Description 
      FROM JOB WHERE JSTATUS = 'approved' AND JID IN (${placeholders})`,
        jids
      );
    })
    .then(([rows, fields]) => {
      col_names = [];
      for (const [key, value] of fields.entries()) {
        col_names.push(value.name);
      }
      const data = { fields: col_names, rows: rows };
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Inavlid Request to Databse" });
    });
};

exports.getAppliedJobs = (req, res, next) => {
  console.log("Get Applied Jobs\n");
  pool
    .execute("SELECT * FROM APPLICATION WHERE SROLL = ?", [req.body.user_id])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Inavlid Request to Databse" });
    });
};

exports.getAuth = (req, res, next) => {
  console.log("Auth Page Requested\n");
  res.render("Auth/login");
};
