import React, { Component } from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import TaskTimer from '../TaskTimer'
import './Task.css'

export default class Task extends Component {
  state = {
    label: this.props.description,
  }

  onChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { editItem } = this.props
    const { label } = this.state

    e.preventDefault()
    if (label.trim() === '') return
    editItem(label)
  }

  onKeyDown = (e) => {
    const { editItem, description } = this.props

    if (e.code === 'Escape') {
      this.setState({
        label: description,
      })
      editItem(description)
    }
  }

  render() {
    const { description, created, completed, edit, isCompleted, deleteItem, editItem, time } = this.props

    let classNames = ''
    if (completed) {
      classNames += ' completed'
    }

    if (edit) {
      classNames += ' editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={isCompleted} checked={completed} />
          <span className="label">
            <span className="description">{description}</span>
            <TaskTimer time={time} />
            <span className="created">
              {`created ${formatDistanceToNow(created, {
                includeSeconds: true,
              })} ego`}
            </span>
          </span>
          <button
            type="button"
            aria-label="edit"
            className="icon icon-edit"
            onClick={() => editItem(this.state.label)}
          />
          <button type="button" aria-label="delete" className="icon icon-destroy" onClick={deleteItem} />
        </div>
        {edit && (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              value={this.state.label}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
            />
          </form>
        )}
      </li>
    )
  }
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
  isCompleted: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}
