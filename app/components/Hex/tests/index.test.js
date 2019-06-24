/**
 *
 * Tests for Hex
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
// import { render } from 'react-testing-library';
import render from 'utils/testRenderWithContext';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import Hex from '../index';

const props = {
  type: 'pointy-topped',
  x: 1,
  y: 2,
  size: 255,
};

describe('<Hex />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(<Hex {...props} />);
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
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Hex {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
