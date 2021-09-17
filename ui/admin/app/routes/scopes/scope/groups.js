import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import loading from 'ember-loading/decorator';
import { confirm } from 'core/decorators/confirm';
import { notifySuccess, notifyError } from 'core/decorators/notify';

export default class ScopesScopeGroupsRoute extends Route {
  // =services

  @service intl;
  @service notify;
  @service session;
  @service can;
  @service store;

  queryParams = {
    id: {
      refreshModel: true,
    },
  };
  /**
   * If arriving here unauthenticated, redirect to index for further processing.
   */

  beforeModel() {
    if (!this.session.isAuthenticated) this.transitionTo('index');
  }

  /**
   * Load all groups under current scope
   * @return {Promise[GroupModel]}
   */
  async model(params) {
    const scope = this.modelFor('scopes.scope');
    const { id: scope_id } = scope;
    if (this.can.can('list collection', scope, { collection: 'groups' })) {
      if (params.id !== null) {
        // return this.store.query('group', {
        //   scope_id,
        //   filter: `"/item/id" == "${params.id}"`,
        // });
        return this.store.filter('group', scope_id, {
          ids: [params.id],
        });
      } else {
        return this.store.query('group', {
          scope_id,
        });
      }
    }
  }

  // =actions
  /**
   * Rollback changes on a group.
   * @param {GroupModel} group
   */
  @action
  cancel(group) {
    const { isNew } = group;
    group.rollbackAttributes();
    if (isNew) this.transitionTo('scopes.scope.groups');
  }

  /**
   * Save a group in current scope.
   * @param {GroupModel} group
   */
  @action
  @loading
  @notifyError(({ message }) => message)
  @notifySuccess(({ isNew }) =>
    isNew ? 'notifications.create-success' : 'notifications.save-success'
  )
  async save(group) {
    await group.save();
    await this.transitionTo('scopes.scope.groups.group', group);
    this.refresh();
  }

  /**
   * Delete a group in current scope and redirect to index
   * @param {GroupModel} group
   */
  @action
  @loading
  @confirm('questions.delete-confirm')
  @notifyError(({ message }) => message, { catch: true })
  @notifySuccess('notifications.delete-success')
  async delete(group) {
    await group.destroyRecord();
    await this.replaceWith('scopes.scope.groups');
    this.refresh();
  }

  @action
  @loading
  async filterGroups(group) {
    // const scope = this.modelFor('scopes.scope');
    // const { id: scope_id } = scope;
    console.log(group, '??grpip');
    await this.transitionTo('scopes.scope.groups', {
      queryParams: { id: group },
    });
  }
}
