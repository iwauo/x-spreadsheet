import { CellRange } from './cell_range';

export default class Selector {
  constructor() {
    //this.range = new CellRange(0, 0, 0, 0);
    this.ranges = [new CellRange(0, 0, 0, 0)];
    this.ri = 0;
    this.ci = 0;
  }

  get range() {
    return this.ranges[0];
  }

  set range(v) {
    this.ranges[0] = v
  }

  multiple() {
    return this.ranges[0].multiple();
  }

  pushCurrentSelection() {
    const currentSelection = this.range;
    this.ranges.unshift(currentSelection);
  }

  resetSelections() {
    this.ranges.splice(1);
  }

  setIndexes(ri, ci) {
    this.ri = ri;
    this.ci = ci;
  }

  size() {
    return this.ranges[0].size();
  }
}
