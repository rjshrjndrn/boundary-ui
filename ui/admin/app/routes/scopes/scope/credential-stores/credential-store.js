import Route from '@ember/routing/route';

export default class ScopesScopeCredentialStoresCredentialStoreRoute extends Route {
  /**
   * Load a specific credential store in current scope
   * @return {Promise[CredentialStoreModel]}
   */
  async model({ credential_store_id }) {
    return this.store.findRecord('credential-store', credential_store_id);
  }

  /**
   * Render credential store header, navigation and actions page sections.
   * @override
   */
  renderTemplate() {
    super.renderTemplate(...arguments);

    this.render('scopes/scope/credential-stores/credential-store/-header', {
      into: 'scopes/scope/credential-stores/credential-store',
      outlet: 'header',
    });

    this.render('scopes/scope/credential-stores/credential-store/-navigation', {
      into: 'scopes/scope/credential-stores/credential-store',
      outlet: 'navigation',
    });

    this.render('scopes/scope/credential-stores/credential-store/-actions', {
      into: 'scopes/scope/credential-stores/credential-store',
      outlet: 'actions',
    });
  }
}
