/**
 *
 * Menu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import RulesModal from 'components/RulesModal';
import ComingSoonModal from 'components/ComingSoonModal';
import makeSelectMenu from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  showRulesAction,
  showComingSoonAction,
  hideRulesAction,
  hideComingSoonAction
} from './actions';

export function Menu({ dispatch = null, menu }) {
  useInjectReducer({ key: 'menu', reducer });
  useInjectSaga({ key: 'menu', saga });

  const onRulesClick = () => {
    dispatch(showRulesAction());
  };

  const onComingSoonClick = () => {
    dispatch(showComingSoonAction());
  };

  const onRulesHide = () => {
    dispatch(hideRulesAction());
  };

  const onComingSoonHide = () => {
    dispatch(hideComingSoonAction());
  };

  return (
    <React.Fragment>
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
      <RulesModal onHide={onRulesHide} show={menu.showRules} />
      <ComingSoonModal onHide={onComingSoonHide}  show={menu.showComingSoon} />
    </React.Fragment>
  );
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  menu: makeSelectMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Menu);
