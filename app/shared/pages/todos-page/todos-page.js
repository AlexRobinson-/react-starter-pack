import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addData } from './../../actions/item-actions';

class TodosPage extends Component {

  componentWillMount () {
    this.props.addData('TODO_TYPE', '123', {
      id: '123',
      title: 'This is a test'
    });
  }

  render () {
    return (
      <div>This is the todos page</div>
    );
  }
}

export default connect(
  state => ({}),
  { addData }
)(TodosPage);
