import React, { Component, PropTypes } from 'react';

class TodoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todo: { ...props.todo }
    }
  }

  componentWillReceiveProps(props) {
    if (props.todo.id !== this.state.todo.id) {
      this.setState({
        todo: { ...props.todo }
      });
    }
  }

  createTodo() {
    if (!this.state.todo.title) {
      return '';
    }

    this.props.onSubmit({ ...this.state.todo });
    this.setState({
      todo: {
        title: ''
      }
    });
  }

  updateTodo(update) {
    this.setState({
      todo: {
        ...this.state.todo,
        ...update
      }
    });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.todo.title || ''}
          onChange={event => this.updateTodo({title: event.target.value})}
        />
        <button onClick={() => this.createTodo()}>{this.props.submitText}</button>
      </div>
    );
  }
}

TodoForm.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string
};

TodoForm.defaultProps = {
  submitText: 'Submit'
};


export default TodoForm;

