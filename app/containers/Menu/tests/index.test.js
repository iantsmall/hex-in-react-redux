/**
 *
 * Tests for Menu
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */
import React from 'react';
import { cleanup } from 'react-testing-library';
import render from 'utils/testRenderWithContext';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { Menu } from '../index';

describe('<Menu />', () => {
  afterEach(cleanup);
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const props = {
      dispatch: jest.fn(),
      menu: {},
    };
    render(<Menu {...props} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the initial snapshot', () => {
    const props = {
      dispatch: jest.fn(),
      menu: {},
    };
    const {
      container: { firstChild },
    } = render(<Menu {...props} />);
    expect(firstChild).toMatchSnapshot();
  });
});
