exports.get404 = (req, res) => {
    console.log("Request for an invalid page (404)");
    res.render("404");
};
