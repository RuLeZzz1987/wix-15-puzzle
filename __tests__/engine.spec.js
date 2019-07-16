'use strict';

const Engine = require('../src/engine');

describe('Engine', () => {
  let engine;

  beforeEach(() => {
    engine = new Engine();
  });

  it('should successfully initialize with default state', () => {
    expect(engine.boardState.join('')).toEqual('123456789ABCDEF0');
  });

  it('should successfully shuffle boxes', () => {
    engine.shuffle();
    expect(engine.boardState.join('')).not.toEqual('123456789ABCDEF0');
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
    engine.move('D');
    expect(engine.boardState.join('')).toEqual('123456789ABCD0EF');
  });

  it('should successfully move box top', () => {
    engine.boardState = '1234560789ABCDEF'.split('');
    engine.move('A');
    expect(engine.boardState.join('')).toEqual('123456A7890BCDEF');
  });

  it('should not move box top', () => {
    engine.boardState = '1234560789ABCDEF'.split('');
    engine.move('B');
    expect(engine.boardState.join('')).toEqual('1234560789ABCDEF');
  });
});