export default function (server) {
  // Scope resources

  // creates a global scope
  const globalScope = server.create('scope', {
    id: 'global',
    type: 'global',
    name: 'Global',
  });
  const orgScope = server.createList(
    'scope',
    3,
    {
      type: 'org',
      scope: { id: globalScope.id, type: globalScope.type },
    },
    'withChildren'
  )[0];

  server.create('user', { id: 'authenticateduser' });

  // Auth
  const globalAuthMethods = server.createList(
    'auth-method',
    1,
    { scope: globalScope },
    'withAccountsAndUsers'
  );
  const orgAuthMethods = server.createList(
    'auth-method',
    3,
    { scope: orgScope },
    'withAccountsAndUsers'
  );
  // Assign primary auth methods per scope
  // TODO make this generic
  globalScope.update({ primaryAuthMethodId: globalAuthMethods[0].id });
  orgScope.update({ primaryAuthMethodId: orgAuthMethods[1].id });
}
