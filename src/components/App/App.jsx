import { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

export default class App extends Component {
  state = {
    tasks: [],
    filter: 'All',
  }
  maxId = 100

  componentDidMount() {
    if (localStorage.getItem('maxId') !== null) {
      this.maxId = Number(localStorage.getItem('maxId'))
    } else {
      localStorage.setItem('maxId', JSON.stringify(this.maxId))
    }
    if (localStorage.getItem('tasks') !== null) {
      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks')),
      })
    } else {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
      localStorage.setItem('maxId', JSON.stringify(this.maxId))
      this.render()
    }
  }

  onDelete = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      return {
        tasks: [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  onItemAdded = (text, time) => {
    this.setState(({ tasks }) => {
      const newItem = this.createTodoItem(text, time)
      const newArr = [...tasks, newItem]

      return {
        tasks: newArr,
      }
    })
  }

  onToggleEdit(id) {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = { ...oldItem, edit: !oldItem.edit }
      return {
        tasks: [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  onItemEdited = (id, text) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      const oldItem = tasks[idx]
      const newItem = { ...oldItem, text: text, edit: !oldItem.edit }
      return {
        tasks: [...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)],
      }
    })
  }

  onFilterChange = (label) => {
    this.setState({
      filter: label,
    })
  }

  arrayFilter(filter) {
    const { tasks } = this.state
    let todoFiltered = []
    switch (filter) {
      case 'All':
        todoFiltered = [...tasks]
        return todoFiltered
      case 'Active':
        todoFiltered = [...tasks.filter((el) => el.done === false)]
        return todoFiltered
      case 'Completed':
        todoFiltered = [...tasks.filter((el) => el.done === true)]
        return todoFiltered
    }
  }

  clearAllCompletedTasks = () => {
    this.setState(({ tasks }) => {
      const arr = [...tasks].filter((el) => !el.done)
      return {
        tasks: arr,
      }
    })
  }

  createTodoItem(text, time) {
    return {
      text,
      done: false,
      id: this.maxId++,
      createTime: Date.now(),
      edit: false,
      time,
    }
  }

  render() {
    const { filter } = this.state
    const filteredTasks = this.arrayFilter(filter)
    const doneCount = this.state.tasks.filter((i) => !i.done).length

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDelete={(id) => this.onDelete(id)}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            onItemEdited={this.onItemEdited}
          />
          <Footer doneCount={doneCount} filter={this.onFilterChange} clearAll={this.clearAllCompletedTasks} />
        </section>
      </section>
    )
  }
}
