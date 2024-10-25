'use strict'

const roleBasedAccess = (roles) => {
    return function (req, res, next) {
        if (!roles.includes(req.role)) {
            return res.status(403).json({ status: false, msg: 'Permission denied' });
        }
        next();
    }
}

export default roleBasedAccess;