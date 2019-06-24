// import React from 'react';
import { render } from 'react-testing-library';
import createUiNode from 'createUiNode';

// const { expect, jest } = global;
export default (ui, { initialState = {} } = {}) =>
  render(createUiNode(ui, { initialState }).node);
