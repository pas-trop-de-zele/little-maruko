const middlewareObj = {}

middlewareObj.isLoggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/signin");
    }
}

module.exports = middlewareObj;