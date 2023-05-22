import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import filteredTasks from '../../utils/filteredTasks'

import './App.css'

export default class App extends Component {
  idNum = 10

  state = {
    tasks: [this.createItem('Hi! Add, edit or delete any tasks...')],
    filters: [
      { filterName: 'All', selected: true },
      { filterName: 'Active', selected: false },
      { filterName: 'Completed', selected: false },
    ],
    selectedFilter: 'All',
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((t) => t.id !== id),
      }
    })
  }

  editItem = (id, text) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((t) => (t.id === id ? { ...t, edit: !t.edit, description: text } : t)),
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((t) => !t.completed),
      }
    })
  }

  addItem = (text) => {
    if (text.trim() === '') return
    const newItem = this.createItem(text)

    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, newItem],
      }
    })
  }

  isCompleted = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      }
    })
  }

  isSelectedFilter = (filter) => {
    this.setState(({ filters }) => {
      return {
        filters: filters.map((f) => {
          if (f.filterName === filter) {
            return { ...f, selected: true }
          }
          if (f.selected === true) {
            return { ...f, selected: false }
          }
          return f
        }),
        selectedFilter: filter,
      }
    })
  }

  createItem(text) {
    this.idNum += 1
    return {
      description: text,
      created: Date.now(),
      completed: false,
      edit: false,
      id: this.idNum,
    }
  }

  render() {
    const { selectedFilter, filters, tasks } = this.state
    const taskCount = tasks.filter((t) => !t.completed).length

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks(selectedFilter, tasks)}
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            isCompleted={this.isCompleted}
          />
          <Footer
            filters={filters}
            isSelectedFilter={this.isSelectedFilter}
            clearCompleted={this.clearCompleted}
            taskCount={taskCount}
          />
        </section>
      </section>
    )
  }
}
