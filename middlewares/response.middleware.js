const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    return res.status(res.err.status).json({
      error: true,
      message: res.err.msg,
    });
  }
  return res.status(200).json(res.data);
  // next();
};

exports.responseMiddleware = responseMiddleware;
