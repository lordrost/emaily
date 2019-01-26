/* Check Production or Development Envoironment and return keys */
if (process.env.NODE_ENV === 'production'){
  //production
  module.exports = require('./prod');
}
else {
  // Development
  module.exports = require('./dev');
}
