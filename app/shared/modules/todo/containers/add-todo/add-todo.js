import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { TODO_TYPE } from './../../../../constants/data-types';
import { addData } from './../../../../actions/item-actions';

class AddTodo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      inputTitle: ''
    }
  }

  createTodo () {
    this.props.addData(
      TODO_TYPE,
      {
        id: v4(),
        title: this.state.inputTitle
      }
    );
    this.setState({
      inputTitle: ''
    });
  }

  render () {
    return (
      <div>
        Add Todo
        <input
          value={this.state.inputTitle}
          onChange={event => this.setState({inputTitle: event.target.value})}
        />
        <button onClick={() => this.createTodo()}>Add Todo</button>
      </div>
    )
  }
}

export default connect(
  undefined,
  { addData }
)(AddTodo);

