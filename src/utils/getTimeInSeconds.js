const maxTimeInSeconds = 86400 // 24 * 60 *60

const getTimeInSeconds = (minutes, seconds) => {
  const time = Number(minutes) * 60 + Number(seconds)
  return time > maxTimeInSeconds ? maxTimeInSeconds : time
}

export default getTimeInSeconds
