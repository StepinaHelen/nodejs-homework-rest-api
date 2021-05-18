const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
}

const Subscription = {
  starter: 'starter',
  pro: 'pro',
  business: 'business',
}
module.exports = {
  HttpCode,
  Subscription,
}
