import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import TaskTimer from '../TaskTimer'
import './Task.css'
import ContextFunctions from '../../context/context'

const Task = ({ description, created, completed, edit, time, id }) => {
  const [label, setLabel] = useState(description)
  const { deleteItem, editItem, isCompleted } = useContext(ContextFunctions)

  const onChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim() === '') return
    editItem(id, label)
  }

  const onKeyDown = (e) => {
    if (e.code === 'Escape') {
      setLabel(description)
      editItem(id, description)
    }
  }

  let classNames = ''
  classNames += completed ? ' completed' : ''
  classNames += edit ? ' editing' : ''

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => isCompleted(id)} checked={completed} />
        <span className="label">
          <span className="description">{description}</span>
          <TaskTimer time={time} />
          <span className="created">
            {`created ${formatDistanceToNow(created, {
              includeSeconds: true,
            })} ego`}
          </span>
        </span>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={() => editItem(id, label)} />
        <button type="button" aria-label="delete" className="icon icon-destroy" onClick={() => deleteItem(id)} />
      </div>
      {edit && (
        <form onSubmit={onSubmit}>
          <input type="text" className="edit" value={label} onChange={onChange} onKeyDown={onKeyDown} />
        </form>
      )}
    </li>
  )
}

Task.defaultProps = {
  description: 'unknown task',
  created: Date.now(),
  completed: false,
  edit: false,
}

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.number,
  completed: PropTypes.bool,
  edit: PropTypes.bool,
}

export default Task
