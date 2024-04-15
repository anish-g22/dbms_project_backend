const pool = require("../util/connectionPool");

exports.getHome = (req, res, next) => {
  console.log("COMPANY JOBS");
  return res.status(200).send({ status: "valid", role: "admin" });
};

exports.getMyJobs = (req, res, next) => {
  const cid = req.body.user_id;
  console.log("COMPANY JOBS");
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
    .execute("SELECT * FROM APPLICATION WHERE jid = ?", [jid])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { fields: col_names, rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getBranches = (req, res, next) => {
  console.log("COMPANY BRANCHES");
  pool
    .execute("SELECT * FROM BRANCH")
    .then(([rows, fields]) => {
      // rows = rows.map((val) => val.BR_NAME);
      const data = { rows: rows };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUpdateProfile = (req, res, next) => {};

exports.postApplicants = (req, res, next) => {
  console.log('postApplicants');
  const jid = req.body.JID;
  pool
    .execute("SELECT * FROM APPLICATION WHERE JID = ?",[jid])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { rows: rows , fields: col_names };
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getInterviews = (req, res, next) => {
  console.log('getInterviews');
  const jid = req.body.ID;
  pool
    .execute("SELECT * FROM INTERVIEW WHERE JID = ?",[jid])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { rows: rows , fields: col_names };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postJob = (req, res, next) => {
  console.log("Hey");
  console.log(req.body);
  const jrole = req.body.JobRole;
  const jsal = req.body.JobSalary;
  const jdesc = req.body.JobDescription;
  const jstart = req.body.JobStartDate;
  const jdur = req.body.JobDuration;
  const cgpa = req.body.MinimumCGPA;
  const maxArr = req.body.MaximumArrears;
  const branches = req.body.Branches;
  const gender = req.body.Gender;
  const cid = req.body.user_id;
  return res.status(200).send({ status: "Sucessfully sent job details" });
  pool
    .execute(
      "INSERT INTO JOB (CID, JROLE, JSAL, JDESC, JSTART, JDUR, JSTATUS) VALUES (?,?,?,?,?,?)",
      [cid, jrole, jsal, jdesc, jstart, jdur, "pending"]
    )
    .then(([rows, fields]) => {
      console.log(rows);
      return pool.execute("INSERT INTO ELIGIBILITY VALUES (?,?,?)", []);
    })
    .then(([rows, fields]) => {
      res.status(200).send({ status: "Succesffully Inserted new job" });
    })
    .catch((err) => console.log(err));
};

exports.postStudentList = (req, res, next) => {
  console.log("Post request for Students List");
  console.log(req.body);
  const jid = req.body.jid;
  pool
    .execute("SELECT * FROM JOB WHERE JID = ?", [jid])
    .then(([rows, fields]) => {
      console.log(rows);
      res.status(200).send({ status: "Succesffully sent job applicants" });
    })
    .catch((err) => console.log(err));
};
