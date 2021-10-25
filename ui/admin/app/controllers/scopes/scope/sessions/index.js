import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class ScopesScopeSessionsIndexController extends Controller {
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
  @action
  checkboxdddGroupChanged() {
    console.log('addwdf')
  }
}
