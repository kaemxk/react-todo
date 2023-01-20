import { Component } from 'react';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export default class App extends Component {
  maxId = 100;

  state = {
    todos: [
      this.createTodoItem('Drink Coffee', new Date()),
      this.createTodoItem('Make Awesome App', new Date()),
      this.createTodoItem('Have a lunch', new Date()),
    ],
    filtered: 'All',
  };

  deleteItem = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);

      return {
        todos: [...todos.slice(0, idx), ...todos.slice(idx + 1)],
      };
    });
  };

  createTodoItem(text, createTime) {
    return {
      text,
      done: false,
      id: this.maxId++,
      createTime,
    };
  }

  onToggleDone = (id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const oldItem = todos[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      return {
        todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
      };
    });
  };

  onItemAdded = (text) => {
    this.setState(({ todos }) => {
      const newItem = this.createTodoItem(text, Date.now());
      const newArr = [...todos, newItem];

      return {
        todos: newArr,
      };
    });
  };

  filter = (label) => {
    this.setState({
      filtered: label,
    });
  };

  clearAll = () => {
    this.setState(({ todos }) => {
      const arr = [...todos].filter((el) => !el.done);
      return {
        todos: arr,
      };
    });
  };

  render() {
    const { todos, filtered } = this.state;

    let todoFiltered = [];
    switch (filtered) {
      case 'All':
        todoFiltered = [...todos];
        break;
      case 'Active':
        todoFiltered = [...todos.filter((el) => el.done === false)];
        break;
      case 'Completed':
        todoFiltered = [...todos.filter((el) => el.done === true)];
        break;
    }

    const doneCount = this.state.todos.filter((i) => !i.done).length;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <section className="main">
          <TaskList todos={todoFiltered} onDeleted={(id) => this.deleteItem(id)} onToggleDone={this.onToggleDone} />
          <Footer doneCount={doneCount} filter={this.filter} clearAll={this.clearAll} />
        </section>
      </section>
    );
  }
}
