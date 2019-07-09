'use strict';

const { Engine } = require('../');

const view = {
  setup: jest.fn(),
  render: jest.fn()
};

describe('Engine', () => {
  let engine;

  beforeEach(() => {
    engine = new Engine(view);
  });

  it('should successfully initialize with default state', () => {
    expect(engine.boardState.join('')).toEqual('123456789ABCDEF0');
    expect(view.setup).toHaveBeenCalled();
  });

  it('should successfully shuffle boxes', () => {
    engine.shuffle();
    expect(engine.boardState.join('')).not.toEqual('123456789ABCDEF0');
    expect(view.render).toHaveBeenCalled();
  });

  it('should successfully move box right', () => {
    engine.move('F');
    expect(engine.boardState.join('')).toEqual('123456789ABCDE0F');
  });

  it('should successfully move box down', () => {
    engine.move('C');
    expect(engine.boardState.join('')).toEqual('123456789AB0DEFC');
  });

  it('should successfully move box left', () => {
    engine.boardState = '123456789ABC0DEF'.split('');
    engine.blankIdx = 12;
    engine.move('D');
    expect(engine.boardState.join('')).toEqual('123456789ABCD0EF');
  });

  it('should successfully move box top', () => {
    engine.boardState = '1234560789ABCDEF'.split('');
    engine.blankIdx = 6;
    engine.move('A');
    expect(engine.boardState.join('')).toEqual('123456A7890BCDEF');
  });

  it('should not move box top', () => {
    engine.boardState = '1234560789ABCDEF'.split('');
    engine.blankIdx = 6;
    engine.move('B');
    expect(engine.boardState.join('')).toEqual('1234560789ABCDEF');
  });
});