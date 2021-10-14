import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    this.store.query('auth-method', {
      scope_id: 'global',
      filter: `
        ("/item/status" == "pending" or "/item/status" == "active")
          and "/item/id" == "s_1234567890"
          and
            (
              "foo" in "/item/list"
              or
              "bar" in "/item/list"
            )
          and "baz" not in "/item/list"
      `
    });
  }
}
