import React, { Component } from 'react';

export default class TasksFilter extends Component {
  state = {
    li: [
      { label: 'All', id: 'all', active: true },
      {
        label: 'Active',
        id: 'active',
        active: false,
      },
      { label: 'Completed', id: 'completed', active: false },
    ],
  };

  setActive = (id) => {
    this.setState(({ li }) => {
      const newArr = [...li];
      const idx = newArr.findIndex((el) => el.id === id);
      newArr.forEach((i) => {
        i['id'] === id ? (i.active = true) : (i.active = false);
      });

      return {
        li: newArr,
      };
    });
  };

  onClick = (id, label) => {
    this.setActive(id);
    this.props.onFilter(label);
  };

  render() {
    return (
      <ul className="filters">
        {this.state.li.map(({ label, id, active }) => {
          const classNames = active ? 'selected' : '';
          return (
            <li key={id}>
              <button onClick={() => this.onClick(id, label)} className={classNames}>
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
