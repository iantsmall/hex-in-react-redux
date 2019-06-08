/**
 *
 * MenuView
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import messages from './messages';

const MenuView = ({ onRulesClick, onComingSoonClick }) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>
      <FormattedMessage {...messages.brand} />
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-start">
      <Navbar.Text>
        <FormattedMessage {...messages.project} />
      </Navbar.Text>
    </Navbar.Collapse>
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
  </Navbar>
);

MenuView.propTypes = {
  onRulesClick: PropTypes.func.isRequired,
  onComingSoonClick: PropTypes.func.isRequired,
};

export default memo(MenuView);
