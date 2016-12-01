import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { createTodo } from './../../actions/todo-actions';
import TodoForm from './../../components/todo-form';

class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: {}
    }
  }

  createTodo(todo) {
    this.props.createTodo(
      todo,
    );
  }

  render() {
    return (
      <div>
        <h2>Add Todo</h2>
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
  { createTodo }
)(AddTodo);

