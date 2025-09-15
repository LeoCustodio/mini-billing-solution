const { allowRequest } = require('../util/rateLimiter');


module.exports.rateLimiterMiddleware = async (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || "unknown";

  const allowed = await allowRequest({
    key: `rate:${ip}`,
    capacity: 10,        // max 10 requests
    refillRate: 0.2,     // 1 token every 5 seconds
    windowSeconds: 60,   // Redis TTL
  });

  if (!allowed) {
    return res.status(429).json({ message: "Too many requests. Try again later." });
  }

  next();
};
