'use strict';

class Engine {

  constructor(view) {
    this.boardState = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '0'];
    this.blankIdx = 15;
    this.move = this.move.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.view =  view;
    this.view.setup({move: this.move, shuffle: this.shuffle});
  }


  shuffle() {
    for (let i = 0; i < 200; i++) {
      const randomBox = this.pickRandomBox();
      this.move(randomBox);
    }
    this.view.render(this.boardState);
  }

  isCompleted() {
    return this.boardState.join('') === '123456789ABCDEF0';
  }

  get nextState() {
    return {
      idx: this.blankIdx,
      isMoved: true,
      isCompleted: this.isCompleted()
    }
  }

  move(boxId) {
    const currentX = this.blankIdx / 4 | 0;
    const currentY = this.blankIdx % 4;

    if (currentX > 0 && this.boardState[(currentX - 1) * 4 + currentY] === boxId) {
      this.boardState[(currentX - 1) * 4 + currentY] = '0';
      this.boardState[this.blankIdx] = boxId;

      const nextState = this.nextState;

      this.blankIdx = (currentX - 1) * 4 + currentY;

      return nextState;
    }

    if (currentX < 3 && this.boardState[(currentX + 1) * 4 + currentY] === boxId) {
      this.boardState[(currentX + 1) * 4 + currentY] = '0';
      this.boardState[this.blankIdx] = boxId;

      const nextState = this.nextState;

      this.blankIdx = (currentX + 1) * 4 + currentY;

      return nextState;
    }

    if (currentY > 0 && this.boardState[currentX * 4 + currentY - 1] === boxId) {
      this.boardState[currentX * 4 + currentY - 1] = '0';
      this.boardState[this.blankIdx] = boxId;

      const nextState = this.nextState;

      this.blankIdx = currentX * 4 + currentY - 1;

      return nextState;
    }
    if (currentY < 3 && this.boardState[currentX * 4 + currentY + 1] === boxId) {
      this.boardState[currentX * 4 + currentY + 1] = '0';
      this.boardState[this.blankIdx] = boxId;

      const nextState = this.nextState;

      this.blankIdx = currentX * 4 + currentY + 1;

      return nextState;
    }

    return {
      isMoved: false
    }
  }

  pickRandomBox() {
    const blankX = this.blankIdx / 4 | 0;
    const blankY = this.blankIdx % 4;
    const canBeMoved = [];
    if (blankX > 0) {
      canBeMoved.push((blankX - 1) * 4 + blankY);
    }
    if (blankX < 3) {
      canBeMoved.push((blankX + 1) * 4 + blankY);
    }
    if (blankY > 0) {
      canBeMoved.push(blankX * 4 + blankY - 1)
    }
    if (blankY < 3) {
      canBeMoved.push(blankX * 4 + blankY + 1)
    }
    return this.boardState[canBeMoved[Math.floor(Math.random() * canBeMoved.length)]];
  }
}

class View {

  setup({move, shuffle}) {
    const buttons = document.querySelectorAll('.box');
    for (const button of buttons) {
      button.onclick = () => {
        const {idx, isMoved, isCompleted} = move(button.getAttribute('data-item'));
        if (!isMoved) return;

        this.moveBox(button, idx);

        if (isCompleted) {
          this.renderComplete();
        }
      }
    }

    const shuffleBtn = document.querySelector('.shuffle');
    shuffleBtn.onclick = () => {
      this.hideOverlay();
      shuffle();
    }
  }

  render(currentState) {
    const buttons = document.querySelectorAll('.box');
    for (const button of buttons) {
      const num = button.getAttribute('data-item');
      this.moveBox(button, currentState.indexOf(num))
    }
  }

  moveBox(box, position) {
    box.className = String.prototype
      .split
      .call(box.className, ' ')
      .filter(name => name.startsWith('box'))
      .join(' ');
    box.classList.add(`item-${this.encodeIdx(position)}`);
  }

  encodeIdx(idx) {
    return idx === 15 ? '0' : (idx + 1).toString(16).toLocaleUpperCase();
  }

  renderComplete() {
    this.showOverlay();
  }

  showOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('hidden');
    source.classList.remove('hidden');
  }

  hideOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('hidden');
    const source = document.querySelector('.source');
    source.classList.add('hidden');
  }

}

new Engine(new View());