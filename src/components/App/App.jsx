import { useEffect, useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  const [maxId, setMaxId] = useState(100)

  useEffect(() => {
    if (localStorage.getItem('maxId') !== null) {
      setMaxId(Number(localStorage.getItem('maxId')))
    } else {
      localStorage.setItem('maxId', JSON.stringify(maxId))
    }
    if (localStorage.getItem('tasks') !== null) {
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    } else {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('maxId', JSON.stringify(maxId))
  }, [maxId, tasks])

  const onDelete = (id) => {
    const idx = tasks.findIndex((el) => el.id === id)
    setTasks([...tasks.slice(0, idx), ...tasks.slice(idx + 1)])
  }

  const onToggleDone = (id) => {
    const idx = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[idx]
    const newItem = { ...oldItem, done: !oldItem.done }
    setTasks([...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)])
  }

  const onItemAdded = (text, time) => {
    const newItem = createTodoItem(text, time)
    setTasks([...tasks, newItem])
  }

  const onToggleEdit = (id) => {
    const idx = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[idx]
    const newItem = { ...oldItem, edit: !oldItem.edit }
    setTasks([...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)])
  }

  const onItemEdited = (id, text) => {
    const idx = tasks.findIndex((el) => el.id === id)
    const oldItem = tasks[idx]
    const newItem = { ...oldItem, text: text, edit: !oldItem.edit }
    setTasks([...tasks.slice(0, idx), newItem, ...tasks.slice(idx + 1)])
  }

  const onFilterChange = (label) => {
    setFilter(label)
  }

  const arrayFilter = (filter) => {
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

  const clearAllCompletedTasks = () => {
    const arr = [...tasks].filter((el) => !el.done)
    setTasks(arr)
  }

  const createTodoItem = (text, time) => {
    setMaxId((s) => s + 1)
    return {
      text,
      done: false,
      id: maxId,
      createTime: Date.now(),
      edit: false,
      time,
    }
  }

  const filteredTasks = arrayFilter(filter)
  const doneCount = tasks.filter((i) => !i.done).length

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={onItemAdded} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDelete={(id) => onDelete(id)}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          onItemEdited={onItemEdited}
        />
        <Footer doneCount={doneCount} filter={onFilterChange} clearAll={clearAllCompletedTasks} />
      </section>
    </section>
  )
}

export default App
