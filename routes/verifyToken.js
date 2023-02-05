import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader) {
    res.status(401).send('You are not authenticated!');
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) {
      res.status(401).send('Token not Valid');
      return;
    }

    req.user = user;
    next();
  });
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('Your not allowed to do that');
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('Your not allowed to do that');
    }
  });
};
