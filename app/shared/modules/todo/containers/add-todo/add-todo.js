import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { TODO_TYPE } from './../../../../constants/data-types';
import { addData } from './../../../../actions/item-actions';
import TodoForm from './../../components/todo-form';

class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: {}
    }
  }

  createTodo(todo) {
    this.props.addData(
      TODO_TYPE,
      {
        ...todo,
        id: v4()
      }
    );
  }

  render() {
    return (
      <div>
        Add Todo
        <TodoForm
          todo={{}}
          onSubmit={todo => this.createTodo(todo)}
          submitText='Add Todo'
        />
      </div>
    )
  }
}

export default connect(
  undefined,
  { addData }
)(AddTodo);

