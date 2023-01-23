import PropTypes from 'prop-types'

import Task from '../Task/Task'

const TaskList = ({ todos, onDeleted, onToggleDone, toggleEdit, onItemEdited }) => {
  return (
    <ul className="todo-list">
      {todos.map(({ text, id, done, createTime, edit }) => {
        return (
          <Task
            text={text}
            createTime={createTime}
            key={id}
            id={id}
            done={done}
            edit={edit}
            onItemEdited={onItemEdited}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            toggleEdit={() => toggleEdit(id)}
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
