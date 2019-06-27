/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

import HexGame from 'containers/HexGame';

export default function HomePage() {
  const boardSize = 9;
  return (
    <React.Fragment>
      <Helmet>
        <title>Hex in React Redux</title>
        <meta
          name="description"
          content="Hex in React using React Redux and Redux Saga"
        />
      </Helmet>
      <Container>
        <Row>
          <Col xs={12}>
            <div id="alert" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Jumbotron id="viewport" className="modal-container">
              <HexGame boardSize={boardSize} />
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
