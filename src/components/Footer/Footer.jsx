import PropTypes from 'prop-types'

import TasksFilterOld from '../TasksFilter/TasksFilter'

const Footer = ({ doneCount, filter, clearAll }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{doneCount} items left</span>
      <TasksFilterOld onFilter={filter} />
      <button className="clear-completed" onClick={clearAll}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  doneCount: 0,
  filter: () => {},
  clearAll: () => {},
}

Footer.propTypes = {
  doneCount: PropTypes.number,
  filter: PropTypes.func,
  clearAll: PropTypes.func,
}

export default Footer
