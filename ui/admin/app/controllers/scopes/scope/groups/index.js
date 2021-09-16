// import Controller from '@ember/controller';

// export default class ScopesScopeGroupsIndexController extends Controller {
//   // =attributes
//     @service store;
//     /**
//    * Moves the global scope to index 0.
//    * @type {Array}
//    */
//   //  @computed('filteredGroups.length')
//   get hasAvailableGroups() {
//     console.log('sortedd!!', this.model);
//     return 'ARRRR'
//   }
// }
// import Component from '@glimmer/component';
import Controller from '@ember/controller';

import { inject as service } from '@ember/service';

export default class ScopesScopeGroupsIndexController extends Controller {
  // =services

  @service store;

  /**
   * availableGroups
   * @param {[GroupModel]} availableGroups
   */
  get availableGroups() {                   
    return this.store.peekAll('group')
  }
}