import React from 'react';
import { cleanup } from 'react-testing-library';
import render from 'utils/testRenderWithContext';

import HomePage from '../index';

describe('<HomePage />', () => {
  afterEach(cleanup);
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<HomePage />);
    expect(firstChild).toMatchSnapshot();
  });
});
