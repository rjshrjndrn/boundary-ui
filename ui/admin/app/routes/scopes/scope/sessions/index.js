import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ScopesScopeSessionsIndexRoute extends Route {
  setupController(controller) {
    const availableSessions = this.store.peekAll('session');
    super.setupController(...arguments);
    controller.setProperties({ availableSessions });
  }
  
}
