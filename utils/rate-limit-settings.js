const rateLimitSettings = {
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 500, // лимит 500 запросов в 'windowMs' для каждого IP
};

module.exports = { rateLimitSettings };
