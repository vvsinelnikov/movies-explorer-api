const rateLimitSettings = {
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5000, // лимит 5000 запросов в 'windowMs' для каждого IP
};

module.exports = { rateLimitSettings };
