import Store from '@ember-data/store';

class FilterQuery {
  #config;
  constructor(config) {
    this.#config = config;
  }

  get query() {
    const filters = this.#buildFilters(this.#config);

    let query = '';
    if (filters?.length)
      query = this.#joinFilters(filters, { inclusive: false });

    return query;
  }

  #buildFilters(config) {
    let filters = [];
    for (const key in config) {
      filters.push(this.#generateQuery(`/item/${key}`, config[`${key}`]));
    }
    return filters;
  }

  #generateQuery(selector, values) {
    const filters = values.map((value) => `"${selector}" == "${value}"`);
    return this.#joinFilters(filters, { inclusive: true });
  }

  #joinFilters(filters, { inclusive }) {
    return filters.join(inclusive ? ' or ' : ' and ');
  }
}

export default class StoreService extends Store {
  /**
   * Filterable store queries using IDs
   * Usage:
   * // Filter for a user in sessions
   * this.store.filterByIds('session', { scope_id, recursive: true }, { user: ['u_0987654321']})
   * // Filter for status in pending or terminated state and for a session id
   * this.store.filterByIds('session', { scope_id },
   *   { status: ['pending', 'terminated' ], target: ['s_U5EoFe4Jba']}
   * )
   * // To remove filters
   * this.store.filterByIds('session', { scope_id })
   * @param {string} modelName
   * @param {object} queryOptions
   * @param {string} filterQuery
   */
  filterByIds(modelName, queryOptions, filterOptions) {
    const filterQuery = new FilterQuery(filterOptions);
    // Apply filters, if available
    if (filterQuery.query()) queryOptions.filter = filterQuery;
    return this.query(modelName, queryOptions);
  }
}
