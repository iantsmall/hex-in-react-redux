/*
 *
 * HexGame actions
 *
 */
 import {
   JUMP_TO_ACTION,
   JUMP_TO_FIRST_ACTION,
   JUMP_TO_LAST_ACTION,
   JUMP_TO_PREVIOUS_ACTION,
   JUMP_TO_NEXT_ACTION,
   CLAIM_HEX_ACTION,
 } from './constants';

export function jumpToAction({destination}) {
  return {
    type: JUMP_TO_ACTION,
    destination
  };
}

export function jumpToFirstAction({destination}) {
  return {
    type: JUMP_TO_FIRST_ACTION,
  };
}

export function jumpToFirstAction({destination}) {
  return {
    type: JUMP_TO_LAST_ACTION,
  };
}

export function jumpToPreviousAction({destination}) {
  return {
    type: JUMP_TO_PREVIOUS_ACTION,
  };
}

export function jumpToNextAction({destination}) {
  return {
    type: JUMP_TO_NEXT_ACTION,
  };
}

export function jumpToLastAction({hexKey}}) {
  return {
    type: CLAIM_HEX_ACTION,
    hexKey
  };
}
