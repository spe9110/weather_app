const cache = {};

export const setCache = (key, data) => {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
};

export const getCache = (key, maxAge = 300000) => { // default 5 minutes
  const cached = cache[key];
  if (!cached) return null;

  if (Date.now() - cached.timestamp > maxAge) {
    // cache expired
    delete cache[key];
    return null;
  }
  return cached.data;
};