import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ tasks }) => {
  const todos = tasks.map((task) => {
    const { id } = task
    return <Task key={id} {...task} />
  })

  return <ul className="todo-list">{todos}</ul>
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default TaskList
