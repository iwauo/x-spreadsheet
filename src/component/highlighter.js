import { h } from './element';
import { cssPrefix } from '../config';

class HighlighterElement {
  constructor(data) {
    this.data = data;
    this.rowHighlightEl = h('div', `${cssPrefix}-row-highlighter`).hide();
    this.colHighlightEl = h('div', `${cssPrefix}-col-highlighter`).hide();
    this.el = h('div', `${cssPrefix}-highlighter`)
      .children(this.rowHighlightEl, this.colHighlightEl)
      .hide();
    const { highlightMode } = this.data.settings;
    this.enabled = highlightMode && (highlightMode === 'hover' || highlightMode === 'both');
  }

  setOffset({left, top, width, height}) {
    if (!this.enabled) return;
    this.rowHighlightEl.offset({
      top: top,
      left: 0,
      width: this.data.cols.totalWidth(),
      height: height,
    }).show();
    this.colHighlightEl.offset({
      top: 0,
      left: left,
      width: width,
      height: this.data.rows.totalHeight(),
    }).show();
    return this;
  }
}

export default class Highlighter {
  constructor(data) {
    this.data = data;
    this.element = new HighlighterElement(data);
    this.el = this.element.el;
  }

  calBRAreaOffset(offset) {
    const { data } = this;
    const {
      left, top, width, height, scroll, l, t,
    } = offset;
    const ftwidth = data.freezeTotalWidth();
    const ftheight = data.freezeTotalHeight();
    let left0 = left - ftwidth;
    if (ftwidth > l) left0 -= scroll.x;
    let top0 = top - ftheight;
    if (ftheight > t) top0 -= scroll.y;
    return {
      left: left0,
      top: top0,
      width,
      height,
    };
  }

  setOffset(offset) {
    console.log(offset)
    //this.element.setOffset(this.calBRAreaOffset(offset))
    this.element.setOffset(offset)
    this.el.show()
  }

  hide() {
    this.el.hide();
  }
}
