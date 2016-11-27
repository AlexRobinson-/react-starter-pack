export default (err, req, res, next) => {
  console.error('Testing Error:', err);
  res.status(500).send({
    errorMessage: err && err.message || 'Something went wrong'
  });
};
