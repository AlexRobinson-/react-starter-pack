/**
 * Adds basic error catching for async routes
 * @param route
 */
export default route => (req, res, next) => Promise.resolve(route(req, res)).catch(next);
