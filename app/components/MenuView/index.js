/**
 *
 * MenuView
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Container, Navbar, Nav, NavItem } from 'react-bootstrap';
import messages from './messages';

const MenuView = ({ onRulesClick, onComingSoonClick }) => (
  <Navbar bg="dark" variant="dark" expand="md" sticky="top" collapseOnSelect>
    <Container>
      <Navbar.Brand>
        <a href="https://www.iantsmall.com/">
          <FormattedMessage {...messages.brand} />
        </a>
      </Navbar.Brand>
      <NavItem className="justify-content-start">
        <Nav.Link href="/">
          <FormattedMessage {...messages.project} />
        </Nav.Link>
      </NavItem>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-start" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavItem>
            <Nav.Link href="#rules" onSelect={onRulesClick}>
              <FormattedMessage {...messages.rules} />
            </Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link href="#comingSoon" onSelect={onComingSoonClick}>
              <FormattedMessage {...messages.comingSoon} />
            </Nav.Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

MenuView.propTypes = {
  onRulesClick: PropTypes.func.isRequired,
  onComingSoonClick: PropTypes.func.isRequired,
};

export default memo(MenuView);
