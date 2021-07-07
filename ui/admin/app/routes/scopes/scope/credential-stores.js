import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import loading from 'ember-loading/decorator';
import { notifySuccess, notifyError } from 'core/decorators/notify';

export default class ScopesScopeCredentialStoresRoute extends Route {
  // =services

  @service intl;
  @service notify;

  // =methods

  /**
   * Load all credentials stores under current scope
   * @return {Promise[CredentialStoreModel]}
   */
  async model() {
    const { id: scope_id } = this.modelFor('scopes.scope');
    return this.store.query('credential-store', { scope_id });
  }

  // =actions

  /**
   * Handle save of a credential store.
   * @param {CredentialStoreModel} credentialStore
   */
  @action
  @loading
  @notifyError(({ message }) => message)
  @notifySuccess('notifications.save-success')
  async save(credentialStore) {
    await credentialStore.save();
    await this.transitionTo(
      'scopes.scope.credential-stores.credential-store',
      credentialStore
    );
    this.refresh();
  }
}
