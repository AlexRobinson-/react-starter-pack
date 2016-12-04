export default (err, req, res) => {
  res.status(500).send({
    errorMessage: err && err.message || 'Something went wrong'
  });
};
