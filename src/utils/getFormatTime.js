const getFormatTime = (time) => {
  const hours = Math.floor(time / 60 / 60)
  const minutes = Math.floor(time / 60 - hours * 60)
  const seconds = time - hours * 60 * 60 - minutes * 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export default getFormatTime
