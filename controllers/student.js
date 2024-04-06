exports.getHome = (req, res, next) => {
  console.log("Connection to student path established succesfully");
  res.render('index');
};
