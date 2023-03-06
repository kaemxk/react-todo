import { useState } from 'react'

const TasksFilter = ({ onFilter }) => {
  const [li, setLi] = useState([
    { label: 'All', id: 'all', active: true },
    {
      label: 'Active',
      id: 'active',
      active: false,
    },
    { label: 'Completed', id: 'completed', active: false },
  ])

  const setActive = (id) => {
    setLi((li) => {
      const newArr = [...li]
      newArr.forEach((i) => {
        i['id'] === id ? (i.active = true) : (i.active = false)
      })
      return newArr
    })
  }

  const onClick = (id, label) => {
    setActive(id)
    onFilter(label)
  }

  return (
    <ul className="filters">
      {li.map(({ label, id, active }) => {
        const classNames = active ? 'selected' : ''
        return (
          <li key={id}>
            <button onClick={() => onClick(id, label)} className={classNames}>
              {label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default TasksFilter
