import Store from '@ember-data/store';

export default class StoreService extends Store {
  /**
   * this.store.query('group', {
   *   scope_id,
   *   filter: `"/item/id" == "${params.id}"`,
   * });
   */
  filter(modelName, scope_id, filterOptions) {
    const filters = [];
    // API filters
    // Should filterOptions support arrays?
    // IDs - array
    // Types - array
    // Text - string

    // What will search string use - name/description/id/host-catalog description?
    // Should name and description be regex?

    // Filter facets

    if (filterOptions.id) filters.push(`"/item/id" == "${filterOptions.id}"`);
    if (filterOptions.name) filters.push(`"/item/name" in "${filterOptions.name}"`);
    if (filterOptions.type) filters.push(`"/item/type" in "${filterOptions.type}"`);

    // What about inclusive filters?
    const options = filters.join(' or ');
    console.log('applying filters: ', options);

    return this.query(modelName, { scope_id, filter: options });
  }
}