exports.get500 = (err, req, res) => {
  res.status(500).json({
    success: false,
    message: `Something went wrong... ${err}`
  });
};
