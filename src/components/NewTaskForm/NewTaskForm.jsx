import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
  };

  static defaultProps = {
    onItemAdded: () => {},
  };

  static propTypes = {
    onItemAdded: PropTypes.func,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13 && this.state.label !== '') {
      this.props.onItemAdded(this.state.label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyDown}
          value={this.state.label}
        />
      </header>
    );
  }
}
