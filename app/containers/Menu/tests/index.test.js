/**
 *
 * Tests for Menu
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { Menu } from '../index';

// const { expect, jest } = global;

describe('<Menu />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(<Menu dispatch={dispatch} menu={{}} />);
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should render and match the initial snapshot', () => {
    const {
      container: { firstChild },
    } = render(<Menu menu={{}} />);
    expect(firstChild).toMatchSnapshot();
  });
});
