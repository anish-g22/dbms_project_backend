exports.get404 = (req, res, next) => {
    console.log("Request for an invalid page (404)");
    res.render("error");
};
