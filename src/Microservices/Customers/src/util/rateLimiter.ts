import Redis from "ioredis";

const redis = new Redis(); // Default: localhost:6379

interface RateLimiterConfig {
  key: string;             // Unique key per user/IP
  capacity: number;        // Max number of tokens
  refillRate: number;      // Tokens per second
  windowSeconds: number;   // Expiration time
}

export async function allowRequest(config: RateLimiterConfig): Promise<boolean> {
  const { key, capacity, refillRate, windowSeconds } = config;
  const now = Date.now();
  const nowSec = Math.floor(now / 1000);

  const script = `
    local key         = KEYS[1]
    local rate        = tonumber(ARGV[1])
    local capacity    = tonumber(ARGV[2])
    local now         = tonumber(ARGV[3])
    local expireAfter = tonumber(ARGV[4])

    local data = redis.call("HMGET", key, "tokens", "timestamp")
    local tokens = tonumber(data[1]) or capacity
    local lastRefill = tonumber(data[2]) or now

    local delta = math.max(0, now - lastRefill)
    tokens = math.min(capacity, tokens + delta * rate)

    if tokens < 1 then
      return 0
    else
      tokens = tokens - 1
      redis.call("HMSET", key, "tokens", tokens, "timestamp", now)
      redis.call("EXPIRE", key, expireAfter)
      return 1
    end
  `;

  const allowed = await redis.eval(script, 1, key, refillRate, capacity, nowSec, windowSeconds);
  return allowed === 1;
}
