import Route from '@ember/routing/route';

export default class ScopesScopeCredentialStoresRoute extends Route {
  // =methods

  /**
   * Load all credentials stores under current scope
   * @return {Promise[CredentialStoreModel]}
   */
  async model() {
    const { id: scope_id } = this.modelFor('scopes.scope');
    return this.store.query('credential-store', { scope_id });
  }
}
