import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RoseFormCheckboxGroupComponent extends Component {

  // =actions

  @action
  toggleValue(value) {
    let currentItems = [...this.args.selectedItems];
    if (currentItems.includes(value)) {
      currentItems = currentItems.filter(item => item !== value);
    } else {
      currentItems.push(value);
    }
    if (this.args.onChange) this.args.onChange(currentItems);
  }

}
