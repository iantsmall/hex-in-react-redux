/**
 *
 * HexBoard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { gridPoints } from 'utils/hexgrid';
import Hex from 'components/Hex';

function HexBoard({ type, size, oX, oY, width, height, onClick, hexes }) {
  const childHexes = gridPoints(type, oX, oY, size, width, height).map(
    (point, key) => {
      const { props } = point;
      const owner = hexes[key];
      const fill = owner === undefined ? 'white' : owner;
      return (
        <Hex
          key={`hex_${key}_${owner}`} // es-lint-disable-line react/no-array-index-key
          {...props}
          fill={fill}
          stroke="grey"
          onClick={() => onClick(key)}
        />
      );
    },
  );

  // TODO calculate width/height properties from size, type and width/height
  const svgWidth = '280';
  const svgHeight = '180';

  // return the gameboard containing hexes
  return (
    <svg id="game-board" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      {childHexes}
    </svg>
  );
}

HexBoard.propTypes = {
  type: PropTypes.oneOf(['pointy-topped']),
  size: PropTypes.number,
  oX: PropTypes.number,
  oY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  hexes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
};

HexBoard.defaultProps = {
  type: 'pointy-topped',
  size: 10,
  oX: 100,
  oY: 100,
  width: 25,
  height: 25,
  onClick: i => {
    console.log(`No onClick defined, click ${i} unhandled`);
  },
};

export default memo(HexBoard);
