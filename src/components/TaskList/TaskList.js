import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

function TaskList({ tasks, deleteItem, editItem, isCompleted }) {
  const todos = tasks.map((task) => {
    const { id, ...taskInfo } = task
    return (
      <Task
        key={id}
        {...taskInfo}
        deleteItem={() => deleteItem(id)}
        editItem={(text) => editItem(id, text)}
        isCompleted={() => isCompleted(id)}
      />
    )
  })

  return <ul className="todo-list">{todos}</ul>
}

TaskList.defaultProps = {
  deleteItem: () => {},
  isCompleted: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func,
  isCompleted: PropTypes.func,
}

export default TaskList
