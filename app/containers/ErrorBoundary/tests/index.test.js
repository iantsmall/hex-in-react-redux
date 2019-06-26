/**
 *
 * Tests for ErrorBoundary
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
// import { render } from 'react-testing-library';
// import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import render from 'utils/testRenderWithContext';
import { ErrorBoundary } from '../index';
// import { DEFAULT_LOCALE } from '../../../i18n';

describe('<ErrorBoundary />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <ErrorBoundary dispatch={dispatch}>
        <div />
      </ErrorBoundary>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to have additional unit tests specified', () => {
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
      <ErrorBoundary dispatch={dispatch}>
        <div />
      </ErrorBoundary>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
