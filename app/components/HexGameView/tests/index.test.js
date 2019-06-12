/**
 *
 * Tests for HexGameView
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import HexGameView from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const props = {
  winner: undefined,
  isRedNext: true,
  handlers: {
    jumpToFirst: jest.fn(),
    jumpToPrevious: jest.fn(),
    jumpTo: jest.fn(),
    jumpToNext: jest.fn(),
    jumpToLast: jest.fn(),
    claimHex: jest.fn(),
  },
  history: [[]],
  turnNumber: 0,
  boardSize: 9,
};

describe('<HexGameView />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <HexGameView {...props} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });
  it.skip('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  // TODO test edge cases of game board states w/ snapshots
  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <HexGameView {...props} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
