import factory from '../generated/factories/scope';
import { trait } from 'ember-cli-mirage';
import permissions from '../helpers/permissions';

export default factory.extend({
  type: 'global',

  authorized_actions: () =>
    permissions.authorizedActionsFor('scope') || [
      'no-op',
      'read',
      'update',
      'delete',
    ],

  authorized_collection_actions: () => {
    return {
      scopes: ['create', 'list'],
      users: ['create', 'list'],
      sessions: ['list'],
      groups: ['create', 'list'],
      roles: ['create', 'list'],
      targets: ['create', 'list'],
      'credential-stores': ['create', 'list'],
      'auth-methods': ['create', 'list'],
      'host-catalogs': ['create', 'list'],
    };
  },

  /**
   * Generates realistic-ish IDs while still being deterministic.
   */
  id(i) {
    let id = 'tv6fv3yz8p';
    if (i % 3) id = 'xk1i4dk50v';
    if (i % 2) id = 's9n819zgko';
    return `s_${id}${i}`;
  },

  withChildren: trait({
    afterCreate(record, server) {
      if (record.type === 'global') {
        server.createList(
          'scope',
          1,
          {
            type: 'org',
            scope: { id: record.id, type: record.type },
          },
          'withChildren'
        );
      }
      if (record.type === 'org') {
        server.createList('scope', 3, {
          type: 'project',
          scope: { id: record.id, type: record.type },
        });
      }
    },
  }),
});
