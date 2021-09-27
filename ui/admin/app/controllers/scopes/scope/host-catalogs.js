import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ScopesScopeHostCatalogsController extends Controller {
  // =services

  @service intl;

  // =attributes

  /**
   * Translated roles breadcrumb
   * @type {string}
   */
  get breadCrumb() {
    return this.intl.t('resources.host-catalog.title_plural');
  }
  queryParams = ['type'];
  type = null;

  @tracked type = null;

  @tracked model;
}
