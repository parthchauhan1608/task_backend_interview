const { http_codes, message } = require("../Util/constant");
const response = require("../Util/responseHandler");
const { generateAuthToken, validateToken } = require("../Util/jwtService");

async function validateJWT(req, res, next) {
    if (!req.headers.auth_token) {
        let error = response.error(http_codes.UNAUTHORIZED, message.ERROR.UNAUTHORIZED);
        res.status(error.code).send(error);
        return;
    }

    let checkToket = await validateToken(req.headers.auth_token);
    if (!checkToket) {
        let error = response.error(http_codes.UNAUTHORIZED, message.ERROR.UNAUTHORIZED);
        res.status(error.code).send(error);
        return;
    }

    next();

}

function createTopic(req, res, next) {
    const payload = req.body;
    if (
        !payload.user_id ||
        !payload.title ||
        !payload.discription
    ) {
        let error = response.error(http_codes.BAD_REQUEST, message.ERROR.ERROR_REQUIRED_ALL_FIELDS);
        res.status(error.code).send(error);
    }
    else {
        next();
    }
}

module.exports = {
    validateJWT,
    createTopic,
};