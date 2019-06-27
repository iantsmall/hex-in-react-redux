/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

import messages from './messages';

export default function NotFound() {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div id="alert" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Jumbotron id="viewport" className="modal-container">
            <h1>
              <FormattedMessage {...messages.header} />
            </h1>
            <FormattedMessage {...messages.text} />
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}
