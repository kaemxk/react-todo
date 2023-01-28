import PropTypes from 'prop-types'

import Task from '../Task/Task'

const TaskList = ({ tasks, onDelete, onToggleDone, onToggleEdit, onItemEdited }) => {
  return (
    <ul className="todo-list">
      {tasks.map(({ text, id, done, createTime, edit, time }) => {
        return (
          <Task
            text={text}
            createTime={createTime}
            key={id}
            id={id}
            done={done}
            edit={edit}
            time={time}
            onItemEdited={onItemEdited}
            onDeleted={() => onDelete(id)}
            onToggleDone={() => onToggleDone(id)}
            toggleEdit={() => onToggleEdit(id)}
          />
        )
      })}
    </ul>
  )
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  toggleEdit: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  toggleEdit: PropTypes.func,
}

export default TaskList
