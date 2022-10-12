let lookup = [];
module.exports.lookup = lookup;

module.exports.findWs = (req, type) => {
  return lookup.findIndex((obj) => {
    return obj.userName === type + req.params.gamepin;
  });
};
