import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

function TasksFilter({ filterName, selected, isSelectedFilter }) {
  let classNames = ''
  if (selected) {
    classNames = 'selected'
  }

  return (
    <li>
      <button type="button" className={classNames} onClick={isSelectedFilter}>
        {filterName}
      </button>
    </li>
  )
}

TasksFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  isSelectedFilter: PropTypes.func.isRequired,
}

export default TasksFilter
