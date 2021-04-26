import helper from './helper';

class Cols {
  constructor({
    len, width, indexWidth, minWidth,
  }) {
    this._ = {};
    this.len = len;
    this.width = width;
    this.indexWidth = indexWidth;
    this.minWidth = minWidth;
    this.colGroups = [];
  }

  setData(d) {
    if (d.len) {
      this.len = d.len;
      delete d.len;
    }
    this._ = d;
    if (d.colGroups) {
      this.colGroups.push(...d.colGroups);
      delete d.colGroups;
      this.applyFoldingState();
    }
  }

  getData() {
    const { len } = this;
    return Object.assign({ len }, this._);
  }

  getWidth(i) {
    if (this.isHide(i)) return 0;
    const col = this._[i];
    if (col && col.width) {
      return col.width;
    }
    return this.width;
  }

  getOrNew(ci) {
    this._[ci] = this._[ci] || {};
    return this._[ci];
  }

  setWidth(ci, width) {
    const col = this.getOrNew(ci);
    col.width = width;
  }

  unhide(idx) {
    let index = idx;
    while (index > 0) {
      index -= 1;
      if (this.isHide(index)) {
        this.setHide(index, false);
      } else break;
    }
  }

  isHide(ci) {
    const col = this._[ci];
    return col && (col.hide || col.folded === true)
  }

  setHide(ci, v) {
    const col = this.getOrNew(ci);
    if (v === true) col.hide = true;
    else delete col.hide;
  }

  setStyle(ci, style) {
    const col = this.getOrNew(ci);
    col.style = style;
  }

  sumWidth(min, max) {
    return helper.rangeSum(min, max, i => this.getWidth(i));
  }

  totalWidth() {
    return this.sumWidth(0, this.len);
  }

  colGroupAt(ri, ci) {
    return this.colGroups.find(it => it.ri === ri && it.ci === ci);
  }

  setFolded(ri, ci, folded) {
    const colGroup = this.colGroupAt(ri, ci);
    if (colGroup) {
      colGroup.folded = !!folded;
    }
    this.applyFoldingState();
  }

  isFolded(ri, ci) {
    const colGroup = this.colGroupAt(ri, ci);
    return colGroup && colGroup.folded
  }

  applyFoldingState() {
    Object.entries(this._).forEach(([index, col]) => {
      if (col && col.hide) return true;
      const ci = Number(index)
      const affectingGroups = this.colGroups.flatMap(colGroup => {
        const distance = ci - colGroup.ci;
        return (0 < distance && distance < colGroup.cols) ? [colGroup] : [];
      });
      const folded = affectingGroups.some(it => !!it.folded);
      col.folded = folded;
    })
  }

  fold(ri, ci) {
    this.setFolded(ri, ci, true);
  }

  unfold(ri, ci) {
    this.setFolded(ri, ci, false);
  }
}

export default {};
export {
  Cols,
};
