import { useState } from 'react'

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (label !== '') {
      const time = Number(minutes * 60) + Number(seconds)
      onItemAdded(label, time)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmitHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onLabelChange}
          value={label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={onMinutesChange}
          value={minutes}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={onSecondsChange}
          value={seconds}
        />
        <button style={{ display: 'none' }} />
      </form>
    </header>
  )
}

export default NewTaskForm
