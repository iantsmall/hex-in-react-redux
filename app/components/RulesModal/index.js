/**
 *
 * RulesModal
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RulesModal({ show, onHide }) {
  return (
    <Modal id="modal-rules" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...messages.title} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormattedMessage {...messages.rules} />
      </Modal.Body>
    </Modal>
  );
}

RulesModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default memo(RulesModal);
