const pool = require("../util/connectionPool");

exports.getHome = (req, res, next) => {
  console.log("Connection to student path established succesfully");
  pool
    .execute("SELECT * FROM COMPANY")
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
};
