let bluebird = require('bluebird')
let redis = require('redis');
let client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = (_ => {

  const cacheMiss = (url, html) => {
    // client.set(url, html, redis.print);
  }

  const init = (req, res, next) => {
    return (req,res,next) => {
      client.getAsync(req.url)
        .then( reply => {
          if(reply) {
            res.send(reply)
          } else {
            next();
          }
        })
    }
  }

  return {
    init,
    cacheMiss
  }

})();