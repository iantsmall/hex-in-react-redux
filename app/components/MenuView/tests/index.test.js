/**
 *
 * Tests for MenuView
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import MenuView from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

const mockCallbackProps = {
  onRulesClick: jest.fn(),
  onComingSoonClick: jest.fn(),
};
describe('<MenuView />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MenuView {...mockCallbackProps} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Expect to trigger callbacks when buttons are clicked', () => {
    // TODO fill in test logic
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <MenuView {...mockCallbackProps} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
