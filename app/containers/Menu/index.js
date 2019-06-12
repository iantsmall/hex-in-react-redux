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

import { useInjectReducer } from 'utils/injectReducer';
import RulesModal from 'components/RulesModal';
import ComingSoonModal from 'components/ComingSoonModal';
import MenuView from 'components/MenuView';
import makeSelectMenu from './selectors';
import reducer from './reducer';
import {
  showRulesAction,
  showComingSoonAction,
  hideRulesAction,
  hideComingSoonAction,
} from './actions';

export function Menu({ dispatch = null, menu }) {
  useInjectReducer({ key: 'menu', reducer });
  return (
    <React.Fragment>
      <MenuView
        onRulesClick={() => dispatch(showRulesAction())}
        onComingSoonClick={() => dispatch(showComingSoonAction())}
      />
      <RulesModal
        onHide={() => dispatch(hideRulesAction())}
        show={menu.showRules || false}
      />
      <ComingSoonModal
        onHide={() => dispatch(hideComingSoonAction())}
        show={menu.showComingSoon || false}
      />
    </React.Fragment>
  );
}

Menu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  menu: PropTypes.shape({
    showRules: PropTypes.bool,
    showComingSoon: PropTypes.bool,
  }).isRequired,
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
