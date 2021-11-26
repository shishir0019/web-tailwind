module.exports = function(moduleOptions) {
  // Add middleware only with `nuxt dev` or `nuxt start`
  if (this.options.dev || this.options._start) {
    this.addServerMiddleware('~/api/identity/identities.ts');
    this.addServerMiddleware('~/api/identity/accounts.ts');
    this.addServerMiddleware('~/api/identity/teams.ts');
    this.addServerMiddleware('~/api/fulfillment.ts');
  }
};
