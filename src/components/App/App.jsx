import React, { useState, useMemo } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import filteredTasks from '../../utils/filteredTasks'
import getTimeInSeconds from '../../utils/getTimeInSeconds'
import ContextFunctions from '../../context/context'

import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState([
    { filterName: 'All', selected: true },
    { filterName: 'Active', selected: false },
    { filterName: 'Completed', selected: false },
  ])
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [idNum, setIdNum] = useState(10)

  const createItem = (text, minutes, seconds) => {
    setIdNum(() => idNum + 1)
    return {
      description: text,
      created: Date.now(),
      completed: false,
      edit: false,
      id: idNum,
      time: getTimeInSeconds(minutes, seconds),
    }
  }

  const deleteItem = (id) => setTasks(() => tasks.filter((t) => t.id !== id))

  const editItem = (id, text) => {
    setTasks(() => tasks.map((t) => (t.id === id ? { ...t, edit: !t.edit, description: text } : t)))
  }

  const clearCompleted = () => setTasks(() => tasks.filter((t) => !t.completed))

  const addItem = (text, minutes, seconds) => {
    if (text.trim() === '') return
    const newItem = createItem(text, minutes, seconds)
    setTasks(() => [...tasks, newItem])
  }

  const isCompleted = (id) => {
    setTasks(() => tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const isSelectedFilter = (filter) => {
    setFilters(() => {
      return filters.map((f) => {
        if (f.filterName === filter) {
          return { ...f, selected: true }
        }
        if (f.selected === true) {
          return { ...f, selected: false }
        }
        return f
      })
    })
    setSelectedFilter(filter)
  }

  const taskCount = tasks.filter((t) => !t.completed).length
  const contextFunc = useMemo(() => {
    return { deleteItem, editItem, isCompleted, isSelectedFilter }
  })

  return (
    <ContextFunctions.Provider value={contextFunc}>
      <section className="todoapp">
        <NewTaskForm addItem={addItem} />
        <section className="main">
          <TaskList tasks={filteredTasks(selectedFilter, tasks)} />
          <Footer filters={filters} clearCompleted={clearCompleted} taskCount={taskCount} />
        </section>
      </section>
    </ContextFunctions.Provider>
  )
}

export default App
