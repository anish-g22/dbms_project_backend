const pool = require("../util/connectionPool");

exports.getHome = (req, res, next) => {
  console.log("Connection to admin path established succesfully");
  return res.status(200).send({ status: "valid", role: "admin" });
};

exports.getAllStudents = (req, res, next) => {
  console.log("Connection to /a/students path established succesfully");
  pool
    .execute("SELECT * FROM ADMINISTRATOR")
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAdminProfile = (req, res, next) => {
  console.log("Connection to /a/profile path established succesfully");
  const aid = req.body.user_id;
  pool
    .execute("SELECT * FROM ADMINISTRATOR WHERE aid = ?", [aid])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getAllJobs = (req, res, next) => {
  console.log("Admin ALL JOBS");
  pool
    .execute("SELECT * FROM JOB")
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getApprovedJobs = (req, res, next) => {
  console.log("Admin Approved JOBS");
  pool
    .execute("SELECT * FROM JOB WHERE Jstatus = 'approved'")
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getPendingJobs = (req, res, next) => {
  console.log("Admin Pending JOBS");
  pool
    .execute(
      "SELECT JID ID, JSAL 'MONTHLY SALARY', JDESC DESCRIPTION, CONCAT(JDUR, ' Months') DURATION, JSTART START FROM JOB WHERE Jstatus = 'pending'"
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

exports.getUpdates = (req, res, next) => {
  console.log("Admin Messages");
  pool
    .execute("SELECT * FROM MESSAGES")
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.postUpdates = (req, res, next) => {};

exports.postUpdateProfile = (req, res, next) => {};

exports.postApproveJob = (req, res, next) => {
  console.log("ADMIN Approve Job");
  console.log(req.body);
  pool
    .execute("UPDATE job SET jstatus = 'approved' WHERE jid = ?", [
      req.body.jid,
    ])
    .then(([rows, fields]) => {console.log("job updated")})
    .catch((err) => console.log(err));
};

exports.postRejectJob = (req, res, next) => {
  console.log("ADMIN Reject Job");
  console.log(req.body);
  pool
    .execute("UPDATE job SET jstatus = 'on hold' WHERE jid = ?", [
      req.body.jid,
    ])
    .then(([rows, fields]) => {console.log("job updated")})
    .catch((err) => console.log(err));
};
