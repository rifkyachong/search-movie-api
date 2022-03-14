const notFound = (req, res, next) => {
  return res.status(404).json({ msg: "route is not available" });
};

module.exports = notFound;
