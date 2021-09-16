import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
fefgesfgtrdseg
export default class FormGroupsIndexComponent extends Component {
  // =services
   @service store;

  // =properties

  /**
   * Array of selected host set IDs.
   * @type {EmberArray}
   */
  //selectedHostSetIDs = A();

  /**
   * Array of host catalog IDs for filtering.
   */
  selectedGroupFilterIDs = A();

//   /**
//    * Checks for unassigned hostsets.
//    * @param {[HostSetModel]} filteredHostSets
//    * @type {boolean}
//    */
//   @computed('filteredHostSets.length')
//   get hasAvailableHostSets() {
//     return this.filteredHostSets.length > 0;
//   }

  /**
   * availableGroups
   * @param {[GroupModel]} availableGroups
   */
  @computed('args.{groups.}.length')
  get availableGroups() {
      console.log('in grpppp')
    // const hostCatalogIds = this.filteredGroups.map(
    //   ({ host_catalog_id }) => host_catalog_id
    // );

    // Load unique groups
    const uniqueGroupIds = new Set(uniqueGroupIds.flat());
    console.log(uniqueGroupIds, 'uniqueeee')
    return [...uniqueGroupIds].map((groupId) =>
      this.store.findRecord('group', groupId)
    );
  }

//   /**
//    * Host sets not already added to the target.
//    * @type {[HostSetModel]}
//    */
//   @computed('args.{hostSets.[],model.host_sets.[]}', 'selectedGroupFilterIDs.[]')
//   get filteredHostSets() {
//     // Get IDs for host sets already added to the current target
//     const alreadyAddedHostSetIDs = this.args.model.host_sets.map(
//       ({ host_set_id }) => host_set_id
//     );
//     const notAddedHostSets = this.args.hostSets.filter(
//       ({ id }) => !alreadyAddedHostSetIDs.includes(id)
//     );
//     // Apply filters
//     let filteredHostCatalogs = notAddedHostSets;
//     if (this.selectedGroupFilterIDs.length > 0) {
//       filteredHostCatalogs = notAddedHostSets.filter(({ host_catalog_id }) =>
//         this.selectedGroupFilterIDs.includes(host_catalog_id)
//       );
//     }
//     return filteredHostCatalogs;
//   }

  // =actions

//   @action
//   toggleHostSet(hostSet) {
//     if (!this.selectedHostSetIDs.includes(hostSet.id)) {
//       this.selectedHostSetIDs.addObject(hostSet.id);
//     } else {
//       this.selectedHostSetIDs.removeObject(hostSet.id);
//     }
//   }

  @action
  toggleGroupFilter(groupId) {
    if (!this.selectedGroupFilterIDs.includes(groupId)) {
      this.selectedGroupFilterIDs.addObject(groupId);
    } else {
      this.selectedGroupFilterIDs.removeObject(groupId);
    }
    console.log(this.selectedGroupFilterIDs.length);
  }

//   @action
//   submit(fn) {
//     fn(this.selectedHostSetIDs);
//   }
}