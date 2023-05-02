import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends Component {
  idNum = 10

  state = {
    tasks: [this.createItem('First task'), this.createItem('Second task'), this.createItem('Third task')],
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
      const newArr = tasks.slice()
      newArr.push(newItem)
      return {
        tasks: newArr,
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

  filteredTasks(selectedFilter) {
    const { tasks } = this.state

    if (selectedFilter.toLowerCase() === 'all') {
      return tasks
    }
    if (selectedFilter.toLowerCase() === 'active') {
      return tasks.filter((t) => !t.completed)
    }
    if (selectedFilter.toLowerCase() === 'completed') {
      return tasks.filter((t) => t.completed)
    }
    return null
  }

  render() {
    const { selectedFilter, filters, tasks } = this.state
    const taskCount = tasks.reduce((acc, t) => acc + !t.completed, 0)

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            tasks={this.filteredTasks(selectedFilter)}
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
