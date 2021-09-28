import Store from '@ember-data/store';

export default class StoreService extends Store {
  /**
   * this.store.query('group', {
   *   scope_id,
   *   filter: `"/item/id" == "${params.id}"`,
   * });
   */
  filter(modelName, scope_id, params) {
    const filters = [];
    // API filters
    // Should filterOptions support arrays?
    // IDs - array
    // Types - array
    // Text - string

    // What will search string use - name/description/id/host-catalog description?
    // Should name and description be regex?

    // Filter facets
    
    if (params.id) filters.push(`"/item/id" == "${params.id}"`);
    if (params.name) filters.push(`"/item/name" matches "${params.name}"`);
    if (params.type) filters.push(`"/item/type" in "${params.type}"`);
    // // What about inclusive filters?
    const options = filters.join(' or ');
    return this.query(modelName, { scope_id, filter: options });
  }
}