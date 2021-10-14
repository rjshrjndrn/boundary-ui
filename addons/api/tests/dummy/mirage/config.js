import { get } from '@ember/object';
import { parse } from 'filter-query';

class FilterQueryVM {

  // =properties

  ast;
  context;

  // =methods

  constructor(query, context) {
    this.ast = parse(query);
    this.context = context;
  }

  execute() {
    return this.executeBinaryNode(this.ast);
  }

  executeBinaryNode({ opcode, left, right }) {
    return this[opcode](left, right);
  }

  // =opcode methods

  and(left, right) {
    return this.executeBinaryNode(left) && this.executeBinaryNode(right);
  }

  or(left, right) {
    return this.executeBinaryNode(left) || this.executeBinaryNode(right);
  }

  equals(key, value) {
    return get(this.context, key) == value;
  }

  notEquals(key, value) {
    return get(this.context, key) != value;
  }

  in(value, key) {
    return get(this.context, key).includes(value);
  }

  notIn(value, key) {
    return !get(this.context, key).includes(value);
  }
}

const context = {
  id: 's_1234567890',
  status: 'pending',
  list: ['foo', 'bar']
};

export default function () {
  // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.urlPrefix = '';
  // make this `/api`, for example, if your API is namespaced
  this.namespace = '/v1';
  // delay for each request, automatically set to 0 during testing
  this.timing = 1;
  this.passthrough();

  this.get(
    '/auth-methods',
    ({ authMethods }, { queryParams: { filter: filterString, scope_id: scopeId } }) => {
      const vm = new FilterQueryVM(filterString, context);
      console.log(vm);
      console.log(vm.execute());
      return authMethods.where({ scopeId });
    }
  );
}
