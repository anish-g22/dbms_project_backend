const pool = require("../util/connectionPool");

exports.getHome = (req,res,next)=>{
    return res.send({status:"valid"});
}

exports.getAllStudents = (req, res, next) => {
  console.log("Connection to /a/students path established succesfully");
  pool
    .execute("SELECT * FROM ADMINISTRATOR")
    .then(([rows, fields]) => {
        console.log("Query Fields:\n");

        col_names = [];
        for (const [key, value] of fields.entries()) {
          // console.log(key, value);
          col_names.push(value.name);
        }
        console.log(col_names);

      console.log("Query Results:\n");
      console.log(rows);
      const data = { fields: col_names, rows: rows };
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getMyDetails = (req, res, next) => {
    console.log("Connection to /a/profile path established succesfully");
    const aid = req.body.user_id;
    pool
      .execute("SELECT * FROM ADMINISTRATOR WHERE aid = ?",[aid])
      .then(([rows, fields]) => {
        console.log("Query Fields:\n");

        col_names = [];
        for (const [key, value] of fields.entries()) {
          // console.log(key, value);
          col_names.push(value.name);
        }
        console.log(col_names);

      console.log("Query Results:\n");
      console.log(rows);
      const data = { fields: col_names, rows: rows };
      res.send(data);
      })
      .catch((err) => {
        console.error(err);
      });   
}