function cors(req, res, next) {
    const corsWhitelist = [
        process.env.CLIENT_URL
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    next();
}

module.exports = cors