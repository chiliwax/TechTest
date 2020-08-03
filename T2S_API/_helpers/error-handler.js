
function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        if (err.message == 'No authorization token was found') {
            return res.redirect('/404')
        }
        else {
            return res.status(401).json({ message: 'Invalid Token ' });
        }
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}
module.exports = errorHandler;