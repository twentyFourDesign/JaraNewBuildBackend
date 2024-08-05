const NodeCache = require("node-cache");
const nodeCache = new NodeCache({ stdTTL: 60 });

module.exports = nodeCache;
