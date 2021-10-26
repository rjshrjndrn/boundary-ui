import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScopesScopeSessionsIndexController extends Controller {
  // =services

  @service intl;

  // =attributes

  /**
   * Translated roles breadcrumb
   * @type {string}
   */
  // @tracked items;

  get breadCrumb() {
    return this.intl.t('resources.session.title_plural');
  }
}
