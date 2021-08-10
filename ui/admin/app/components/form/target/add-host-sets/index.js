import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';

export default class FormTargetAddHostSetsComponent extends Component {
  // =services

  @service store;

  // =properties

  /**
   * Array of selected host set IDs.
   * @type {EmberArray}
   */
  selectedHostSetIDs = A();

  /**
   * Array of host catalog IDs for filtering.
   */
  selectedHostCatalogFilterIDs = A();

  /**
   * Checks for unassigned hostsets.
   * @param {[HostSetModel]} filteredHostSets
   * @type {boolean}
   */
  @computed('filteredHostSets.length')
  get hasAvailableHostSets() {
    return this.filteredHostSets.length > 0;
  }

  /**
   * availableHostCatalogs
   * @param {[HostCatalogModel]} availableHostCatalogs
   */
  @computed('args.{hostSets.}.length')
  get availableHostCatalogs() {
    const hostCatalogIds = this.filteredHostSets.map(
      ({ host_catalog_id }) => host_catalog_id
    );

    // Load unique host catalogs
    const uniqueHostCatalogIds = new Set(hostCatalogIds.flat());
    return [...uniqueHostCatalogIds].map((hostCatalogId) =>
      this.store.findRecord('host-catalog', hostCatalogId)
    );
  }

  /**
   * Host sets not already added to the target.
   * @type {[HostSetModel]}
   */
  @computed('args.{hostSets.[],model.host_sets.[]}', 'selectedHostCatalogFilterIDs.[]')
  get filteredHostSets() {
    // Get IDs for host sets already added to the current target
    const alreadyAddedHostSetIDs = this.args.model.host_sets.map(
      ({ host_set_id }) => host_set_id
    );
    const notAddedHostSets = this.args.hostSets.filter(
      ({ id }) => !alreadyAddedHostSetIDs.includes(id)
    );
    // Apply filters
    let filteredHostCatalogs = notAddedHostSets;
    if (this.selectedHostCatalogFilterIDs.length > 0) {
      filteredHostCatalogs = notAddedHostSets.filter(({ host_catalog_id }) =>
        this.selectedHostCatalogFilterIDs.includes(host_catalog_id)
      );
    }
    return filteredHostCatalogs;
  }

  // =actions

  @action
  toggleHostSet(hostSet) {
    if (!this.selectedHostSetIDs.includes(hostSet.id)) {
      this.selectedHostSetIDs.addObject(hostSet.id);
    } else {
      this.selectedHostSetIDs.removeObject(hostSet.id);
    }
  }

  @action
  toggleHostCatalogFilter(hostCatalogId) {
    if (!this.selectedHostCatalogFilterIDs.includes(hostCatalogId)) {
      this.selectedHostCatalogFilterIDs.addObject(hostCatalogId);
    } else {
      this.selectedHostCatalogFilterIDs.removeObject(hostCatalogId);
    }
    console.log(this.selectedHostCatalogFilterIDs.length);
  }

  @action
  submit(fn) {
    fn(this.selectedHostSetIDs);
  }
}
