import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ScopesScopeSessionsController extends Controller {
  // =services

  @service intl;

  // =attributes

  /**
   * Translated roles breadcrumb
   * @type {string}
   */
  @tracked items;

  get breadCrumb() {
    return this.intl.t('resources.session.title_plural');
  }

  queryParams = ['status'];
  status;

  @tracked status;

  @tracked model;
}
