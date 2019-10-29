import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { apiConferencesGet } from 'api/conferences';
import { ERROR_FETCH, CLEAR_ERRORS, READ_ALL } from 'state/conference.types';
import { reducer, initialState } from 'state/conference.reducer';
import Notification from 'components/common/Notification';
import ConferenceTable from 'components/ConferenceTable';

const styles = {
  fab: {
    float: 'right',
  },
};

class ConferenceTableContainer extends Component {
  constructor(props) {
    super(props);
    this.handleError = this.handleError.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
  }

  state = initialState;

  componentDidMount() {
    this.fetchData();
  }

  dispatch(action) {
    this.setState(prevState => reducer(prevState, action));
  }

  async fetchData() {
    try {
      const conferences = await apiConferencesGet();
      this.dispatch({ type: READ_ALL, payload: conferences });
    } catch (err) {
      this.handleError(err);
    }
  }

  closeNotification() {
    this.dispatch({ type: CLEAR_ERRORS });
  }

  handleError(err) {
    const { onError, t } = this.props;
    onError(err);
    this.dispatch({ type: ERROR_FETCH, payload: t('conference.error.dataLoading') });
  }

  render() {
    const { classes, onSelect, onAdd } = this.props;
    const { items, errorMessage } = this.state;
    return (
      <>
        <Fab color="primary" aria-label="add" className={classes.fab} onClick={onAdd}>
          <AddIcon />
        </Fab>
        <ConferenceTable items={items} onSelect={onSelect} />
        <Notification
          variant={Notification.ERROR}
          message={errorMessage}
          onClose={this.closeNotification}
        />
      </>
    );
  }
}

ConferenceTableContainer.propTypes = {
  classes: PropTypes.shape({
    fab: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
  onError: PropTypes.func,
  onSelect: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ConferenceTableContainer.defaultProps = {
  onAdd: () => {},
  onError: () => {},
  onSelect: () => {},
};

export default withStyles(styles)(
  withTranslation(undefined, { withRef: true })(ConferenceTableContainer)
);
