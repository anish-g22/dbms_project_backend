const pool = require("../util/connectionPool");

exports.getHome = (req, res, next) => {
  console.log("COMPANY JOBS");
  const cid = req.body.user_id;
  pool
    .execute("SELECT * FROM JOB WHERE cid = ?", [cid])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getApplication = (req, res, next) => {};

exports.getProfile = (req, res, next) => {
  console.log("COMPANY PROFILE");
  const cid = req.body.user_id;
  pool
    .execute(
      "SELECT CNAME, CITY, CPROFILE, CREGDATE FROM COMPANY WHERE cid = ?",
      [cid]
    )
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getApplication = (req, res, next) => {
  console.log("COMPANY APPLICATIONS");
  const cid = req.body.user_id;
  const jid = req.body.jid;
  pool
    .execute(
      "SELECT * FROM APPLICATION WHERE jid = ?",
      [jid]
    )
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postUpdateProfile = (req, res, next) => {};

exports.postJob = (req, res, next) => {};
