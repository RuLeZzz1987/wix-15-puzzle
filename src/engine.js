'use strict';

module.exports = class Engine {

  constructor(options = {}) {
    this.boardState = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', '0'];
    this.defaultRandomMovesCount = 200;
    this.randomMovesCount = options.randomMovesCount || this.defaultRandomMovesCount;
    this.move = this.move.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  shuffle() {
    for (let i = 0; i < this.randomMovesCount; i++) {
      const randomBox = this._pickRandomBox();
      this.move(randomBox);
    }

    return this.boardState;
  }

  move(boxId) {
    const emptyBoxIdx = this.boardState.indexOf('0');
    const emptyBoxX = emptyBoxIdx / 4 | 0;
    const emptyBoxY = emptyBoxIdx % 4;

    const topMoveIdx = (emptyBoxX - 1) * 4 + emptyBoxY;
    if (emptyBoxX > 0 && this.boardState[topMoveIdx] === boxId) {
      this.boardState[topMoveIdx] = '0';
      this.boardState[emptyBoxIdx] = boxId;

      return {
        idx: emptyBoxIdx,
        isCompleted: this._isCompleted()
      };
    }

    const bottomMoveIdx = (emptyBoxX + 1) * 4 + emptyBoxY;
    if (emptyBoxX < 3 && this.boardState[bottomMoveIdx] === boxId) {
      this.boardState[bottomMoveIdx] = '0';
      this.boardState[emptyBoxIdx] = boxId;

      return {
        idx: emptyBoxIdx,
        isCompleted: this._isCompleted()
      };
    }


    const leftMoveIdx = emptyBoxX * 4 + emptyBoxY - 1;
    if (emptyBoxY > 0 && this.boardState[leftMoveIdx] === boxId) {
      this.boardState[leftMoveIdx] = '0';
      this.boardState[emptyBoxIdx] = boxId;

      return {
        idx: emptyBoxIdx,
        isCompleted: this._isCompleted()
      };
    }

    const rightMoveIdx = emptyBoxX * 4 + emptyBoxY + 1;
    if (emptyBoxY < 3 && this.boardState[rightMoveIdx] === boxId) {
      this.boardState[rightMoveIdx] = '0';
      this.boardState[emptyBoxIdx] = boxId;

      return {
        idx: emptyBoxIdx,
        isCompleted: this._isCompleted()
      };
    }

    return {
      idx: null,
      isCompleted: false
    }
  }

  _isCompleted() {
    return this.boardState.join('') === '123456789ABCDEF0';
  }

  _pickRandomBox() {
    const emptyBoxIdx = this.boardState.indexOf('0');
    const emptyBoxX = emptyBoxIdx / 4 | 0;
    const emptyBoxY = emptyBoxIdx % 4;
    const availableMoves = [];
    if (emptyBoxX > 0) {
      availableMoves.push((emptyBoxX - 1) * 4 + emptyBoxY);
    }
    if (emptyBoxX < 3) {
      availableMoves.push((emptyBoxX + 1) * 4 + emptyBoxY);
    }
    if (emptyBoxY > 0) {
      availableMoves.push(emptyBoxX * 4 + emptyBoxY - 1)
    }
    if (emptyBoxY < 3) {
      availableMoves.push(emptyBoxX * 4 + emptyBoxY + 1)
    }
    return this.boardState[availableMoves[Math.floor(Math.random() * availableMoves.length)]];
  }
};