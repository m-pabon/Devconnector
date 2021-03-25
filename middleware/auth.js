const jwt = require('jsonwebtoken');
const config = require('config');

//A middleware function is a function that has access to the request and response objects.
//Next is a callback that we have to run once we are done so that it moves on to the next peice of middleware
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
