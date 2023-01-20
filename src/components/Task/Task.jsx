import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    text: '',
    onDeleted: () => {},
    onToggleDone: () => {},
    done: false,
  };

  static propTypes = {
    text: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    done: PropTypes.bool,
  };

  render() {
    const { text, onDeleted, onToggleDone, done, createTime } = this.props;
    let classNames = 'active';
    if (done) {
      classNames = 'completed';
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description" onClick={onToggleDone}>
              {text}
            </span>
            <span className="created">
              {
                // setInterval(() => {
                formatDistanceToNow(createTime, {
                  addSuffix: true,
                  includeSeconds: true,
                })
                // }, 1000)
              }
            </span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" />
      </li>
    );
  }
}
