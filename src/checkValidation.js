module.exports = (fields) => {
  return (req, res, next) => {
    let hasError = false;
    let error = {};

    for (let field of fields) {
      if (!(field in req.body) || req.body[field].length === 0) {
        hasError = true;
        error[field] = [`The ${field} field is required`];
      }
    }

    if (hasError) {
      return res.status(400).json(error);
    }
    next();
  };
};