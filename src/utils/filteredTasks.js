const filteredTasks = (selectedFilter, tasks) => {
  const filterTasks = tasks

  if (selectedFilter.toLowerCase() === 'all') {
    return filterTasks
  }
  if (selectedFilter.toLowerCase() === 'active') {
    return filterTasks.filter((t) => !t.completed)
  }
  if (selectedFilter.toLowerCase() === 'completed') {
    return filterTasks.filter((t) => t.completed)
  }
  return null
}

export default filteredTasks
