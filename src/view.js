'use strict';

module.exports = class HTMLView {

  constructor(engine) {
    this.engine = engine;

    const buttons = document.querySelectorAll('.box');
    for (const button of buttons) {
      button.onclick = () => this.boxClickHandler(button);
    }

    const shuffleBtn = document.querySelector('.shuffle');
    shuffleBtn.onclick = () => this.shuffleHandler();
  }

  shuffleHandler() {
    this.hideOverlay();
    this.render(this.engine.shuffle());
  }

  boxClickHandler(button) {
    const {idx, isCompleted} = this.engine.move(button.getAttribute('data-item'));
    if (idx === null) return;

    this._moveBox(button, idx);

    if (isCompleted) {
      this.showOverlay();
    }
  }

  render(currentState) {
    const buttons = document.querySelectorAll('.box');
    for (const button of buttons) {
      const num = button.getAttribute('data-item');
      this._moveBox(button, currentState.indexOf(num))
    }
  }

  _moveBox(box, position) {
    box.className = String.prototype
      .split
      .call(box.className, ' ')
      .filter(name => name.startsWith('box'))
      .join(' ');
    box.classList.add(`item-${this._transformPositionToClassIdx(position)}`);
  }

  _transformPositionToClassIdx(idx) {
    return this._isLastIdx(idx) ? '0' : (idx + 1).toString(16).toLocaleUpperCase();
  }

  _isLastIdx(idx) {
    return idx === 15;
  }

  showOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('hidden');
    const source = document.querySelector('.source');
    source.classList.remove('hidden');
  }

  hideOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('hidden');
    const source = document.querySelector('.source');
    source.classList.add('hidden');
  }

};