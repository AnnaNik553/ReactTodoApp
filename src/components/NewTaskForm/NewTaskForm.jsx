/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    text: '',
    minutes: '',
    seconds: '',
  }

  onChange = (e) => {
    const { value, name } = e.target
    this.setState({
      [name]: value,
    })
  }

  onSubmit = (e) => {
    const { addItem } = this.props
    const { text, minutes, seconds } = this.state

    e.preventDefault()
    addItem(text, minutes, seconds)
    this.setState({ text: '', minutes: '', seconds: '' })
  }

  render() {
    const { text, minutes, seconds } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} className="new-todo-form">
          <input
            name="text"
            type="text"
            className="new-todo"
            placeholder="Task"
            value={text}
            onChange={this.onChange}
          />
          <input
            name="minutes"
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            min={0}
            value={minutes}
            onChange={this.onChange}
          />
          <input
            name="seconds"
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            min={0}
            max={59}
            value={seconds}
            onChange={this.onChange}
          />
          <button type="submit" hidden />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}
