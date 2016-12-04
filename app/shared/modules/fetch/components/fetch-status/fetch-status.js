import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectors } from './../../../../modules';
import { NOT_LOADED, ERROR, LOADED, PENDING } from './../../constants/fetch-status';

const FetchStatus = ({ status, children }) => {
  switch (status) {
    case NOT_LOADED:
      return <div>Data not loaded</div>;
    case PENDING:
      return <div>Pending...</div>;
    case LOADED:
      return <div>{children}</div>;
    case ERROR:
    default:
      return <div>Error</div>;
  }
};

export default connect(
  (state, ownProps) => ({
    status: selectors.fetch.getFetchStatus(state, ownProps.dataType, ownProps.dataRef)
  })
)(FetchStatus);
