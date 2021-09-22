import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
// import { computed } from '@ember/object';

console.log('controllelrrrrr')
export default class ScopesScopeGroupsController extends Controller {
  // =services

  @service intl;
  @service store;
  // =attributes

  /**
   * Translated groups breadcrumb
   * @type {string}
   */
  get breadCrumb() {
    console.log('when', this.model);
    return this.intl.t('resources.group.title_plural');
  }

  queryParams = ['id', 'name'];
  id = null;
  name= null;

  @tracked id = null;

  @tracked model;
 
  @tracked name = null;
}
