export const errorHandler = (err, req, res, next) => {
  res.send({
    userError: err.message,
  });
};
