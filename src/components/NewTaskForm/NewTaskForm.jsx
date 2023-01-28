import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    minutes: '',
    seconds: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  onSubmitHandler = (e) => {
    e.preventDefault()
    if (this.state.label !== '') {
      const time = Number(this.state.minutes * 60) + Number(this.state.seconds)
      this.props.onItemAdded(this.state.label, time)
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmitHandler}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.label}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            onChange={this.onMinutesChange}
            value={this.state.minutes}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            onChange={this.onSecondsChange}
            value={this.state.seconds}
          />
          <button style={{ display: 'none' }} />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
