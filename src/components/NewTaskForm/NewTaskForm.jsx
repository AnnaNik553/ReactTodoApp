/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = ({ addItem }) => {
  const [newTask, setNewTask] = useState({
    text: '',
    minutes: '',
    seconds: '',
  })

  const onChange = (e) => {
    const { value, name } = e.target
    setNewTask(() => {
      return { ...newTask, [name]: value }
    })
  }

  const { text, minutes, seconds } = newTask

  const onSubmit = (e) => {
    e.preventDefault()
    addItem(text, minutes, seconds)
    setNewTask({ text: '', minutes: '', seconds: '' })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input name="text" type="text" className="new-todo" placeholder="Task" value={text} onChange={onChange} />
        <input
          name="minutes"
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          min={0}
          value={minutes}
          onChange={onChange}
        />
        <input
          name="seconds"
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          min={0}
          max={59}
          value={seconds}
          onChange={onChange}
        />
        <button type="submit" hidden />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default NewTaskForm
