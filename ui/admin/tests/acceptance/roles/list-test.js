import { module, test } from 'qunit';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import {
  authenticateSession,
  // These are left here intentionally for future reference.
  //currentSession,
  //invalidateSession,
} from 'ember-simple-auth/test-support';

module('Acceptance | roles | list', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  const instances = {
    scopes: {
      global: null,
      org: null,
    },
    orgScope: null,
  };

  const urls = {
    scopes: {
      org: null,
    },
    roles: null,
    orgScope: null,
  };

  hooks.beforeEach(function () {
    instances.orgScope = this.server.create(
      'scope',
      {
        type: 'org',
        scope: { id: 'global', type: 'global' },
      },
      'withChildren'
    );
    instances.role = this.server.create('role', {
      scope: instances.orgScope,
    });
    urls.orgScope = `/scopes/${instances.orgScope.id}`;

    urls.roles = `/scopes/${instances.orgScope.id}/roles`;
    authenticateSession({});
  });

  test('Users can navigate to roles with proper authorization', async function (assert) {
    assert.expect(2);
    await visit(urls.orgScope);
    assert.ok(
      instances.orgScope.authorized_collection_actions.roles.includes('list')
    );
    assert.ok(find(`[href="${urls.roles}"]`));
  });

  test('Users cannot navigate to index without either list or create actions', async function (assert) {
    assert.expect(2);
    instances.orgScope.authorized_collection_actions.roles = [];
    await visit(urls.orgScope);
    assert.notOk(
      instances.orgScope.authorized_collection_actions.roles.includes('list')
    );
    assert.notOk(find(`[href="${urls.roles}"]`));
  });

  test('Users can navigate to index with only create action', async function (assert) {
    assert.expect(1);
    instances.orgScope.authorized_collection_actions.roles = ['create'];
    await visit(urls.orgScope);
    assert.ok(find(`[href="${urls.roles}"]`));
  });
});
