exports.postLogin = (req,res,next)=>{
 
  return res.redirect("/s");
}

exports.is_auth = (req, res, next) => {
  valid = true;
  if (valid) return next();
  console.log("failed");
  res.send("failed");
};

exports.is_student = (req, res, next) => {
  valid = false;
  if (!valid) return next();
//   console.log("failed");
//   res.send("failed");
};

exports.is_company = (req, res, next) => {
    valid = true;
    if (valid) return next();
    console.log("failed");
    res.send("failed");
  };