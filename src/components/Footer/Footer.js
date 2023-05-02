import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './Footer.css'

function Footer({ taskCount, filters, isSelectedFilter, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{taskCount} items left</span>
      <ul className="filters">
        {filters.map((filter) => (
          <TasksFilter
            key={filter.filterName}
            {...filter}
            isSelectedFilter={() => isSelectedFilter(filter.filterName)}
          />
        ))}
      </ul>
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  taskCount: 0,
  filters: [{ filterName: 'All', selected: true }],
}

Footer.propTypes = {
  taskCount: PropTypes.number,
  filters: PropTypes.arrayOf(PropTypes.object),
  isSelectedFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}

export default Footer
