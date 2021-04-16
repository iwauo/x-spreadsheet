/* global window */
import { h } from './element';
import { cssPrefix } from '../config';

export default class Grouping {
  constructor(sheet) {
    this.rect = null;
    this.sheet = sheet;
    this.el = h('div', `${cssPrefix}-grouping`)
      .on("mousedown", (e) => this.onClicked(e))
      .hide();
  }

  show(rect) {
    const {ri, ci} = rect;
    const colGroup = this.sheet.data.cols.colGroupAt(ri, ci);
    const rowGroup = this.sheet.data.rows.rowGroupAt(ri, ci);
    if (colGroup || rowGroup) {
      this.rect = rect;
      this.el.offset(rect).show();
    }
    else {
      this.hide();
    }
  }

  hide() {
    this.el.offset({
      left: 0,
      top: 0,
    }).hide();
  }

  onClicked(evt) {
    const {ri, ci} = this.rect;
    const cols = this.sheet.data.cols;
    cols.isFolded(ri, ci)
      ? cols.unfold(ri, ci)
      : cols.fold(ri, ci);
    const rows = this.sheet.data.rows;
    rows.isFolded(ri, ci)
      ? rows.unfold(ri, ci)
      : rows.fold(ri, ci);
    this.sheet.reload();
  }
}
Grouping.icon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNOTguOSwxODQuN2wxLjgsMi4xbDEzNiwxNTYuNWM0LjYsNS4zLDExLjUsOC42LDE5LjIsOC42YzcuNywwLDE0LjYtMy40LDE5LjItOC42TDQxMSwxODcuMWwyLjMtMi42ICBjMS43LTIuNSwyLjctNS41LDIuNy04LjdjMC04LjctNy40LTE1LjgtMTYuNi0xNS44djBIMTEyLjZ2MGMtOS4yLDAtMTYuNiw3LjEtMTYuNiwxNS44Qzk2LDE3OS4xLDk3LjEsMTgyLjIsOTguOSwxODQuN3oiLz48L3N2Zz4="