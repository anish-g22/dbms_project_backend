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
  console.log("postApplicants");
  const jid = req.body.JID;
  pool
    .execute("SELECT * FROM APPLICATION WHERE JID = ?", [jid])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { rows: rows, fields: col_names };
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getInterviews = (req, res, next) => {
  console.log("getInterviews");
  const jid = req.body.ID;
  pool
    .execute("SELECT * FROM INTERVIEW WHERE JID = ?", [jid])
    .then(([rows, fields]) => {
      col_names = fields.map((val) => val.name);
      const data = { rows: rows, fields: col_names };
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

<<<<<<< HEAD



=======
exports.postJob = (req, res, next) => {
  console.log("Hey");
  console.log(req.body);
  const jrole = req.body.JobRole;
  const jsal = parseInt(req.body.JobSalary);
  // console.log(typeof(jsal))
  const jdesc = req.body.JobDescription;
  const jstart = req.body.JobStartDate;
  const jdur = parseInt(req.body.JobDuration);
  const cgpa = parseFloat(req.body.MinimumCGPA);
  const maxArr = parseInt(req.body.MaximumArrears);
  const branches = req.body.Branches;
  const gender = req.body.Gender;
  const cid = parseInt(req.body.user_id);
  let str = "";
  branches.forEach((element) => {
    str += element;
    str += ",";
  });
  str = str.slice(0,-1);
  console.log(str);

  let Gen = "";
  if (gender.includes("Male") && gender.includes("Female")) Gen = "B";
  else if (gender.includes("Male")) Gen = "M";
  else if (gender.includes("Female")) Gen = "F";
  else Gen = "B";
  console.log(Gen);
  // return res.send({status : "valid"});
  pool
    .execute("CALL  InsertJob(?,?,?,?,?,?,?,?,?,?)", [
      jrole,
      jsal,
      jdesc,
      jstart,
      jdur,
      cgpa,
      maxArr,
      str,
      cid,
      Gen,
    ])
    .then(([rows, fields]) => {
      console.log(rows);
      console.log("Job Inserted Successfully");
      res.status(200).send({ status: "Job Inserted Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: "Error Occurred" });
    });
};

exports.getApplicants = (req, res, next) => {
  console.log("Post request for Students List");
  console.log(req.body);
  const jid = req.body.jid;
  pool
    .execute("SELECT * FROM APPLICATION WHERE JID = ?", [jid])
    .then(([rows, fields]) => {
      console.log(rows);
      res.status(200).send({ status: "Succesffully sent job applicants" });
    })
    .catch((err) => console.log(err));
};

exports.getInterviewDetails = (req,res,next)=>{
  console.log("Post request for Interview Details")
  console.log(req,body);
  const jid = req.body.JID;
  return res.status(200).send({status:"Valid"});
  // pool.execute()
}
>>>>>>> 88397aea784b476817587c2fa4192e1da37a9936
