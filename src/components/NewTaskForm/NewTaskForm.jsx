import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      label: '',
    }

    this.defaultProps = {
      onItemAdded: () => {},
    }

    this.propTypes = {
      onItemAdded: PropTypes.func,
    }

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    this.onKeyDown = (e) => {
      if (e.keyCode === 13 && this.state.label !== '') {
        this.props.onItemAdded(this.state.label)
        this.setState({
          label: '',
        })
      }
    }
  }

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
    )
  }
}
