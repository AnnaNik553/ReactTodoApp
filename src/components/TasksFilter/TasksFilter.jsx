import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'
import ContextFunctions from '../../context/context'

const TasksFilter = ({ filterName, selected }) => {
  const { isSelectedFilter } = useContext(ContextFunctions)
  const classNames = selected ? 'selected' : ''

  return (
    <li>
      <button type="button" className={classNames} onClick={() => isSelectedFilter(filterName)}>
        {filterName}
      </button>
    </li>
  )
}

TasksFilter.propTypes = {
  filterName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
}

export default TasksFilter
