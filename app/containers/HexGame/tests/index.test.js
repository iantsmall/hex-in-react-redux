/**
 *
 * Tests for HexGame
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import render from 'utils/testRenderWithContext';

import { HexGame } from '../index';

describe('<HexGame />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Should dispatch a jumpToFirstAction when First Turn button is clicked', () => {
    const dispatch = jest.fn();
    render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(true).toEqual(false);
  });

  it.skip('Should dispatch a jumpToPreviousAction when Previous Turn button is clicked', () => {
    const dispatch = jest.fn();
    render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(true).toEqual(false);
  });

  it.skip('Should dispatch a jumpToNextAction when Previous Turn button is clicked', () => {
    const dispatch = jest.fn();
    render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(true).toEqual(false);
  });

  it.skip('Should dispatch a jumpToLastAction when Last Turn button is clicked', () => {
    const dispatch = jest.fn();
    render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(true).toEqual(false);
  });

  it.skip('Should dispatch a jumpToAction when a Turn is selected', () => {
    const dispatch = jest.fn();
    render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(true).toEqual(false);
  });

  it.skip('Should dispatch a claimHexAction when a Hex is clicked', () => {
    const dispatch = jest.fn();
    render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const dispatch = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <HexGame dispatch={dispatch} boardSize={9} hexGame={{ boardSize: 5 }} />,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
