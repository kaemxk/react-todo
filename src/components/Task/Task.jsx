import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../Timer/Timer'

const Task = ({ onItemEdited, text, onDeleted, onToggleDone, done, createTime, edit, toggleEdit, time, id }) => {
  const [label, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && label !== '') {
      onItemEdited(id, label)
      setLabel('')
    }
  }

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
        <input className="toggle" type="checkbox" checked={checked} onClick={onToggleDone} readOnly={true} />
        <label>
          <span className="title">{text}</span>
          <Timer timeProp={time} id={id} />
          <span className="description">
            {formatDistanceToNow(createTime, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </span>
        </label>
        <button className="icon icon-edit" onClick={toggleEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <input type="text" className="edit" onKeyDown={onKeyDown} onChange={onLabelChange} value={label} />
    </li>
  )
}

export default Task
