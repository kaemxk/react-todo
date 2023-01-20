import PropTypes from 'prop-types'

import Task from '../Task/Task'

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  return (
    <ul className="todo-list">
      {todos.map(({ text, id, done, createTime }) => {
        return (
          <Task
            text={text}
            createTime={createTime}
            key={id}
            done={done}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
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
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default TaskList
