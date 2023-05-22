import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onChange = ({ target }) => {
    this.setState({
      label: target.value,
    })
  }

  onSubmit = (e) => {
    const { addItem } = this.props
    const { label } = this.state

    e.preventDefault()
    addItem(label)
    this.setState({ label: '' })
  }

  render() {
    const { label } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={label}
            onChange={this.onChange}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}
