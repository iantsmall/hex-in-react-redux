import {
  jumpToAction,
  jumpToNextAction,
  jumpToPreviousAction,
  jumpToFirstAction,
  jumpToLastAction,
  claimHexAction,
  changeBoardSizeAction,
} from '../actions';

import {
  JUMP_TO_ACTION,
  JUMP_TO_FIRST_ACTION,
  JUMP_TO_LAST_ACTION,
  JUMP_TO_PREVIOUS_ACTION,
  JUMP_TO_NEXT_ACTION,
  CLAIM_HEX_ACTION,
  CHANGE_BOARD_SIZE_ACTION,
} from '../constants';

describe('HexGame actions', () => {
  describe('Jump To Action', () => {
    it('has a type of JUMP_TO_ACTION, and expected destination', () => {
      for (let i = 0; i < Number.MAX_SAFE_INTEGER; i += 1) {
        const expected = {
          type: JUMP_TO_ACTION,
          destination: i,
        };
        expect(jumpToAction(expected.desination)).toEqual(expected);
      }
    });
  });
  describe('Jump To Next Action', () => {
    it('has a type of JUMP_TO_NEXT_ACTION', () => {
      const expected = {
        type: JUMP_TO_NEXT_ACTION,
      };
      expect(jumpToNextAction()).toEqual(expected);
    });
  });
  describe('Jump To Previous Action', () => {
    it('has a type of JUMP_TO_PREVIOUS_ACTION', () => {
      const expected = {
        type: JUMP_TO_PREVIOUS_ACTION,
      };
      expect(jumpToPreviousAction()).toEqual(expected);
    });
  });
  describe('Jump To First Action', () => {
    it('has a type of JUMP_TO_FIRST_ACTION', () => {
      const expected = {
        type: JUMP_TO_FIRST_ACTION,
      };
      expect(jumpToFirstAction()).toEqual(expected);
    });
  });
  describe('Jump To Last Action', () => {
    it('has a type of JUMP_TO_LAST_ACTION', () => {
      const expected = {
        type: JUMP_TO_LAST_ACTION,
      };
      expect(jumpToLastAction()).toEqual(expected);
    });
  });
  describe('Claim Hex Action Action', () => {
    it('has a type of CLAIM_HEX_ACTION, and the expected hexKey', () => {
      const expected = {
        type: CLAIM_HEX_ACTION,
        hexKey: 'Test Hex Key',
      };
      expect(claimHexAction(expected.hexKey)).toEqual(expected);
    });
  });
  describe('Change Board Size Action', () => {
    it('has a type of CHANGE_BOARD_SIZE_ACTION, and the expected boardSize', () => {
      const expected = {
        type: CHANGE_BOARD_SIZE_ACTION,
        boardSize: 18,
      };
      expect(changeBoardSizeAction(expected.boardSize)).toEqual(expected);
    });
  });
});
