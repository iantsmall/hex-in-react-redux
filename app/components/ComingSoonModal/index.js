/**
 *
 * ComingSoonModal
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Modal } from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function ComingSoonModal({ show, onHide }) {
  return (
    <Modal id="coming-soon" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...messages.title} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormattedMessage {...messages.body} />
      </Modal.Body>
    </Modal>
  );
}

ComingSoonModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
};

export default memo(ComingSoonModal);
