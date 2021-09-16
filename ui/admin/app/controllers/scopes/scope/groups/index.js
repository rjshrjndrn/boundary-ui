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