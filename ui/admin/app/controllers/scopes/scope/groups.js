import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ScopesScopeGroupsController extends Controller {
  // =services

  @service intl;

  // =attributes

  /**
   * Translated groups breadcrumb
   * @type {string}
   */
  get breadCrumb() {
    console.log('when');
    return this.intl.t('resources.group.title_plural');
  }

  queryParams = ['id'];
  id = null;

  @tracked id = null;

  @tracked model;
}
