import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      label: '',
    }

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    this.onKeyDown = (e) => {
      if (e.keyCode === 13 && this.state.label !== '') {
        this.props.onItemEdited(this.props.id, this.state.label)
        this.setState({
          label: '',
        })
      }
    }
  }

  render() {
    const { text, onDeleted, onToggleDone, done, createTime, edit, toggleEdit } = this.props
    let classNames = 'active',
      checked = false
    if (done) {
      classNames = 'completed'
      checked = true
    }
    if (edit) {
      classNames = 'editing'
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked={checked} onClick={onToggleDone} />
          <label>
            <span className="description">{text}</span>
            <span className="created">
              {formatDistanceToNow(createTime, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span>
          </label>
          <button className="icon icon-edit" onClick={toggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input
          type="text"
          className="edit"
          onKeyDown={this.onKeyDown}
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </li>
    )
  }
}

Task.defaultProps = {
  text: '',
  onDeleted: () => {},
  onToggleDone: () => {},
  done: false,
}

Task.propTypes = {
  text: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
}
