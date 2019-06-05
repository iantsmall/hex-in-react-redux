/**
 *
 * Hex
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { corners } from 'utils/hexgrid';
// import styled from 'styled-components';

const Hex = props => {
  const { type, x, y, size } = props;
  const points = corners(type, x, y, size)
    .map(p => p.join(','))
    .join(' ');
  return <polygon {...props} points={points} />;
};

Hex.propTypes = {
  type: PropTypes.oneOf(['pointy-topped', 'flat-topped']).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
};

export default memo(Hex);
